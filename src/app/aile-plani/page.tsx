'use client';
import { useEffect, useState, useRef } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useLanguage } from '@/contexts/LanguageContext';

interface Kisi { isim: string; telefon: string; iliski: string }
interface Plan {
  contacts: Kisi[];
  bulusmaNoktasi: string;
  bulusmaAdresi: string;
  notlar: string;
  guncellendi: string;
}

const BOŞ_KİŞİ: Kisi = { isim: '', telefon: '', iliski: '' };
const BOŞ_PLAN: Plan = { contacts: [], bulusmaNoktasi: '', bulusmaAdresi: '', notlar: '', guncellendi: '' };

export default function AilePlaniPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';
  const { isLoaded, isSignedIn } = useUser();

  const [plan, setPlan] = useState<Plan>(BOŞ_PLAN);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [kayitMesaj, setKayitMesaj] = useState('');
  const [yeniKisi, setYeniKisi] = useState<Kisi>({ ...BOŞ_KİŞİ });
  const [cantaOzet, setCantaOzet] = useState<{ toplam: number; tamamlanan: number } | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const tamamlanan = JSON.parse(localStorage.getItem('depremCanta') || '[]');
      if (Array.isArray(tamamlanan)) {
        setCantaOzet({ toplam: 86, tamamlanan: tamamlanan.length });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) { setYukleniyor(false); return; }
    fetch('/api/family-plan')
      .then((r) => r.json())
      .then((d) => { if (d && d.contacts) setPlan(d); })
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }, [isLoaded, isSignedIn]);

  async function kaydet() {
    setKaydediliyor(true);
    setKayitMesaj('');
    const guncel = { ...plan, guncellendi: new Date().toLocaleString('tr-TR') };
    try {
      const r = await fetch('/api/family-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guncel),
      });
      if (r.ok) {
        setPlan(guncel);
        setKayitMesaj(TR ? '✅ Plan kaydedildi' : '✅ Plan saved');
      } else {
        setKayitMesaj(TR ? '❌ Kayıt başarısız' : '❌ Save failed');
      }
    } catch {
      setKayitMesaj(TR ? '❌ Ağ hatası' : '❌ Network error');
    }
    setKaydediliyor(false);
    setTimeout(() => setKayitMesaj(''), 3000);
  }

  function kisiEkle() {
    if (!yeniKisi.isim.trim() || !yeniKisi.telefon.trim()) return;
    setPlan((p) => ({ ...p, contacts: [...p.contacts, { ...yeniKisi }] }));
    setYeniKisi({ ...BOŞ_KİŞİ });
  }

  function kisiSil(i: number) {
    setPlan((p) => ({ ...p, contacts: p.contacts.filter((_, idx) => idx !== i) }));
  }

  if (!isLoaded || yukleniyor) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-5">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-3xl">
          👨‍👩‍👧
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)] mb-2">
            {TR ? 'Aile Acil Durum Planı' : 'Family Emergency Plan'}
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
            {TR
              ? 'Planınızı kaydetmek ve her cihazdan erişmek için giriş yapın.'
              : 'Sign in to save your plan and access it from any device.'}
          </p>
        </div>
        <SignInButton mode="modal">
          <button className="bg-red-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-red-700 transition-colors">
            {TR ? 'Giriş Yap / Kayıt Ol' : 'Sign In / Sign Up'}
          </button>
        </SignInButton>
        <p className="text-[11px] text-[var(--muted)]">
          {TR ? 'Ücretsiz hesap — veri yalnızca sizinle paylaşılır' : 'Free account — data shared only with you'}
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          nav, header, footer, .no-print { display: none !important; }
        }
      `}</style>

      <div className="space-y-5" ref={printRef}>
        {/* Başlık */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">
              👨‍👩‍👧 {TR ? 'Aile Acil Durum Planı' : 'Family Emergency Plan'}
            </h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">
              {TR ? 'Deprem anında ailenizle nasıl iletişime geçeceğinizi planlayın.' : 'Plan how to contact your family during an earthquake.'}
            </p>
            {plan.guncellendi && (
              <p className="text-[11px] text-[var(--muted)] mt-1">
                {TR ? 'Son kayıt:' : 'Last saved:'} {plan.guncellendi}
              </p>
            )}
          </div>
          <div className="flex gap-2 shrink-0 no-print">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              🖨️ {TR ? 'Yazdır' : 'Print'}
            </button>
            <button
              onClick={kaydet}
              disabled={kaydediliyor}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {kaydediliyor ? '…' : (TR ? 'Kaydet' : 'Save')}
            </button>
          </div>
        </div>

        {kayitMesaj && (
          <div className="text-sm font-semibold text-center py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] no-print">
            {kayitMesaj}
          </div>
        )}

        {/* Acil İletişim Kişileri */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-4 glow-card glow-red">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-sm">📞</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Acil İletişim Kişileri' : 'Emergency Contacts'}</h2>
          </div>

          {plan.contacts.length === 0 && (
            <p className="text-xs text-[var(--muted)] italic">
              {TR ? 'Henüz kişi eklenmedi.' : 'No contacts added yet.'}
            </p>
          )}

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
                <button
                  onClick={() => kisiSil(i)}
                  className="text-[var(--muted)] hover:text-red-500 text-sm transition-colors no-print"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2 no-print">
            <div className="grid grid-cols-3 gap-2">
              <input
                value={yeniKisi.isim}
                onChange={(e) => setYeniKisi((p) => ({ ...p, isim: e.target.value }))}
                placeholder={TR ? 'İsim' : 'Name'}
                className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-red-400"
              />
              <input
                value={yeniKisi.telefon}
                onChange={(e) => setYeniKisi((p) => ({ ...p, telefon: e.target.value }))}
                placeholder={TR ? 'Telefon' : 'Phone'}
                type="tel"
                className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-red-400"
              />
              <input
                value={yeniKisi.iliski}
                onChange={(e) => setYeniKisi((p) => ({ ...p, iliski: e.target.value }))}
                placeholder={TR ? 'İlişki' : 'Relation'}
                className="text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-lg px-2.5 py-2 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-red-400"
              />
            </div>
            <button
              onClick={kisiEkle}
              className="w-full py-2 text-xs font-semibold border border-dashed border-red-300 dark:border-red-800 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              + {TR ? 'Kişi Ekle' : 'Add Contact'}
            </button>
          </div>
        </section>

        {/* Buluşma Noktası */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3 glow-card glow-blue">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-sm">📍</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Buluşma Noktası' : 'Meeting Point'}</h2>
          </div>
          <p className="text-[11px] text-[var(--muted)]">
            {TR
              ? 'Evinize dönmek güvenli olmayabilir. Tüm aile üyelerinin bileceği bir nokta belirleyin.'
              : 'It may not be safe to return home. Choose a point everyone in the family knows.'}
          </p>
          <input
            value={plan.bulusmaNoktasi}
            onChange={(e) => setPlan((p) => ({ ...p, bulusmaNoktasi: e.target.value }))}
            placeholder={TR ? 'Örn: Mahalledeki parkın girişi, okul bahçesi…' : 'E.g. Park entrance, school yard…'}
            className="w-full text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-xl px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-blue-400"
          />
          <input
            value={plan.bulusmaAdresi}
            onChange={(e) => setPlan((p) => ({ ...p, bulusmaAdresi: e.target.value }))}
            placeholder={TR ? 'Tam adres (opsiyonel)' : 'Full address (optional)'}
            className="w-full text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-xl px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-blue-400"
          />
        </section>

        {/* Deprem Çantası Özeti */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3 glow-card glow-amber">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-sm">🎒</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? '72 Saatlik Çanta Durumu' : '72-Hour Kit Status'}</h2>
          </div>
          {cantaOzet && cantaOzet.tamamlanan > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">
                  {cantaOzet.tamamlanan} / {cantaOzet.toplam} {TR ? 'eşya' : 'items'}
                </span>
                <span className="font-bold text-[var(--foreground)]">
                  {TR ? `%${Math.round((cantaOzet.tamamlanan / cantaOzet.toplam) * 100)}` : `${Math.round((cantaOzet.tamamlanan / cantaOzet.toplam) * 100)}%`}
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: `${Math.round((cantaOzet.tamamlanan / cantaOzet.toplam) * 100)}%`,
                    backgroundColor: cantaOzet.tamamlanan === cantaOzet.toplam ? '#10B981' : cantaOzet.tamamlanan > 40 ? '#F59E0B' : '#EF4444',
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-amber-600 dark:text-amber-400">
              {TR ? '⚠️ Çanta listesini henüz doldurmadınız.' : '⚠️ You haven\'t filled out the kit checklist yet.'}
            </p>
          )}
          <a href="/canta" className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline no-print">
            {TR ? 'Çanta listesine git →' : 'Go to kit checklist →'}
          </a>
        </section>

        {/* Notlar */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3 glow-card glow-green">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-sm">📝</span>
            <h2 className="text-sm font-bold text-[var(--foreground)]">{TR ? 'Ek Notlar' : 'Additional Notes'}</h2>
          </div>
          <textarea
            value={plan.notlar}
            onChange={(e) => setPlan((p) => ({ ...p, notlar: e.target.value }))}
            rows={4}
            placeholder={TR
              ? 'Özel bilgiler, ilaçlar, komşu iletişimleri, alternatif buluşma noktası…'
              : 'Special info, medications, neighbour contacts, alternative meeting point…'}
            className="w-full text-xs border border-[var(--border)] bg-[var(--card-bg)] rounded-xl px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-green-400 resize-none"
          />
        </section>

        {/* Alt butonlar */}
        <div className="flex gap-3 no-print">
          <button
            onClick={kaydet}
            disabled={kaydediliyor}
            className="flex-1 py-3 text-sm font-bold bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {kaydediliyor ? (TR ? 'Kaydediliyor…' : 'Saving…') : (TR ? '💾 Planı Kaydet' : '💾 Save Plan')}
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-3 text-sm font-semibold border border-[var(--border)] bg-[var(--card-bg)] text-[var(--muted)] rounded-2xl hover:text-[var(--foreground)] transition-colors"
          >
            🖨️
          </button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
          <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">💡 {TR ? 'İpucu:' : 'Tip:'}</span>{' '}
            {TR
              ? 'Planı yazdırıp buzdolabına yapıştırın. Deprem anında telefonlar çalışmayabilir.'
              : 'Print the plan and stick it on the fridge. Phones may not work during an earthquake.'}
          </p>
        </div>
      </div>
    </>
  );
}
