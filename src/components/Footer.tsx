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
