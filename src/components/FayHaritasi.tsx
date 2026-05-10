'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet';
import { tarihselDepremler } from '@/data/tarihselDepremler';

interface FayHatti {
  isim: string;
  renkKodu: string;
  uzunluk: string;
  maksimumMw: string;
  notlar: string;
  koordinatlar: [number, number][];
}

export const FAYLAR: FayHatti[] = [
  {
    isim: 'Kuzey Anadolu Fayı (KAF)',
    renkKodu: '#ef4444',
    uzunluk: '~1500 km',
    maksimumMw: 'Mw 7.8',
    notlar: '1999 İzmit ve Düzce depremleri (Mw 7.4–7.2)',
    koordinatlar: [
      [40.02, 43.80], [40.00, 42.00], [39.98, 40.50], [39.95, 38.80],
      [39.95, 38.00], [40.10, 37.30], [40.50, 36.80], [40.65, 35.80],
      [40.90, 34.80], [41.00, 34.00], [40.90, 33.20], [40.75, 32.20],
      [40.75, 31.20], [40.73, 30.00], [40.85, 29.20], [40.77, 28.30],
      [40.70, 27.60], [40.50, 27.00],
    ],
  },
  {
    isim: 'Doğu Anadolu Fayı (DAF)',
    renkKodu: '#f97316',
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
    isim: 'Gediz Grabeni',
    renkKodu: '#a855f7',
    uzunluk: '~150 km',
    maksimumMw: 'Mw 7.0',
    notlar: '1969 Alaşehir depremi, bölge aktif fay sistemi',
    koordinatlar: [
      [38.95, 26.60], [38.75, 27.00], [38.65, 27.50], [38.55, 28.00],
      [38.50, 28.50], [38.55, 29.20],
    ],
  },
  {
    isim: 'Büyük Menderes Grabeni',
    renkKodu: '#06b6d4',
    uzunluk: '~250 km',
    maksimumMw: 'Mw 6.9',
    notlar: 'Aydın, Nazilli, Söke bölgesi aktif fay sistemi',
    koordinatlar: [
      [37.75, 27.00], [37.80, 27.60], [37.85, 28.20], [37.92, 28.80],
      [37.95, 29.20], [38.00, 29.80],
    ],
  },
  {
    isim: 'Fethiye-Burdur Fayı',
    renkKodu: '#f59e0b',
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
    renkKodu: '#10b981',
    uzunluk: '~100 km',
    maksimumMw: 'Mw 6.5',
    notlar: 'KAF kuzey kolu, Eskişehir kentini etkiler',
    koordinatlar: [
      [39.55, 29.80], [39.70, 30.10], [39.80, 30.50], [39.90, 31.00],
    ],
  },
  {
    isim: 'Van Fayı',
    renkKodu: '#ec4899',
    uzunluk: '~120 km',
    maksimumMw: 'Mw 7.2',
    notlar: '2011 Van (Mw 7.1) ve Erciş (Mw 7.2) depremleri',
    koordinatlar: [
      [38.20, 43.00], [38.50, 43.30], [38.80, 43.50], [39.10, 43.80],
    ],
  },
];

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(
      document.documentElement.classList.contains('dark') ||
      document.documentElement.classList.contains('black')
    );
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

function magRadius(mag: number): number {
  if (mag >= 7.8) return 14;
  if (mag >= 7.5) return 12;
  if (mag >= 7.0) return 10;
  if (mag >= 6.5) return 8;
  return 6;
}

function magColor(mag: number): string {
  if (mag >= 7.5) return '#7f1d1d';
  if (mag >= 7.0) return '#dc2626';
  if (mag >= 6.5) return '#f97316';
  return '#f59e0b';
}

function TurkeyBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([[36.0, 25.5], [42.5, 45.0]], { padding: [8, 8] });
  }, [map]);
  return null;
}

const BUYUK_DEPREMLER = tarihselDepremler.filter(
  (d) => d.buyukluk >= 6.5 && d.lat && d.lon
);

interface Props {
  lang: 'TR' | 'EN';
  yukseklik?: number;
}

export default function FayHaritasi({ lang, yukseklik = 420 }: Props) {
  const TR = lang === 'TR';
  const dark = useDarkMode();

  const tileUrl = dark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileAttr = dark
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border)]" style={{ height: yukseklik }}>
      <MapContainer
        center={[39, 35]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        key={dark ? 'dark' : 'light'}
      >
        <TileLayer attribution={tileAttr} url={tileUrl} />
        <TurkeyBounds />

        {/* Fault lines — glow layer in dark mode */}
        {FAYLAR.map((fay) => (
          dark ? (
            <Polyline
              key={`glow-${fay.isim}`}
              positions={fay.koordinatlar}
              pathOptions={{ color: fay.renkKodu, weight: 10, opacity: 0.18 }}
            />
          ) : null
        ))}

        {/* Fault lines — main lines */}
        {FAYLAR.map((fay) => (
          <Polyline
            key={fay.isim}
            positions={fay.koordinatlar}
            pathOptions={{
              color: fay.renkKodu,
              weight: dark ? 3.5 : 3,
              opacity: dark ? 0.95 : 0.85,
            }}
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

        {/* Historical earthquake markers */}
        {BUYUK_DEPREMLER.map((dep) => (
          <CircleMarker
            key={dep.id}
            center={[dep.lat, dep.lon]}
            radius={magRadius(dep.buyukluk)}
            pathOptions={{
              color: magColor(dep.buyukluk),
              fillColor: magColor(dep.buyukluk),
              fillOpacity: dark ? 0.85 : 0.75,
              weight: dark ? 1.5 : 1,
            }}
          >
            <Popup>
              <div style={{ fontSize: '12px', minWidth: '190px' }}>
                <p style={{ fontWeight: 700, margin: '0 0 2px', color: magColor(dep.buyukluk), fontSize: '14px' }}>
                  Mw {dep.buyukluk}
                </p>
                <p style={{ fontWeight: 600, margin: '0 0 4px', color: '#111827' }}>{dep.yer}</p>
                <p style={{ margin: '2px 0', color: '#6b7280', fontSize: '11px' }}>{dep.tarih}</p>
                {dep.olum ? (
                  <p style={{ margin: '2px 0', color: '#6b7280', fontSize: '11px' }}>
                    {TR ? 'Can kaybı' : 'Deaths'}: <strong>{dep.olum.toLocaleString('tr-TR')}</strong>
                  </p>
                ) : null}
                <p style={{ margin: '6px 0 0', color: '#374151', fontSize: '11px', lineHeight: '1.4' }}>
                  {dep.ozet.slice(0, 120)}{dep.ozet.length > 120 ? '…' : ''}
                </p>
                <a
                  href={`/tarihsel#${dep.id}`}
                  style={{ display: 'inline-block', marginTop: '6px', color: '#dc2626', fontSize: '11px', fontWeight: 600 }}
                >
                  {TR ? 'Detayları gör →' : 'See details →'}
                </a>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
