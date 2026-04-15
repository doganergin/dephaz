'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NavBar() {
  const path = usePathname();
  const { t } = useLanguage();

  const tabs = [
    { href: '/', label: t('navBolgeAnalizi'), icon: '🗺️', yakindan: false },
    { href: '/harita', label: t('navHarita'), icon: '🌍', yakindan: false },
    { href: '/tarihsel', label: t('navTarihsel'), icon: '📜', yakindan: false },
    { href: '/uzman', label: t('navUzman'), icon: '🔬', yakindan: false },
    { href: '/canta', label: t('navDepremCantasi'), icon: '🎒', yakindan: false },
  ];

  return (
    <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-3 pt-3 pb-2 border-b border-[var(--border)]">
          <Image src="/gecicilogo.png" alt="Deprem Hattı" width={32} height={32} className="rounded-lg shadow-sm shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--foreground)] leading-none">{t('appName')}</p>
            <p className="text-[10px] text-[var(--muted)] leading-none mt-0.5">{t('appSubtitle')}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex gap-0">
          {tabs.map((tab) => {
            const active = path === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-[11px] font-medium border-b-2 transition-colors relative ${
                  active
                    ? 'border-red-500 text-red-600'
                    : tab.yakindan
                    ? 'border-transparent text-[var(--muted)] opacity-50'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.yakindan && (
                  <span className="text-[9px] font-semibold text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-full leading-none">
                    {t('navYakinda')}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
