'use client';
import { useState } from 'react';
import { haberler } from '@/data/haberler';
import { useLanguage } from '@/contexts/LanguageContext';

const SAYFA_BOYUTU = 10;

export default function UzmanDegerlendirmeleri() {
  const { t } = useLanguage();
  const [sayfa, setSayfa] = useState(1);

  const toplamSayfa = Math.ceil(haberler.length / SAYFA_BOYUTU);
  const sayfaHaberler = haberler.slice((sayfa - 1) * SAYFA_BOYUTU, sayfa * SAYFA_BOYUTU);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t('haberlerTitle')}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">{t('haberlerSubtitle')}</p>
      </div>

      <div className="space-y-3">
        {sayfaHaberler.map((h, i) => (
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

      {/* Sayfalama */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => { setSayfa((s) => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={sayfa === 1}
            className="flex-1 py-2 text-xs font-semibold rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-red-400 transition-colors"
          >
            {t('uzmanOnceki')}
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => { setSayfa(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-7 h-7 text-xs font-semibold rounded-lg border transition-colors ${
                  sayfa === n
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] hover:border-red-400 hover:text-[var(--foreground)]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setSayfa((s) => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={sayfa === toplamSayfa}
            className="flex-1 py-2 text-xs font-semibold rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-red-400 transition-colors"
          >
            {t('uzmanSonraki')}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
        <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-relaxed">
          <span className="font-semibold">{t('notLabel')}</span> {t('notMetin')}
        </p>
      </div>
    </div>
  );
}
