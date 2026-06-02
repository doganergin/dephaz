'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <footer className="max-w-2xl mx-auto w-full px-4 py-6 border-t border-[var(--border)] space-y-4">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        <Link href="/hakkimizda" className="text-[11px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          {TR ? 'Hakkımızda' : 'About Us'}
        </Link>
        <Link href="/iletisim" className="text-[11px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          {TR ? 'İletişim' : 'Contact'}
        </Link>
        <Link href="/gizlilik" className="text-[11px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          {TR ? 'Gizlilik Politikası' : 'Privacy Policy'}
        </Link>
        <a
          href="https://x.com/DepremHattiResm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          @DepremHattiResm
        </a>
      </div>
      <div className="space-y-1 border-t border-[var(--border)] pt-3">
        <p className="text-[11px] text-[var(--muted)] text-center">
          {TR ? 'Deprem verileri:' : 'Earthquake data:'}{' '}
          <span className="font-medium">Kandilli (KOERI)</span> · <span className="font-medium">AFAD</span> · <span className="font-medium">USGS</span> · {TR ? 'Fay:' : 'Faults:'} <span className="font-medium">MTA</span>
        </p>
        <p className="text-[11px] text-[var(--muted)] text-center">
          ✨ {TR ? 'Yapay Zeka Destekli Analiz' : 'AI-Powered Analysis'} · <span className="font-medium">Claude (Anthropic)</span>
        </p>
        <p className="text-[11px] text-[var(--muted)] text-center">
          © 2026 <span className="font-semibold">Doğan Ergin</span> · {TR ? 'Tüm haklar saklıdır.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
