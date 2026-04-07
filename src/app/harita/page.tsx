'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { haberler } from '@/data/haberler';

// Leaflet SSR fix
const DepremHaritasi = dynamic(() => import('@/components/DepremHaritasi'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[400px] bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
        Harita yükleniyor...
      </div>
    </div>
  ),
});

interface USGSFeature {
  properties: {
    mag: number;
    place: string;
    time: number;
    depth?: number;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}

interface KandilliDeprem {
  buyukluk: number;
  konum: string;
  tarih: string;
  saat: string;
  enlem: number;
  boylam: number;
  derinlik: number;
}

export interface MapDeprem {
  buyukluk: number;
  konum: string;
  tarih: string;
  lat: number;
  lon: number;
  derinlik: number;
  kaynak: 'kandilli' | 'usgs' | 'afad';
}

function buyuklukRenk(mag: number): string {
  if (mag >= 7) return '#7F1D1D';
  if (mag >= 6) return '#EF4444';
  if (mag >= 5) return '#F97316';
  if (mag >= 4) return '#F59E0B';
  return '#10B981';
}

export default function HaritaSayfasi() {
  const { t } = useLanguage();
  const [kandilliDepremler, setKandilliDepremler] = useState<MapDeprem[]>([]);
  const [usgsDepremler, setUSGSDepremler] = useState<MapDeprem[]>([]);
  const [afadDepremler, setAfadDepremler] = useState<MapDeprem[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');
  const [aktifTab, setAktifTab] = useState<'turkiye' | 'afad' | 'dunya'>('turkiye');

  useEffect(() => {
    async function fetchData() {
      setYukleniyor(true);
      setHata('');
      try {
        // Kandilli, USGS ve AFAD paralel çek
        const [kandilliRes, usgsRes, afadRes] = await Promise.allSettled([
          fetch('/api/kandilli?limit=200'),
          fetch('/api/usgs'),
          fetch('/api/afad?limit=100&minmag=3.5'),
        ]);

        // Kandilli
        if (kandilliRes.status === 'fulfilled' && kandilliRes.value.ok) {
          const data: KandilliDeprem[] = await kandilliRes.value.json();
          setKandilliDepremler(
            data
              .filter((d) => d.enlem && d.boylam)
              .map((d) => ({
                buyukluk: d.buyukluk,
                konum: d.konum,
                tarih: `${d.tarih} ${d.saat}`,
                lat: d.enlem,
                lon: d.boylam,
                derinlik: d.derinlik,
                kaynak: 'kandilli',
              }))
          );
        }

        // USGS
        if (usgsRes.status === 'fulfilled' && usgsRes.value.ok) {
          const data = await usgsRes.value.json();
          if (data.features) {
            setUSGSDepremler(
              (data.features as USGSFeature[]).map((f) => ({
                buyukluk: f.properties.mag,
                konum: f.properties.place,
                tarih: new Date(f.properties.time).toLocaleString('tr-TR'),
                lat: f.geometry.coordinates[1],
                lon: f.geometry.coordinates[0],
                derinlik: f.geometry.coordinates[2],
                kaynak: 'usgs',
              }))
            );
          }
        }
        // AFAD
        if (afadRes.status === 'fulfilled' && afadRes.value.ok) {
          const data = await afadRes.value.json();
          if (Array.isArray(data)) {
            setAfadDepremler(
              data.map((d: { buyukluk: number; konum: string; tarih: string; enlem: number; boylam: number; derinlik: number }) => ({
                buyukluk: d.buyukluk,
                konum: d.konum,
                tarih: d.tarih,
                lat: d.enlem,
                lon: d.boylam,
                derinlik: d.derinlik,
                kaynak: 'afad' as const,
              }))
            );
          }
        }
      } catch (e) {
        setHata('Veriler alınamadı: ' + String(e));
      } finally {
        setYukleniyor(false);
      }
    }
    fetchData();
  }, []);

  const aktifDepremler =
    aktifTab === 'turkiye' ? kandilliDepremler :
    aktifTab === 'afad' ? afadDepremler :
    usgsDepremler;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t('haritaTitle')}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">
          {aktifTab === 'turkiye' ? 'Kandilli / USGS · Son 90 gün · M3.5+' :
           aktifTab === 'afad' ? 'AFAD · Son depremler · M3.5+' :
           'USGS · Son 90 gün · M6.5+'}
        </p>
      </div>

      {/* Tab seçici */}
      <div className="flex gap-0 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        {[
          { key: 'turkiye' as const, label: t('haritaTurkiye'), icon: '🇹🇷' },
          { key: 'afad' as const, label: 'AFAD', icon: '📡' },
          { key: 'dunya' as const, label: t('haritaDunya'), icon: '🌍' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setAktifTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-colors ${
              aktifTab === tab.key
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Toplam', value: String(aktifDepremler.length) },
          { label: 'Max Büyüklük', value: aktifDepremler.length ? Math.max(...aktifDepremler.map(d => d.buyukluk)).toFixed(1) : '—' },
          { label: 'Kaynak', value: aktifTab === 'turkiye' ? 'USGS/Kandilli' : aktifTab === 'afad' ? 'AFAD' : 'USGS' },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center">
            <p className="text-[10px] text-[var(--muted)]">{s.label}</p>
            <p className="text-sm font-bold text-[var(--foreground)] mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Hata */}
      {hata && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 rounded-xl p-3 text-sm text-red-600">{hata}</div>
      )}

      {/* Harita */}
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm" style={{ height: '420px' }}>
        {yukleniyor ? (
          <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              {t('haritaYukleniyor')}
            </div>
          </div>
        ) : (
          <DepremHaritasi
            depremler={aktifDepremler}
            merkez={aktifTab === 'turkiye' ? [39, 35] : [20, 0]}
            zoom={aktifTab === 'turkiye' ? 6 : 2}
            buyuklukRenk={buyuklukRenk}
            tLabels={{ buyukluk: t('haritaPopupBuyukluk'), tarih: t('haritaPopupTarih'), derinlik: t('haritaPopupDerinlik') }}
          />
        )}
      </div>

      {/* Renk açıklaması */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
        <p className="text-[10px] font-semibold text-[var(--muted)] uppercase mb-2">Büyüklük / Renk</p>
        <div className="flex flex-wrap gap-3">
          {[
            { renk: '#10B981', label: 'M3.5–4' },
            { renk: '#F59E0B', label: 'M4–5' },
            { renk: '#F97316', label: 'M5–6' },
            { renk: '#EF4444', label: 'M6–7' },
            { renk: '#7F1D1D', label: 'M7+' },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.renk }} />
              <span className="text-[11px] text-[var(--foreground)]">{r.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Liste */}
      {aktifDepremler.length > 0 && (
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-3">Son Depremler</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {aktifDepremler.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[var(--border)] last:border-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 text-white"
                  style={{ backgroundColor: buyuklukRenk(d.buyukluk) }}
                >
                  {d.buyukluk.toFixed(1)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--foreground)] truncate">{d.konum}</p>
                  <p className="text-[11px] text-[var(--muted)]">{d.tarih} · {d.derinlik?.toFixed(0)} km</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uzman Değerlendirmeleri */}
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">Uzman Değerlendirmeleri</p>
          <span className="text-[10px] text-[var(--muted)]">Bilimsel Kaynaklar</span>
        </div>
        <div className="space-y-3">
          {haberler.map((h, i) => (
            <div key={i} className="border border-[var(--border)] rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-start gap-2 mb-1.5">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[var(--foreground)]">{h.uzman}</p>
                  <p className="text-[11px] text-[var(--muted)]">{h.unvan} · {h.kurum}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    h.kaynak_tur === 'doi' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                  }`}>
                    {h.kaynak_tur === 'doi' ? 'DOI' : h.kaynak_tur === 'kurum' ? 'Resmi' : 'Üniv.'}
                  </span>
                  <span className="text-[10px] text-[var(--muted)]">{h.tarih}</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-[var(--foreground)] mb-1">{h.baslik}</p>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">{h.ozet}</p>
              <a href={h.kaynak} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-blue-500 hover:underline mt-1.5 block">
                Kaynağa git →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
