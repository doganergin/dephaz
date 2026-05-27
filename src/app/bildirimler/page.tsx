'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, BellOff, CheckCircle, CircleAlert, Activity } from 'lucide-react';

type PermState = 'default' | 'granted' | 'denied' | 'unsupported';

const STORAGE_KEY = 'dh_notif_enabled';
const LAST_EQ_KEY = 'dh_last_eq_id';
const MIN_MAG = 4.0;

export default function BildirimlerPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const [perm, setPerm] = useState<PermState>('default');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<string | null>(null);

  useEffect(() => {
    if (!('Notification' in window)) { setPerm('unsupported'); return; }
    setPerm(Notification.permission as PermState);
    setEnabled(localStorage.getItem(STORAGE_KEY) === '1');
  }, []);

  // Deprem kontrol fonksiyonu
  useEffect(() => {
    if (!enabled || perm !== 'granted') return;
    async function kontrol() {
      try {
        const res = await fetch('/api/kandilli?limit=5');
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;
        const en = data[0];
        const id = `${en.tarih}-${en.konum}-${en.buyukluk}`;
        const lastId = localStorage.getItem(LAST_EQ_KEY);
        setLastCheck(new Date().toLocaleTimeString(TR ? 'tr-TR' : 'en-US'));
        if (id !== lastId && en.buyukluk >= MIN_MAG) {
          localStorage.setItem(LAST_EQ_KEY, id);
          new Notification(`M${en.buyukluk.toFixed(1)} — ${en.konum}`, {
            body: TR
              ? `Derinlik: ${en.derinlik} km · ${en.tarih} · Kaynak: Kandilli`
              : `Depth: ${en.derinlik} km · ${en.tarih} · Source: Kandilli`,
            icon: '/favicon-512.png',
            badge: '/favicon-32.png',
          });
        }
      } catch { /* sessiz geç */ }
    }
    kontrol();
    const interval = setInterval(kontrol, 5 * 60 * 1000); // 5 dakikada bir
    return () => clearInterval(interval);
  }, [enabled, perm, TR]);

  async function izinIste() {
    if (!('Notification' in window)) return;
    setLoading(true);
    const result = await Notification.requestPermission();
    setPerm(result as PermState);
    if (result === 'granted') {
      setEnabled(true);
      localStorage.setItem(STORAGE_KEY, '1');
      new Notification(TR ? 'Deprem Hattı Bildirimleri Açık' : 'Deprem Hattı Notifications On', {
        body: TR ? `M${MIN_MAG}+ depremler için bildirim alacaksınız.` : `You will receive alerts for M${MIN_MAG}+ earthquakes.`,
        icon: '/favicon-512.png',
      });
    }
    setLoading(false);
  }

  function toggle() {
    const yeni = !enabled;
    setEnabled(yeni);
    localStorage.setItem(STORAGE_KEY, yeni ? '1' : '0');
  }

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Anlık Uyarılar' : 'Real-Time Alerts'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Deprem Bildirimleri' : 'Earthquake Notifications'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? `M${MIN_MAG} ve üzeri depremler için tarayıcı bildirimi alın.`
            : `Get browser notifications for M${MIN_MAG}+ earthquakes.`}
        </p>
      </div>

      {/* Durum kartı */}
      {perm === 'unsupported' && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-[var(--border)] rounded-xl p-4 flex items-start gap-3">
          <BellOff size={18} className="text-[var(--muted)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--muted)]">
            {TR ? 'Tarayıcınız bildirim API\'sini desteklemiyor.' : 'Your browser does not support the Notifications API.'}
          </p>
        </div>
      )}

      {perm === 'denied' && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-4 flex items-start gap-3">
          <CircleAlert size={18} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-700 dark:text-red-400">
              {TR ? 'Bildirim izni reddedildi' : 'Notification permission denied'}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {TR
                ? 'Bildirimleri etkinleştirmek için tarayıcı ayarlarından bu siteye izin verin.'
                : 'To enable notifications, allow this site in your browser settings.'}
            </p>
          </div>
        </div>
      )}

      {perm === 'granted' && (
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-green-700 dark:text-green-400">
              {TR ? 'Bildirim izni verildi' : 'Notification permission granted'}
            </p>
            {lastCheck && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                {TR ? `Son kontrol: ${lastCheck}` : `Last check: ${lastCheck}`}
              </p>
            )}
          </div>
          {/* Toggle */}
          <button
            onClick={toggle}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      )}

      {/* İzin butonları */}
      {perm === 'default' && (
        <button
          onClick={izinIste}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <><Bell size={16} /> {TR ? 'Bildirimleri Etkinleştir' : 'Enable Notifications'}</>
          )}
        </button>
      )}

      {/* Nasıl çalışır */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-[var(--foreground)]">
          {TR ? 'Nasıl Çalışır?' : 'How Does It Work?'}
        </h2>
        <div className="space-y-2">
          {[
            {
              icon: Bell,
              tr: 'İzin verin',
              en: 'Grant permission',
              trD: 'Tarayıcı bir kez izin ister.',
              enD: 'The browser asks for permission once.',
            },
            {
              icon: Activity,
              tr: 'Otomatik kontrol',
              en: 'Automatic check',
              trD: `Kandilli verileri 5 dakikada bir kontrol edilir.`,
              enD: `Kandilli data is checked every 5 minutes.`,
            },
            {
              icon: CheckCircle,
              tr: 'Anlık bildirim',
              en: 'Instant notification',
              trD: `M${MIN_MAG}+ deprem tespit edildiğinde ekranınıza bildirim gelir.`,
              enD: `A notification appears when an M${MIN_MAG}+ earthquake is detected.`,
            },
          ].map((item) => (
            <div key={item.tr} className="flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <span className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center shrink-0">
                <item.icon size={15} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">{TR ? item.tr : item.en}</p>
                <p className="text-[11px] text-[var(--muted)]">{TR ? item.trD : item.enD}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[var(--muted)]">
          {TR
            ? '* Bildirimler yalnızca sayfa açıkken veya arka planda iken çalışır. Sekmeyi kapattıktan sonra kontroller durur.'
            : '* Notifications only work while the page is open or in the background. Checks stop after the tab is closed.'}
        </p>
      </section>
    </article>
  );
}
