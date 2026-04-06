'use client';
import { useState, useCallback } from 'react';
import { getProvinces, getDistricts, getNeighbourhoods } from '@/lib/locationHelper';
import { useAppStore } from '@/store';
import { bolgeRiskGetir } from '@/api/riskApi';
import { bilimselKaynaklar } from '@/data/bilimselKaynaklar';
import type { BolgeRisk } from '@/types';

function riskRenk(sinif: string) {
  if (sinif === 'yuksek') return { bg: '#FCEBEB', border: '#F09595', text: '#791F1F', bar: '#E24B4A' };
  if (sinif === 'orta') return { bg: '#FAEEDA', border: '#FAC775', text: '#633806', bar: '#EF9F27' };
  return { bg: '#EAF3DE', border: '#C0DD97', text: '#27500A', bar: '#639922' };
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
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
        {badge && (
          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">{badge}</span>
        )}
      </div>
      <select
        value={value ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          onChange(isNaN(Number(v)) || v === '' ? v : Number(v));
        }}
        disabled={disabled}
        className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 bg-white disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="">-- {label} seçin --</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function BolgeAnalizi() {
  const { setIl, setIlce, setMahalle, setBolgeRisk, secilenIl, secilenIlce, secilenMahalle } = useAppStore();
  const [yukleniyor, setYukleniyor] = useState(false);
  const [risk, setRisk] = useState<BolgeRisk | null>(null);
  const [hata, setHata] = useState('');

  const iller = getProvinces().map((il) => ({ value: il.id, label: il.name }));
  const ilceler = secilenIl
    ? getDistricts(secilenIl.id).map((i) => ({ value: i.id, label: i.name }))
    : [];
  const mahalleler = secilenIlce
    ? getNeighbourhoods(secilenIlce.id).map((m) => ({ value: m.id, label: m.name }))
    : [];

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
      setHata('Risk verisi alınamadı.');
    } finally {
      setYukleniyor(false);
    }
  }, [secilenIl, secilenIlce, setMahalle, setBolgeRisk]);

  const renk = risk ? riskRenk(risk.riskSinifi) : null;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Bölge Analizi</h1>
      <p className="text-sm text-gray-500 mb-6">Bulunduğun bölgenin deprem riskini öğren</p>

      <Select label="İl" items={iller} value={secilenIl?.id ?? null} onChange={onIlSec} badge={`${iller.length} il`} />
      <Select label="İlçe" items={ilceler} value={secilenIlce?.id ?? null} onChange={onIlceSec} disabled={!secilenIl} badge={ilceler.length ? `${ilceler.length} ilçe` : undefined} />
      <Select label="Mahalle" items={mahalleler} value={secilenMahalle?.id ?? null} onChange={onMahalleSec} disabled={!secilenIlce} badge={mahalleler.length ? `${mahalleler.length} mahalle` : undefined} />

      {yukleniyor && (
        <div className="flex items-center gap-3 py-8 justify-center">
          <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Risk analizi hesaplanıyor...</span>
        </div>
      )}

      {hata && <p className="text-sm text-red-500 mt-2">{hata}</p>}

      {risk && renk && (
        <div className="mt-2 space-y-5">
          <div className="flex items-center gap-4 rounded-xl border p-4" style={{ backgroundColor: renk.bg, borderColor: renk.border }}>
            <div className="text-center min-w-[56px]">
              <span className="text-5xl font-semibold leading-none" style={{ color: renk.text }}>{risk.riskSkoru}</span>
              <span className="text-xs block" style={{ color: renk.text }}>/100</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base mb-1" style={{ color: renk.text }}>{risk.riskMetni}</p>
              <p className="text-xs leading-relaxed mb-2" style={{ color: renk.text }}>{risk.aciklama}</p>
              <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${risk.riskSkoru}%`, backgroundColor: renk.bar }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { etiket: 'Son 50 yıl', deger: String(risk.depremSayisi), alt: 'deprem' },
              { etiket: 'Fay mesafesi', deger: `${risk.fayMesafe} km`, alt: 'KAF' },
              { etiket: 'Max büyüklük', deger: `Mw ${risk.maxBuyukluk}`, alt: 'tarihi' },
              { etiket: '30 yıl olasılık', deger: `%${risk.olasilik30Yil}`, alt: 'AFAD' },
            ].map((m) => (
              <div key={m.etiket} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">{m.etiket}</p>
                <p className="text-lg font-semibold text-gray-900">{m.deger}</p>
                <p className="text-xs text-gray-400">{m.alt}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mb-2">Zemin yapısı</p>
            <div className="grid grid-cols-3 gap-2">
              {risk.zemin.map((z) => {
                const zr = riskRenk(z.risk);
                return (
                  <div key={z.ad} className="rounded-xl border p-3" style={{ backgroundColor: zr.bg, borderColor: zr.border }}>
                    <p className="text-xs font-semibold" style={{ color: zr.text }}>{z.ad}</p>
                    <p className="text-xl font-semibold my-1" style={{ color: zr.bar }}>%{z.yuzde}</p>
                    <p className="text-[11px]" style={{ color: zr.text }}>{z.aciklama}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mb-3">Bina stoğu</p>
            <div className="space-y-2">
              {risk.binalar.map((b) => (
                <div key={b.donem} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-28 shrink-0">{b.donem}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${b.yuzde}%`, backgroundColor: b.renk }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 w-8 text-right">%{b.yuzde}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mb-2">Tavsiyeler</p>
            <div className="space-y-2">
              {risk.tavsiyeler.map((t, i) => {
                const tr =
                  t.tur === 'acil'
                    ? { bg: '#FCEBEB', dot: '#E24B4A', text: '#791F1F' }
                    : t.tur === 'onemli'
                    ? { bg: '#FAEEDA', dot: '#EF9F27', text: '#633806' }
                    : { bg: '#E6F1FB', dot: '#378ADD', text: '#0C447C' };
                return (
                  <div key={i} className="flex items-start gap-3 rounded-xl p-3" style={{ backgroundColor: tr.bg }}>
                    <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: tr.dot }} />
                    <p className="text-[13px] leading-relaxed" style={{ color: tr.text }}>{t.metin}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Son depremler (Kandilli) */}
          {risk.depremler.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mb-2">
                Son depremler
                <span className="ml-2 text-[10px] normal-case text-gray-300">Kandilli Rasathanesi</span>
              </p>
              <div className="space-y-1.5">
                {risk.depremler.slice(0, 5).map((d, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                    <span className={`text-sm font-bold w-8 text-center ${
                      d.buyukluk >= 6 ? 'text-red-600' : d.buyukluk >= 4 ? 'text-amber-600' : 'text-gray-500'
                    }`}>
                      {d.buyukluk.toFixed(1)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{d.baslik}</p>
                      <p className="text-[11px] text-gray-400">{d.tarih} · {d.derinlik} km derinlik</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bilimsel kaynaklar */}
          {(() => {
            const key = `${risk.il}-${risk.ilce}`;
            const veri = bilimselKaynaklar[key] ?? bilimselKaynaklar[risk.il];
            if (!veri || veri.kaynaklar.length === 0) return null;
            return (
              <div>
                <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mb-2">Bilimsel Kaynaklar</p>
                <div className="space-y-3">
                  {veri.kaynaklar.map((k, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-800">{k.baslik}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{k.yazar} · {k.yil}{k.dergi ? ` · ${k.dergi}` : ''}</p>
                      {k.alinti && (
                        <p className="text-xs text-gray-600 mt-2 italic border-l-2 border-gray-300 pl-2 leading-relaxed">"{k.alinti}"</p>
                      )}
                      {k.link && (
                        <a href={k.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block">
                          Kaynağa git →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="space-y-2 pt-1">
            <a href="/aile-plani" className="block w-full text-center bg-[#1D9E75] text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-[#178a65] transition-colors">
              Aile planı oluştur →
            </a>
            <a href="/canta" className="block w-full text-center border border-gray-200 rounded-xl py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
              72h çanta listesi →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
