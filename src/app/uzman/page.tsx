'use client';
import { haberler } from '@/data/haberler';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UzmanDegerlendirmeleri() {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t('haberlerTitle')}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">{t('haberlerSubtitle')}</p>
      </div>

      <div className="space-y-3">
        {haberler.map((h, i) => (
          <div key={i} className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
            <div className="flex items-start gap-2 mb-2">
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--foreground)]">{h.uzman}</p>
                <p className="text-[11px] text-[var(--muted)]">{h.unvan} · {h.kurum}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  h.kaynak_tur === 'doi'
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                }`}>
                  {h.kaynak_tur === 'doi' ? 'DOI' : h.kaynak_tur === 'kurum' ? 'Resmi' : 'Üniv.'}
                </span>
                <span className="text-[10px] text-[var(--muted)]">{h.tarih}</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-[var(--foreground)] mb-1.5">{h.baslik}</p>
            <p className="text-xs text-[var(--muted)] leading-relaxed">{h.ozet}</p>
            <a
              href={h.kaynak}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-blue-500 hover:underline mt-2 block"
            >
              {t('kaynagaGit')}
            </a>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
        <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-relaxed">
          <span className="font-semibold">{t('notLabel')}</span> {t('notMetin')}
        </p>
      </div>
    </div>
  );
}
