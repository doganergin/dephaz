'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Navigation, CheckCircle, ExternalLink } from 'lucide-react';

export default function ToplanmaAlaniPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const [konumAl, setKonumAl] = useState<'idle' | 'loading' | 'done' | 'err'>('idle');
  const [mapsUrl, setMapsUrl] = useState('');

  function konumBul() {
    if (!navigator.geolocation) { setKonumAl('err'); return; }
    setKonumAl('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setMapsUrl(
          `https://www.google.com/maps/search/toplanma+alan%C4%B1/@${lat},${lng},15z`
        );
        setKonumAl('done');
      },
      () => setKonumAl('err'),
      { timeout: 10000 }
    );
  }

  const ipuclari = [
    { tr: 'Park, meydan veya spor alanları resmi toplanma noktasıdır.', en: 'Parks, squares and sports fields are official assembly points.' },
    { tr: 'Bina, ağaç ve elektrik direklerinden uzak durulmalıdır.', en: 'Stay away from buildings, trees and power poles.' },
    { tr: 'Okulunuzun veya belediyenizin belirlediği noktayı önceden öğrenin.', en: 'Learn the point designated by your school or municipality in advance.' },
    { tr: 'Aile planınızdaki buluşma noktasını kaydedin.', en: 'Save the meeting point in your family emergency plan.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Afet Hazırlığı' : 'Disaster Preparedness'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Toplanma Alanı Bul' : 'Find Assembly Area'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Konumunuza en yakın deprem toplanma alanını bulun.'
            : 'Find the nearest earthquake assembly area to your location.'}
        </p>
      </div>

      {/* Konum butonu */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <button
          onClick={konumBul}
          disabled={konumAl === 'loading'}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {konumAl === 'loading' ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Navigation size={16} />
          )}
          {konumAl === 'loading'
            ? (TR ? 'Konum alınıyor...' : 'Getting location...')
            : (TR ? 'Konumumu Kullan' : 'Use My Location')}
        </button>

        {konumAl === 'done' && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <MapPin size={16} />
            {TR ? 'Google Harita\'da Göster' : 'Open in Google Maps'}
            <ExternalLink size={13} />
          </a>
        )}

        {konumAl === 'err' && (
          <p className="text-xs text-red-500 text-center">
            {TR ? 'Konum alınamadı. Tarayıcı izinlerini kontrol edin.' : 'Could not get location. Check browser permissions.'}
          </p>
        )}
      </div>

      {/* e-Devlet linki */}
      <a
        href="https://www.turkiye.gov.tr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-xl px-4 py-3"
      >
        <div>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400">
            {TR ? 'e-Devlet — Resmi Toplanma Alanları' : 'e-Government — Official Assembly Points'}
          </p>
          <p className="text-[11px] text-blue-600/70 dark:text-blue-400/70">turkiye.gov.tr</p>
        </div>
        <ExternalLink size={15} className="text-blue-500 shrink-0" />
      </a>

      {/* İpuçları */}
      <section className="space-y-2">
        <h2 className="text-sm font-bold text-[var(--foreground)]">
          {TR ? 'Toplanma Alanı İpuçları' : 'Assembly Area Tips'}
        </h2>
        {ipuclari.map((tip, i) => (
          <div key={i} className="flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
            <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-[var(--foreground)]">{TR ? tip.tr : tip.en}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
