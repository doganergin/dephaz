'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NavBar() {
  const path = usePathname();
  const { t, lang } = useLanguage();
  const { isSignedIn } = useUser();
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

            {/* Logo */}
            <Link href="/" className="flex items-center flex-1 min-w-0">
              <Image
                src="/logo.png"
                alt="Deprem Hattı"
                width={1448}
                height={1086}
                className="object-contain shrink-0"
                style={{ height: '36px', width: 'auto' }}
              />
            </Link>

            <div className="flex items-center gap-1.5 shrink-0">
              <LanguageToggle />
              <ThemeToggle />
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[var(--muted)] hover:text-[var(--foreground)]" title={TR ? 'Giriş Yap' : 'Sign In'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </button>
                </SignInButton>
              )}
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
          <div className="flex items-center">
            <Image src="/logo.png" alt="Deprem Hattı" width={1448} height={1086} className="object-contain" style={{ height: '32px', width: 'auto' }} />
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
