'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BackBar() {
  const path = usePathname();
  const { lang } = useLanguage();

  if (path === '/') return null;

  return (
    <div className="max-w-2xl lg:max-w-4xl mx-auto w-full px-4 pt-3">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-[var(--muted)] bg-[var(--card-bg)] border border-[var(--border)] hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 shadow-sm hover:shadow"
      >
        <span className="text-base leading-none">←</span>
        {lang === 'TR' ? 'Ana Sayfa' : 'Home'}
      </Link>
    </div>
  );
}
