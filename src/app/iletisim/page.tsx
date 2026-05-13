'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Lightbulb, BarChart2, Users, Scale, Bug } from 'lucide-react';

export default function IletisimPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'İletişim' : 'Contact'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR ? 'Sorularınız, önerileriniz veya hata bildirimleriniz için bize ulaşın.' : 'Reach us for questions, suggestions, or bug reports.'}
        </p>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0"><Mail size={20} className="text-blue-500" /></div>
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">{TR ? 'E-posta' : 'Email'}</p>
            <a href="mailto:info@depremhatti.com" className="text-sm text-blue-500 hover:underline">info@depremhatti.com</a>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-4">
          {TR ? 'E-postanıza genellikle 1-3 iş günü içinde yanıt verilmektedir.' : 'We typically respond within 1–3 business days.'}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Ne Zaman İletişime Geçebilirsiniz?' : 'When to Contact Us'}</h2>
        <div className="space-y-2">
          {[
            { iconEl: <Bug size={18} className="shrink-0" />, tr: 'Hata Bildirimi', en: 'Bug Report', trA: 'Sitede çalışmayan bir özellik veya yanlış veri gördüyseniz.', enA: 'If you find a broken feature or incorrect data on the site.' },
            { iconEl: <Lightbulb size={18} className="shrink-0 text-amber-500" />, tr: 'Öneri', en: 'Suggestion', trA: 'Yeni özellik veya iyileştirme fikiriniz varsa.', enA: 'If you have an idea for a new feature or improvement.' },
            { iconEl: <BarChart2 size={18} className="shrink-0" />, tr: 'Veri Talebi', en: 'Data Request', trA: 'Bölgenize ait eksik veya hatalı veri için.', enA: 'For missing or incorrect data about your region.' },
            { iconEl: <Users size={18} className="shrink-0" />, tr: 'İş Birliği', en: 'Collaboration', trA: 'Akademik veya kurumsal iş birliği teklifleri için.', enA: 'For academic or institutional collaboration proposals.' },
            { iconEl: <Scale size={18} className="shrink-0" />, tr: 'Hukuki Konular', en: 'Legal', trA: 'Telif hakkı veya gizlilik politikasına ilişkin talepler için.', enA: 'For copyright or privacy policy related requests.' },
          ].map((item) => (
            <div key={item.tr} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <span className="shrink-0 mt-0.5">{item.iconEl}</span>
              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">{TR ? item.tr : item.en}</p>
                <p className="text-[11px] text-[var(--muted)] mt-0.5">{TR ? item.trA : item.enA}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">{TR ? 'Deprem Acil Durumları İçin' : 'For Earthquake Emergencies'}</p>
        <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          {TR
            ? 'Deprem sırasında veya sonrasında acil yardım için 112\'yi arayın veya AFAD\'ın resmi kanallarını takip edin. Deprem Hattı acil müdahale hizmeti vermemektedir.'
            : 'For emergency assistance during or after an earthquake, call 112 or follow AFAD\'s official channels. Deprem Hattı does not provide emergency response services.'}
        </p>
        <a href="https://www.afad.gov.tr" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-500 hover:underline mt-2 block">
          {TR ? 'AFAD Resmi Sitesi →' : 'AFAD Official Website →'}
        </a>
      </section>
    </div>
  );
}
