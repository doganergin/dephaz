'use client';
import { useState, useCallback } from 'react';
import { getProvinces, getDistricts, getNeighbourhoods } from '@/lib/locationHelper';
import { useAppStore } from '@/store';
import { bolgeRiskGetir } from '@/api/riskApi';
import { bilimselKaynaklar } from '@/data/bilimselKaynaklar';
import { depremAnindaOnlemler } from '@/data/depremOnlemleri';
import { haberler } from '@/data/haberler';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BolgeRisk } from '@/types';

function riskRenk(sinif: string) {
  if (sinif === 'yuksek') return { bg: '#FEF2F2', border: '#FECACA', text: '#7F1D1D', bar: '#EF4444', badge: '#FEE2E2', badgeText: '#991B1B' };
  if (sinif === 'orta') return { bg: '#FFFBEB', border: '#FDE68A', text: '#78350F', bar: '#F59E0B', badge: '#FEF3C7', badgeText: '#92400E' };
  return { bg: '#F0FDF4', border: '#BBF7D0', text: '#14532D', bar: '#22C55E', badge: '#DCFCE7', badgeText: '#166534' };
}

interface SelectProps {
  label: string;
  items: { value: number | string; label: string }[];
  value: number | string | null;
  onChange: (val: number | string) => void;
  disabled?: boolean;
  badge?: string;
  placeholder?: string;
}

function Select({ label, items, value, onChange, disabled, badge, placeholder }: SelectProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">{label}</span>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-[var(--muted)] rounded-full font-medium">{badge}</span>
        )}
      </div>
      <select
        value={value ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          onChange(isNaN(Number(v)) || v === '' ? v : Number(v));
        }}
        disabled={disabled}
        className="w-full border border-[var(--border)] rounded-xl px-3.5 py-3 text-sm text-[var(--foreground)] bg-[var(--card-bg)] disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-colors shadow-sm"
      >
        <option value="">{placeholder ?? `— ${label} seçin —`}</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

function RiskBadge({ sinif, etiket }: { sinif: string; etiket: string }) {
  const r = riskRenk(sinif);
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: r.badge, color: r.badgeText }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.bar }} />
      {etiket}
    </span>
  );
}

// Deprem büyüklük skalası
const SKALA = [
  { range: 'M < 4.0',    renk: '#6B7280', etiket: 'Hissedilmez', etap: 1 },
  { range: 'M 4.0–4.9',  renk: '#10B981', etiket: 'Hafif sarsıntı, hasar yok', etap: 2 },
  { range: 'M 5.0–5.4',  renk: '#F59E0B', etiket: 'Zayıf yapılarda hafif hasar', etap: 3 },
  { range: 'M 5.5–6.0',  renk: '#F97316', etiket: 'Orta hasar, eski binalar risk altında', etap: 4 },
  { range: 'M 6.0–6.5',  renk: '#EF4444', etiket: 'Ciddi hasar', etap: 5 },
  { range: 'M 6.5–7.0',  renk: '#DC2626', etiket: 'Ağır hasar', etap: 6 },
  { range: 'M 7.0+',     renk: '#7F1D1D', etiket: 'Yıkıcı', etap: 7 },
];

