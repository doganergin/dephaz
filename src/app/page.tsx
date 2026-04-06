'use client';
import { useState, useCallback } from 'react';
import { getProvinces, getDistricts, getNeighbourhoods } from '@/lib/locationHelper';
import { useAppStore } from '@/store';
import { bolgeRiskGetir } from '@/api/riskApi';
import { bilimselKaynaklar } from '@/data/bilimselKaynaklar';
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
}

function Select({ label, items, value, onChange, disabled, badge }: SelectProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">{badge}</span>
        )}
      </div>
      <select
        value={value ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          onChange(isNaN(Number(v)) || v === '' ? v : Number(v));
        }}
        disabled={disabled}
        className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-800 bg-white disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-colors shadow-sm"
      >
        <option value="">— {label} seçin —</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

function RiskBadge({ sinif, skor }: { sinif: string; skor: number }) {
  const r = riskRenk(sinif);
  const etiket = skor >= 90 ? 'Çok Yüksek' : skor >= 75 ? 'Yüksek' : skor >= 50 ? 'Orta-Yüksek' : skor >= 35 ? 'Orta' : 'Düşük';
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: r.badge, color: r.badgeText }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.bar }} />
      {etiket} Risk
    </span>
  );
}

export default function BolgeAnalizi() {
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
      setHata('Veri alınamadı, lütfen tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  }, [secilenIl, secilenIlce, setMahalle, setBolgeRisk]);

  const renk = risk ? riskRenk(risk.riskSinifi) : null;
  const bilimsel = risk ? (bilimselKaynaklar[`${risk.il}-${risk.ilce}`] ?? bilimselKaynaklar[risk.il]) : null;

  return (
    <div className="space-y-4">
      {/* Başlık */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Bölge Analizi</h1>
        <p className="text-sm text-gray-500 mt-0.5">İl, ilçe ve mahalle seçerek deprem risk analizini görüntüle</p>
      </div>

      {/* Seçiciler */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <Select label="İl" items={iller} value={secilenIl?.id ?? null} onChange={onIlSec} badge={`${iller.length} şehir`} />
        <Select label="İlçe" items={ilceler} value={secilenIlce?.id ?? null} onChange={onIlceSec} disabled={!secilenIl} badge={ilceler.length ? `${ilceler.length} ilçe` : undefined} />
        <div className="mb-0">
          <Select label="Mahalle" items={mahalleler} value={secilenMahalle?.id ?? null} onChange={onMahalleSec} disabled={!secilenIlce} badge={mahalleler.length ? `${mahalleler.length} mahalle` : undefined} />
        </div>
      </div>

      {yukleniyor && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Kandilli verisi alınıyor...</span>
        </div>
      )}

      {hata && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-red-600">{hata}</div>
      )}

      {risk && renk && (
        <div className="space-y-3">

          {/* Risk skoru kartı */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4" style={{ backgroundColor: renk.bg }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {risk.mahalle} · {risk.ilce} · {risk.il}
                  </p>
                  <RiskBadge sinif={risk.riskSinifi} skor={risk.riskSkoru} />
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold" style={{ color: renk.text }}>{risk.riskSkoru}</span>
                  <span className="text-sm" style={{ color: renk.text }}>/100</span>
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
            <div className="grid grid-cols-4 divide-x divide-gray-100 border-t border-gray-100">
              {[
                { label: 'Fay mesafesi', value: `${risk.fayMesafe} km` },
                { label: 'Beklenen', value: risk.beklenenMax },
                { label: '30 yıl ihtimal', value: `%${risk.olasilik30Yil}` },
                { label: 'Kayıtlı deprem', value: String(risk.depremSayisi) },
              ].map((m) => (
                <div key={m.label} className="p-3 text-center">
                  <p className="text-[10px] text-gray-400 leading-tight mb-1">{m.label}</p>
                  <p className="text-xs font-bold text-gray-800">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Zemin */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Zemin yapısı</p>
            <div className="space-y-2">
              {risk.zemin.map((z) => {
                const zr = riskRenk(z.risk);
                return (
                  <div key={z.ad} className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 w-28 shrink-0">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: zr.bar }} />
                      <span className="text-xs font-medium text-gray-700">{z.ad}</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${z.yuzde}%`, backgroundColor: zr.bar }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8 text-right">%{z.yuzde}</span>
                  </div>
                );
              })}
            </div>
            {risk.zemin.map((z) => z.risk === 'yuksek' && (
              <p key={z.ad} className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                <span className="font-semibold">{z.ad}:</span> {z.aciklama}
              </p>
            ))}
          </div>

          {/* Bina stoğu */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Bina stoğu</p>
            <div className="space-y-2.5">
              {risk.binalar.map((b) => (
                <div key={b.donem} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-36 shrink-0">{b.donem}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${b.yuzde}%`, backgroundColor: b.renk }} />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-8 text-right">%{b.yuzde}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Son depremler */}
          {risk.depremler.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Son Depremler</p>
                <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Kandilli Rasathanesi</span>
              </div>
              <div className="space-y-2">
                {risk.depremler.slice(0, 6).map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                      d.buyukluk >= 6 ? 'bg-red-50 text-red-600' :
                      d.buyukluk >= 4 ? 'bg-amber-50 text-amber-600' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {d.buyukluk.toFixed(1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{d.baslik}</p>
                      <p className="text-[11px] text-gray-400">{d.tarih} · {d.derinlik} km</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tavsiyeler */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Öneriler</p>
            <div className="space-y-2">
              {risk.tavsiyeler.map((t, i) => {
                const tr =
                  t.tur === 'acil' ? { bg: '#FEF2F2', dot: '#EF4444', text: '#7F1D1D' } :
                  t.tur === 'onemli' ? { bg: '#FFFBEB', dot: '#F59E0B', text: '#78350F' } :
                  { bg: '#EFF6FF', dot: '#3B82F6', text: '#1E3A8A' };
                return (
                  <div key={i} className="flex items-start gap-2.5 rounded-xl p-3" style={{ backgroundColor: tr.bg }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: tr.dot }} />
                    <p className="text-xs leading-relaxed" style={{ color: tr.text }}>{t.metin}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bilimsel kaynaklar */}
          {bilimsel && bilimsel.kaynaklar.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Bilimsel Kaynaklar</p>
              <div className="space-y-3">
                {bilimsel.kaynaklar.map((k, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                    <p className="text-xs font-semibold text-gray-800 leading-snug">{k.baslik}</p>
                    <p className="text-[11px] text-gray-500 mt-1">{k.yazar} · {k.yil}{k.dergi ? ` · ${k.dergi}` : ''}</p>
                    {k.alinti && (
                      <p className="text-[11px] text-gray-600 mt-2 italic border-l-2 border-gray-300 pl-2.5 leading-relaxed">"{k.alinti}"</p>
                    )}
                    {k.doi && (
                      <p className="text-[10px] text-gray-400 mt-1">DOI: {k.doi}</p>
                    )}
                    {k.link && (
                      <a href={k.link} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-blue-500 hover:text-blue-700 mt-1 block">
                        Kaynağa git →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aksiyon butonları */}
          <div className="grid grid-cols-2 gap-2">
            <a href="/aile-plani"
              className="flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition-colors">
              👨‍👩‍👧 Aile Planı
            </a>
            <a href="/canta"
              className="flex items-center justify-center gap-2 border border-gray-200 bg-white text-gray-800 rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 transition-colors">
              🎒 72h Çanta
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
