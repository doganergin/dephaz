'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { haberler } from '@/data/haberler';

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
  properties: { mag: number; place: string; time: number };
  geometry: { coordinates: [number, number, number] };
}

export interface MapDeprem {
  buyukluk: number; konum: string; tarih: string;
  lat: number; lon: number; derinlik: number;
  kaynak: 'kandilli' | 'usgs' | 'afad';
}

function buyuklukRenk(mag: number): string {
  if (mag >= 7) return '#7F1D1D';
  if (mag >= 6) return '#EF4444';
  if (mag >= 5) return '#F97316';
  if (mag >= 4) return '#F59E0B';
  if (mag >= 3) return '#10B981';
  return '#9CA3AF';
}

export default function HaritaSayfasi() {
  const { t } = useLanguage();

  const [anaTab, setAnaTab] = useState<'turkiye' | 'dunya'>('turkiye');
  const [trKaynak, setTrKaynak] = useState<'kandilli' | 'afad' | 'usgs'>('kandilli');
  const [kucukGoster, setKucukGoster] = useState(false);

  const [kandilliDepremler, setKandilliDepremler] = useState<MapDeprem[]>([]);
  const [afadDepremler, setAfadDepremler] = useState<MapDeprem[]>([]);
  const [usgsTrDepremler, setUsgsTrDepremler] = useState<MapDeprem[]>([]);
  const [usgsDepremler, setUsgsDepremler] = useState<MapDeprem[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaynakDurum, setKaynakDurum] = useState({ kandilli: false, afad: false, usgsTr: false });

  useEffect(() => {
    async function fetchData() {
      setYukleniyor(true);

      const [kandilliRes, afadRes, usgsTrRes, usgsRes] = await Promise.allSettled([
        fetch('/api/kandilli?limit=500&minmag=1.0'),
        fetch('/api/afad?limit=500&minmag=1.0'),
        fetch('/api/kandilli?limit=500&minmag=1.0&source=usgs'),
        fetch('/api/usgs'),
      ]);

      const durum = { kandilli: false, afad: false, usgsTr: false };

      if (kandilliRes.status === 'fulfilled' && kandilliRes.value.ok) {
        const data = await kandilliRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          durum.kandilli = true;
          setKandilliDepremler(
            data
              .filter((d: MapDeprem & { enlem?: number; boylam?: number }) => (d.lat ?? d.enlem) && (d.lon ?? d.boylam))
              .map((d: MapDeprem & { enlem?: number; boylam?: number; saat?: string }) => ({
                buyukluk: d.buyukluk,
                konum: d.konum,
                tarih: d.saat ? `${d.tarih} ${d.saat}` : d.tarih,
                lat: d.lat ?? d.enlem ?? 0,
                lon: d.lon ?? d.boylam ?? 0,
                derinlik: d.derinlik,
                kaynak: 'kandilli' as const,
              }))
          );
        }
      }

      if (afadRes.status === 'fulfilled' && afadRes.value.ok) {
        const data = await afadRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          durum.afad = true;
          setAfadDepremler(
            data
              .filter((d: MapDeprem & { enlem?: number; boylam?: number }) => (d.lat ?? d.enlem) && (d.lon ?? d.boylam))
              .map((d: MapDeprem & { enlem?: number; boylam?: number }) => ({
                buyukluk: d.buyukluk,
                konum: d.konum,
                tarih: d.tarih,
                lat: d.lat ?? d.enlem ?? 0,
                lon: d.lon ?? d.boylam ?? 0,
                derinlik: d.derinlik,
                kaynak: 'afad' as const,
              }))
          );
        }
      }

      if (usgsTrRes.status === 'fulfilled' && usgsTrRes.value.ok) {
        const data = await usgsTrRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          durum.usgsTr = true;
          setUsgsTrDepremler(
            data
              .filter((d: MapDeprem & { enlem?: number; boylam?: number }) => (d.lat ?? d.enlem) && (d.lon ?? d.boylam))
              .map((d: MapDeprem & { enlem?: number; boylam?: number; saat?: string }) => ({
                buyukluk: d.buyukluk,
                konum: d.konum,
                tarih: d.saat ? `${d.tarih} ${d.saat}` : d.tarih,
                lat: d.lat ?? d.enlem ?? 0,
                lon: d.lon ?? d.boylam ?? 0,
                derinlik: d.derinlik,
                kaynak: 'usgs' as const,
              }))
          );
        }
      }

      if (usgsRes.status === 'fulfilled' && usgsRes.value.ok) {
        const data = await usgsRes.value.json();
        if (data.features) {
          setUsgsDepremler(
            (data.features as USGSFeature[]).map((f) => ({
              buyukluk: f.properties.mag,
              konum: f.properties.place,
              tarih: new Date(f.properties.time).toLocaleString('tr-TR'),
              lat: f.geometry.coordinates[1],
              lon: f.geometry.coordinates[0],
              derinlik: f.geometry.coordinates[2],
              kaynak: 'usgs' as const,
            }))
          );
        }
      }

      setKaynakDurum(durum);
      setYukleniyor(false);
    }
    fetchData();
  }, []);

  const kaynakDepremler =
    anaTab === 'dunya' ? usgsDepremler :
    trKaynak === 'afad' ? afadDepremler :
    trKaynak === 'usgs' ? usgsTrDepremler :
    kandilliDepremler;

  const aktifDepremler = kucukGoster
    ? kaynakDepremler
    : kaynakDepremler.filter((d) => d.buyukluk >= 4.0);

  const kaynakEtiketi =
    anaTab === 'dunya' ? 'USGS' :
    trKaynak === 'afad' ? 'AFAD' :
    trKaynak === 'usgs' ? 'USGS' : 'Kandilli / USGS';

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t('haritaTitle')}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">
          {anaTab === 'turkiye'
            ? `${kaynakEtiketi} · Son 90 gün · ${kucukGoster ? 'Tüm büyüklükler' : 'M4.0+'}`
            : 'USGS · Son 90 gün · M6.5+'}
        </p>
      </div>

      {/* Ana sekmeler */}
      <div className="flex gap-0 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        {[
          { key: 'turkiye' as const, label: t('haritaTurkiye'), icon: '🇹🇷' },
          { key: 'dunya' as const, label: t('haritaDunya'), icon: '🌍' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setAnaTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-colors ${
              anaTab === tab.key
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Türkiye alt kaynak seçimi */}
      {anaTab === 'turkiye' && (
        <div className="flex gap-1.5 items-center flex-wrap">
          <span className="text-[10px] text-[var(--muted)] font-semibold uppercase mr-1">Kaynak:</span>
          {([
            { key: 'kandilli' as const, label: 'Kandilli', ok: kaynakDurum.kandilli },
            { key: 'afad' as const, label: 'AFAD', ok: kaynakDurum.afad },
            { key: 'usgs' as const, label: 'USGS', ok: kaynakDurum.usgsTr },
          ]).map((k) => (
            <button
              key={k.key}
              onClick={() => setTrKaynak(k.key)}
              className={`px-3 py-1 text-[11px] font-semibold rounded-full border transition-colors ${
                trKaynak === k.key
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]'
              }`}
            >
              {k.label}
              {!yukleniyor && (
                <span className={`ml-1 ${k.ok ? 'text-green-400' : 'text-red-400'}`}>
                  {k.ok ? '●' : '○'}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => setKucukGoster(!kucukGoster)}
            className={`ml-auto px-3 py-1 text-[11px] font-semibold rounded-full border transition-colors ${
              kucukGoster
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)]'
            }`}
          >
            {kucukGoster ? 'M4.0 altı gizle' : 'M4.0 altını göster'}
          </button>
        </div>
      )}

      {/* İstatistikler */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Toplam', value: yukleniyor ? '…' : String(aktifDepremler.length) },
          {
            label: 'Max Büyüklük',
            value: yukleniyor ? '…' : (aktifDepremler.length ? Math.max(...aktifDepremler.map((d) => d.buyukluk)).toFixed(1) : '—'),
          },
          { label: 'Kaynak', value: kaynakEtiketi },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center">
            <p className="text-[10px] text-[var(--muted)]">{s.label}</p>
            <p className="text-sm font-bold text-[var(--foreground)] mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Harita */}
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm" style={{ height: '420px' }}>
        {yukleniyor ? (
          <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col items-center gap-3 text-sm text-[var(--muted)]">
              <div className="w-6 h-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              <span>{t('haritaYukleniyor')}</span>
              <span className="text-[11px]">Kandilli, AFAD ve USGS verileri alınıyor…</span>
            </div>
          </div>
        ) : aktifDepremler.length === 0 ? (
          <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800">
            <div className="text-center text-sm text-[var(--muted)]">
              <p className="font-semibold mb-1">Veri bulunamadı</p>
              <p className="text-[11px]">Bu kaynak şu an erişilebilir değil veya filtre çok kısıtlayıcı.</p>
              {!kucukGoster && (
                <button
                  onClick={() => setKucukGoster(true)}
                  className="mt-2 px-3 py-1 text-[11px] bg-amber-500 text-white rounded-full"
                >
                  Tüm büyüklükleri göster
                </button>
              )}
            </div>
          </div>
        ) : (
          <DepremHaritasi
            depremler={aktifDepremler}
            merkez={anaTab === 'turkiye' ? [39, 35] : [20, 0]}
            zoom={anaTab === 'turkiye' ? 6 : 2}
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
            { renk: '#9CA3AF', label: 'M<3' },
            { renk: '#10B981', label: 'M3–4' },
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
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-3">
            Son Depremler ({aktifDepremler.length})
          </p>
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
                  <p className="text-[11px] text-[var(--muted)]">{d.tarih} · {d.derinlik?.toFixed(0)} km · {d.kaynak}</p>
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
