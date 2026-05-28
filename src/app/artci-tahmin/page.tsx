'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';

function hesapla(mag: number) {
  // Bath Yasası: en büyük artçı ≈ M - 1.2
  const maxArtci = Math.max(mag - 1.2, 1.0);

  // Gutenberg-Richter: her 1 M düşüşte ~10x fazla deprem
  // İlk 30 günde beklenen artçılar (yaklaşık)
  const tablo = [
    { aralik: `M${(mag - 1).toFixed(1)}+`, sayi: 10,   oran: '%100 olasılık' },
    { aralik: `M${(mag - 2).toFixed(1)}+`, sayi: 100,  oran: '%100 olasılık' },
    { aralik: `M${(mag - 3).toFixed(1)}+`, sayi: 1000, oran: 'Çok muhtemel' },
    { aralik: `M${(mag - 4).toFixed(1)}+`, sayi: mag >= 6 ? 10000 : null, oran: mag >= 6 ? 'Muhtemel' : null },
  ].filter(r => r.sayi !== null && parseFloat(r.aralik) >= 1.0);

  // Omori Yasası — zaman dağılımı (yüzde olarak)
  const zamanDagilimi = [
    { sure: '1. Saat',  yuzde: 30 },
    { sure: '1. Gün',   yuzde: 50 },
    { sure: '1. Hafta', yuzde: 75 },
    { sure: '1. Ay',    yuzde: 90 },
    { sure: '1. Yıl',   yuzde: 98 },
  ];

  return { maxArtci, tablo, zamanDagilimi };
}

export default function ArtciTahminPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const [mag, setMag] = useState(5.5);
  const { maxArtci, tablo, zamanDagilimi } = hesapla(mag);

  const seviye = mag >= 7 ? 'red' : mag >= 6 ? 'amber' : mag >= 5 ? 'yellow' : 'blue';
  const seviyeRenk: Record<string, string> = {
    red: 'text-red-600', amber: 'text-amber-600', yellow: 'text-yellow-600', blue: 'text-blue-600',
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Bilimsel Hesaplayıcı' : 'Scientific Calculator'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Artçı Deprem Tahmini' : 'Aftershock Estimator'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Bath Yasası ve Gutenberg-Richter bağıntısına dayalı artçı sarsıntı tahmini.'
            : "Aftershock forecast based on Bath's Law and the Gutenberg-Richter relation."}
        </p>
      </div>

      {/* Büyüklük seçici */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[var(--foreground)]">
            {TR ? 'Ana Deprem Büyüklüğü' : 'Main Shock Magnitude'}
          </p>
          <span className={`text-2xl font-bold tabular-nums ${seviyeRenk[seviye]}`}>
            M{mag.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          min={3.0} max={9.0} step={0.1}
          value={mag}
          onChange={(e) => setMag(parseFloat(e.target.value))}
          className="w-full accent-red-500"
        />
        <div className="flex justify-between text-[10px] text-[var(--muted)]">
          <span>M3.0</span><span>M6.0</span><span>M9.0</span>
        </div>
      </div>

      {/* En büyük artçı */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 flex items-center gap-4">
        <AlertTriangle size={28} className="text-amber-500 shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wide">
            {TR ? 'Beklenen En Büyük Artçı (Bath Yasası)' : "Largest Expected Aftershock (Bath's Law)"}
          </p>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
            M{maxArtci.toFixed(1)}
          </p>
          <p className="text-[11px] text-amber-600/70 dark:text-amber-400/70 mt-0.5">
            {TR ? 'Ana şoktan ~1.2 birim küçük' : '~1.2 units smaller than the main shock'}
          </p>
        </div>
      </div>

      {/* Artçı tablosu */}
      <section>
        <h2 className="text-sm font-bold text-[var(--foreground)] mb-3">
          {TR ? 'İlk 30 Gün — Beklenen Artçı Sayısı' : 'First 30 Days — Expected Aftershock Count'}
        </h2>
        <div className="space-y-2">
          {tablo.map((r) => (
            <div key={r.aralik} className="flex items-center justify-between bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-2.5">
              <span className="text-sm font-bold text-[var(--foreground)]">{r.aralik}</span>
              <div className="text-right">
                <p className="text-sm font-bold text-red-500 tabular-nums">~{r.sayi?.toLocaleString()}</p>
                <p className="text-[10px] text-[var(--muted)]">{r.oran}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zaman dağılımı */}
      <section>
        <h2 className="text-sm font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
          <Clock size={14} className="text-[var(--muted)]" />
          {TR ? 'Omori Yasası — Artçıların Zaman Dağılımı' : "Omori's Law — Aftershock Time Distribution"}
        </h2>
        <div className="space-y-2">
          {zamanDagilimi.map(z => (
            <div key={z.sure} className="flex items-center gap-3">
              <span className="text-[11px] text-[var(--muted)] w-16 shrink-0">{z.sure}</span>
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-red-400 rounded-full transition-all duration-700"
                  style={{ width: `${z.yuzde}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-[var(--foreground)] w-8 text-right">%{z.yuzde}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[var(--muted)] mt-2">
          {TR ? '% = o zamana kadar gerçekleşecek artçıların oranı' : '% = fraction of aftershocks expected by that time'}
        </p>
      </section>

      {/* Uyarı */}
      <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 border border-[var(--border)] rounded-xl p-3">
        <TrendingDown size={16} className="text-[var(--muted)] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[var(--muted)]">
          {TR
            ? 'Bu tahminler istatistiksel modellerdir; gerçek artçılar farklılık gösterebilir. Artçı döneminde güvenli alanlarda kalın ve AFAD uyarılarını takip edin.'
            : 'These estimates are statistical models; actual aftershocks may vary. Stay in safe areas during the aftershock period and follow AFAD warnings.'}
        </p>
      </div>
    </div>
  );
}
