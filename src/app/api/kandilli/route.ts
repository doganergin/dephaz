import { NextResponse } from 'next/server';

const KANDILLI_URL = 'http://www.koeri.boun.edu.tr/scripts/lst0.asp';

// Türkiye + çevre kuşak (Ege, Doğu Akdeniz dahil)
const TURKIYE_BBOX = { minlat: 35, maxlat: 43, minlon: 25, maxlon: 46 };

interface Deprem {
  tarih: string;
  saat: string;
  enlem: number;
  boylam: number;
  derinlik: number;
  ml: number | null;
  mw: number | null;
  buyukluk: number;
  konum: string;
}

interface USGSFeature {
  properties: { mag: number; place: string; time: number };
  geometry: { coordinates: [number, number, number] };
}

function parseKandilli(text: string): Deprem[] {
  const lines = text.split('\n');
  const depremler: Deprem[] = [];

  for (const line of lines) {
    const match = line.match(
      /^(\d{4}\.\d{2}\.\d{2})\s+(\d{2}:\d{2}:\d{2})\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+[\d.-]+\s+([\d.-]+)\s+([\d.-]+)\s+(.+?)\s+(REVIZE|[İI]lksel|ILKSEL)/i
    );
    if (!match) continue;

    const [, tarih, saat, enlem, boylam, derinlik, ml, mw, konum] = match;
    const mlVal = ml === '-.-' ? null : parseFloat(ml);
    const mwVal = mw === '-.-' ? null : parseFloat(mw);

    depremler.push({
      tarih: tarih.replace(/\./g, '-'),
      saat,
      enlem: parseFloat(enlem),
      boylam: parseFloat(boylam),
      derinlik: parseFloat(derinlik),
      ml: mlVal,
      mw: mwVal,
      buyukluk: mwVal ?? mlVal ?? 0,
      konum: konum.trim(),
    });
  }

  return depremler;
}

async function usgsturkiyeGetir(limit: number, minmag: number, il?: string): Promise<Deprem[]> {
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const url =
    `https://earthquake.usgs.gov/fdsnws/event/1/query` +
    `?format=geojson` +
    `&minmagnitude=${minmag}` +
    `&minlatitude=${TURKIYE_BBOX.minlat}` +
    `&maxlatitude=${TURKIYE_BBOX.maxlat}` +
    `&minlongitude=${TURKIYE_BBOX.minlon}` +
    `&maxlongitude=${TURKIYE_BBOX.maxlon}` +
    `&orderby=time` +
    `&limit=500` +
    `&starttime=${ninetyDaysAgo}`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`USGS hata: ${res.status}`);

  const data = await res.json();
  let depremler: Deprem[] = (data.features as USGSFeature[]).map((f) => {
    const dt = new Date(f.properties.time);
    return {
      tarih: dt.toISOString().split('T')[0],
      saat: dt.toTimeString().slice(0, 8),
      enlem: f.geometry.coordinates[1],
      boylam: f.geometry.coordinates[0],
      derinlik: Math.round(f.geometry.coordinates[2]),
      ml: null,
      mw: f.properties.mag,
      buyukluk: f.properties.mag,
      konum: f.properties.place ?? '',
    };
  });

  if (il) {
    depremler = depremler.filter((d) =>
      d.konum.toUpperCase().includes(il) || d.konum.toUpperCase().includes('TURKEY')
    );
  }

  return depremler.slice(0, limit);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const il = searchParams.get('il')?.toUpperCase();
  const limit = parseInt(searchParams.get('limit') ?? '500');
  const minmag = parseFloat(searchParams.get('minmag') ?? '1.0');
  const source = searchParams.get('source');

  const noCache = { headers: { 'Cache-Control': 'no-store, max-age=0' } };

  // USGS direkt modu
  if (source === 'usgs') {
    try {
      const depremler = await usgsturkiyeGetir(limit, minmag, il);
      return NextResponse.json(depremler, noCache);
    } catch (err) {
      return NextResponse.json(
        { error: 'USGS verisi alınamadı', detail: String(err) },
        { status: 500 }
      );
    }
  }

  // Kandilli dene → USGS fallback
  try {
    const res = await fetch(KANDILLI_URL, {
      headers: { 'Accept-Charset': 'windows-1254' },
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) throw new Error('Kandilli yanıt vermedi');

    const buffer = await res.arrayBuffer();
    const text = new TextDecoder('windows-1254').decode(buffer);

    let depremler = parseKandilli(text).filter((d) => d.buyukluk >= minmag);

    if (il) {
      depremler = depremler.filter((d) =>
        d.konum.includes(il) || d.konum.includes(`(${il})`)
      );
    }

    if (depremler.length === 0) throw new Error('Kandilli boş döndü');

    return NextResponse.json(depremler.slice(0, limit), noCache);
  } catch {
    // Kandilli down → USGS Türkiye fallback
    try {
      const depremler = await usgsturkiyeGetir(limit, minmag, il);
      return NextResponse.json(depremler, noCache);
    } catch (err2) {
      return NextResponse.json(
        { error: 'Deprem verisi alınamadı', detail: String(err2) },
        { status: 500 }
      );
    }
  }
}

export const dynamic = 'force-dynamic';
