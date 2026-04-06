'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store';
import type { AileUyesi, BulusmaNokta, KacisRotasi } from '@/types';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

const ROL_ETIKETLER = { ebeveyn: 'Ebeveyn', cocuk: 'Çocuk', buyukanne: 'Büyükanne/baba', diger: 'Diğer' };
const ROL_RENKLER = {
  ebeveyn: { bg: '#E6F1FB', text: '#0C447C' },
  cocuk: { bg: '#E1F5EE', text: '#085041' },
  buyukanne: { bg: '#FAEEDA', text: '#633806' },
  diger: { bg: '#EEEDFE', text: '#3C3489' },
};

const VARSAYILAN_NOKTALAR: BulusmaNokta[] = [
  { id: '1', ad: 'Birincil buluşma', tur: 'birincil', adres: 'Mahalleniz parkı girişi', latitude: 41.0082, longitude: 28.9784, mesafe: '~500m' },
  { id: '2', ad: 'Yedek buluşma', tur: 'yedek', adres: 'İlçe belediyesi önü', latitude: 41.012, longitude: 28.982, mesafe: '~1.2km' },
];

const VARSAYILAN_ROTALAR: KacisRotasi[] = [
  { id: '1', ad: '1. Rota — Birincil', tur: 'birincil', aciklama: 'Ana cadde üzerinden birincil buluşma noktasına · internet gerekmez', sureDk: 8 },
  { id: '2', ad: '2. Rota — Yedek', tur: 'yedek', aciklama: 'Arka sokaktan alternatif güzergah · yol kapanırsa', sureDk: 14 },
  { id: '3', ad: '3. Rota — Acil', tur: 'acil', aciklama: 'GPS gerektirmez · yollar tamamen kapandığında', sureDk: 20 },
];

type Sekme = 'aile' | 'harita' | 'rotalar';

