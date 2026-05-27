'use client';
import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProvinces, getDistricts } from '@/lib/locationHelper';
import { bolgeRiskGetir } from '@/api/riskApi';
import type { BolgeRisk } from '@/types';
import type { Il, Ilce } from '@/types';
import { Search, ArrowLeftRight } from 'lucide-react';

interface Slot {
  ilId: number | null;
  ilAd: string;
  ilceId: number | null;
  ilceAd: string;
  risk: BolgeRisk | null;
  loading: boolean;
}

const EMPTY: Slot = { ilId: null, ilAd: '', ilceId: null, ilceAd: '', risk: null, loading: false };

function SkorRenk(skor: number) {
  if (skor >= 70) return { text: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/10', bar: 'bg-red-500' };
  if (skor >= 40) return { text: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10', bar: 'bg-amber-500' };
  return { text: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/10', bar: 'bg-green-500' };
}

function BolgeSecici({
  slot, onIlChange, onIlceChange, onAra, label,
}: {
  slot: Slot;
  onIlChange: (il: Il) => void;
  onIlceChange: (ilce: Ilce) => void;
  onAra: () => void;
  label: string;
}) {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const iller: Il[] = getProvinces();
  const ilceler: Ilce[] = slot.ilId !== null ? getDistricts(slot.ilId) : [];

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{label}</p>
      <select
        value={slot.ilId ?? ''}
        onChange={(e) => {
          const found = iller.find((il) => il.id === Number(e.target.value));
          if (found) onIlChange(found);
        }}
        className="w-full text-sm border border-[var(--border)] rounded-xl px-3 py-2 bg-[var(--card-bg)] text-[var(--foreground)]"
      >
        <option value="">{TR ? 'İl seçin' : 'Select province'}</option>
        {iller.map((il) => (
          <option key={il.id} value={il.id}>{il.name}</option>
        ))}
      </select>
      <select
        value={slot.ilceId ?? ''}
        onChange={(e) => {
          const found = ilceler.find((ilce) => ilce.id === Number(e.target.value));
          if (found) onIlceChange(found);
        }}
        disabled={slot.ilId === null}
        className="w-full text-sm border border-[var(--border)] rounded-xl px-3 py-2 bg-[var(--card-bg)] text-[var(--foreground)] disabled:opacity-40"
      >
        <option value="">{TR ? 'İlçe seçin' : 'Select district'}</option>
        {ilceler.map((ilce) => (
          <option key={ilce.id} value={ilce.id}>{ilce.name}</option>
        ))}
      </select>
      <button
        onClick={onAra}
        disabled={slot.ilId === null || slot.ilceId === null || slot.loading}
        className="w-full flex items-center justify-center gap-2 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl disabled:opacity-40 transition-colors"
      >
        {slot.loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <><Search size={14} /> {TR ? 'Analiz Et' : 'Analyse'}</>
        )}
      </button>
    </div>
  );
}

function SkorKart({ label, risk }: { label: string; risk: BolgeRisk }) {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const r = SkorRenk(risk.riskSkoru);

  return (
    <div className={`border rounded-2xl p-4 space-y-3 ${r.bg} border-[var(--border)]`}>
      <p className="text-xs font-bold text-[var(--muted)] uppercase">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] text-[var(--muted)]">{risk.mahalle} · {risk.ilce} · {risk.il}</p>
          <p className={`text-3xl font-bold tabular-nums ${r.text}`}>{risk.riskSkoru}</p>
          <p className="text-[11px] text-[var(--muted)]">{TR ? 'risk skoru / 100' : 'risk score / 100'}</p>
        </div>
        <p className={`text-xs font-bold px-2 py-1 rounded-lg ${r.bg} ${r.text}`}>{risk.riskMetni}</p>
      </div>
      <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${r.bar}`} style={{ width: `${risk.riskSkoru}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-white/60 dark:bg-black/20 rounded-lg p-2">
          <p className="text-[var(--muted)]">{TR ? 'Fay Mesafesi' : 'Fault Distance'}</p>
          <p className="font-bold text-[var(--foreground)]">{risk.fayMesafe} km</p>
        </div>
        <div className="bg-white/60 dark:bg-black/20 rounded-lg p-2">
          <p className="text-[var(--muted)]">{TR ? 'Beklenen Max' : 'Expected Max'}</p>
          <p className="font-bold text-[var(--foreground)]">{risk.beklenenMax}</p>
        </div>
        <div className="bg-white/60 dark:bg-black/20 rounded-lg p-2">
          <p className="text-[var(--muted)]">{TR ? '30 Yıl Olasılık' : '30-yr Probability'}</p>
          <p className="font-bold text-[var(--foreground)]">{risk.olasilik30Yil}</p>
        </div>
        <div className="bg-white/60 dark:bg-black/20 rounded-lg p-2">
          <p className="text-[var(--muted)]">{TR ? 'Zemin' : 'Soil'}</p>
          <p className="font-bold text-[var(--foreground)]">{risk.zemin?.[0]?.ad ?? '—'}</p>
        </div>
      </div>
    </div>
  );
}

