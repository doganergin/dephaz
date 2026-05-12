'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useLanguage } from '@/contexts/LanguageContext';

const BulusmaHaritasi = dynamic(() => import('@/components/BulusmaHaritasi'), { ssr: false });

interface Kisi { isim: string; telefon: string; iliski: string }
interface Uye  { isim: string; iliski: string; konum: string; telefon: string }
interface Plan {
  contacts: Kisi[];
  uyeler: Uye[];
  bulusmaNoktasi: string;
  bulusmaAdresi: string;
  bulusmaLat?: number;
  bulusmaLon?: number;
  notlar: string;
  guncellendi: string;
}

const BOŞ_KİŞİ: Kisi = { isim: '', telefon: '', iliski: '' };
const BOŞ_UYE: Uye   = { isim: '', iliski: '', konum: '', telefon: '' };
const BOŞ_PLAN: Plan  = { contacts: [], uyeler: [], bulusmaNoktasi: '', bulusmaAdresi: '', notlar: '', guncellendi: '' };

function tamamlanmaSkoru(plan: Plan, canta: { toplam: number; tamamlanan: number } | null): number {
  let skor = 0;
  if (plan.contacts.length >= 1) skor += 15;
  if (plan.contacts.length >= 2) skor += 10;
  if (plan.uyeler.length >= 1)   skor += 10;
  if (plan.bulusmaNoktasi.trim()) skor += 15;
  if (plan.bulusmaLat && plan.bulusmaLon) skor += 20;
  if (plan.notlar.trim())         skor += 10;
  if (canta && canta.tamamlanan > 0) skor += Math.round((canta.tamamlanan / canta.toplam) * 20);
  return Math.min(skor, 100);
}

