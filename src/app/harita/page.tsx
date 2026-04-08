'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const MAX_DEPREM = 100;  // listede tutulacak max kayıt
const YENILEME_SN = 60; // kaç saniyede bir yenile

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
  const [trKucukGoster, setTrKucukGoster] = useState(false);
  const [dunyaKucukGoster, setDunyaKucukGoster] = useState(true);
  const kucukGoster = anaTab === 'turkiye' ? trKucukGoster : dunyaKucukGoster;

  const [kandilliDepremler, setKandilliDepremler] = useState<MapDeprem[]>([]);
  const [afadDepremler, setAfadDepremler] = useState<MapDeprem[]>([]);
  const [usgsTrDepremler, setUsgsTrDepremler] = useState<MapDeprem[]>([]);
  const [usgsDepremler, setUsgsDepremler] = useState<MapDeprem[]>([]);       // M4.5+
  const [usgsDepremlerTam, setUsgsDepremlerTam] = useState<MapDeprem[]>([]); // M2.5+
  const [yukleniyor, setYukleniyor] = useState(true);
  const [sonGuncelleme, setSonGuncelleme] = useState<Date | null>(null);
  const [geriSayim, setGeriSayim] = useState(YENILEME_SN);
  const [kaynakDurum, setKaynakDurum] = useState({ kandilli: false, afad: false, usgsTr: false });

  useEffect(() => {
    async function fetchData(ilk = false) {
      if (ilk) setYukleniyor(true);

      const [kandilliRes, afadRes, usgsTrRes, usgsRes, usgsTamRes] = await Promise.allSettled([
        fetch('/api/kandilli?limit=500&minmag=1.0'),
        fetch('/api/afad?limit=500&minmag=1.0'),
        fetch('/api/kandilli?limit=500&minmag=1.0&source=usgs'),
        fetch('/api/usgs?minmag=4.5&limit=200'),
        fetch('/api/usgs?minmag=2.5&limit=500'),
      ]);

      const durum = { kandilli: false, afad: false, usgsTr: false };

      type RawD = MapDeprem & { enlem?: number; boylam?: number; saat?: string };

      const normalize = (d: RawD, kaynak: MapDeprem['kaynak']): MapDeprem => ({
        buyukluk: d.buyukluk,
        konum: d.konum,
        tarih: d.saat ? `${d.tarih} ${d.saat}` : d.tarih,
        lat: d.lat ?? d.enlem ?? 0,
        lon: d.lon ?? d.boylam ?? 0,
        derinlik: d.derinlik,
        kaynak,
      });

      if (kandilliRes.status === 'fulfilled' && kandilliRes.value.ok) {
        const data: RawD[] = await kandilliRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          durum.kandilli = true;
          setKandilliDepremler(
            data.filter((d) => (d.lat ?? d.enlem) && (d.lon ?? d.boylam))
              .map((d) => normalize(d, 'kandilli')).slice(0, MAX_DEPREM)
          );
        }
      }

      if (afadRes.status === 'fulfilled' && afadRes.value.ok) {
        const data: RawD[] = await afadRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          durum.afad = true;
          setAfadDepremler(
            data.filter((d) => (d.lat ?? d.enlem) && (d.lon ?? d.boylam))
              .map((d) => normalize(d, 'afad')).slice(0, MAX_DEPREM)
          );
        }
      }

      if (usgsTrRes.status === 'fulfilled' && usgsTrRes.value.ok) {
        const data: RawD[] = await usgsTrRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          durum.usgsTr = true;
          setUsgsTrDepremler(
            data.filter((d) => (d.lat ?? d.enlem) && (d.lon ?? d.boylam))
              .map((d) => normalize(d, 'usgs')).slice(0, MAX_DEPREM)
          );
        }
      }

      const parseUsgs = (features: USGSFeature[]): MapDeprem[] =>
        features.map((f) => ({
          buyukluk: f.properties.mag,
          konum: f.properties.place,
          tarih: new Date(f.properties.time).toLocaleString('tr-TR'),
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
          derinlik: f.geometry.coordinates[2],
          kaynak: 'usgs' as const,
        })).slice(0, MAX_DEPREM);

      if (usgsRes.status === 'fulfilled' && usgsRes.value.ok) {
        const data = await usgsRes.value.json();
        if (data.features) setUsgsDepremler(parseUsgs(data.features));
      }

      if (usgsTamRes.status === 'fulfilled' && usgsTamRes.value.ok) {
        const data = await usgsTamRes.value.json();
        if (data.features) setUsgsDepremlerTam(parseUsgs(data.features));
      }

      setKaynakDurum(durum);
      setSonGuncelleme(new Date());
      setGeriSayim(YENILEME_SN);
      if (ilk) setYukleniyor(false);
    }

    fetchData(true);
    const interval = setInterval(() => fetchData(false), YENILEME_SN * 1000);

    // Geri sayım göstergesi
    const countdown = setInterval(() => {
      setGeriSayim((s) => (s <= 1 ? YENILEME_SN : s - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  const kaynakDepremler =
    anaTab === 'dunya' ? (dunyaKucukGoster ? usgsDepremlerTam : usgsDepremler) :
    trKaynak === 'afad' ? afadDepremler :
    trKaynak === 'usgs' ? usgsTrDepremler :
    kandilliDepremler;

  const aktifDepremler = (anaTab === 'turkiye' && !trKucukGoster)
    ? kaynakDepremler.filter((d) => d.buyukluk >= 4.0)
    : kaynakDepremler;

  const kaynakEtiketi =
    anaTab === 'dunya' ? 'USGS' :
    trKaynak === 'afad' ? 'AFAD' :
    trKaynak === 'usgs' ? 'USGS' : 'Kandilli / USGS';

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t('haritaTitle')}</h1>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-sm text-[var(--muted)]">
            {kaynakEtiketi} · Son 90 gün · {kucukGoster ? 'Tüm büyüklükler' : 'M4.0+'}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
            {sonGuncelleme && (
              <span>{sonGuncelleme.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            )}
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {geriSayim}s
            </span>
          </div>
        </div>
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

      {/* Dünya alt kontrolleri */}
      {anaTab === 'dunya' && (
        <div className="flex gap-1.5 items-center flex-wrap">
          <button
            onClick={() => setDunyaKucukGoster(!dunyaKucukGoster)}
            className={`ml-auto px-3 py-1 text-[11px] font-semibold rounded-full border transition-colors ${
              dunyaKucukGoster
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)]'
            }`}
          >
            {dunyaKucukGoster ? 'M4.0 altı gizle' : 'M4.0 altını göster'}
          </button>
        </div>
      )}

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
            onClick={() => setTrKucukGoster(!trKucukGoster)}
            className={`ml-auto px-3 py-1 text-[11px] font-semibold rounded-full border transition-colors ${
              trKucukGoster
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)]'
            }`}
          >
            {trKucukGoster ? 'M4.0 altı gizle' : 'M4.0 altını göster'}
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
                  onClick={() => anaTab === 'turkiye' ? setTrKucukGoster(true) : setDunyaKucukGoster(true)}
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

      {/* Uzman Görüşleri yönlendirme */}
      <Link href="/uzman"
        className="flex items-center justify-between bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4 hover:border-red-300 transition-colors">
        <div>
          <p className="text-xs font-bold text-[var(--foreground)]">Uzman Görüşleri</p>
          <p className="text-[11px] text-[var(--muted)] mt-0.5">Bilimsel değerlendirmeler ve uzman analizleri</p>
        </div>
        <span className="text-[var(--muted)] text-sm">→</span>
      </Link>
    </div>
  );
}
