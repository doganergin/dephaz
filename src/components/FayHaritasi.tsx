'use client';
import { MapContainer, TileLayer, Polyline, Popup, useMap } from 'react-leaflet';

interface FayHatti {
  isim: string;
  renkKodu: string;
  uzunluk: string;
  maksimumMw: string;
  notlar: string;
  koordinatlar: [number, number][];
}

const FAYLAR: FayHatti[] = [
  {
    isim: 'Kuzey Anadolu Fayı (KAF)',
    renkKodu: '#dc2626',
    uzunluk: '~1500 km',
    maksimumMw: 'Mw 7.8',
    notlar: '1999 İzmit ve Düzce depremleri (Mw 7.4–7.2)',
    koordinatlar: [
      [40.02, 43.80], [40.00, 42.00], [39.98, 40.50], [39.95, 38.80],
      [39.85, 37.00], [40.00, 35.50], [40.40, 33.50], [40.60, 32.00],
      [40.80, 30.80], [40.73, 30.00], [40.85, 29.20], [40.77, 28.30],
      [40.70, 27.60], [40.50, 27.00],
    ],
  },
  {
    isim: 'Doğu Anadolu Fayı (DAF)',
    renkKodu: '#ea580c',
    uzunluk: '~600 km',
    maksimumMw: 'Mw 7.8',
    notlar: '2023 Kahramanmaraş depremleri (Mw 7.7–7.8)',
    koordinatlar: [
      [40.02, 43.80], [39.50, 42.50], [38.80, 41.20], [38.20, 40.00],
      [37.80, 39.00], [37.40, 38.20], [37.10, 37.40], [36.90, 36.80],
      [36.70, 36.20], [36.55, 35.80],
    ],
  },
  {
    isim: 'Gediz Grabeni (Ege Fayı)',
    renkKodu: '#7c3aed',
    uzunluk: '~150 km',
    maksimumMw: 'Mw 7.0',
    notlar: '1969 Alaşehir, bölge aktif fay sistemi',
    koordinatlar: [
      [38.95, 26.60], [38.75, 27.00], [38.65, 27.50], [38.55, 28.00],
      [38.50, 28.50], [38.55, 29.20],
    ],
  },
  {
    isim: 'Büyük Menderes Grabeni',
    renkKodu: '#0891b2',
    uzunluk: '~250 km',
    maksimumMw: 'Mw 6.9',
    notlar: 'Aydın, Nazilli, Söke bölgesi aktif sistem',
    koordinatlar: [
      [37.75, 27.00], [37.80, 27.60], [37.85, 28.20], [37.92, 28.80],
      [37.95, 29.20], [38.00, 29.80],
    ],
  },
  {
    isim: 'Küçük Menderes Grabeni',
    renkKodu: '#0e7490',
    uzunluk: '~100 km',
    maksimumMw: 'Mw 6.5',
    notlar: 'Selçuk, Ödemiş bölgesi fay sistemi',
    koordinatlar: [
      [37.95, 27.10], [38.00, 27.50], [38.05, 27.80], [38.10, 28.20],
      [38.15, 28.60],
    ],
  },
  {
    isim: 'Fethiye-Burdur Fayı',
    renkKodu: '#d97706',
    uzunluk: '~280 km',
    maksimumMw: 'Mw 7.0',
    notlar: '1995 Dinar depremi (Mw 6.1)',
    koordinatlar: [
      [36.60, 29.00], [36.90, 29.40], [37.20, 29.70], [37.50, 30.00],
      [37.80, 30.20], [38.00, 30.50], [38.10, 30.60],
    ],
  },
  {
    isim: 'Eskişehir Fayı',
    renkKodu: '#059669',
    uzunluk: '~100 km',
    maksimumMw: 'Mw 6.5',
    notlar: 'KAF kuzey kolu, Eskişehir kentini etkiler',
    koordinatlar: [
      [39.55, 29.80], [39.70, 30.10], [39.80, 30.50], [39.90, 31.00],
    ],
  },
  {
    isim: 'Van Fayı',
    renkKodu: '#be185d',
    uzunluk: '~120 km',
    maksimumMw: 'Mw 7.2',
    notlar: '2011 Van (Mw 7.1) ve Erciş (Mw 7.2) depremleri',
    koordinatlar: [
      [38.20, 43.00], [38.50, 43.30], [38.80, 43.50], [39.10, 43.80],
    ],
  },
];

function BoundsFitter() {
  const map = useMap();
  map.fitBounds([[36.0, 25.5], [42.5, 45.0]], { padding: [10, 10] });
  return null;
}

interface Props {
  lang: 'TR' | 'EN';
  yukseklik?: number;
}

export default function FayHaritasi({ lang, yukseklik = 420 }: Props) {
  const TR = lang === 'TR';

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)]" style={{ height: yukseklik }}>
      <MapContainer
        center={[39, 35]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsFitter />
        {FAYLAR.map((fay) => (
          <Polyline
            key={fay.isim}
            positions={fay.koordinatlar}
            pathOptions={{ color: fay.renkKodu, weight: 3, opacity: 0.85 }}
          >
            <Popup>
              <div style={{ fontSize: '12px', minWidth: '180px' }}>
                <p style={{ fontWeight: 700, color: fay.renkKodu, margin: '0 0 4px' }}>{fay.isim}</p>
                <p style={{ margin: '2px 0', color: '#6b7280' }}>
                  {TR ? 'Uzunluk' : 'Length'}: <strong>{fay.uzunluk}</strong>
                </p>
                <p style={{ margin: '2px 0', color: '#6b7280' }}>
                  {TR ? 'Maks. beklenen' : 'Max expected'}: <strong style={{ color: fay.renkKodu }}>{fay.maksimumMw}</strong>
                </p>
                <p style={{ margin: '4px 0 0', color: '#9ca3af', fontSize: '11px' }}>{fay.notlar}</p>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}

export { FAYLAR };
