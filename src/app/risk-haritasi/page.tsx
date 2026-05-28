'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Il { ad: string; kod: string; seviye: 'cok-yuksek' | 'yuksek' | 'orta' | 'dusuk'; }

const iller: Il[] = [
  // Çok Yüksek Risk
  { ad: 'İstanbul',       kod: '34', seviye: 'cok-yuksek' },
  { ad: 'Kocaeli',        kod: '41', seviye: 'cok-yuksek' },
  { ad: 'Sakarya',        kod: '54', seviye: 'cok-yuksek' },
  { ad: 'Düzce',          kod: '81', seviye: 'cok-yuksek' },
  { ad: 'Bolu',           kod: '14', seviye: 'cok-yuksek' },
  { ad: 'Yalova',         kod: '77', seviye: 'cok-yuksek' },
  { ad: 'İzmir',          kod: '35', seviye: 'cok-yuksek' },
  { ad: 'Hatay',          kod: '31', seviye: 'cok-yuksek' },
  { ad: 'Kahramanmaraş',  kod: '46', seviye: 'cok-yuksek' },
  { ad: 'Bingöl',         kod: '12', seviye: 'cok-yuksek' },
  { ad: 'Van',            kod: '65', seviye: 'cok-yuksek' },
  // Yüksek Risk
  { ad: 'Bursa',          kod: '16', seviye: 'yuksek' },
  { ad: 'Balıkesir',      kod: '10', seviye: 'yuksek' },
  { ad: 'Çanakkale',      kod: '18', seviye: 'yuksek' },
  { ad: 'Manisa',         kod: '45', seviye: 'yuksek' },
  { ad: 'Aydın',          kod: '09', seviye: 'yuksek' },
  { ad: 'Muğla',          kod: '48', seviye: 'yuksek' },
  { ad: 'Denizli',        kod: '20', seviye: 'yuksek' },
  { ad: 'Adıyaman',       kod: '02', seviye: 'yuksek' },
  { ad: 'Malatya',        kod: '44', seviye: 'yuksek' },
  { ad: 'Elazığ',         kod: '23', seviye: 'yuksek' },
  { ad: 'Erzurum',        kod: '25', seviye: 'yuksek' },
  { ad: 'Afyonkarahisar', kod: '03', seviye: 'yuksek' },
  { ad: 'Eskişehir',      kod: '26', seviye: 'yuksek' },
  // Orta Risk
  { ad: 'Samsun',         kod: '55', seviye: 'orta' },
  { ad: 'Tekirdağ',       kod: '59', seviye: 'orta' },
  { ad: 'Antalya',        kod: '07', seviye: 'orta' },
  { ad: 'Adana',          kod: '01', seviye: 'orta' },
  { ad: 'Osmaniye',       kod: '80', seviye: 'orta' },
  { ad: 'Gaziantep',      kod: '27', seviye: 'orta' },
  { ad: 'Kilis',          kod: '79', seviye: 'orta' },
  { ad: 'Trabzon',        kod: '61', seviye: 'orta' },
  { ad: 'Mersin',         kod: '33', seviye: 'orta' },
  // Düşük Risk
  { ad: 'Ankara',         kod: '06', seviye: 'dusuk' },
  { ad: 'Konya',          kod: '42', seviye: 'dusuk' },
  { ad: 'Kayseri',        kod: '38', seviye: 'dusuk' },
  { ad: 'Şanlıurfa',      kod: '63', seviye: 'dusuk' },
  { ad: 'Diyarbakır',     kod: '21', seviye: 'dusuk' },
];

const seviyeMap = {
  'cok-yuksek': {
    label: { tr: 'Çok Yüksek', en: 'Very High' },
    card: 'bg-red-50 dark:bg-red-900/15 border-red-200 dark:border-red-900/40',
    badge: 'bg-red-500',
    text: 'text-red-700 dark:text-red-400',
  },
  'yuksek': {
    label: { tr: 'Yüksek', en: 'High' },
    card: 'bg-orange-50 dark:bg-orange-900/15 border-orange-200 dark:border-orange-900/40',
    badge: 'bg-orange-500',
    text: 'text-orange-700 dark:text-orange-400',
  },
  'orta': {
    label: { tr: 'Orta', en: 'Medium' },
    card: 'bg-amber-50 dark:bg-amber-900/15 border-amber-200 dark:border-amber-900/40',
    badge: 'bg-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
  },
  'dusuk': {
    label: { tr: 'Düşük', en: 'Low' },
    card: 'bg-green-50 dark:bg-green-900/15 border-green-200 dark:border-green-900/40',
    badge: 'bg-green-500',
    text: 'text-green-700 dark:text-green-400',
  },
};

const gruplar = ['cok-yuksek', 'yuksek', 'orta', 'dusuk'] as const;

export default function RiskHaritasiPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Sismik Risk' : 'Seismic Risk'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Türkiye Deprem Risk Haritası' : 'Turkey Earthquake Risk Map'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'AFAD deprem tehlike zonlamasına göre 38 ilin risk seviyesi.'
            : 'Risk level of 38 provinces according to AFAD seismic hazard zoning.'}
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {gruplar.map(g => {
          const s = seviyeMap[g];
          return (
            <div key={g} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${s.badge}`} />
              <span className="text-[11px] text-[var(--muted)]">{TR ? s.label.tr : s.label.en}</span>
            </div>
          );
        })}
      </div>

      {/* Gruplar */}
      {gruplar.map(g => {
        const s = seviyeMap[g];
        const liste = iller.filter(il => il.seviye === g);
        return (
          <section key={g}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2.5 h-2.5 rounded-sm shrink-0 ${s.badge}`} />
              <h2 className={`text-xs font-bold uppercase tracking-wide ${s.text}`}>
                {TR ? s.label.tr : s.label.en}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {liste.map(il => (
                <Link
                  key={il.kod}
                  href={`/bolge-analizi?il=${encodeURIComponent(il.ad)}`}
                  className={`flex items-center justify-between border rounded-xl px-3 py-2 transition-opacity hover:opacity-80 ${s.card}`}
                >
                  <span className={`text-[11px] font-bold ${s.text}`}>{il.ad}</span>
                  <span className="text-[10px] text-[var(--muted)]">→</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-[10px] text-[var(--muted)] text-center pb-2">
        {TR ? 'Kaynak: AFAD Türkiye Deprem Tehlike Haritası (2018)' : 'Source: AFAD Turkey Seismic Hazard Map (2018)'}
      </p>
    </div>
  );
}
