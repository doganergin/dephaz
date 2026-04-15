'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { tarihselDepremler, type TarihselDeprem, type OncuAciklama } from '@/data/tarihselDepremler';
import { useLanguage } from '@/contexts/LanguageContext';

const TarihselHarita = dynamic(() => import('@/components/TarihselHarita'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[340px] bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
        <span>...</span>
      </div>
    </div>
  ),
});

const ONEM_RENK: Record<TarihselDeprem['onem'], string> = {
  yikici: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400',
  buyuk:  'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400',
  oncu:   'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
};

function buyuklukRenk(mag: number): string {
  if (mag >= 7.5) return '#7F1D1D';
  if (mag >= 7.0) return '#EF4444';
  if (mag >= 6.5) return '#F97316';
  if (mag >= 6.0) return '#F59E0B';
  if (mag >= 5.0) return '#10B981';
  return '#9CA3AF';
}

function formatSayi(n?: number) {
  if (!n) return null;
  return n.toLocaleString('tr-TR');
}

export default function TarihselDepremlerSayfasi() {
  const { t } = useLanguage();
  const [donemFiltre, setDonemFiltre] = useState<'hepsi' | 'osmanli' | 'cumhuriyet'>('hepsi');
  const [onemFiltre, setOnemFiltre] = useState<TarihselDeprem['onem'] | 'hepsi'>('hepsi');
  const [siralama, setSiralama] = useState<'tarih' | 'buyukluk'>('tarih');
  const [secilenId, setSecilenId] = useState<string | null>(null);

  const onemLabel: Record<TarihselDeprem['onem'], string> = {
    yikici: t('tarihselYikici'),
    buyuk:  t('tarihselBuyuk'),
    oncu:   t('tarihselOncu'),
  };

  const donemLabel: Record<TarihselDeprem['donem'], string> = {
    osmanli:     t('tarihselOsmanli'),
    cumhuriyet:  t('tarihselCumhuriyet'),
    modern:      t('tarihselCumhuriyet'),
  };

  const filtrelenmis = tarihselDepremler.filter((d) => {
    if (donemFiltre === 'osmanli' && d.donem !== 'osmanli') return false;
    if (donemFiltre === 'cumhuriyet' && d.donem === 'osmanli') return false;
    if (onemFiltre !== 'hepsi' && d.onem !== onemFiltre) return false;
    return true;
  });

  const sirali = [...filtrelenmis].sort((a, b) =>
    siralama === 'buyukluk' ? b.buyukluk - a.buyukluk : b.yil - a.yil
  );

  const secilen = tarihselDepremler.find((d) => d.id === secilenId) ?? null;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t('tarihselTitle')}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">{t('tarihselSubtitle')}</p>
      </div>

      {/* Filtreler */}
      <div className="space-y-2">
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[10px] text-[var(--muted)] font-semibold uppercase self-center mr-1">{t('tarihselDonemLabel')}</span>
          {([
            { key: 'hepsi' as const,      label: t('tarihselHepsi') },
            { key: 'osmanli' as const,    label: t('tarihselOsmanli') },
            { key: 'cumhuriyet' as const, label: t('tarihselCumhuriyet') },
          ]).map((d) => (
            <button
              key={d.key}
              onClick={() => setDonemFiltre(d.key)}
              className={`px-3 py-1 text-[11px] font-semibold rounded-full border transition-colors ${
                donemFiltre === d.key
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[10px] text-[var(--muted)] font-semibold uppercase self-center mr-1">{t('tarihselTurLabel')}</span>
          {([
            { key: 'hepsi' as const,   label: t('tarihselHepsi') },
            { key: 'yikici' as const,  label: t('tarihselYikici') },
            { key: 'buyuk' as const,   label: t('tarihselBuyuk') },
            { key: 'oncu' as const,    label: t('tarihselOncu') },
          ]).map((o) => (
            <button
              key={o.key}
              onClick={() => setOnemFiltre(o.key)}
              className={`px-3 py-1 text-[11px] font-semibold rounded-full border transition-colors ${
                onemFiltre === o.key
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Harita */}
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm" style={{ height: '340px' }}>
        <TarihselHarita
          depremler={filtrelenmis}
          secilenId={secilenId}
          onSec={setSecilenId}
          buyuklukRenk={buyuklukRenk}
        />
      </div>

      {/* Seçilen deprem detayı */}
      {secilen && (
        <div className="bg-[var(--card-bg)] rounded-2xl border-2 border-red-400 p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-lg font-black" style={{ color: buyuklukRenk(secilen.buyukluk) }}>
                  M{secilen.buyukluk.toFixed(1)}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${ONEM_RENK[secilen.onem]}`}>
                  {onemLabel[secilen.onem]}
                </span>
                <span className="text-[10px] text-[var(--muted)] bg-[var(--bg)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                  {donemLabel[secilen.donem]}
                </span>
              </div>
              <p className="text-sm font-bold text-[var(--foreground)]">{secilen.yer}</p>
              <p className="text-[11px] text-[var(--muted)]">{secilen.tarih} · {secilen.merkezUst}</p>
            </div>
            <button
              onClick={() => setSecilenId(null)}
              className="text-[var(--muted)] hover:text-[var(--foreground)] text-lg shrink-0"
            >
              ✕
            </button>
          </div>

          {/* İstatistikler */}
          {(secilen.olum || secilen.yarali || secilen.yikilanBina) && (
            <div className="grid grid-cols-3 gap-2">
              {secilen.olum != null && secilen.olum > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-red-600 dark:text-red-400 font-semibold">{t('tarihselCanKaybi')}</p>
                  <p className="text-sm font-black text-red-700 dark:text-red-300 mt-0.5">{formatSayi(secilen.olum)}</p>
                </div>
              )}
              {secilen.yarali != null && secilen.yarali > 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold">{t('tarihselYarali')}</p>
                  <p className="text-sm font-black text-orange-700 dark:text-orange-300 mt-0.5">{formatSayi(secilen.yarali)}</p>
                </div>
              )}
              {secilen.yikilanBina != null && secilen.yikilanBina > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{t('tarihselYikilanBina')}</p>
                  <p className="text-sm font-black text-amber-700 dark:text-amber-300 mt-0.5">{formatSayi(secilen.yikilanBina)}</p>
                </div>
              )}
            </div>
          )}

          {/* Etkilenen iller */}
          {secilen.etkilenenSehirler && secilen.etkilenenSehirler.length > 0 && (
            <div>
              <p className="text-[10px] text-[var(--muted)] font-semibold uppercase mb-1.5">{t('tarihselEtkilenenIller')}</p>
              <div className="flex flex-wrap gap-1">
                {secilen.etkilenenSehirler.map((s) => (
                  <span key={s} className="text-[11px] bg-[var(--bg)] border border-[var(--border)] px-2 py-0.5 rounded-full text-[var(--foreground)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Özet */}
          <p className="text-xs text-[var(--muted)] leading-relaxed">{secilen.ozet}</p>

          {/* Öncü açıklamalar */}
          {secilen.oncuAciklamalar && secilen.oncuAciklamalar.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase">
                {t('tarihselNeden')}
              </p>
              {secilen.oncuAciklamalar.map((a: OncuAciklama, i: number) => (
                <div key={i} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                  <p className="text-[11px] font-bold text-[var(--foreground)]">{a.uzman}</p>
                  <p className="text-[10px] text-[var(--muted)] mb-1.5">{a.unvan}</p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed italic">"{a.aciklama}"</p>
                  <a
                    href={a.kaynak}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-500 hover:underline mt-1.5 block"
                  >
                    {a.kaynakEtiket} →
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Kaynak */}
          <a
            href={secilen.kaynak}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-blue-500 hover:underline block"
          >
            {t('tarihselKaynakLabel')} {secilen.kaynakEtiket} →
          </a>
        </div>
      )}

      {/* Liste */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-[var(--muted)] font-semibold uppercase">
            {sirali.length} {t('tarihselListeleniyor')}
          </p>
          <div className="flex gap-1">
            {([
              { key: 'tarih' as const,    label: t('tarihselTariheGore') },
              { key: 'buyukluk' as const, label: t('tarihselBuyuklugeGore') },
            ]).map((s) => (
              <button
                key={s.key}
                onClick={() => setSiralama(s.key)}
                className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border transition-colors ${
                  siralama === s.key
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {sirali.map((d) => (
          <button
            key={d.id}
            onClick={() => setSecilenId(secilenId === d.id ? null : d.id)}
            className={`w-full text-left bg-[var(--card-bg)] rounded-2xl border p-3 transition-colors ${
              secilenId === d.id ? 'border-red-400' : 'border-[var(--border)] hover:border-red-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black shrink-0 text-white"
                style={{ backgroundColor: buyuklukRenk(d.buyukluk) }}
              >
                {d.buyukluk.toFixed(1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                  <p className="text-xs font-bold text-[var(--foreground)]">{d.yer}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${ONEM_RENK[d.onem]}`}>
                    {onemLabel[d.onem]}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--muted)]">{d.tarih}</p>
                {d.olum != null && d.olum > 0 && (
                  <p className="text-[11px] text-red-500 font-semibold mt-0.5">
                    {formatSayi(d.olum)} {t('tarihselCanKaybiSuffix')}
                  </p>
                )}
              </div>
              <span className="text-[var(--muted)] text-xs shrink-0">{secilenId === d.id ? '▲' : '▼'}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-[11px] text-[var(--muted)] leading-relaxed px-1">
        {t('tarihselNot')}
      </p>
    </div>
  );
}