function DepremSkalasi({ t }: { t: (k: Parameters<typeof import('@/lib/i18n').t>[0]) => string }) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{t('skalaSectionTitle')}</p>
        <a
          href="https://www.usgs.gov/programs/earthquake-hazards/magnitude-intensity-comparison"
          target="_blank" rel="noopener noreferrer"
          className="text-[10px] text-blue-500 hover:underline"
        >
          USGS →
        </a>
      </div>
      <div className="space-y-1.5">
        {SKALA.map((s) => (
          <div key={s.range} className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: s.renk }}
            />
            <span className="text-[11px] font-bold text-[var(--foreground)] w-20 shrink-0">{s.range}</span>
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(s.etap / 7) * 100}%`, backgroundColor: s.renk }}
              />
            </div>
            <span className="text-[11px] text-[var(--muted)] w-48 shrink-0 text-right">{s.etiket}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[var(--muted)] mt-2">{t('skalaSource')}</p>
    </div>
  );
}

export default function BolgeAnalizi() {
  const { t, lang } = useLanguage();
  const { setIl, setIlce, setMahalle, setBolgeRisk, secilenIl, secilenIlce, secilenMahalle } = useAppStore();
  const [yukleniyor, setYukleniyor] = useState(false);
  const [risk, setRisk] = useState<BolgeRisk | null>(null);
  const [hata, setHata] = useState('');

  const iller = getProvinces().map((il) => ({ value: il.id, label: il.name }));
  const ilceler = secilenIl ? getDistricts(secilenIl.id).map((i) => ({ value: i.id, label: i.name })) : [];
  const mahalleler = secilenIlce ? getNeighbourhoods(secilenIlce.id).map((m) => ({ value: m.id, label: m.name })) : [];

  const onIlSec = useCallback((id: number | string) => {
    const il = getProvinces().find((i) => i.id === id);
    if (il) setIl({ id: il.id, name: il.name });
    setRisk(null); setHata('');
  }, [setIl]);

  const onIlceSec = useCallback((id: number | string) => {
    const ilce = getDistricts(secilenIl!.id).find((i) => i.id === id);
    if (ilce) setIlce({ id: ilce.id, name: ilce.name, provinceId: secilenIl!.id });
    setRisk(null);
  }, [secilenIl, setIlce]);

  const onMahalleSec = useCallback(async (id: number | string) => {
    const mah = getNeighbourhoods(secilenIlce!.id).find((m) => m.id === id);
    if (!mah) return;
    setMahalle({ id: mah.id, name: mah.name, districtId: secilenIlce!.id });
    setYukleniyor(true); setHata('');
    try {
      const data = await bolgeRiskGetir(secilenIl!.name, secilenIlce!.name, mah.name);
      setRisk(data); setBolgeRisk(data);
    } catch {
      setHata(t('error'));
    } finally {
      setYukleniyor(false);
    }
  }, [secilenIl, secilenIlce, setMahalle, setBolgeRisk, t]);

  const renk = risk ? riskRenk(risk.riskSinifi) : null;
  const bilimsel = risk ? (bilimselKaynaklar[`${risk.il}-${risk.ilce}`] ?? bilimselKaynaklar[risk.il]) : null;

  // Risk badge label
  const riskEtiket = risk
    ? risk.riskSkoru >= 90 ? `M5.0–5.5+ ${lang === 'EN' ? 'prob. very high' : 'olasılığı çok yüksek'}`
      : risk.riskSkoru >= 75 ? `M5.0–5.5+ ${lang === 'EN' ? 'prob. high' : 'olasılığı yüksek'}`
      : risk.riskSkoru >= 50 ? `M5.0–5.5+ ${lang === 'EN' ? 'prob. medium-high' : 'olasılığı orta-yüksek'}`
      : risk.riskSkoru >= 35 ? `M5.0–5.5+ ${lang === 'EN' ? 'prob. medium' : 'olasılığı orta'}`
      : `M5.0–5.5+ ${lang === 'EN' ? 'prob. low' : 'olasılığı düşük'}`
    : '';

  return (
    <div className="space-y-4">
      {/* Başlık */}
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t('pageTitle')}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">{t('pageSubtitle')}</p>
      </div>

      {/* Deprem Büyüklük Skalası — her zaman göster */}
      <DepremSkalasi t={t} />

      {/* Seçiciler */}
      <div className="bg-[var(--card-bg)] rounded-2xl p-4 shadow-sm border border-[var(--border)]">
        <Select
          label={t('selectIl')}
          items={iller}
          value={secilenIl?.id ?? null}
          onChange={onIlSec}
          badge={`${iller.length} ${t('badgeSehir')}`}
          placeholder={t('ilSec')}
        />
        <Select
          label={t('selectIlce')}
          items={ilceler}
          value={secilenIlce?.id ?? null}
          onChange={onIlceSec}
          disabled={!secilenIl}
          badge={ilceler.length ? `${ilceler.length} ${t('badgeIlce')}` : undefined}
          placeholder={t('ilceSec')}
        />
        <div className="mb-0">
          <Select
            label={t('selectMahalle')}
            items={mahalleler}
            value={secilenMahalle?.id ?? null}
            onChange={onMahalleSec}
            disabled={!secilenIlce}
            badge={mahalleler.length ? `${mahalleler.length} ${t('badgeMahalle')}` : undefined}
            placeholder={t('mahalleSec')}
          />
        </div>
      </div>

      {yukleniyor && (
        <div className="bg-[var(--card-bg)] rounded-2xl p-8 shadow-sm border border-[var(--border)] flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[var(--muted)]">{t('loading')}</span>
        </div>
      )}

      {hata && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-4 text-sm text-red-600 dark:text-red-400">{hata}</div>
      )}

      {risk && renk && (
        <div className="space-y-3">

          {/* Risk skoru kartı */}
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden">
            <div className="p-4" style={{ backgroundColor: renk.bg }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {risk.mahalle} · {risk.ilce} · {risk.il}
                  </p>
                  <RiskBadge sinif={risk.riskSinifi} etiket={riskEtiket} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold leading-tight" style={{ color: renk.text }}>
                    {risk.riskSkoru >= 90 ? (lang === 'EN' ? 'Very High Risk' : 'Çok Yüksek Risk')
                     : risk.riskSkoru >= 70 ? (lang === 'EN' ? 'High Risk' : 'Yüksek Risk')
                     : risk.riskSkoru >= 40 ? (lang === 'EN' ? 'Medium Risk' : 'Orta Risk')
                     : risk.riskSkoru >= 20 ? (lang === 'EN' ? 'Low-Medium Risk' : 'Düşük-Orta Risk')
                     : (lang === 'EN' ? 'Low Risk' : 'Düşük Risk')}
                  </p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${risk.riskSkoru}%`, backgroundColor: renk.bar }} />
              </div>
              {risk.aciklama && (
                <p className="text-xs mt-2 leading-relaxed" style={{ color: renk.text }}>{risk.aciklama}</p>
              )}
            </div>
            {/* Metrikler */}
            <div className="grid grid-cols-4 divide-x divide-[var(--border)] border-t border-[var(--border)]">
              {[
                { label: t('metricFay'), value: `${risk.fayMesafe} km` },
                { label: t('metricMw'), value: risk.beklenenMax },
                { label: t('metricOlasilik'), value: risk.olasilik30Yil },
                { label: t('metricDepremSayisi'), value: risk.depremler.length > 0 ? String(risk.depremler.length) : '—' },
              ].map((m) => (
                <div key={m.label} className="p-3 text-center">
                  <p className="text-[10px] text-[var(--muted)] leading-tight mb-1">{m.label}</p>
                  <p className="text-xs font-bold text-[var(--foreground)]">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Zemin */}
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
            <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-3">{t('sectionZemin')}</p>
            <div className="space-y-2">
              {risk.zemin.map((z) => {
                const zr = riskRenk(z.risk);
                return (
                  <div key={z.ad} className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 w-28 shrink-0">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: zr.bar }} />
                      <span className="text-xs font-medium text-[var(--foreground)]">{z.ad}</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${z.yuzde}%`, backgroundColor: zr.bar }} />
                    </div>
                    <span className="text-xs font-bold text-[var(--foreground)] w-8 text-right">%{z.yuzde}</span>
                  </div>
                );
              })}
            </div>
            {risk.zemin.map((z) => z.risk === 'yuksek' && (
              <p key={z.ad} className="text-[11px] text-[var(--muted)] mt-2 leading-relaxed">
                <span className="font-semibold">{z.ad}:</span> {z.aciklama}
              </p>
            ))}
          </div>

          {/* Bina stoğu */}
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{t('sectionBina')}</p>
              <a
                href="https://data.tuik.gov.tr/Bulten/Index?p=Bina-Sayimi-2021"
                target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-blue-500 hover:underline"
              >
                TÜİK 2021 →
              </a>
            </div>
            <div className="space-y-2.5">
              {risk.binalar.map((b) => (
                <div key={b.donem} className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)] w-36 shrink-0">{b.donem}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${b.yuzde}%`, backgroundColor: b.renk }} />
                  </div>
                  <span className="text-xs font-bold text-[var(--foreground)] w-8 text-right">%{b.yuzde}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Son depremler */}
          {risk.depremler.length > 0 && (
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{t('hissedilenDepremler')}</p>
                <span className="text-[10px] text-[var(--muted)] bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-full">{t('kandilliLabel')}</span>
              </div>
              <div className="space-y-2">
                {risk.depremler.slice(0, 6).map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[var(--border)] last:border-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                      d.buyukluk >= 6 ? 'bg-red-50 dark:bg-red-900/30 text-red-600' :
                      d.buyukluk >= 4 ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' :
                      'bg-gray-50 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {d.buyukluk.toFixed(1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">{d.baslik}</p>
                      <p className="text-[11px] text-[var(--muted)]">{d.tarih} · {d.derinlik} km</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tavsiyeler */}
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
            <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-3">{t('sectionOneriler')}</p>
            <div className="space-y-2">
              {risk.tavsiyeler.map((tv, i) => {
                const tr =
                  tv.tur === 'acil' ? { bg: '#FEF2F2', dot: '#EF4444', text: '#7F1D1D' } :
                  tv.tur === 'onemli' ? { bg: '#FFFBEB', dot: '#F59E0B', text: '#78350F' } :
                  { bg: '#EFF6FF', dot: '#3B82F6', text: '#1E3A8A' };
                return (
                  <div key={i} className="flex items-start gap-2.5 rounded-xl p-3" style={{ backgroundColor: tr.bg }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: tr.dot }} />
                    <p className="text-xs leading-relaxed" style={{ color: tr.text }}>{tv.metin}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deprem anında ne yapılır */}
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{t('depremAnindaTitle')}</p>
              <span className="text-[10px] text-[var(--muted)]">AFAD · JICA</span>
            </div>
            <div className="space-y-2">
              {depremAnindaOnlemler.map((o) => (
                <div key={o.adim} className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
                  <span className="text-lg shrink-0">{o.ikon}</span>
                  <div>
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-400">
                      {o.adim}. {lang === 'EN' ? o.baslikEN : o.baslik}
                    </p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-500 mt-0.5 leading-relaxed">
                      {lang === 'EN' ? o.aciklamaEN : o.aciklama}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <a
                href="https://www.afad.gov.tr/deprem-oncesi-sirasinda-ve-sonrasinda-yapilmasi-gerekenler"
                target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-blue-500 hover:underline"
              >
                AFAD Kılavuzu →
              </a>
              <span className="text-[var(--muted)] text-[11px]">·</span>
              <a
                href="https://www.usgs.gov/programs/earthquake-hazards/earthquake-safety"
                target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-blue-500 hover:underline"
              >
                USGS Safety →
              </a>
            </div>
          </div>

          {/* Uzman görüşleri */}
          {bilimsel && bilimsel.uzmanGorusleri && bilimsel.uzmanGorusleri.length > 0 && (
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
              <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-3">{t('sectionUzman')}</p>
              <div className="space-y-3">
                {bilimsel.uzmanGorusleri.map((u, i) => (
                  <div key={i} className="border border-[var(--border)] rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-xs font-bold text-[var(--foreground)]">{u.uzman}</p>
                        <p className="text-[11px] text-[var(--muted)]">{u.unvan}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          u.ulke === 'TR' ? 'bg-red-50 dark:bg-red-900/30 text-red-600' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                        }`}>
                          {u.ulke === 'TR' ? '🇹🇷 Yerli' : `🌍 ${u.ulke}`}
                        </span>
                        <span className="text-[10px] text-[var(--muted)]">{u.yil}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--foreground)] leading-relaxed italic border-l-2 border-amber-300 pl-2.5">
                      {u.gorus}
                    </p>
                    {u.kaynak && (
                      <a href={u.kaynak} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-blue-500 hover:text-blue-700 mt-1.5 block">
                        {t('kaynagaGit')}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kaynakça bölümü */}
          {bilimsel && bilimsel.kaynaklar.length > 0 && (
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
              <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-3">{t('kaynakcaTitle')}</p>
              <div className="space-y-3">
                {bilimsel.kaynaklar.map((k, i) => (
                  <div key={i} className="border border-[var(--border)] rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-[11px] text-[var(--muted)] font-semibold">[{i + 1}]</p>
                    <p className="text-xs font-semibold text-[var(--foreground)] leading-snug mt-0.5">{k.baslik}</p>
                    <p className="text-[11px] text-[var(--muted)] mt-1">{k.yazar} · {k.yil}{k.dergi ? ` · ${k.dergi}` : ''}</p>
                    {k.alinti && (
                      <p className="text-[11px] text-[var(--muted)] mt-2 italic border-l-2 border-gray-300 dark:border-gray-600 pl-2.5 leading-relaxed">&ldquo;{k.alinti}&rdquo;</p>
                    )}
                    {k.doi && (
                      <a
                        href={`https://doi.org/${k.doi}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-blue-500 hover:underline mt-1 block"
                      >
                        {t('doiLabel')} {k.doi}
                      </a>
                    )}
                    {k.link && !k.doi && (
                      <a href={k.link} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-blue-500 hover:text-blue-700 mt-1 block">
                        {t('kaynagaGit')}
                      </a>
                    )}
                  </div>
                ))}
                {/* Sabit veri kaynakları */}
                <div className="border border-[var(--border)] rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-xs font-semibold text-[var(--foreground)]">Veri Kaynakları</p>
                  <div className="mt-1.5 space-y-1">
                    {[
                      { ad: 'Kandilli Rasathanesi (KOERI)', link: 'http://www.koeri.boun.edu.tr' },
                      { ad: 'AFAD Türkiye Deprem Tehlike Haritası 2018', link: 'https://deprem.afad.gov.tr' },
                      { ad: 'MTA Aktif Fay Haritası', link: 'https://www.mta.gov.tr' },
                      { ad: 'TÜİK 2021 Bina Sayımı', link: 'https://data.tuik.gov.tr' },
                    ].map((v) => (
                      <a key={v.ad} href={v.link} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-blue-500 hover:underline block">
                        · {v.ad}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bilgi notu */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
            <p className="text-[11px] text-blue-700 dark:text-blue-400 leading-relaxed">
              <span className="font-semibold">{t('notLabel')}</span> {t('notMetin')}
            </p>
          </div>

          {/* Aksiyon butonları */}
          <div className="grid grid-cols-2 gap-2">
            <a href="/aile-plani"
              className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition-colors">
              {t('btnAilePlani')}
            </a>
            <a href="/canta"
              className="flex items-center justify-center gap-2 border border-[var(--border)] bg-[var(--card-bg)] text-[var(--foreground)] rounded-xl py-3 text-sm font-semibold hover:opacity-80 transition-colors">
              {t('btn72hCanta')}
            </a>
          </div>
        </div>
      )}

      {/* Uzman Haberleri — her zaman göster */}
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{t('haberlerTitle')}</p>
          <span className="text-[10px] text-[var(--muted)]">{t('haberlerSubtitle')}</span>
        </div>
        <div className="space-y-3">
          {haberler.map((h, i) => (
            <div key={i} className="border border-[var(--border)] rounded-xl p-3 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-start gap-2 mb-1.5">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[var(--foreground)]">{h.uzman}</p>
                  <p className="text-[11px] text-[var(--muted)]">{h.unvan} · {h.kurum}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    h.kaynak_tur === 'doi' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                  }`}>
                    {h.kaynak_tur === 'doi' ? 'DOI' : h.kaynak_tur === 'kurum' ? 'Resmi' : 'Üniv.'}
                  </span>
                  <span className="text-[10px] text-[var(--muted)]">{h.tarih}</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-[var(--foreground)] mb-1">{h.baslik}</p>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">{h.ozet}</p>
              <a href={h.kaynak} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-blue-500 hover:underline mt-1.5 block">
                {t('kaynagaGit')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
