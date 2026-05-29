'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  MapPin, Globe, ScrollText, FlaskConical, Backpack, Activity, Users, Phone,
  ShieldCheck, HeartPulse, ClipboardList, ArrowLeftRight, Bell,
  LayoutDashboard, BarChart2, Thermometer, Navigation, TrendingDown, ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface LatestEq { buyukluk: number; konum: string; tarih: string; derinlik: number; kaynak?: string; }

interface Feature { href: string; Icon: LucideIcon; tr: string; en: string; color: string; }

const analiz: Feature[] = [
  { href: '/bolge-analizi', Icon: MapPin,          tr: 'Bölge Analizi',       en: 'Risk Analysis',    color: 'red' },
  { href: '/dashboard',     Icon: LayoutDashboard,  tr: 'Dashboard',           en: 'My Dashboard',     color: 'blue' },
  { href: '/karsilastir',   Icon: ArrowLeftRight,   tr: 'Karşılaştır',         en: 'Compare',          color: 'amber' },
  { href: '/risk-haritasi', Icon: Thermometer,      tr: 'Risk Haritası',       en: 'Risk Map',         color: 'orange' },
  { href: '/istatistikler', Icon: BarChart2,        tr: 'İstatistikler',       en: 'Statistics',       color: 'purple' },
  { href: '/artci-tahmin',  Icon: TrendingDown,     tr: 'Artçı Tahmin',        en: 'Aftershock',       color: 'amber' },
];

const hazirlik: Feature[] = [
  { href: '/canta',          Icon: Backpack,    tr: 'Deprem Çantası',    en: 'Emergency Kit',     color: 'amber' },
  { href: '/aile-plani',     Icon: Users,       tr: 'Aile Planı',        en: 'Family Plan',       color: 'red' },
  { href: '/hazirlik-testi', Icon: ClipboardList,tr: 'Hazırlık Testi',  en: 'Quiz',              color: 'purple' },
  { href: '/acil-numaralar', Icon: Phone,       tr: 'Acil Numaralar',    en: 'Emergency Nos.',    color: 'orange' },
  { href: '/toplanma-alani', Icon: Navigation,  tr: 'Toplanma Alanı',   en: 'Assembly Area',     color: 'green' },
  { href: '/dask',           Icon: ShieldCheck, tr: 'DASK',              en: 'DASK',              color: 'blue' },
  { href: '/ilk-yardim',    Icon: HeartPulse,   tr: 'İlk Yardım',       en: 'First Aid',         color: 'green' },
];

const takip: Feature[] = [
  { href: '/harita',    Icon: Globe,      tr: 'Canlı Harita',   en: 'Live Map',       color: 'blue' },
  { href: '/bildirimler',Icon: Bell,      tr: 'Bildirimler',    en: 'Alerts',         color: 'red' },
  { href: '/fay-hatlari',Icon: Activity,  tr: 'Fay Hatları',    en: 'Fault Lines',    color: 'orange' },
  { href: '/tarihsel',  Icon: ScrollText, tr: 'Tarihsel',       en: 'Historical',     color: 'purple' },
  { href: '/uzman',     Icon: FlaskConical,tr: 'Uzman Görüşleri',en: 'Expert Views', color: 'green' },
];

