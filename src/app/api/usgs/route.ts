import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=6.5&orderby=time&limit=20&starttime=${thirtyDaysAgo}`;

    const res = await fetch(url, {
      next: { revalidate: 600 }, // 10 dk cache
    });

    if (!res.ok) throw new Error(`USGS ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'USGS verisi alınamadı', detail: String(err) },
      { status: 500 }
    );
  }
}