export default function KarsilastirPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const [slotA, setSlotA] = useState<Slot>({ ...EMPTY });
  const [slotB, setSlotB] = useState<Slot>({ ...EMPTY });

  const ara = useCallback(async (which: 'A' | 'B') => {
    const slot = which === 'A' ? slotA : slotB;
    const setSlot = which === 'A' ? setSlotA : setSlotB;
    if (!slot.ilAd || !slot.ilceAd) return;
    setSlot((s) => ({ ...s, loading: true, risk: null }));
    try {
      const risk = await bolgeRiskGetir(slot.ilAd, slot.ilceAd, '');
      setSlot((s) => ({ ...s, loading: false, risk }));
    } catch {
      setSlot((s) => ({ ...s, loading: false }));
    }
  }, [slotA, slotB]);

  const kazanan = slotA.risk && slotB.risk
    ? slotA.risk.riskSkoru < slotB.risk.riskSkoru ? 'A' : slotB.risk.riskSkoru < slotA.risk.riskSkoru ? 'B' : 'TIE'
    : null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Bölge Karşılaştırma' : 'Region Comparison'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'İki Bölgeyi Karşılaştır' : 'Compare Two Regions'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR ? 'İki farklı ilçenin deprem risk skorlarını yan yana görün.' : 'See earthquake risk scores of two districts side by side.'}
        </p>
      </div>

      {/* Seçiciler */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4">
          <BolgeSecici
            slot={slotA}
            onIlChange={(il) => setSlotA({ ...EMPTY, ilId: il.id, ilAd: il.name })}
            onIlceChange={(ilce) => setSlotA((s) => ({ ...s, ilceId: ilce.id, ilceAd: ilce.name }))}
            onAra={() => ara('A')}
            label={TR ? 'Birinci Bölge' : 'First Region'}
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <ArrowLeftRight size={14} className="text-[var(--muted)]" />
            <span className="text-xs text-[var(--muted)]">{TR ? 'karşı' : 'vs'}</span>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4">
          <BolgeSecici
            slot={slotB}
            onIlChange={(il) => setSlotB({ ...EMPTY, ilId: il.id, ilAd: il.name })}
            onIlceChange={(ilce) => setSlotB((s) => ({ ...s, ilceId: ilce.id, ilceAd: ilce.name }))}
            onAra={() => ara('B')}
            label={TR ? 'İkinci Bölge' : 'Second Region'}
          />
        </div>
      </div>

      {/* Kazanan banner */}
      {kazanan && (
        <div className={`rounded-xl p-3 text-center text-sm font-bold ${
          kazanan === 'TIE'
            ? 'bg-gray-50 dark:bg-gray-800 text-[var(--muted)]'
            : 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400'
        }`}>
          {kazanan === 'TIE'
            ? (TR ? 'İki bölge eşit risk taşıyor.' : 'Both regions carry equal risk.')
            : kazanan === 'A'
              ? (TR ? `✓ ${slotA.risk?.ilce} daha düşük riskli` : `✓ ${slotA.risk?.ilce} is lower risk`)
              : (TR ? `✓ ${slotB.risk?.ilce} daha düşük riskli` : `✓ ${slotB.risk?.ilce} is lower risk`)
          }
        </div>
      )}

      {/* Sonuç kartları */}
      {(slotA.risk || slotB.risk) && (
        <div className="grid grid-cols-1 gap-3">
          {slotA.risk && <SkorKart label={TR ? 'Birinci Bölge' : 'First Region'} risk={slotA.risk} />}
          {slotB.risk && <SkorKart label={TR ? 'İkinci Bölge' : 'Second Region'} risk={slotB.risk} />}
        </div>
      )}
    </div>
  );
}
