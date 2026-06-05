'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const GOSTER_SAYFALARI = ['/', '/hakkimizda', '/uzman'];

export default function AtaturkBanner() {
  const pathname = usePathname();
  const [imgHata, setImgHata] = useState(false);

  if (!GOSTER_SAYFALARI.includes(pathname)) return null;

  return (
    <div className="flex items-center gap-2.5 px-1 py-1">
      {!imgHata && (
        <img
          src="/ataturk.jpg"
          alt="Mustafa Kemal Atatürk"
          className="rounded-full object-cover shrink-0 ring-1 ring-[var(--border)]"
          style={{ height: '28px', width: '28px' }}
          onError={() => setImgHata(true)}
        />
      )}
      <p className="text-[11px] text-[var(--muted)] italic leading-tight">
        &ldquo;Hayatta en hakiki mürşit ilimdir.&rdquo;
        <span className="not-italic font-semibold ml-1">— Atatürk</span>
      </p>
    </div>
  );
}
