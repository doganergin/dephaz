'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EqItem { buyukluk: number; konum: string; tarih: string; derinlik: number; }

export default function IstatistiklerPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const [data, setData] = useState<EqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [k, a] = await Promise.allSettled([
        fetch('/api/kandilli?limit=150'),
        fetch('/api/afad?limit=150&minmag=1.0'),
      ]);
      const combined: EqItem[] = [];
      if (k.status === 'fulfilled' && k.value.ok) {
        const d = await k.value.json();
        if (Array.isArray(d)) combined.push(...d);
      }
      if (a.status === 'fulfilled' && a.value.ok) {
        const d = await a.value.json();
        if (Array.isArray(d)) combined.push(...d);
      }
      setData(combined.sort((a, b) => b.tarih.localeCompare(a.tarih)));
      setLoading(false);
    }
    load();
  }, []);

  const ranges = [
    { label: 'M5+',  min: 5,   max: 99, color: 'bg-red-500',    text: 'text-red-600' },
    { label: 'M4-5', min: 4,   max: 5,  color: 'bg-amber-500',  text: 'text-amber-600' },
    { label: 'M3-4', min: 3,   max: 4,  color: 'bg-yellow-400', text: 'text-yellow-600' },
    { label: 'M2-3', min: 2,   max: 3,  color: 'bg-blue-400',   text: 'text-blue-600' },
    { label: 'M1-2', min: 1,   max: 2,  color: 'bg-gray-400',   text: 'text-gray-500' },
  ];

  const counts = ranges.map(r => ({
    ...r,
    count: data.filter(d => d.buyukluk >= r.min && d.buyukluk < r.max).length,
  }));
  const maxCount = Math.max(...counts.map(c => c.count), 1);

  const locMap: Record<string, number> = {};
  data.forEach(d => {
    const raw = d.konum ?? '';
    const inParen = raw.match(/\(([^)]+)\)/);
    const loc = inParen ? inParen[1] : raw.split('-').pop()?.trim() ?? raw;
    locMap[loc] = (locMap[loc] ?? 0) + 1;
  });
  const topLocs = Object.entries(locMap).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const total = data.length;
  const m4plus = data.filter(d => d.buyukluk >= 4).length;
  const largest = total ? Math.max(...data.map(d => d.buyukluk)) : 0;
  const avg = total ? data.reduce((s, d) => s + d.buyukluk, 0) / total : 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Veri Analizi' : 'Data Analysis'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Deprem İstatistikleri' : 'Earthquake Statistics'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR ? 'Kandilli ve AFAD son verilerine göre.' : 'Based on latest Kandilli and AFAD data.'}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 gap-2 text-[var(--muted)]">
          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">{TR ? 'Yükleniyor...' : 'Loading...'}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: TR ? 'Toplam Kayıt' : 'Total Records', value: total, cls: 'text-[var(--foreground)]' },
              { label: TR ? 'M4.0+ Deprem'  : 'M4.0+ Quakes',  value: m4plus, cls: 'text-amber-500' },
              { label: TR ? 'En Büyük'      : 'Largest',        value: `M${largest.toFixed(1)}`, cls: 'text-red-500' },
              { label: TR ? 'Ortalama'      : 'Average',        value: `M${avg.toFixed(1)}`,     cls: 'text-[var(--foreground)]' },
            ].map(s => (
              <div key={s.label} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
                <p className="text-[11px] text-[var(--muted)]">{s.label}</p>
                <p className={`text-2xl font-bold tabular-nums ${s.cls}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-3">
              {TR ? 'Büyüklük Dağılımı' : 'Magnitude Distribution'}
            </h2>
            <div className="space-y-2">
              {counts.map(c => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className={`text-[11px] font-bold w-10 shrink-0 ${c.text}`}>{c.label}</span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${c.color}`}
                      style={{ width: `${Math.max((c.count / maxCount) * 100, c.count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[var(--foreground)] w-8 text-right tabular-nums">{c.count}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold text-[var(--foreground)] mb-3">
              {TR ? 'En Aktif Bölgeler' : 'Most Active Regions'}
            </h2>
            <div className="space-y-1.5">
              {topLocs.map(([loc, cnt], i) => (
                <div key={loc} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-3 py-2">
                  <span className="text-[11px] font-bold text-[var(--muted)] w-4">{i + 1}</span>
                  <span className="text-[11px] font-medium text-[var(--foreground)] flex-1 truncate">{loc}</span>
                  <span className="text-[11px] font-bold text-red-500 shrink-0">{cnt} {TR ? 'deprem' : 'quakes'}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="text-[10px] text-[var(--muted)] text-center">
            {TR ? `Son ${total} kayıt analiz edildi · Kandilli + AFAD` : `Analysed ${total} recent records · Kandilli + AFAD`}
          </p>
        </>
      )}
    </div>
  );
}