export default function AilePlaniPage() {
  const { aileUyeleri, bulusmaNoktalari, kacisRotalari, aileUyesiEkle, aileUyesiSil } = useAppStore();
  const [aktifSekme, setAktifSekme] = useState<Sekme>('aile');
  const [modalAcik, setModalAcik] = useState(false);
  const [yeniAd, setYeniAd] = useState('');
  const [yeniTel, setYeniTel] = useState('');
  const [yeniRol, setYeniRol] = useState<AileUyesi['rol']>('ebeveyn');
  const [yeniKonum, setYeniKonum] = useState<AileUyesi['normalKonum']>('ev');
  const [hata, setHata] = useState('');

  const noktalar = bulusmaNoktalari.length ? bulusmaNoktalari : VARSAYILAN_NOKTALAR;
  const rotalar = kacisRotalari.length ? kacisRotalari : VARSAYILAN_ROTALAR;

  function uyeEkle() {
    if (!yeniAd.trim()) { setHata('Ad soyad giriniz'); return; }
    const yeni: AileUyesi = {
      id: Date.now().toString(),
      ad: yeniAd.trim(),
      telefon: yeniTel.trim(),
      rol: yeniRol,
      normalKonum: yeniKonum,
      avatar: yeniAd.trim().split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase(),
    };
    aileUyesiEkle(yeni);
    setYeniAd(''); setYeniTel(''); setHata(''); setModalAcik(false);
  }

  const tabs: { id: Sekme; label: string }[] = [
    { id: 'aile', label: 'Aile üyeleri' },
    { id: 'harita', label: 'Harita' },
    { id: 'rotalar', label: 'Rotalar' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Aile Buluşma Planı</h1>

      {/* Sekme bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setAktifSekme(t.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              aktifSekme === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Aile üyeleri */}
      {aktifSekme === 'aile' && (
        <div>
          <span className="inline-block text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium mb-4">
            {aileUyeleri.length} üye kayıtlı
          </span>

          {aileUyeleri.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-1">Henüz aile üyesi eklenmedi.</p>
              <p className="text-sm text-gray-400">Aşağıdaki butona basarak başlayın.</p>
            </div>
          )}

          <div className="space-y-0 divide-y divide-gray-50">
            {aileUyeleri.map((uye) => {
              const renk = ROL_RENKLER[uye.rol];
              const initials = uye.ad.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase();
              return (
                <div key={uye.id} className="flex items-center gap-3 py-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0" style={{ backgroundColor: renk.bg, color: renk.text }}>
                    {initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{uye.ad}</p>
                    <p className="text-xs text-gray-500">{ROL_ETIKETLER[uye.rol]} · {uye.telefon || 'Telefon girilmedi'}</p>
                  </div>
                  <button
                    onClick={() => aileUyesiSil(uye.id)}
                    className="text-gray-300 hover:text-red-400 text-lg transition-colors px-1"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setModalAcik(true)}
            className="w-full mt-4 border border-dashed border-gray-300 rounded-xl py-3.5 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            + Aile üyesi ekle
          </button>

          <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400 mt-6 mb-3">Deprem anında ne yapılacak?</p>
          <div className="space-y-2">
            {[
              'Sarsıntı durduğunda çıkışa git, asansör kullanma',
              'Binadan çık, açık alana geç',
              'Deprem çantanı al',
              '"Güvendeyim" SMS\'i gönder',
              'Birincil buluşma noktasına git',
              '30 dk sonra haber yoksa yedek noktaya geç',
            ].map((adim, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-blue-700">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{adim}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Harita */}
      {aktifSekme === 'harita' && (
        <div>
          <div className="rounded-xl overflow-hidden border border-gray-100 h-80">
            <LeafletMap noktalar={noktalar} />
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1D9E75]" />
              <span className="text-xs text-gray-600">Birincil buluşma</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#7F77DD]" />
              <span className="text-xs text-gray-600">Yedek buluşma</span>
            </div>
          </div>
        </div>
      )}

      {/* Rotalar */}
      {aktifSekme === 'rotalar' && (
        <div className="space-y-3">
          {rotalar.map((r) => {
            const rr =
              r.tur === 'birincil'
                ? { bg: '#EAF3DE', border: '#639922', text: '#27500A', baslik: '#3B6D11' }
                : r.tur === 'yedek'
                ? { bg: '#E6F1FB', border: '#378ADD', text: '#185FA5', baslik: '#0C447C' }
                : { bg: '#FCEBEB', border: '#E24B4A', text: '#A32D2D', baslik: '#791F1F' };
            return (
              <div key={r.id} className="rounded-xl border-l-4 p-4" style={{ backgroundColor: rr.bg, borderLeftColor: rr.border }}>
                <p className="font-semibold text-sm mb-1" style={{ color: rr.baslik }}>{r.ad}</p>
                <p className="text-sm leading-relaxed" style={{ color: rr.text }}>{r.aciklama}</p>
                <p className="text-xs mt-2" style={{ color: rr.text }}>⏱ ~{r.sureDk} dk yürüyüş</p>
              </div>
            );
          })}
          <div className="bg-amber-50 rounded-xl p-4 mt-2">
            <p className="text-sm font-semibold text-amber-800 mb-1">Önemli not</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Bu rotaları tüm aile ile birlikte yürüyerek pratik yapın. Deprem anında harita ve GPS olmadan bulabilmeniz gerekir.
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalAcik && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Yeni aile üyesi</h2>
              <button onClick={() => setModalAcik(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {hata && <p className="text-sm text-red-500 mb-3">{hata}</p>}

            <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Ad soyad</label>
            <input
              value={yeniAd}
              onChange={(e) => setYeniAd(e.target.value)}
              placeholder="Örn: Ayşe Kaya"
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <label className="block text-xs font-medium text-gray-500 mb-1 mt-4">Telefon</label>
            <input
              value={yeniTel}
              onChange={(e) => setYeniTel(e.target.value)}
              placeholder="05xx xxx xx xx"
              type="tel"
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <label className="block text-xs font-medium text-gray-500 mb-2 mt-4">Rol</label>
            <div className="flex flex-wrap gap-2">
              {(['ebeveyn', 'cocuk', 'buyukanne', 'diger'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setYeniRol(r)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    yeniRol === r ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {ROL_ETIKETLER[r]}
                </button>
              ))}
            </div>

            <label className="block text-xs font-medium text-gray-500 mb-2 mt-4">Normal konumu</label>
            <div className="flex flex-wrap gap-2">
              {(['ev', 'okul', 'is', 'diger'] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setYeniKonum(k)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors capitalize ${
                    yeniKonum === k ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            <button
              onClick={uyeEkle}
              className="w-full mt-6 bg-[#1D9E75] text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-[#178a65] transition-colors"
            >
              Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
