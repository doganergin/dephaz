import { NextResponse } from 'next/server';

interface USGSFeature {
  properties: { mag: number; place: string; time: number };
  geometry: { coordinates: [number, number, number] };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const il = searchParams.get('il');
  const ilce = searchParams.get('ilce');

  if (!il) {
    return NextResponse.json({ error: 'il parametresi gerekli' }, { status: 400 });
  }

  try {
    // Nominatim ile koordinat al (ilçe varsa önce ilçe+il dene, sonra sadece il)
    const sorgu = ilce ? `${ilce}, ${il}, Türkiye` : `${il}, Türkiye`;
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(sorgu)}&format=json&limit=1&countrycodes=tr`,
      {
        headers: { 'User-Agent': 'DepHaz/1.0 (deprem-hazirlik-rehberi)' },
        next: { revalidate: 86400 }, // 24 saat cache — koordinatlar değişmez
      }
    );

    if (!geoRes.ok) throw new Error('Konum servisi yanıt vermedi');

    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error(`'${sorgu}' konumu bulunamadı`);

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    // USGS FDSN — 100km çapı, M3.5+, tüm zamanlar, en yeni 100 deprem
    const usgsUrl =
      `https://earthquake.usgs.gov/fdsnws/event/1/query` +
      `?format=geojson` +
      `&latitude=${lat}` +
      `&longitude=${lon}` +
      `&maxradiuskm=100` +
      `&minmagnitude=3.5` +
      `&orderby=time` +
      `&limit=100`;

    const usgsRes = await fetch(usgsUrl, {
      next: { revalidate: 3600 }, // 1 saat cache
    });

    if (!usgsRes.ok) throw new Error(`USGS hata: ${usgsRes.status}`);

    const usgsData = await usgsRes.json();

    const depremler = (usgsData.features as USGSFeature[]).map((f) => ({
      buyukluk: f.properties.mag,
      baslik: f.properties.place,
      tarih: new Date(f.properties.time).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      derinlik: Math.round(f.geometry.coordinates[2]),
    }));

    return NextResponse.json({ depremler, lat, lon });
  } catch (err) {
    return NextResponse.json(
      { error: 'Deprem verisi alınamadı', detail: String(err) },
      { status: 500 }
    );
  }
}
