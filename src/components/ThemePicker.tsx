'use client';
import { useState, useEffect } from 'react';
import { Palette, Check, X } from 'lucide-react';
import { DARK_PALETTES, applyPalette, clearPalette, PALETTE_KEY } from '@/lib/palettes';
import type { DarkPalette } from '@/lib/palettes';
import { useLanguage } from '@/contexts/LanguageContext';

function isDarkMode() {
  return document.documentElement.classList.contains('dark') ||
         document.documentElement.classList.contains('black');
}

interface MiniPreviewProps { palette: DarkPalette; selected: boolean; onClick: () => void; }

function MiniPreview({ palette, selected, onClick }: MiniPreviewProps) {
  return (
    <button
      onClick={onClick}
      style={{ background: palette.background }}
      className={`relative rounded-xl p-2.5 border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
        selected ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-transparent hover:border-white/20'
      }`}
    >
      {/* Mini kart önizlemesi */}
      <div
        style={{ background: palette.cardBg, borderColor: palette.border }}
        className="rounded-lg p-2 border mb-2"
      >
        {/* Fake header */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
          <div style={{ background: palette.foreground, opacity: 0.7 }} className="h-1.5 rounded-full flex-1" />
        </div>
        {/* Fake content lines */}
        <div style={{ background: palette.muted, opacity: 0.5 }} className="h-1 rounded-full w-full mb-1.5" />
        <div style={{ background: palette.muted, opacity: 0.35 }} className="h-1 rounded-full w-3/4 mb-1.5" />
        {/* Fake badge */}
        <div className="flex gap-1 mt-2">
          <div className="h-3 w-8 rounded-md bg-red-500/70" />
          <div style={{ background: palette.border }} className="h-3 w-10 rounded-md" />
        </div>
      </div>

      <p style={{ color: palette.foreground }} className="text-[10px] font-bold text-center leading-tight">
        {palette.name}
      </p>

      {selected && (
        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow">
          <Check size={10} strokeWidth={3} color="white" />
        </div>
      )}
    </button>
  );
}

export default function ThemePicker() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('zinc');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(PALETTE_KEY);
    if (saved) {
      try { setSelectedId(JSON.parse(saved).id); } catch { /* */ }
    }
    // Sadece dark/black modda göster
    const check = () => setVisible(isDarkMode());
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  function select(palette: DarkPalette) {
    setSelectedId(palette.id);
    applyPalette(palette);
    localStorage.setItem(PALETTE_KEY, JSON.stringify(palette));
  }

  function reset() {
    setSelectedId('zinc');
    clearPalette();
    localStorage.removeItem(PALETTE_KEY);
  }

  return (
    <>
      {/* Trigger butonu */}
      <button
        onClick={() => setOpen(true)}
        title={TR ? 'Renk teması seç' : 'Choose color theme'}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:text-gray-300 transition-colors"
      >
        <Palette size={16} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-[var(--card-bg)] border-t border-[var(--border)] rounded-t-3xl p-5 max-w-lg mx-auto shadow-2xl">
          {/* Handle */}
          <div className="w-10 h-1 bg-[var(--border)] rounded-full mx-auto mb-4" />

          {/* Başlık */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                {TR ? 'Koyu Tema Rengi' : 'Dark Theme Color'}
              </p>
              <p className="text-[11px] text-[var(--muted)]">
                {TR ? 'Canlı önizleme ile seç' : 'Pick with live preview'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="text-[11px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-2 py-1 rounded-lg hover:bg-[var(--border)]"
              >
                {TR ? 'Sıfırla' : 'Reset'}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Palette grid */}
          <div className="grid grid-cols-5 gap-2 pb-safe">
            {DARK_PALETTES.map(palette => (
              <MiniPreview
                key={palette.id}
                palette={palette}
                selected={selectedId === palette.id}
                onClick={() => select(palette)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