export default function AilePlaniPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const { isLoaded, isSignedIn } = useUser();

  const [plan, setPlan]               = useState<Plan>(BOŞ_PLAN);
  const [yukleniyor, setYukleniyor]   = useState(true);
  const [kaydediliyor, setKaydedil]   = useState(false);
  const [kayitMesaj, setKayitMesaj]   = useState('');
  const [yeniKisi, setYeniKisi]       = useState<Kisi>({ ...BOŞ_KİŞİ });
  const [yeniUye, setYeniUye]         = useState<Uye>({ ...BOŞ_UYE });
  const [cantaOzet, setCantaOzet]     = useState<{ toplam: number; tamamlanan: number } | null>(null);
  const [kartGoster, setKartGoster]   = useState(false);
  const [konumAliniyor, setKonumAl]   = useState(false);
  const [mevcutKonum, setMevcutKonum] = useState<{ lat: number; lon: number } | null>(null);
  const [konumHatasi, setKonumHatasi] = useState('');
  const [paylasildı, setPaylasıldi]   = useState(false);

  useEffect(() => {
    try {
      const t = JSON.parse(localStorage.getItem('depremCanta') || '[]');
      if (Array.isArray(t)) setCantaOzet({ toplam: 86, tamamlanan: t.length });
    } catch {}
  }, []);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) { setYukleniyor(false); return; }
    fetch('/api/family-plan')
      .then((r) => r.json())
      .then((d) => { if (d && d.contacts) setPlan({ ...BOŞ_PLAN, ...d }); })
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }, [isLoaded, isSignedIn]);

  async function kaydet() {
    setKaydedil(true);
    setKayitMesaj('');
    const guncel = { ...plan, guncellendi: new Date().toLocaleString('tr-TR') };
    try {
      const r = await fetch('/api/family-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guncel),
      });
      if (r.ok) { setPlan(guncel); setKayitMesaj(TR ? '✅ Kaydedildi' : '✅ Saved'); }
      else setKayitMesaj(TR ? '❌ Hata' : '❌ Error');
    } catch { setKayitMesaj(TR ? '❌ Ağ hatası' : '❌ Network error'); }
    setKaydedil(false);
    setTimeout(() => setKayitMesaj(''), 3000);
  }

  function kisiEkle() {
    if (!yeniKisi.isim.trim() || !yeniKisi.telefon.trim()) return;
    setPlan((p) => ({ ...p, contacts: [...p.contacts, { ...yeniKisi }] }));
    setYeniKisi({ ...BOŞ_KİŞİ });
  }

  function konumuAl() {
    setKonumAl(true);
    setKonumHatasi('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMevcutKonum({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setKonumAl(false);
      },
      () => {
        setKonumHatasi(TR ? 'Konum alınamadı. Tarayıcı iznini kontrol edin.' : 'Could not get location. Check browser permissions.');
        setKonumAl(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function konumuPaylas() {
    if (!mevcutKonum) return;
    const { lat, lon } = mevcutKonum;
    const mapsUrl = `https://maps.google.com/?q=${lat.toFixed(6)},${lon.toFixed(6)}`;
    const metin = TR
      ? `🆘 Deprem anı konumum:\n${mapsUrl}`
      : `🆘 My earthquake location:\n${mapsUrl}`;
    if (navigator.share) {
      await navigator.share({ title: TR ? 'Deprem Konumum' : 'My Earthquake Location', text: metin });
    } else {
      await navigator.clipboard.writeText(metin);
      setPaylasıldi(true);
      setTimeout(() => setPaylasıldi(false), 2500);
    }
  }

  function uyeEkle() {
    if (!yeniUye.isim.trim()) return;
    setPlan((p) => ({ ...p, uyeler: [...(p.uyeler ?? []), { ...yeniUye }] }));
    setYeniUye({ ...BOŞ_UYE });
  }

  const skor = tamamlanmaSkoru(plan, cantaOzet);
  const skorRenk = skor >= 80 ? '#10B981' : skor >= 50 ? '#F59E0B' : '#EF4444';

  if (!isLoaded || yukleniyor) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isSignedIn) return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-5">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-3xl">👨‍👩‍👧</div>
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)] mb-2">{TR ? 'Aile Acil Durum Planı' : 'Family Emergency Plan'}</h1>
        <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
          {TR ? 'Planınızı kaydetmek ve her cihazdan erişmek için giriş yapın.' : 'Sign in to save your plan and access it from any device.'}
        </p>
      </div>
      <SignInButton mode="modal">
        <button className="bg-red-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-red-700 transition-colors">
          {TR ? 'Giriş Yap / Kayıt Ol' : 'Sign In / Sign Up'}
        </button>
      </SignInButton>
      <p className="text-[11px] text-[var(--muted)]">{TR ? 'Ücretsiz hesap' : 'Free account'}</p>
    </div>
  );

  return (
    <>
      <style>{`@media print { nav,header,footer,.no-print{display:none!important} .print-card{page-break-inside:avoid} }`}</style>

      <div className="space-y-5">

        {/* ── Başlık + butonlar ── */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">👨‍👩‍👧 {TR ? 'Aile Acil Durum Planı' : 'Family Emergency Plan'}</h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">{TR ? 'Deprem anında ailenizle nasıl iletişime geçeceğinizi planlayın.' : 'Plan how to contact your family during an earthquake.'}</p>
            {plan.guncellendi && <p className="text-[11px] text-[var(--muted)] mt-1">{TR ? 'Son kayıt:' : 'Last saved:'} {plan.guncellendi}</p>}
          </div>
          <div className="flex gap-2 shrink-0 no-print">
            <button onClick={() => window.print()} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">🖨️</button>
            <button onClick={kaydet} disabled={kaydediliyor} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50">
              {kaydediliyor ? '…' : (TR ? 'Kaydet' : 'Save')}
            </button>
          </div>
        </div>

        {kayitMesaj && <div className="text-sm font-semibold text-center py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] no-print">{kayitMesaj}</div>}

        {/* ── 1. Plan Tamamlanma Skoru ── */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 glow-card glow-green">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-sm">📊</span>
              <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Plan Tamamlanma' : 'Plan Completion'}</h2>
            </div>
            <span className="text-2xl font-black" style={{ color: skorRenk }}>{skor}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div className="h-3 rounded-full transition-all duration-500" style={{ width: `${skor}%`, backgroundColor: skorRenk }} />
          </div>
          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {[
              { label: TR ? '📞 Kişiler' : '📞 Contacts', done: plan.contacts.length >= 2 },
              { label: TR ? '👥 Aile' : '👥 Members',    done: (plan.uyeler ?? []).length >= 1 },
              { label: TR ? '📍 Harita' : '📍 Map',       done: !!(plan.bulusmaLat && plan.bulusmaLon) },
              { label: TR ? '🏷️ Nokta' : '🏷️ Point',      done: !!plan.bulusmaNoktasi.trim() },
              { label: TR ? '📝 Notlar' : '📝 Notes',     done: !!plan.notlar.trim() },
              { label: TR ? '🎒 Çanta' : '🎒 Kit',        done: !!(cantaOzet && cantaOzet.tamamlanan > 20) },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1.5 rounded-lg ${item.done ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-50 dark:bg-gray-800 text-[var(--muted)]'}`}>
                <span>{item.done ? '✓' : '○'}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Acil İletişim Kişileri ── */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-4 glow-card glow-red">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-sm">📞</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Acil İletişim Kişileri' : 'Emergency Contacts'}</h2>
          </div>
          {plan.contacts.length === 0 && <p className="text-xs text-[var(--muted)] italic">{TR ? 'Henüz kişi eklenmedi.' : 'No contacts yet.'}</p>}
          <div className="space-y-2">
            {plan.contacts.map((k, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[var(--foreground)]">{k.isim}</span>
                    <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">{k.iliski}</span>
                  </div>
                  <a href={`tel:${k.telefon}`} className="text-[11px] text-blue-500 font-mono">{k.telefon}</a>
                </div>
                <button onClick={() => setPlan((p) => ({ ...p, contacts: p.contacts.filter((_, j) => j !== i) }))} className="text-[var(--muted)] hover:text-red-500 text-sm no-print">✕</button>
              </div>
            ))}
          </div>
          <div className="space-y-2 no-print">
            <div className="grid grid-cols-3 gap-2">
              {(['isim', 'telefon', 'iliski'] as const).map((f) => (
                <input key={f} value={yeniKisi[f]} onChange={(e) => setYeniKisi((p) => ({ ...p, [f]: e.target.value }))}
                  placeholder={f === 'isim' ? (TR ? 'İsim' : 'Name') : f === 'telefon' ? (TR ? 'Telefon' : 'Phone') : (TR ? 'İlişki' : 'Relation')}
                  type={f === 'telefon' ? 'tel' : 'text'}
                  className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-red-400"
                  onKeyDown={(e) => e.key === 'Enter' && kisiEkle()}
                />
              ))}
            </div>
            <button onClick={kisiEkle} className="w-full py-2 text-xs font-semibold border border-dashed border-red-300 dark:border-red-800 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              + {TR ? 'Kişi Ekle' : 'Add Contact'}
            </button>
          </div>
        </section>

        {/* ── 3. Aile Üyeleri ── */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-4 glow-card glow-purple">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-sm">👥</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Aile Üyeleri & Konumları' : 'Family Members & Locations'}</h2>
          </div>
          <p className="text-[11px] text-[var(--muted)]">{TR ? 'Deprem anında kimin nerede olduğunu bilin.' : 'Know where each family member typically is.'}</p>

          {/* Konum Paylaş */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 space-y-2 no-print">
            <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-300">
              📡 {TR ? 'Anlık Konumunu Paylaş' : 'Share Your Live Location'}
            </p>
            <p className="text-[10px] text-[var(--muted)] leading-relaxed">
              {TR ? 'Deprem anında ailenize şu anki GPS konumunuzu gönderin.' : 'Send your current GPS location to family during an earthquake.'}
            </p>
            {mevcutKonum ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                  {mevcutKonum.lat.toFixed(5)}, {mevcutKonum.lon.toFixed(5)}
                </span>
                <button
                  onClick={konumuPaylas}
                  className="flex items-center gap-1 text-[11px] font-semibold text-white bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {paylasildı ? (TR ? '✅ Kopyalandı' : '✅ Copied') : `📤 ${TR ? 'Paylaş' : 'Share'}`}
                </button>
                <button
                  onClick={() => setMevcutKonum(null)}
                  className="text-[10px] text-[var(--muted)] hover:text-red-500"
                >✕</button>
              </div>
            ) : (
              <button
                onClick={konumuAl}
                disabled={konumAliniyor}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
              >
                {konumAliniyor
                  ? (TR ? '⏳ Alınıyor…' : '⏳ Getting…')
                  : `📍 ${TR ? 'Konumumu Al' : 'Get My Location'}`}
              </button>
            )}
            {konumHatasi && <p className="text-[10px] text-red-500">{konumHatasi}</p>}
          </div>

          {(plan.uyeler ?? []).length === 0 && <p className="text-xs text-[var(--muted)] italic">{TR ? 'Henüz üye eklenmedi.' : 'No members yet.'}</p>}
          <div className="space-y-2">
            {(plan.uyeler ?? []).map((u, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[var(--foreground)]">{u.isim}</span>
                    <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-1.5 py-0.5 rounded-full font-semibold">{u.iliski}</span>
                    {u.konum && <span className="text-[10px] text-[var(--muted)]">📍 {u.konum}</span>}
                  </div>
                  {u.telefon && <a href={`tel:${u.telefon}`} className="text-[11px] text-blue-500 font-mono">{u.telefon}</a>}
                </div>
                <button onClick={() => setPlan((p) => ({ ...p, uyeler: (p.uyeler ?? []).filter((_, j) => j !== i) }))} className="text-[var(--muted)] hover:text-red-500 text-sm no-print">✕</button>
              </div>
            ))}
          </div>
          <div className="space-y-2 no-print">
            <div className="grid grid-cols-2 gap-2">
              <input value={yeniUye.isim} onChange={(e) => setYeniUye((p) => ({ ...p, isim: e.target.value }))} placeholder={TR ? 'İsim' : 'Name'}
                className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-purple-400" />
              <input value={yeniUye.iliski} onChange={(e) => setYeniUye((p) => ({ ...p, iliski: e.target.value }))} placeholder={TR ? 'İlişki (eş, çocuk…)' : 'Relation'}
                className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-purple-400" />
              <input value={yeniUye.konum} onChange={(e) => setYeniUye((p) => ({ ...p, konum: e.target.value }))} placeholder={TR ? 'Normal konum (okul, iş…)' : 'Usual location'}
                className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-purple-400" />
              <input value={yeniUye.telefon} onChange={(e) => setYeniUye((p) => ({ ...p, telefon: e.target.value }))} placeholder={TR ? 'Telefon (opsiyonel)' : 'Phone (optional)'} type="tel"
                className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-purple-400" />
            </div>
            <button onClick={uyeEkle} className="w-full py-2 text-xs font-semibold border border-dashed border-purple-300 dark:border-purple-800 text-purple-500 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
              + {TR ? 'Üye Ekle' : 'Add Member'}
            </button>
          </div>
        </section>

        {/* ── 4. Buluşma Noktası + Harita ── */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3 glow-card glow-blue">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-sm">📍</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Buluşma Noktası' : 'Meeting Point'}</h2>
          </div>
          <p className="text-[11px] text-[var(--muted)]">
            {TR ? 'Haritaya tıklayarak buluşma noktasını işaretleyin, isim de verin.' : 'Click the map to pin the meeting point, then name it.'}
          </p>
          <div className="no-print">
            <BulusmaHaritasi
              lat={plan.bulusmaLat}
              lon={plan.bulusmaLon}
              onChange={(lat, lon) => setPlan((p) => ({ ...p, bulusmaLat: lat, bulusmaLon: lon }))}
            />
          </div>
          {plan.bulusmaLat && plan.bulusmaLon && (
            <p className="text-[10px] text-blue-500 font-mono">
              {plan.bulusmaLat.toFixed(5)}, {plan.bulusmaLon.toFixed(5)}
              <button onClick={() => setPlan((p) => ({ ...p, bulusmaLat: undefined, bulusmaLon: undefined }))} className="ml-2 text-[var(--muted)] hover:text-red-500 no-print">✕</button>
            </p>
          )}
          <input value={plan.bulusmaNoktasi} onChange={(e) => setPlan((p) => ({ ...p, bulusmaNoktasi: e.target.value }))}
            placeholder={TR ? 'Buluşma noktası adı (örn: Parkın girişi)' : 'Meeting point name (e.g. Park entrance)'}
            className="w-full text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-xl px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-blue-400" />
          <input value={plan.bulusmaAdresi} onChange={(e) => setPlan((p) => ({ ...p, bulusmaAdresi: e.target.value }))}
            placeholder={TR ? 'Tam adres (opsiyonel)' : 'Full address (optional)'}
            className="w-full text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-xl px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-blue-400" />
        </section>

        {/* ── 5. Deprem Çantası ── */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3 glow-card glow-amber">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-sm">🎒</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? '72 Saatlik Çanta Durumu' : '72-Hour Kit Status'}</h2>
          </div>
          {cantaOzet && cantaOzet.tamamlanan > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">{cantaOzet.tamamlanan} / {cantaOzet.toplam} {TR ? 'eşya' : 'items'}</span>
                <span className="font-bold">{TR ? `%${Math.round((cantaOzet.tamamlanan / cantaOzet.toplam) * 100)}` : `${Math.round((cantaOzet.tamamlanan / cantaOzet.toplam) * 100)}%`}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                <div className="h-2.5 rounded-full transition-all" style={{ width: `${Math.round((cantaOzet.tamamlanan / cantaOzet.toplam) * 100)}%`, backgroundColor: cantaOzet.tamamlanan > 60 ? '#10B981' : '#F59E0B' }} />
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-amber-600 dark:text-amber-400">⚠️ {TR ? 'Çanta listesini henüz doldurmadınız.' : 'Kit checklist not filled yet.'}</p>
          )}
          <a href="/canta" className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline no-print">{TR ? 'Çanta listesine git →' : 'Go to kit checklist →'}</a>
        </section>

        {/* ── 6. Ek Notlar ── */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3 glow-card glow-green">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-sm">📝</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Ek Notlar' : 'Additional Notes'}</h2>
          </div>
          <textarea value={plan.notlar} onChange={(e) => setPlan((p) => ({ ...p, notlar: e.target.value }))} rows={3}
            placeholder={TR ? 'İlaçlar, komşu telefonu, alternatif buluşma noktası…' : 'Medications, neighbour phone, alternative meeting point…'}
            className="w-full text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-xl px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-green-400 resize-none" />
        </section>

        {/* ── 7. Cüzdan Kartı ── */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3 glow-card glow-orange">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-sm">💳</span>
              <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Cüzdan Acil Kartı' : 'Wallet Emergency Card'}</h2>
            </div>
            <button onClick={() => setKartGoster((v) => !v)} className="text-xs text-orange-500 font-semibold hover:underline no-print">
              {kartGoster ? (TR ? 'Gizle' : 'Hide') : (TR ? 'Göster' : 'Show')}
            </button>
          </div>
          <p className="text-[11px] text-[var(--muted)]">{TR ? 'Cüzdana sığacak küçük acil durum kartı — yazdırıp kesin.' : 'Wallet-sized emergency card — print and cut out.'}</p>

          {kartGoster && (
            <div className="print-card border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-xl p-4 space-y-2" style={{ maxWidth: '340px' }}>
              <div className="flex items-center justify-between border-b border-orange-200 dark:border-orange-800 pb-1.5 mb-1.5">
                <span className="text-xs font-black text-orange-600">🚨 {TR ? 'ACİL DURUM KARTI' : 'EMERGENCY CARD'}</span>
              </div>
              {plan.contacts.slice(0, 3).map((k, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[var(--foreground)]">{k.isim} <span className="text-[var(--muted)] font-normal">({k.iliski})</span></span>
                  <span className="font-mono text-blue-500">{k.telefon}</span>
                </div>
              ))}
              {plan.bulusmaNoktasi && (
                <div className="text-[11px] pt-1 border-t border-orange-200 dark:border-orange-800">
                  <span className="font-semibold text-[var(--foreground)]">📍 {TR ? 'Buluşma:' : 'Meet:'}</span> {plan.bulusmaNoktasi}
                </div>
              )}
              {plan.bulusmaLat && plan.bulusmaLon && (
                <p className="text-[9px] text-[var(--muted)] font-mono">{plan.bulusmaLat.toFixed(4)}, {plan.bulusmaLon.toFixed(4)}</p>
              )}
              <button onClick={() => window.print()} className="w-full mt-1 py-1.5 text-[11px] font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors no-print">
                🖨️ {TR ? 'Yazdır' : 'Print'}
              </button>
            </div>
          )}
        </section>

        {/* ── Alt kaydet butonu ── */}
        <div className="flex gap-3 no-print">
          <button onClick={kaydet} disabled={kaydediliyor} className="flex-1 py-3 text-sm font-bold bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors disabled:opacity-50">
            {kaydediliyor ? (TR ? 'Kaydediliyor…' : 'Saving…') : (TR ? '💾 Planı Kaydet' : '💾 Save Plan')}
          </button>
          <button onClick={() => window.print()} className="px-5 py-3 text-sm font-semibold border border-[var(--border)] bg-[var(--card-bg)] text-[var(--muted)] rounded-2xl hover:text-[var(--foreground)] transition-colors">🖨️</button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
          <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">💡 {TR ? 'İpucu:' : 'Tip:'}</span>{' '}
            {TR ? 'Planı yazdırıp buzdolabına yapıştırın ve cüzdan kartını keserek cüzdanınıza koyun.' : 'Print the plan and stick it on the fridge. Cut out the wallet card and keep it with you.'}
          </p>
        </div>
      </div>
    </>
  );
}
