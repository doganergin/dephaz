'use client';
import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProvinces, getDistricts } from '@/lib/locationHelper';
import { bolgeRiskGetir } from '@/api/riskApi';
import type { BolgeRisk } from '@/types';
import type { Il, Ilce } from '@/types';
import { MapPin, Settings, RefreshCw, AlertTriangle, CheckCircle, LogIn } from 'lucide-react';

const KEY_IL_ID  = 'dh_dash_il_id';
const KEY_IL_AD  = 'dh_dash_il_ad';
const KEY_ILCE_ID = 'dh_dash_ilce_id';
const KEY_ILCE_AD = 'dh_dash_ilce_ad';

interface RecentEq { buyukluk: number; konum: string; tarih: string; derinlik: number; }

function riskRenk(s: number) {
  if (s >= 70) return { text: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/10', bar: 'bg-red-500', border: 'border-red-200 dark:border-red-900/30' };
  if (s >= 40) return { text: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/10', bar: 'bg-amber-500', border: 'border-amber-200 dark:border-amber-900/30' };
  return { text: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/10', bar: 'bg-green-500', border: 'border-green-200 dark:border-green-900/30' };
}

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const [homeIl, setHomeIl] = useState<Il | null>(null);
  const [homeIlce, setHomeIlce] = useState<Ilce | null>(null);
  const [risk, setRisk] = useState<BolgeRisk | null>(null);
  const [recentEqs, setRecentEqs] = useState<RecentEq[]>([]);
  const [riskLoading, setRiskLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Tmp selections while editing
  const [tmpIl, setTmpIl] = useState<Il | null>(null);
  const [tmpIlce, setTmpIlce] = useState<Ilce | null>(null);

  const iller: Il[] = getProvinces();

  // Load saved location
  useEffect(() => {
    if (!isSignedIn) return;
    const ilId  = localStorage.getItem(KEY_IL_ID);
    const ilAd  = localStorage.getItem(KEY_IL_AD);
    const ilceId = localStorage.getItem(KEY_ILCE_ID);
    const ilceAd = localStorage.getItem(KEY_ILCE_AD);
    if (ilId && ilAd && ilceId && ilceAd) {
      setHomeIl({ id: Number(ilId), name: ilAd });
      setHomeIlce({ id: Number(ilceId), name: ilceAd, provinceId: Number(ilId) });
    } else {
      setEditing(true);
    }
  }, [isSignedIn]);

  // Fetch risk + recent quakes when location is set
  useEffect(() => {
    if (!homeIl || !homeIlce) return;
    setRiskLoading(true);
    Promise.allSettled([
      bolgeRiskGetir(homeIl.name, homeIlce.name, ''),
      fetch(`/api/kandilli?limit=10&il=${homeIl.name.toUpperCase()}`),
    ]).then(async ([riskRes, eqRes]) => {
      if (riskRes.status === 'fulfilled') setRisk(riskRes.value);
      if (eqRes.status === 'fulfilled' && eqRes.value.ok) {
        const d = await eqRes.value.json();
        if (Array.isArray(d)) setRecentEqs(d.slice(0, 6));
      }
      setRiskLoading(false);
    });
  }, [homeIl, homeIlce]);

  function saveLocation() {
    if (!tmpIl || !tmpIlce) return;
    localStorage.setItem(KEY_IL_ID,   String(tmpIl.id));
    localStorage.setItem(KEY_IL_AD,   tmpIl.name);
    localStorage.setItem(KEY_ILCE_ID, String(tmpIlce.id));
    localStorage.setItem(KEY_ILCE_AD, tmpIlce.name);
    setHomeIl(tmpIl);
    setHomeIlce(tmpIlce);
    setTmpIl(null);
    setTmpIlce(null);
    setEditing(false);
  }

  if (!isLoaded) return null;

  // Not logged in
  if (!isSignedIn) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
            {TR ? 'Kişisel Alan' : 'Personal Area'}
          </p>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            {TR ? 'Kişisel Dashboard' : 'Personal Dashboard'}
          </h1>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
          <LogIn size={36} className="text-[var(--muted)]" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">
              {TR ? 'Giriş yapmanız gerekiyor' : 'Sign in required'}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              {TR
                ? 'Konumunuzu kaydedin, risk skorunuzu ve bölgenizdeki son depremleri takip edin.'
                : 'Save your location, track your risk score and recent quakes in your area.'}
            </p>
          </div>
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors">
              <LogIn size={15} />
              {TR ? 'Giriş Yap / Kayıt Ol' : 'Sign In / Register'}
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  const ilceler: Ilce[] = tmpIl ? getDistricts(tmpIl.id) : [];
  const r = risk ? riskRenk(risk.riskSkoru) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
            {TR ? 'Kişisel Alan' : 'Personal Area'}
          </p>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            {TR ? `Merhaba, ${user?.firstName ?? 'Kullanıcı'}` : `Hello, ${user?.firstName ?? 'User'}`}
          </h1>
        </div>
        <button
          onClick={() => { setEditing(true); setTmpIl(homeIl); setTmpIlce(homeIlce); }}
          className="p-2 rounded-xl border border-[var(--border)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Settings size={16} className="text-[var(--muted)]" />
        </button>
      </div>

      {/* Konum seçici (editing mod) */}
      {editing && (
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3">
          <p className="text-sm font-bold text-[var(--foreground)]">
            {TR ? 'Ev Konumunu Seç' : 'Choose Home Location'}
          </p>
          <select
            value={tmpIl?.id ?? ''}
            onChange={(e) => {
              const found = iller.find(il => il.id === Number(e.target.value));
              setTmpIl(found ?? null);
              setTmpIlce(null);
            }}
            className="w-full text-sm border border-[var(--border)] rounded-xl px-3 py-2 bg-[var(--card-bg)] text-[var(--foreground)]"
          >
            <option value="">{TR ? 'İl seçin' : 'Select province'}</option>
            {iller.map(il => <option key={il.id} value={il.id}>{il.name}</option>)}
          </select>
          <select
            value={tmpIlce?.id ?? ''}
            onChange={(e) => {
              const found = ilceler.find(ilce => ilce.id === Number(e.target.value));
              setTmpIlce(found ?? null);
            }}
            disabled={!tmpIl}
            className="w-full text-sm border border-[var(--border)] rounded-xl px-3 py-2 bg-[var(--card-bg)] text-[var(--foreground)] disabled:opacity-40"
          >
            <option value="">{TR ? 'İlçe seçin' : 'Select district'}</option>
            {ilceler.map(ilce => <option key={ilce.id} value={ilce.id}>{ilce.name}</option>)}
          </select>
          <button
            onClick={saveLocation}
            disabled={!tmpIl || !tmpIlce}
            className="w-full py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {TR ? 'Kaydet' : 'Save'}
          </button>
        </div>
      )}

      {/* Risk skoru */}
      {!editing && homeIl && homeIlce && (
        <>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <MapPin size={13} />
            <span>{homeIlce.name}, {homeIl.name}</span>
          </div>

          {riskLoading ? (
            <div className="flex items-center justify-center py-10 gap-2 text-[var(--muted)]">
              <RefreshCw size={16} className="animate-spin" />
              <span className="text-sm">{TR ? 'Yükleniyor...' : 'Loading...'}</span>
            </div>
          ) : risk && r ? (
            <>
              {/* Risk kartı */}
              <div className={`border rounded-2xl p-5 space-y-3 ${r.bg} ${r.border}`}>
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">
                  {TR ? 'Deprem Risk Skoru' : 'Earthquake Risk Score'}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className={`text-4xl font-bold tabular-nums ${r.text}`}>{risk.riskSkoru}</p>
                    <p className="text-[11px] text-[var(--muted)]">{TR ? '/ 100' : '/ 100'}</p>
                  </div>
                  <p className={`text-sm font-bold px-3 py-1 rounded-xl ${r.bg} ${r.text}`}>{risk.riskMetni}</p>
                </div>
                <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-2">
                  <div className={`h-2 rounded-full ${r.bar}`} style={{ width: `${risk.riskSkoru}%` }} />
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
                    <p className="text-[var(--muted)]">{TR ? '30 Yıl Olasılık' : '30-yr Prob.'}</p>
                    <p className="font-bold text-[var(--foreground)]">{risk.olasilik30Yil}</p>
                  </div>
                  <div className="bg-white/60 dark:bg-black/20 rounded-lg p-2">
                    <p className="text-[var(--muted)]">{TR ? 'Zemin' : 'Soil'}</p>
                    <p className="font-bold text-[var(--foreground)]">{risk.zemin?.[0]?.ad ?? '—'}</p>
                  </div>
                </div>
              </div>

              {/* Bölgedeki son depremler */}
              {recentEqs.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold text-[var(--foreground)] mb-3">
                    {TR ? `${homeIl.name} — Son Depremler` : `${homeIl.name} — Recent Earthquakes`}
                  </h2>
                  <div className="space-y-1.5">
                    {recentEqs.map((eq, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-3 py-2">
                        <span className={`text-xs font-bold w-10 text-center shrink-0 ${eq.buyukluk >= 4 ? 'text-amber-500' : 'text-[var(--muted)]'}`}>
                          M{eq.buyukluk.toFixed(1)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-[var(--foreground)] truncate">{eq.konum}</p>
                          <p className="text-[10px] text-[var(--muted)]">{eq.tarih} · {eq.derinlik} km</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Hazırlık hatırlatıcı */}
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-[var(--foreground)]">
                  {TR ? 'Hazırlık Hatırlatıcı' : 'Preparedness Reminder'}
                </p>
                {[
                  { tr: '72 saatlik acil çantanı güncelle', en: 'Update your 72-hour emergency kit' },
                  { tr: 'DASK poliçeni kontrol et', en: 'Check your DASK insurance policy' },
                  { tr: 'Aile buluşma noktasını belirle', en: 'Set your family meeting point' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-green-500 shrink-0" />
                    <p className="text-[11px] text-[var(--muted)]">{TR ? item.tr : item.en}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-3">
              <AlertTriangle size={16} className="text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                {TR ? 'Bu ilçe için henüz veri bulunmuyor.' : 'No data available for this district yet.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
