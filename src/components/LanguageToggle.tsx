'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
      <button
        onClick={() => setLang('TR')}
        className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors ${
          lang === 'TR'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-400 dark:text-gray-400 hover:text-gray-600'
        }`}
      >
        TR
      </button>
      <button
        onClick={() => setLang('EN')}
        className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors ${
          lang === 'EN'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-400 dark:text-gray-400 hover:text-gray-600'
        }`}
      >
        EN
      </button>
    </div>
  );
}
