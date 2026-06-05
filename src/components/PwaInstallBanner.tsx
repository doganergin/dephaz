'use client';
import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'dh_pwa_dismissed';

export default function PwaInstallBanner() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (localStorage.getItem(DISMISS_KEY) === '1') return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setVisible(true), 4000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!visible || !deferredPrompt) return null;

  async function install() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setVisible(false);
    setDeferredPrompt(null);
  }

  function dismiss() {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, '1');
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 shadow-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
          <Download size={20} className="text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[var(--foreground)]">
            {TR ? 'Uygulamayı Yükle' : 'Install App'}
          </p>
          <p className="text-[11px] text-[var(--muted)]">
            {TR ? 'Ana ekrana ekle, hızlı aç' : 'Add to home screen for quick access'}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={install}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
          >
            {TR ? 'Yükle' : 'Install'}
          </button>
          <button
            onClick={dismiss}
            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Kapat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
