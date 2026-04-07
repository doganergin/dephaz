import { NextResponse } from 'next/server';

interface AFADEvent {
  earthquake_id: string;
  provider: string;
  title: string;
  mag: number;
  depth: number;
  date_time: string;
  geojson: {
    type: string;
    coordinates: [number, number]; // [lon, lat]
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') ?? '50');
  const minmag = parseFloat(searchParams.get('minmag') ?? '3.5');

  try {
    const res = await fetch(
      `https://api.orhanaydogdu.com.tr/deprem/afad/live?limit=${limit * 3}`,
      {
        headers: { 'User-Agent': 'DepHaz/1.0' },
        next: { revalidate: 300 }, // 5 dk cache
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!res.ok) throw new Error(`AFAD API hata: ${res.status}`);

    const data = await res.json();
    const events: AFADEvent[] = data.result ?? data.data ?? [];

    const depremler = events
      .filter((e) => e.mag >= minmag)
      .slice(0, limit)
      .map((e) => ({
        buyukluk: e.mag,
        konum: e.title,
        tarih: e.date_time,
        enlem: e.geojson.coordinates[1],
        boylam: e.geojson.coordinates[0],
        derinlik: e.depth,
        kaynak: 'afad' as const,
      }));

    return NextResponse.json(depremler);
  } catch (err) {
    return NextResponse.json(
      { error: 'AFAD verisi alınamadı', detail: String(err) },
      { status: 500 }
    );
  }
}
