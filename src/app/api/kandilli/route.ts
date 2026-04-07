import { NextResponse } from 'next/server';

const KANDILLI_URL = 'http://www.koeri.boun.edu.tr/scripts/lst0.asp';

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

function parseKandilli(text: string): Deprem[] {
  const lines = text.split('\n');
  const depremler: Deprem[] = [];

  for (const line of lines) {
    // Kandilli satır formatı:
    // YYYY.MM.DD HH:MM:SS  LAT   LON   DEPTH  -.-  ML  MW  KONUM  STATUS  (tarih)
    const match = line.match(
      /^(\d{4}\.\d{2}\.\d{2})\s+(\d{2}:\d{2}:\d{2})\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+[\d.-]+\s+([\d.-]+)\s+([\d.-]+)\s+(.+?)\s+(REVIZE|ILKSEL)/
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const il = searchParams.get('il')?.toUpperCase();
  const limit = parseInt(searchParams.get('limit') ?? '20');

  try {
    const res = await fetch(KANDILLI_URL, {
      headers: { 'Accept-Charset': 'windows-1254' },
      next: { revalidate: 300 }, // 5 dk cache
    });

    if (!res.ok) throw new Error('Kandilli yanıt vermedi');

    // Windows-1254 encoding decode
    const buffer = await res.arrayBuffer();
    const text = new TextDecoder('windows-1254').decode(buffer);

    let depremler = parseKandilli(text);

    // M3.5 altı depremleri filtrele
    depremler = depremler.filter((d) => d.buyukluk >= 3.5);

    // Bölgeye göre filtrele (opsiyonel)
    if (il) {
      depremler = depremler.filter((d) =>
        d.konum.includes(il) || d.konum.includes(`(${il})`)
      );
    }

    return NextResponse.json(depremler.slice(0, limit));
  } catch (err) {
    return NextResponse.json(
      { error: 'Kandilli verisi alınamadı', detail: String(err) },
      { status: 500 }
    );
  }
}
