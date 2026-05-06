'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NavBar() {
  const path = usePathname();
  const { t, lang } = useLanguage();
  const [menuAcik, setMenuAcik] = useState(false);
  const TR = lang === 'TR';

  const tools = [
    { href: '/',              icon: '🏠', tr: 'Ana Sayfa',          en: 'Home' },
    { href: '/bolge-analizi', icon: '🗺️', tr: t('navBolgeAnalizi'), en: t('navBolgeAnalizi') },
    { href: '/harita',        icon: '🌍', tr: t('navHarita'),        en: t('navHarita') },
    { href: '/tarihsel',      icon: '📜', tr: t('navTarihsel'),      en: t('navTarihsel') },
    { href: '/uzman',         icon: '🔬', tr: t('navUzman'),         en: t('navUzman') },
    { href: '/canta',         icon: '🎒', tr: t('navDepremCantasi'), en: t('navDepremCantasi') },
    { href: '/aile-plani',    icon: '👨‍👩‍👧', tr: 'Aile Planı',          en: 'Family Plan' },
  ];

  const rehber = [
    { href: '/deprem-nedir',           tr: 'Deprem Nedir?',                 en: 'What Is an Earthquake?' },
    { href: '/depreme-hazirlik',       tr: 'Depreme Hazırlık',              en: 'Earthquake Preparedness' },
    { href: '/deprem-aninda',          tr: 'Deprem Anında Ne Yapmalı?',      en: 'What to Do in an Earthquake?' },
    { href: '/turkiyede-deprem-riski', tr: "Türkiye'de Deprem Riski",        en: 'Earthquake Risk in Turkey' },
    { href: '/fay-hatlari',            tr: 'Fay Hatları',                   en: 'Fault Lines' },
    { href: '/zemin-tipleri',          tr: 'Zemin Tipleri',                 en: 'Soil Types' },
    { href: '/deprem-cantasi-rehberi', tr: '72 Saatlik Deprem Çantası',     en: '72-Hour Earthquake Kit' },
  ];

  const kurumsal = [
    { href: '/hakkimizda', tr: 'Hakkımızda',        en: 'About Us' },
    { href: '/iletisim',   tr: 'İletişim',           en: 'Contact' },
    { href: '/gizlilik',   tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
  ];

  const navItem = (href: string, label: string, icon?: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setMenuAcik(false)}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-colors ${
        path === href
          ? 'bg-red-50 dark:bg-red-900/20 text-red-600'
          : 'text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
    >
      {icon && <span className="text-base w-5 text-center">{icon}</span>}
      <span>{label}</span>
    </Link>
  );

  const smallNavItem = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      onClick={() => setMenuAcik(false)}
      className={`block px-3 py-2 rounded-xl text-xs mb-0.5 transition-colors ${
        path === href
          ? 'bg-red-50 dark:bg-red-900/20 text-red-600 font-medium'
          : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-2 py-3">
            {/* Hamburger */}
            <button
              onClick={() => setMenuAcik(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
              aria-label={TR ? 'Menüyü aç' : 'Open menu'}
            >
              <div className="space-y-1">
                <span className="block w-5 h-0.5 bg-[var(--foreground)]" />
                <span className="block w-5 h-0.5 bg-[var(--foreground)]" />
                <span className="block w-5 h-0.5 bg-[var(--foreground)]" />
              </div>
            </button>

            {/* Logo + title */}
            <Link href="/" className="flex items-center gap-2.5 flex-1 min-w-0">
              <Image
                src="/gecicilogo.png"
                alt="Deprem Hattı"
                width={28}
                height={28}
                className="rounded-lg shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--foreground)] leading-none truncate">{t('appName')}</p>
                <p className="text-[10px] text-[var(--muted)] leading-none mt-0.5 truncate">{t('appSubtitle')}</p>
              </div>
            </Link>

            <div className="flex items-center gap-1.5 shrink-0">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {menuAcik && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setMenuAcik(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-[var(--card-bg)] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          menuAcik ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-2.5">
            <Image src="/gecicilogo.png" alt="Deprem Hattı" width={28} height={28} className="rounded-lg" />
            <p className="text-sm font-bold text-[var(--foreground)]">Deprem Hattı</p>
          </div>
          <button
            onClick={() => setMenuAcik(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[var(--muted)] text-sm"
            aria-label={TR ? 'Menüyü kapat' : 'Close menu'}
          >
            ✕
          </button>
        </div>

        {/* Scrollable nav content */}
        <nav className="flex-1 overflow-y-auto py-3">
          {/* Tools */}
          <div className="px-3 mb-1">
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wide px-3 mb-1.5">
              {TR ? 'Araçlar' : 'Tools'}
            </p>
            {tools.map((t) => navItem(t.href, TR ? t.tr : t.en, t.icon))}
          </div>

          <div className="border-t border-[var(--border)] mx-3 my-3" />

          {/* Guide */}
          <div className="px-3 mb-1">
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wide px-3 mb-1.5">
              {TR ? 'Bilgi Rehberi' : 'Guide'}
            </p>
            {rehber.map((r) => smallNavItem(r.href, TR ? r.tr : r.en))}
          </div>

          <div className="border-t border-[var(--border)] mx-3 my-3" />

          {/* Institutional */}
          <div className="px-3">
            <p className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wide px-3 mb-1.5">
              {TR ? 'Kurumsal' : 'About'}
            </p>
            {kurumsal.map((k) => smallNavItem(k.href, TR ? k.tr : k.en))}
          </div>
        </nav>
      </div>
    </>
  );
}