const colorToken: Record<string, { icon: string; text: string; border: string }> = {
  red:    { icon: 'bg-red-100 dark:bg-red-900/30 text-red-600',      text: 'text-red-600 dark:text-red-400',      border: 'border-red-100 dark:border-red-900/30' },
  blue:   { icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',   text: 'text-blue-600 dark:text-blue-400',   border: 'border-blue-100 dark:border-blue-900/30' },
  purple: { icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-100 dark:border-purple-900/30' },
  green:  { icon: 'bg-green-100 dark:bg-green-900/30 text-green-600', text: 'text-green-600 dark:text-green-400', border: 'border-green-100 dark:border-green-900/30' },
  amber:  { icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-900/30' },
  orange: { icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-100 dark:border-orange-900/30' },
};

function FeatureRow({ items, TR }: { items: Feature[]; TR: boolean }) {
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-1 feature-row md:flex-wrap md:overflow-x-visible">
        {items.map((f) => {
          const c = colorToken[f.color];
          return (
            <Link
              key={f.href}
              href={f.href}
              className={`flex-shrink-0 md:flex-shrink flex flex-col items-center gap-2 w-[84px] md:w-[96px] bg-[var(--card-bg)] border ${c.border} rounded-2xl p-3 hover:opacity-80 transition-opacity`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.icon}`}>
                <f.Icon size={24} strokeWidth={1.8} />
              </div>
              <p className={`text-[10px] font-bold text-center leading-tight ${c.text}`}>
                {TR ? f.tr : f.en}
              </p>
            </Link>
          );
        })}
      </div>
      {/* Mobilde sağ tarafa kaydırma ipucu */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-10 bg-gradient-to-l from-[var(--background)] to-transparent md:hidden" />
    </div>
  );
}

const articles = [
  { href: '/deprem-nedir',           tr: 'Deprem Nedir?',                  en: 'What Is an Earthquake?' },
  { href: '/depreme-hazirlik',       tr: 'Depreme Hazırlık Rehberi',        en: 'Earthquake Preparedness' },
  { href: '/deprem-aninda',          tr: 'Deprem Anında Ne Yapmalı?',        en: 'What to Do During a Quake?' },
  { href: '/enkaz-altinda',          tr: 'Enkaz Altında Hayatta Kalma',     en: 'Surviving Under Debris' },
  { href: '/turkiyede-deprem-riski', tr: "Türkiye'de Deprem Riski",         en: 'Earthquake Risk in Turkey' },
  { href: '/fay-hatlari',            tr: 'Türkiye\'deki Fay Hatları',       en: 'Fault Lines in Turkey' },
  { href: '/zemin-tipleri',          tr: 'Zemin Tipleri ve Deprem Riski',   en: 'Soil Types & Seismic Risk' },
  { href: '/deprem-cantasi-rehberi', tr: '72 Saatlik Deprem Çantası',       en: '72-Hour Emergency Kit' },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const [eqTab, setEqTab]       = useState<'tr' | 'world'>('tr');
  const [trEqs, setTrEqs]       = useState<LatestEq[]>([]);
  const [worldEqs, setWorldEqs] = useState<LatestEq[]>([]);
  const [eqLoading, setEqLoading] = useState(true);
  const [eqFilter, setEqFilter]   = useState(false);

  useEffect(() => {
    async function fetchEqs() {
      const [kandilliRes, afadRes, usgsRes] = await Promise.allSettled([
        fetch('/api/kandilli?limit=50'),
        fetch('/api/afad?limit=50&minmag=2.0'),
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
      setTrEqs(combined.sort((a, b) => b.tarih.localeCompare(a.tarih)).slice(0, 50));
      if (usgsRes.status === 'fulfilled' && usgsRes.value.ok) {
        const d = await usgsRes.value.json();
        if (d.features) {
          setWorldEqs(d.features.slice(0, 50).map((f: { properties: { mag: number; place: string; time: number }; geometry: { coordinates: [number, number, number] } }) => ({
            buyukluk: f.properties.mag, konum: f.properties.place,
            tarih: new Date(f.properties.time).toLocaleString('tr-TR'),
            derinlik: Math.round(f.geometry.coordinates[2]), kaynak: 'USGS',
          })));
        }
      }
      setEqLoading(false);
    }
    fetchEqs();
  }, []);

  const latest = trEqs[0];
  const m4Count = trEqs.filter(e => e.buyukluk >= 4).length;

  return (
    <div className="space-y-5">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-950 border border-gray-800 p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-transparent to-transparent pointer-events-none" />
        <div className="relative">
          {/* Live badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {TR ? 'CANLI' : 'LIVE'}
            </span>
            <span className="text-gray-700 text-[10px]">·</span>
            <span className="text-[10px] text-gray-500">depremhatti.com</span>
          </div>

          {/* Latest quake */}
          {!eqLoading && latest ? (
            <div className="mb-5">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                {TR ? 'Son Deprem' : 'Latest Earthquake'}
              </p>
              <div className="flex items-center gap-3">
                <span className={`text-4xl font-black tabular-nums leading-none ${
                  latest.buyukluk >= 6 ? 'text-red-400' :
                  latest.buyukluk >= 4 ? 'text-amber-400' : 'text-white'
                }`}>
                  M{latest.buyukluk.toFixed(1)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{latest.konum}</p>
                  <p className="text-[10px] text-gray-400">{latest.tarih} · {latest.derinlik} km</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5 h-14 flex items-center">
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Stats strip */}
          <div className="flex gap-4 mb-5">
            <div>
              <p className="text-lg font-black text-amber-400 tabular-nums">{m4Count}</p>
              <p className="text-[10px] text-gray-500">M4.0+ {TR ? 'son liste' : 'recent'}</p>
            </div>
            <div>
              <p className="text-lg font-black text-white">38</p>
              <p className="text-[10px] text-gray-500">{TR ? 'desteklenen il' : 'provinces'}</p>
            </div>
            <div>
              <p className="text-lg font-black text-white">337</p>
              <p className="text-[10px] text-gray-500">{TR ? 'ilçe risk verisi' : 'district scores'}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Link
                href="/bolge-analizi"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <MapPin size={13} /> {TR ? 'Risk Analizi Yap' : 'Run Risk Analysis'}
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-bold rounded-xl transition-colors border border-white/10"
              >
                <LayoutDashboard size={13} /> {TR ? 'Dashboard' : 'Dashboard'}
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { href: '/harita',         Icon: Globe,        tr: 'Canlı Harita', en: 'Live Map' },
                { href: '/aile-plani',     Icon: Users,        tr: 'Aile Planı',   en: 'Family' },
                { href: '/acil-numaralar', Icon: Phone,        tr: 'Acil',         en: 'Emergency' },
                { href: '/uzman',          Icon: FlaskConical, tr: 'Uzman',        en: 'Experts' },
              ].map(({ href, Icon, tr, en }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center gap-1 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl transition-colors border border-white/10"
                >
                  <Icon size={15} strokeWidth={1.8} />
                  <span className="text-[9px] font-bold leading-none">{TR ? tr : en}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURE CATEGORIES ───────────────────────────────── */}
      <section className="space-y-4">
        {[
          { label: { tr: 'Analiz & Araçlar', en: 'Analysis & Tools' }, items: analiz },
          { label: { tr: 'Hazırlık',          en: 'Preparedness' },    items: hazirlik },
          { label: { tr: 'Takip & Keşfet',    en: 'Monitor & Explore'}, items: takip },
        ].map(cat => (
          <div key={cat.label.tr}>
            <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-2">
              {TR ? cat.label.tr : cat.label.en}
            </p>
            <FeatureRow items={cat.items} TR={TR} />
          </div>
        ))}
      </section>

      {/* ── SON DEPREMLER + BİLGİ REHBERİ ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

      {/* Son Depremler */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wide">
            {TR ? 'Son Depremler' : 'Latest Earthquakes'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEqFilter(v => !v)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                eqFilter
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'text-amber-600 border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            >
              M4.0+
            </button>
            <Link href="/harita" className="text-[11px] text-red-500 hover:underline">
              {TR ? 'Harita →' : 'Map →'}
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-3">
          {(['tr', 'world'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setEqTab(tab)}
              className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${
                eqTab === tab
                  ? 'bg-red-500 text-white'
                  : 'text-[var(--muted)] hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab === 'tr' ? (TR ? 'Türkiye' : 'Turkey') : (TR ? 'Dünya' : 'World')}
            </button>
          ))}
        </div>

        {eqLoading ? (
          <div className="flex items-center justify-center h-24">
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (() => {
          const rawList = eqTab === 'tr' ? trEqs : worldEqs;
          const eqList = eqFilter ? rawList.filter(e => e.buyukluk >= 4) : rawList;
          const ROW_H = 48;
          const maxH = 400;
          const tickerH = Math.min(maxH, eqList.length * ROW_H);

          if (eqList.length === 0) {
            return (
              <p className="text-xs text-[var(--muted)] text-center py-6">
                {eqFilter
                  ? (TR ? 'Son depremler arasında M4.0+ deprem gerçekleşmemiş.' : 'No M4.0+ earthquakes in recent list.')
                  : (TR ? 'Veri alınamadı.' : 'No data available.')}
              </p>
            );
          }

          const rows = [...eqList, ...eqList];
          return (
            <div className="eq-ticker-wrap overflow-hidden rounded-xl" style={{ height: tickerH }}>
              <div className="eq-ticker-track">
                {rows.map((eq, i) => (
                  <div key={i} className="flex items-center gap-2 px-1 py-2.5 border-b border-[var(--border)] last:border-0" style={{ height: ROW_H }}>
                    <span className={`text-sm font-black tabular-nums w-10 shrink-0 ${
                      eq.buyukluk >= 6 ? 'text-red-500' :
                      eq.buyukluk >= 4 ? 'text-amber-500' : 'text-[var(--foreground)]'
                    }`}>
                      M{eq.buyukluk.toFixed(1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-[var(--foreground)] truncate">{eq.konum}</p>
                      <p className="text-[10px] text-[var(--muted)]">{eq.tarih} · {eq.derinlik} km</p>
                    </div>
                    {eq.kaynak && (
                      <span className="text-[9px] text-[var(--muted)] shrink-0">{eq.kaynak}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Bilgi Rehberi */}
      <section>
        <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-2">
          {TR ? 'Bilgi Rehberi' : 'Knowledge Guide'}
        </p>
        <div className="grid grid-cols-1 gap-1.5">
          {articles.map(a => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center justify-between bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 hover:border-red-300 dark:hover:border-red-900/50 transition-colors group"
            >
              <span className="text-xs text-[var(--foreground)] group-hover:text-red-500 transition-colors">{TR ? a.tr : a.en}</span>
              <ChevronRight size={13} className="text-[var(--muted)] shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      </div>{/* /grid */}

      <p className="text-[10px] text-[var(--muted)] text-center pb-2">
        {TR ? 'Veri kaynakları: Kandilli · AFAD · USGS · MTA' : 'Sources: Kandilli · AFAD · USGS · MTA'}
      </p>
    </div>
  );
}
