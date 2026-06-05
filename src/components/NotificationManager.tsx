'use client';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const STORAGE_KEY = 'dh_notif_enabled';
const LAST_EQ_KEY = 'dh_last_eq_id';
const MIN_MAG = 4.0;

export default function NotificationManager() {
  const { lang } = useLanguage();
  const EN = lang === 'EN';

  useEffect(() => {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    if (localStorage.getItem(STORAGE_KEY) !== '1') return;

    async function kontrol() {
      try {
        const daRes = await fetch('/api/depremagi?limit=5&minmag=3.0');
        if (daRes.ok) {
          const daData = await daRes.json();
          if (Array.isArray(daData) && daData.length > 0) {
            const eq = daData[0];
            const id = `da-${eq.tarih}-${eq.konum}-${eq.buyukluk}`;
            const lastId = localStorage.getItem(LAST_EQ_KEY);
            if (id !== lastId && eq.buyukluk >= MIN_MAG) {
              localStorage.setItem(LAST_EQ_KEY, id);
              new Notification(`⚡ M${eq.buyukluk.toFixed(1)} — ${eq.konum}`, {
                body: EN
                  ? `Depth: ${eq.derinlik} km · ${eq.tarih} · Preliminary`
                  : `Derinlik: ${eq.derinlik} km · ${eq.tarih} · Ön Veri`,
                icon: '/favicon-512.png',
                badge: '/favicon-32.png',
              });
            }
            return;
          }
        }
        const res = await fetch('/api/kandilli?limit=5');
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;
        const eq = data[0];
        const id = `k-${eq.tarih}-${eq.konum}-${eq.buyukluk}`;
        const lastId = localStorage.getItem(LAST_EQ_KEY);
        if (id !== lastId && eq.buyukluk >= MIN_MAG) {
          localStorage.setItem(LAST_EQ_KEY, id);
          new Notification(`M${eq.buyukluk.toFixed(1)} — ${eq.konum}`, {
            body: EN
              ? `Depth: ${eq.derinlik} km · ${eq.tarih} · Kandilli`
              : `Derinlik: ${eq.derinlik} km · ${eq.tarih} · Kandilli`,
            icon: '/favicon-512.png',
            badge: '/favicon-32.png',
          });
        }
      } catch { /* silent */ }
    }

    kontrol();
    const interval = setInterval(kontrol, 30_000);
    return () => clearInterval(interval);
  }, [EN]);

  return null;
}
