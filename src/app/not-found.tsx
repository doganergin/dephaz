'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div className="w-20 h-20 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
        <MapPin size={36} className="text-red-500" strokeWidth={1.5} />
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl font-black text-[var(--foreground)] tabular-nums">404</h1>
        <p className="text-lg font-bold text-[var(--foreground)]">
          {TR ? 'Sayfa Bulunamadı' : 'Page Not Found'}
        </p>
        <p className="text-sm text-[var(--muted)] max-w-xs mx-auto leading-relaxed">
          {TR
            ? 'Aradığınız sayfa mevcut değil ya da taşınmış olabilir.'
            : 'The page you\'re looking for doesn\'t exist or may have moved.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Home size={15} />
          {TR ? 'Ana Sayfaya Dön' : 'Go to Home'}
        </Link>
        <Link
          href="/bolge-analizi"
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] text-sm font-bold rounded-xl hover:border-red-300 transition-colors"
        >
          <MapPin size={15} />
          {TR ? 'Risk Analizi' : 'Risk Analysis'}
        </Link>
      </div>
    </div>
  );
}
