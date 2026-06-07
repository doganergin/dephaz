import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const minmag = parseFloat(searchParams.get('minmag') ?? '1.0');
  const limit = parseInt(searchParams.get('limit') ?? '500');

  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const maxLimit = Math.min(limit, 20000);

    const url =
      `https://earthquake.usgs.gov/fdsnws/event/1/query` +
      `?format=geojson` +
      `&minmagnitude=${minmag}` +
      `&orderby=time` +
      `&limit=${maxLimit}` +
      `&starttime=${oneDayAgo}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) throw new Error(`USGS ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'USGS verisi alınamadı', detail: String(err) },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
