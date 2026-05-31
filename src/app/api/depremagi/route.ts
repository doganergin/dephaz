import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') ?? '30');
  const minmag = parseFloat(searchParams.get('minmag') ?? '1.0');

  try {
    const url = `https://api.earthquakesnetwork.it/v1/last?lat=39&lon=35&radius=1500&minmag=${minmag}`;
    const res = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'depremhatti.com/1.0' },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const raw = await res.json();
    const list: unknown[] = Array.isArray(raw) ? raw : (raw as Record<string, unknown[]>).earthquakes ?? [];

    const depremler = list
      .slice(0, limit)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((d: any) => ({
        buyukluk: Number(d.mag ?? d.magnitude ?? 0),
        konum: String(d.place ?? d.region ?? 'Bilinmiyor'),
        tarih: new Date(d.time ?? d.timestamp).toLocaleString('tr-TR'),
        derinlik: Math.round(Number(d.depth ?? 0)),
        enlem: Number(d.lat ?? d.latitude ?? 0),
        boylam: Number(d.lng ?? d.lon ?? d.longitude ?? 0),
        kaynak: 'DepremAğı',
      }));

    return NextResponse.json(depremler, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Deprem Ağı verisi alınamadı', detail: String(err) },
      { status: 500 },
    );
  }
}

export const dynamic = 'force-dynamic';
