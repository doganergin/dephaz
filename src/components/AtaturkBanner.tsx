'use client';
import { useState } from 'react';

export default function AtaturkBanner() {
  const [imgHata, setImgHata] = useState(false);

  return (
    <div className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-sm">
      {!imgHata && (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Ataturk1930s.jpg/100px-Ataturk1930s.jpg"
          alt="Mustafa Kemal Atatürk"
          referrerPolicy="no-referrer"
          className="rounded-lg object-cover shrink-0"
          style={{ height: '56px', width: '44px' }}
          onError={() => setImgHata(true)}
        />
      )}
      <div>
        <p className="text-[13px] italic font-medium text-[var(--foreground)] leading-snug">
          &ldquo;Hayatta en hakiki mürşit ilimdir.&rdquo;
        </p>
        <p className="text-[11px] text-[var(--muted)] mt-0.5 font-medium">
          — Mustafa Kemal Atatürk
        </p>
      </div>
    </div>
  );
}
