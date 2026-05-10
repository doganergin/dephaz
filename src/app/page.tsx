'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';

const FayHaritasi = dynamic(() => import('@/components/FayHaritasi'), { ssr: false });

interface LatestEq { buyukluk: number; konum: string; tarih: string; derinlik: number; kaynak?: string; }

export default function HomePage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const [eqTab, setEqTab] = useState<'tr' | 'world' | 'fay'>('tr');
  const [trEqs, setTrEqs] = useState<LatestEq[]>([]);
  const [worldEqs, setWorldEqs] = useState<LatestEq[]>([]);
  const [eqLoading, setEqLoading] = useState(true);

  useEffect(() => {
    async function fetchEqs() {
      const [kandilliRes, afadRes, usgsRes] = await Promise.allSettled([
        fetch('/api/kandilli?limit=20'),
        fetch('/api/afad?limit=20&minmag=3.5'),
        fetch('/api/usgs'),
      ]);
      const combined: LatestEq[] = [];
      if (kandilliRes.status === 'fulfilled' && kandilliRes.value.ok) {
        const d: Array<{ buyukluk: number; konum: string; tarih: string; saat?: string; derinlik: number }> = await kandilliRes.value.json();
        if (Array.isArray(d)) combined.push(...d.map((x) => ({
          buyukluk: x.buyukluk, konum: x.konum,
          tarih: x.saat ? `${x.tarih} ${x.saat}` : x.tarih,
          derinlik: x.derinlik, kaynak: 'Kandilli',
        })));
      }
      if (afadRes.status === 'fulfilled' && afadRes.value.ok) {
        const d: Array<{ buyukluk: number; konum: string; tarih: string; derinlik: number }> = await afadRes.value.json();
        if (Array.isArray(d)) combined.push(...d.map((x) => ({
          buyukluk: x.buyukluk, konum: x.konum, tarih: x.tarih, derinlik: x.derinlik, kaynak: 'AFAD',
        })));
      }
      setTrEqs(combined.sort((a, b) => b.tarih.localeCompare(a.tarih)).slice(0, 10));
      if (usgsRes.status === 'fulfilled' && usgsRes.value.ok) {
        const d = await usgsRes.value.json();
        if (d.features) {
          setWorldEqs(d.features.slice(0, 10).map((f: { properties: { mag: number; place: string; time: number }; geometry: { coordinates: [number, number, number] } }) => ({
            buyukluk: f.properties.mag,
            konum: f.properties.place,
            tarih: new Date(f.properties.time).toLocaleString('tr-TR'),
            derinlik: Math.round(f.geometry.coordinates[2]),
            kaynak: 'USGS',
          })));
        }
      }
      setEqLoading(false);
    }
    fetchEqs();
  }, []);

  const features = TR ? [
    { href: '/bolge-analizi', icon: '🗺️', title: 'Bölge Analizi', desc: 'İl, ilçe ve mahalle seçerek fay mesafesi, zemin yapısı ve deprem risk skorunu öğrenin.', color: 'red' },
    { href: '/harita', icon: '🌍', title: 'Canlı Deprem Haritası', desc: 'Kandilli, AFAD ve USGS verilerini gerçek zamanlı haritada izleyin.', color: 'blue' },
    { href: '/tarihsel', icon: '📜', title: 'Tarihsel Depremler', desc: "Osmanlı'dan günümüze Türkiye'nin büyük deprem tarihini inceleyin.", color: 'purple' },
    { href: '/uzman', icon: '🔬', title: 'Uzman Görüşleri', desc: 'Seismologların ve jeologların bilimsel değerlendirmelerini okuyun.', color: 'green' },
    { href: '/canta', icon: '🎒', title: 'Deprem Çantası', desc: '72 saatlik acil durum çantası için kontrol listesi oluşturun.', color: 'amber' },
    { href: '/aile-plani', icon: '👨‍👩‍👧', title: 'Aile Planı', desc: 'Toplanma noktası ve acil iletişim planı hazırlayın.', color: 'orange' },
  ] : [
    { href: '/bolge-analizi', icon: '🗺️', title: 'Risk Analysis', desc: 'Select province, district and neighbourhood to find fault distance, soil type, and risk score.', color: 'red' },
    { href: '/harita', icon: '🌍', title: 'Live Earthquake Map', desc: 'Monitor Kandilli, AFAD and USGS data on a real-time interactive map.', color: 'blue' },
    { href: '/tarihsel', icon: '📜', title: 'Historical Earthquakes', desc: "Explore Turkey's major earthquake history from the Ottoman era to the present.", color: 'purple' },
    { href: '/uzman', icon: '🔬', title: 'Expert Opinions', desc: 'Read scientific assessments from seismologists and geologists.', color: 'green' },
    { href: '/canta', icon: '🎒', title: 'Emergency Kit', desc: 'Build a 72-hour emergency supply checklist for your household.', color: 'amber' },
    { href: '/aile-plani', icon: '👨‍👩‍👧', title: 'Family Plan', desc: 'Set up a meeting point and emergency contact plan with your family.', color: 'orange' },
  ];

  const colorMap: Record<string, { card: string; icon: string; label: string }> = {
    red:    { card: 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30',       icon: 'bg-red-100 dark:bg-red-900/30 text-red-600',       label: 'text-red-700 dark:text-red-400' },
    blue:   { card: 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30',   icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',    label: 'text-blue-700 dark:text-blue-400' },
    purple: { card: 'bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/30', icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', label: 'text-purple-700 dark:text-purple-400' },
    green:  { card: 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30', icon: 'bg-green-100 dark:bg-green-900/30 text-green-600', label: 'text-green-700 dark:text-green-400' },
    amber:  { card: 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30', icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', label: 'text-amber-700 dark:text-amber-400' },
    orange: { card: 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30', icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600', label: 'text-orange-700 dark:text-orange-400' },
  };

  const articles = [
    { href: '/deprem-nedir',           tr: 'Deprem Nedir? Nasıl Oluşur?',           en: 'What Is an Earthquake?' },
    { href: '/depreme-hazirlik',       tr: 'Depreme Hazırlık Rehberi',               en: 'Earthquake Preparedness Guide' },
    { href: '/deprem-aninda',          tr: 'Deprem Anında Ne Yapmalı?',               en: 'What to Do in an Earthquake?' },
    { href: '/turkiyede-deprem-riski', tr: "Türkiye'de Deprem Riski",                en: 'Earthquake Risk in Turkey' },
    { href: '/fay-hatlari',            tr: 'Türkiye\'deki Fay Hatları',              en: 'Fault Lines in Turkey' },
    { href: '/zemin-tipleri',          tr: 'Zemin Tipleri ve Deprem Riski',          en: 'Soil Types and Earthquake Risk' },
    { href: '/deprem-cantasi-rehberi', tr: '72 Saatlik Deprem Çantası Rehberi',      en: '72-Hour Earthquake Kit Guide' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="text-center pt-1 pb-2">
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
          {TR ? 'Türkiye Deprem Bilgi Platformu' : 'Turkey Earthquake Information Platform'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          {TR ? 'Bölgenizi Tanıyın,\nHazırlıklı Olun' : 'Know Your Region,\nStay Prepared'}
        </h1>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          {TR
            ? 'Bilimsel verilerle desteklenen deprem risk analizi, canlı deprem takibi ve hazırlık rehberleri.'
            : 'Science-backed earthquake risk analysis, live tracking and preparedness guides for Turkey.'}
        </p>
      </div>

      {/* Primary CTA */}
      <Link
        href="/bolge-analizi"
        className="flex items-center justify-between bg-[var(--card-bg)] border border-red-500/40 hover:border-red-500 rounded-2xl p-4 transition-colors group"
      >
        <div>
          <p className="font-bold text-sm text-red-500 group-hover:text-red-400 transition-colors">{TR ? 'Bölge Riski Analizi Yap' : 'Run Risk Analysis'}</p>
          <p className="text-[11px] text-[var(--muted)] mt-0.5">
            {TR ? 'İl ve ilçenizi seçin, risk skorunuzu öğrenin' : 'Select your province and district, find your risk score'}
          </p>
        </div>
        <span className="text-2xl shrink-0">🗺️</span>
      </Link>

      {/* Features grid — 2-col mobile, 3-col desktop */}
      <div>
        <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">
          {TR ? 'Tüm Özellikler' : 'All Features'}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => {
            const c = colorMap[f.color];
            return (
              <Link
                key={f.href}
                href={f.href}
                className={`border rounded-2xl p-3.5 flex flex-col gap-2 hover:shadow-sm transition-shadow ${c.card}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${c.icon}`}>
                  {f.icon}
                </div>
                <p className={`text-xs font-bold leading-snug ${c.label}`}>{f.title}</p>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">{f.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Latest Earthquakes + Knowledge Guide — side by side on desktop */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-5 space-y-6 lg:space-y-0">

      {/* Latest Earthquakes */}
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4 lg:col-span-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">
            {TR ? 'Son Depremler' : 'Latest Earthquakes'}
          </p>
          <Link href="/harita" className="text-[11px] text-red-500 hover:underline">
            {TR ? 'Tümünü Gör →' : 'See all →'}
          </Link>
        </div>
        <div className="flex gap-0 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-3">
          {([
            { key: 'tr' as const, label: `🇹🇷 ${TR ? 'Türkiye' : 'Turkey'}` },
            { key: 'world' as const, label: `🌍 ${TR ? 'Dünya' : 'World'}` },
            { key: 'fay' as const, label: `📍 ${TR ? 'Fay Haritası' : 'Fault Map'}` },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setEqTab(tab.key)}
              className={`flex-1 py-2 text-[11px] font-semibold transition-colors ${
                eqTab === tab.key
                  ? 'bg-white dark:bg-gray-600 text-red-600 shadow-sm rounded-xl'
                  : 'text-[var(--muted)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {eqTab === 'fay' ? (
          <div>
            <FayHaritasi lang={lang} yukseklik={280} />
            <p className="text-[10px] text-[var(--muted)] mt-1.5">
              {TR ? 'Fay hatlarına tıklayın · ' : 'Click fault lines for details · '}
              <Link href="/fay-hatlari" className="text-red-500 hover:underline">
                {TR ? 'Detaylı bilgi →' : 'Learn more →'}
              </Link>
            </p>
          </div>
        ) : eqLoading ? (
          <div className="flex items-center justify-center py-6 gap-2 text-[var(--muted)]">
            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">{TR ? 'Yükleniyor...' : 'Loading...'}</span>
          </div>
        ) : (
          <div className="space-y-2 max-h-[216px] overflow-y-auto">
            {(eqTab === 'tr' ? trEqs : worldEqs).length === 0 ? (
              <p className="text-xs text-[var(--muted)] text-center py-4">{TR ? 'Veri alınamadı' : 'No data available'}</p>
            ) : (
              (eqTab === 'tr' ? trEqs : worldEqs).map((d, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[var(--border)] last:border-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                    d.buyukluk >= 6 ? 'bg-red-50 dark:bg-red-900/30 text-red-600' :
                    d.buyukluk >= 4 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' :
                    'bg-gray-50 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {d.buyukluk.toFixed(1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--foreground)] truncate">{d.konum}</p>
                    <p className="text-[11px] text-[var(--muted)]">{d.tarih} · {d.derinlik} km · {d.kaynak}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Knowledge guide sidebar on desktop */}
      <div className="lg:col-span-2">
        <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">
          {TR ? 'Deprem Bilgi Rehberi' : 'Earthquake Guide'}
        </p>
        <div className="space-y-2">
          {articles.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center justify-between bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 hover:border-red-200 transition-colors"
            >
              <span className="text-xs font-medium text-[var(--foreground)]">{TR ? a.tr : a.en}</span>
              <span className="text-[var(--muted)] text-xs shrink-0 ml-2">→</span>
            </Link>
          ))}
        </div>
      </div>

      </div>{/* end desktop 2-col */}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { n: 'M4.0+', tr: 'Anlık deprem takibi', en: 'Live earthquake tracking' },
          { n: '81', tr: 'İl risk analizi', en: 'Province analyses' },
          { n: '900+', tr: 'İlçe risk skoru', en: 'District risk scores' },
        ].map((s) => (
          <div key={s.n} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center">
            <p className="text-base font-bold text-red-600">{s.n}</p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5 leading-tight">{TR ? s.tr : s.en}</p>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-[var(--muted)] text-center pb-2">
        {TR ? 'Veri kaynakları: Kandilli · AFAD · USGS · MTA · TÜİK' : 'Data sources: Kandilli · AFAD · USGS · MTA · TÜİK'}
      </p>
    </div>
  );
}
