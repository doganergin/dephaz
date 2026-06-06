'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const GOSTER_SAYFALARI = ['/', '/hakkimizda', '/uzman'];

export default function AtaturkBanner() {
  const pathname = usePathname();
  const [imgHata, setImgHata] = useState(false);

  if (!GOSTER_SAYFALARI.includes(pathname)) return null;

  return (
    <div className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
      {!imgHata && (
        <img
          src="/ataturk.jpg"
          alt="Mustafa Kemal Atatürk"
          className="object-cover shrink-0"
          style={{ height: '72px', width: '56px', objectPosition: 'top' }}
          onError={() => setImgHata(true)}
        />
      )}
      <div className="py-3 pr-4">
        <p className="text-[13px] italic font-medium text-[var(--foreground)] leading-snug">
          &ldquo;Hayatta en hakiki mürşit ilimdir.&rdquo;
        </p>
        <p className="text-[11px] text-[var(--muted)] mt-1.5 font-semibold tracking-wide uppercase text-[10px]">
          Mustafa Kemal Atatürk
        </p>
      </div>
    </div>
  );
}
