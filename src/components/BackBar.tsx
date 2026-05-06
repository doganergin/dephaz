'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BackBar() {
  const path = usePathname();
  const { lang } = useLanguage();

  if (path === '/') return null;

  return (
    <div className="max-w-2xl mx-auto w-full px-4 pt-3">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        ← {lang === 'TR' ? 'Ana Sayfa' : 'Home'}
      </Link>
    </div>
  );
}
