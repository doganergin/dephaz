'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AilePlaniPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-3xl mb-5">
        👨‍👩‍👧
      </div>
      <h1 className="text-xl font-bold text-[var(--foreground)] mb-2">
        {TR ? 'Aile Buluşma Planı' : 'Family Meeting Plan'}
      </h1>
      <p className="text-sm text-[var(--muted)] mb-6 max-w-xs leading-relaxed">
        {TR
          ? 'Aile üyeleri, harita üzerinde buluşma noktaları ve kaçış rotaları özelliği yakında geliyor.'
          : 'Family meeting points on the map and evacuation routes feature is coming soon.'}
      </p>
      <span className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-semibold px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        {TR ? 'Yakında' : 'Coming Soon'}
      </span>
    </div>
  );
}
