'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, AlertTriangle, Flame, Shield, HeartPulse, Building2, Radio, Waves } from 'lucide-react';

const numaralar = [
  { icon: AlertTriangle, numara: '112', tr: 'Acil Yardım', en: 'Emergency', trA: 'Ambulans, itfaiye ve polis tek hatta', enA: 'Ambulance, fire and police on one line', renk: 'red' },
  { icon: Shield, numara: '122', tr: 'AFAD', en: 'AFAD (Disaster Agency)', trA: 'Arama kurtarma ve afet yönetimi', enA: 'Search & rescue and disaster management', renk: 'orange' },
  { icon: Flame, numara: '110', tr: 'İtfaiye', en: 'Fire Department', trA: 'Yangın ve enkaz müdahalesi', enA: 'Fire and debris intervention', renk: 'red' },
  { icon: Shield, numara: '155', tr: 'Polis', en: 'Police', trA: 'Güvenlik ve kamu düzeni', enA: 'Security and public order', renk: 'blue' },
  { icon: Shield, numara: '156', tr: 'Jandarma', en: 'Gendarmerie', trA: 'Kırsal bölgeler ve şehir dışı', enA: 'Rural areas and outside city limits', renk: 'blue' },
  { icon: HeartPulse, numara: '184', tr: 'ALO Sağlık', en: 'Health Line', trA: 'Sağlık danışma hattı', enA: 'Medical advisory line', renk: 'green' },
];

const kurumsalNumaralar = [
  { isim: 'İBB DEZİM (İstanbul)', numara: '0212 449 99 99', tr: 'Deprem ve zemin inceleme müdürlüğü', en: 'Earthquake & soil investigation authority' },
  { isim: 'Kandilli Rasathanesi', numara: '0216 308 83 00', tr: 'Deprem kayıt ve sismoloji merkezi', en: 'Seismological recording & research centre' },
  { isim: 'Türk Kızılay', numara: '0312 430 23 00', tr: 'İnsani yardım ve kan bağışı', en: 'Humanitarian aid and blood donation' },
  { isim: 'DASK', numara: '0850 550 00 55', tr: 'Zorunlu deprem sigortası sorgu hattı', en: 'Mandatory earthquake insurance inquiry line' },
];

const renkMap: Record<string, string> = {
  red:    'bg-red-100 dark:bg-red-900/30 text-red-600',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
  blue:   'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
  green:  'bg-green-100 dark:bg-green-900/30 text-green-600',
};

export default function AcilNumaralarPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Hızlı Erişim' : 'Quick Access'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Acil Durum Numaraları' : 'Emergency Contact Numbers'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Deprem ve afet durumunda arayabileceğiniz tüm kritik hatlar.'
            : 'All critical lines to call during an earthquake or disaster.'}
        </p>
      </div>

      {/* Kritik kural */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1">
          {TR ? 'Hatırlatma' : 'Remember'}
        </p>
        <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
          {TR
            ? 'Büyük bir depremden sonra hatlar yoğunlaşabilir. Sıra bekleyin, kısa ve net konuşun. SMS büyük ihtimalle daha hızlı iletilir.'
            : 'After a major earthquake, lines may be overwhelmed. Be patient, speak briefly and clearly. SMS will likely get through faster than voice calls.'}
        </p>
      </div>

      {/* Ana numaralar */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Temel Acil Hatlar' : 'Core Emergency Lines'}
        </h2>
        <div className="space-y-2">
          {numaralar.map((n) => {
            const Icon = n.icon;
            return (
              <a
                key={n.numara}
                href={`tel:${n.numara}`}
                className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 hover:border-red-300 dark:hover:border-red-700 transition-colors"
              >
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${renkMap[n.renk]}`}>
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[var(--foreground)]">{TR ? n.tr : n.en}</p>
                  <p className="text-[11px] text-[var(--muted)]">{TR ? n.trA : n.enA}</p>
                </div>
                <span className="text-lg font-bold text-red-600 shrink-0 tabular-nums">{n.numara}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Kurumsal numaralar */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Kurumsal Hatlar' : 'Institutional Lines'}
        </h2>
        <div className="space-y-2">
          {kurumsalNumaralar.map((k) => (
            <a
              key={k.numara}
              href={`tel:${k.numara.replace(/\s/g, '')}`}
              className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <span className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
                <Building2 size={18} strokeWidth={1.8} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--foreground)]">{k.isim}</p>
                <p className="text-[11px] text-[var(--muted)]">{TR ? k.tr : k.en}</p>
              </div>
              <span className="text-xs font-bold text-blue-600 shrink-0 tabular-nums text-right">{k.numara}</span>
            </a>
          ))}
        </div>
      </section>

      {/* SMS ipucu */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Radio size={16} className="text-[var(--muted)] shrink-0" />
          <p className="text-xs font-bold text-[var(--foreground)]">
            {TR ? 'Haberleşme İpucu' : 'Communication Tip'}
          </p>
        </div>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
          {TR
            ? 'Sesli arama başarısız olduğunda SMS göndermeyi deneyin. Aile bireyleriyle şehir dışında bir referans kişi belirleyin — o kişi herkesin durumunu aktarabilir.'
            : 'When voice calls fail, try sending an SMS. Designate an out-of-city contact person with your family — that person can relay everyone\'s status.'}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Waves size={14} className="text-[var(--muted)] shrink-0" />
          <p className="text-[11px] text-[var(--muted)]">
            {TR ? 'AFAD acil SMS: 3030 numarasına "YARDIM" yazın.' : 'AFAD emergency SMS: send "HELP" to 3030.'}
          </p>
        </div>
      </div>
    </article>
  );
}
