'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Globe, ScrollText, FlaskConical, Backpack, Activity, Users, Phone, ShieldCheck, HeartPulse, Sparkles, ClipboardList, ArrowLeftRight, Bell } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface LatestEq { buyukluk: number; konum: string; tarih: string; derinlik: number; kaynak?: string; }

export default function HomePage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const [eqTab, setEqTab] = useState<'tr' | 'world'>('tr');
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
      setTrEqs(combined.sort((a, b) => b.tarih.localeCompare(a.tarih)).slice(0, 20));
      if (usgsRes.status === 'fulfilled' && usgsRes.value.ok) {
        const d = await usgsRes.value.json();
        if (d.features) {
          setWorldEqs(d.features.slice(0, 20).map((f: { properties: { mag: number; place: string; time: number }; geometry: { coordinates: [number, number, number] } }) => ({
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

  const features: Array<{ href: string; Icon: LucideIcon; tr: string; en: string; trDesc: string; enDesc: string; color: string; coming?: true }> = [
    { href: '/bolge-analizi', Icon: MapPin,      tr: 'Bölge Analizi',          en: 'Risk Analysis',         trDesc: 'İl, ilçe ve mahalle seçerek fay mesafesi, zemin yapısı ve deprem risk skorunu öğrenin.', enDesc: 'Select province, district and neighbourhood to find fault distance, soil type, and risk score.', color: 'red' },
    { href: '/harita',        Icon: Globe,       tr: 'Canlı Deprem Haritası',  en: 'Live Earthquake Map',   trDesc: 'Kandilli, AFAD ve USGS verilerini gerçek zamanlı haritada izleyin.',                       enDesc: 'Monitor Kandilli, AFAD and USGS data on a real-time interactive map.',                        color: 'blue' },
    { href: '/tarihsel',      Icon: ScrollText,  tr: 'Tarihsel Depremler',     en: 'Historical Earthquakes',trDesc: "Osmanlı'dan günümüze Türkiye'nin büyük deprem tarihini inceleyin.",                         enDesc: "Explore Turkey's major earthquake history from the Ottoman era to the present.",               color: 'purple' },
    { href: '/uzman',         Icon: FlaskConical,tr: 'Uzman Görüşleri',        en: 'Expert Opinions',       trDesc: 'Seismologların ve jeologların bilimsel değerlendirmelerini okuyun.',                        enDesc: 'Read scientific assessments from seismologists and geologists.',                              color: 'green' },
    { href: '/canta',         Icon: Backpack,    tr: 'Deprem Çantası',         en: 'Emergency Kit',         trDesc: '72 saatlik acil durum çantası için kontrol listesi oluşturun.',                            enDesc: 'Build a 72-hour emergency supply checklist for your household.',                              color: 'amber' },
    { href: '/fay-hatlari',   Icon: Activity,    tr: 'Aktif Fay Haritası',     en: 'Active Fault Map',      trDesc: "Türkiye'deki aktif fay hatlarını ve büyük tarihi depremleri interaktif haritada görün.",  enDesc: "See Turkey's active fault lines and major historical earthquakes on an interactive map.",     color: 'orange' },
    { href: '/aile-plani',     Icon: Users,       tr: 'Aile Acil Durum Planı',  en: 'Family Emergency Plan',  trDesc: 'Acil iletişim kişileri, buluşma noktası ve 72 saatlik çanta durumunuzu kaydedin.',         enDesc: 'Save emergency contacts, meeting point and kit status for your family.',                      color: 'red' },
    { href: '/acil-numaralar', Icon: Phone,       tr: 'Acil Numaralar',         en: 'Emergency Numbers',      trDesc: '112, 122, AFAD ve tüm kritik hatlar — tek dokunuşla arama.',                             enDesc: '112, 122, AFAD and all critical lines — call with one tap.',                                  color: 'orange' },
    { href: '/ilk-yardim',     Icon: HeartPulse, tr: 'İlk Yardım Rehberi',     en: 'First Aid Guide',        trDesc: 'Bilinç kontrolü, kanama durdurma, CPR temelleri ve enkaz yaralanmaları.',                enDesc: 'Consciousness check, bleeding control, basic CPR, and debris injuries.',                      color: 'green' },
    { href: '/dask',           Icon: ShieldCheck,    tr: 'DASK Deprem Sigortası',  en: 'DASK Insurance',         trDesc: 'Zorunlu deprem sigortası: kapsam, prim ve poliçe sorgulama rehberi.',                    enDesc: 'Mandatory earthquake insurance: coverage, premium and policy query guide.',                   color: 'blue' },
    { href: '/hazirlik-testi', Icon: ClipboardList,  tr: 'Hazırlık Testi',         en: 'Preparedness Quiz',      trDesc: '10 soruda depreme hazırlık seviyenizi ölçün ve eksiklerinizi öğrenin.',                  enDesc: 'Measure your earthquake preparedness in 10 questions and discover your gaps.',               color: 'purple' },
    { href: '/karsilastir',    Icon: ArrowLeftRight, tr: 'Bölge Karşılaştır',      en: 'Compare Regions',        trDesc: 'İki farklı ilçenin deprem risk skorlarını yan yana karşılaştırın.',                     enDesc: 'Compare earthquake risk scores of two different districts side by side.',                    color: 'amber' },
    { href: '/bildirimler',    Icon: Bell,           tr: 'Deprem Bildirimleri',     en: 'Earthquake Alerts',      trDesc: 'M4.0+ depremler için anlık tarayıcı bildirimi alın, sekteyken bile.',                  enDesc: 'Get instant browser notifications for M4.0+ earthquakes, even in the background.',          color: 'red' },
  ];

  const colorMap: Record<string, { card: string; icon: string; label: string }> = {
    red:    { card: 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30',       icon: 'bg-red-100 dark:bg-red-900/30 text-red-600',       label: 'text-red-700 dark:text-red-400' },
    blue:   { card: 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30',   icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',    label: 'text-blue-700 dark:text-blue-400' },
    purple: { card: 'bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/30', icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', label: 'text-purple-700 dark:text-purple-400' },
    green:  { card: 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30', icon: 'bg-green-100 dark:bg-green-900/30 text-green-600', label: 'text-green-700 dark:text-green-400' },
    amber:  { card: 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30', icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', label: 'text-amber-700 dark:text-amber-400' },
    orange: { card: 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30', icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600', label: 'text-orange-700 dark:text-orange-400' },
    gray:   { card: 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-700/50',   icon: 'bg-gray-100 dark:bg-gray-700 text-gray-400',       label: 'text-gray-400 dark:text-gray-500' },
  };

  const articles = [
    { href: '/deprem-nedir',           tr: 'Deprem Nedir? Nasıl Oluşur?',           en: 'What Is an Earthquake?' },
    { href: '/depreme-hazirlik',       tr: 'Depreme Hazırlık Rehberi',               en: 'Earthquake Preparedness Guide' },
    { href: '/deprem-aninda',          tr: 'Deprem Anında Ne Yapmalı?',               en: 'What to Do in an Earthquake?' },
    { href: '/enkaz-altinda',          tr: 'Enkaz Altında Hayatta Kalma',            en: 'Surviving Under Debris' },
    { href: '/ilk-yardim',             tr: 'Deprem Sonrası İlk Yardım',              en: 'First Aid After Earthquake' },
    { href: '/turkiyede-deprem-riski', tr: "Türkiye'de Deprem Riski",                en: 'Earthquake Risk in Turkey' },
    { href: '/fay-hatlari',            tr: 'Türkiye\'deki Fay Hatları',              en: 'Fault Lines in Turkey' },
    { href: '/zemin-tipleri',          tr: 'Zemin Tipleri ve Deprem Riski',          en: 'Soil Types and Earthquake Risk' },
    { href: '/deprem-cantasi-rehberi', tr: '72 Saatlik Deprem Çantası Rehberi',      en: '72-Hour Earthquake Kit Guide' },
    { href: '/dask',                   tr: 'DASK Zorunlu Deprem Sigortası',          en: 'DASK Mandatory Earthquake Insurance' },
    { href: '/hazirlik-testi',         tr: 'Depreme Hazırlık Testini Yap',           en: 'Take the Preparedness Quiz' },
    { href: '/karsilastir',            tr: 'İki Bölgeyi Karşılaştır',                en: 'Compare Two Regions' },
    { href: '/bildirimler',            tr: 'Anlık Deprem Bildirimleri',               en: 'Real-Time Earthquake Alerts' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="text-center pt-1 pb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">
            {TR ? 'Türkiye Deprem Bilgi Platformu' : 'Turkey Earthquake Information Platform'}
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
            <Sparkles size={10} /> {TR ? 'YZ Destekli' : 'AI-Powered'}
          </span>
        </div>
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
        className="flex items-center justify-between bg-[var(--card-bg)] border border-red-500/40 rounded-2xl p-4 glow-card glow-red group"
      >
        <div>
          <p className="font-bold text-sm text-red-500 group-hover:text-red-400 transition-colors">{TR ? 'Bölge Riski Analizi Yap' : 'Run Risk Analysis'}</p>
          <p className="text-[11px] text-[var(--muted)] mt-0.5">
            {TR ? 'İl ve ilçenizi seçin, risk skorunuzu öğrenin' : 'Select your province and district, find your risk score'}
          </p>
        </div>
        <MapPin size={24} className="text-red-400 shrink-0" strokeWidth={1.8} />
      </Link>

      {/* Features grid — 2-col mobile, 3-col desktop */}
      <div>
        <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">
          {TR ? 'Tüm Özellikler' : 'All Features'}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => {
            const c = colorMap[f.color];
            const coming = 'coming' in f && f.coming;
            if (coming) return (
              <div key={f.href} className={`border rounded-2xl p-3.5 flex flex-col gap-2 opacity-50 cursor-default ${c.card}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
                  <f.Icon size={20} strokeWidth={1.8} />
                </div>
                <div className="flex items-center gap-1.5">
                  <p className={`text-xs font-bold leading-snug ${c.label}`}>{TR ? f.tr : f.en}</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 leading-none">
                    {TR ? 'Yakında' : 'Soon'}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">{TR ? f.trDesc : f.enDesc}</p>
              </div>
            );
            return (
              <Link
                key={f.href}
                href={f.href}
                className={`border rounded-2xl p-3.5 flex flex-col gap-2 glow-card glow-${f.color} ${c.card}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
                  <f.Icon size={20} strokeWidth={1.8} />
                </div>
                <p className={`text-xs font-bold leading-snug ${c.label}`}>{TR ? f.tr : f.en}</p>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">{TR ? f.trDesc : f.enDesc}</p>
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
            { key: 'tr' as const, label: TR ? 'Türkiye' : 'Turkey' },
            { key: 'world' as const, label: TR ? 'Dünya' : 'World' },
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
        {eqLoading ? (
          <div className="flex items-center justify-center py-6 gap-2 text-[var(--muted)]">
            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">{TR ? 'Yükleniyor...' : 'Loading...'}</span>
          </div>
        ) : (() => {
          const eqList = eqTab === 'tr' ? trEqs : worldEqs;
          if (eqList.length === 0) return (
            <p className="text-xs text-[var(--muted)] text-center py-4">{TR ? 'Veri alınamadı' : 'No data available'}</p>
          );
          const EqRow = ({ d, i }: { d: LatestEq; i: number }) => (
            <div key={i} className="flex items-center gap-2.5 py-1 border-b border-[var(--border)]">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                d.buyukluk >= 6 ? 'bg-red-50 dark:bg-red-900/30 text-red-600' :
                d.buyukluk >= 4 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' :
                'bg-gray-50 dark:bg-gray-700 text-gray-500'
              }`}>
                {d.buyukluk.toFixed(1)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[var(--foreground)] truncate leading-tight">{d.konum}</p>
                <p className="text-[10px] text-[var(--muted)] leading-tight">{d.tarih} · {d.derinlik} km · {d.kaynak}</p>
              </div>
            </div>
          );
          return (
            <div className="eq-ticker-wrap overflow-hidden h-[400px] relative">
              {/* üst fade */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[var(--card-bg)] to-transparent z-10 pointer-events-none" />
              {/* alt fade */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[var(--card-bg)] to-transparent z-10 pointer-events-none" />
              <div className="eq-ticker-track">
                {/* orijinal liste */}
                <div className="space-y-0">
                  {eqList.map((d, i) => <EqRow key={`a-${i}`} d={d} i={i} />)}
                </div>
                {/* seamless loop için kopya */}
                <div className="space-y-0" aria-hidden>
                  {eqList.map((d, i) => <EqRow key={`b-${i}`} d={d} i={i} />)}
                </div>
              </div>
            </div>
          );
        })()}
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
              className="flex items-center justify-between bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 glow-card glow-red"
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
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center glow-card glow-red">
          <p className="text-base font-bold text-red-600">M4.0+</p>
          <p className="text-[10px] text-[var(--muted)] mt-0.5 leading-tight">{TR ? 'Anlık deprem takibi' : 'Live earthquake tracking'}</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center glow-card glow-red">
          <p className="text-base font-bold text-red-600">38</p>
          <p className="text-[10px] text-[var(--muted)] mt-0.5 leading-tight">{TR ? 'Desteklenen il' : 'Supported provinces'}</p>
          <p className="text-[9px] text-amber-500 mt-1 leading-tight">{TR ? 'Kalan iller yakında' : 'More cities soon'}</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center glow-card glow-red">
          <p className="text-base font-bold text-red-600">337</p>
          <p className="text-[10px] text-[var(--muted)] mt-0.5 leading-tight">{TR ? 'İlçe risk verisi' : 'District risk entries'}</p>
        </div>
      </div>

      <p className="text-[10px] text-[var(--muted)] text-center pb-2">
        {TR ? 'Veri kaynakları: Kandilli · AFAD · USGS · MTA · TÜİK' : 'Data sources: Kandilli · AFAD · USGS · MTA · TÜİK'}
      </p>
    </div>
  );
}
