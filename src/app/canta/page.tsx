'use client';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import type { CantaUrun } from '@/types';

const KATEGORILER = {
  su: { ad: 'Su & içecek', emoji: '💧', renk: '#E6F1FB', text: '#0C447C' },
  gida: { ad: 'Gıda', emoji: '🍱', renk: '#EAF3DE', text: '#27500A' },
  ilkYardim: { ad: 'İlk yardım', emoji: '🩹', renk: '#FCEBEB', text: '#791F1F' },
  belgeler: { ad: 'Belgeler', emoji: '📄', renk: '#FAEEDA', text: '#633806' },
  arac: { ad: 'Alet & araç', emoji: '🔦', renk: '#F1EFE8', text: '#5F5E5A' },
  giysi: { ad: 'Giysi', emoji: '👕', renk: '#EEEDFE', text: '#3C3489' },
  iletisim: { ad: 'İletişim', emoji: '📱', renk: '#FAEEDA', text: '#633806' },
} as const;

const VARSAYILAN_LISTE: CantaUrun[] = [
  { id: '1', kategori: 'su', ad: 'İçme suyu', miktar: 'Kişi başı 3 litre/gün (9L)', aciklama: '72 saat için minimum', tamamlandi: false, kritik: true },
  { id: '2', kategori: 'su', ad: 'Su arıtma tableti', miktar: '1 kutu', aciklama: 'Musluk suyu içilemiyorsa', tamamlandi: false, kritik: false },
  { id: '3', kategori: 'gida', ad: 'Enerji barı / bisküvi', miktar: '3 günlük', aciklama: 'Pişirme gerektirmeyen', tamamlandi: false, kritik: true },
  { id: '4', kategori: 'gida', ad: 'Konserve yiyecek', miktar: '6 adet', aciklama: 'Açacak dahil', tamamlandi: false, kritik: true },
  { id: '5', kategori: 'gida', ad: 'Kuru meyve & kuruyemiş', miktar: '500g', aciklama: 'Uzun raf ömrü', tamamlandi: false, kritik: false },
  { id: '6', kategori: 'ilkYardim', ad: 'İlk yardım çantası', miktar: '1 adet', aciklama: 'Tam ekipman', tamamlandi: false, kritik: true },
  { id: '7', kategori: 'ilkYardim', ad: 'Düzenli ilaçlar', miktar: '7 günlük', aciklama: 'Reçeteli ilaçlar dahil', tamamlandi: false, kritik: true },
  { id: '8', kategori: 'ilkYardim', ad: 'Ağrı kesici', miktar: '1 kutu', aciklama: 'Parol / ibuprofen', tamamlandi: false, kritik: false },
  { id: '9', kategori: 'ilkYardim', ad: 'Steril sargi bezi', miktar: '5 adet', aciklama: 'Farklı boyutlar', tamamlandi: false, kritik: false },
  { id: '10', kategori: 'belgeler', ad: 'Kimlik fotokopisi', miktar: 'Hepsi', aciklama: 'Plastik poşette sakla', tamamlandi: false, kritik: true },
  { id: '11', kategori: 'belgeler', ad: 'DASK & sigorta poliçesi', miktar: '1 kopya', aciklama: 'Orijinal veya kopya', tamamlandi: false, kritik: true },
  { id: '12', kategori: 'belgeler', ad: 'Nakit para', miktar: '1000₺ küçük banknot', aciklama: 'ATM çalışmayabilir', tamamlandi: false, kritik: true },
  { id: '13', kategori: 'arac', ad: 'El feneri + yedek pil', miktar: '1 adet', aciklama: 'Şarjlı tercih edilir', tamamlandi: false, kritik: true },
  { id: '14', kategori: 'arac', ad: 'Düdük', miktar: '1 adet', aciklama: 'Enkaz altında sinyal için', tamamlandi: false, kritik: true },
  { id: '15', kategori: 'arac', ad: 'Çakı / multi-tool', miktar: '1 adet', aciklama: 'Çok amaçlı', tamamlandi: false, kritik: false },
  { id: '16', kategori: 'arac', ad: 'Powerbank', miktar: '20.000 mAh', aciklama: 'Telefon şarjı için', tamamlandi: false, kritik: false },
  { id: '17', kategori: 'giysi', ad: 'Yedek kıyafet', miktar: '1 takım', aciklama: 'Mevsime uygun', tamamlandi: false, kritik: false },
  { id: '18', kategori: 'giysi', ad: 'Termal battaniye', miktar: '1 adet', aciklama: 'Katlanır folyo battaniye', tamamlandi: false, kritik: true },
  { id: '19', kategori: 'giysi', ad: 'Kalın çorap & eldiven', miktar: '1 çift', aciklama: 'Enkaz için koruyucu', tamamlandi: false, kritik: false },
  { id: '20', kategori: 'iletisim', ad: 'Acil iletişim listesi', miktar: '1 kağıt', aciklama: 'Basılı, telefondan bağımsız', tamamlandi: false, kritik: true },
  { id: '21', kategori: 'iletisim', ad: 'Radyo (pilli)', miktar: '1 adet', aciklama: 'AFAD anonsları için', tamamlandi: false, kritik: false },
];

export default function CantaPage() {
  const { cantaUrunleri, urunTamamla, cantaYukle } = useAppStore();
  const [aktifKategori, setAktifKategori] = useState<keyof typeof KATEGORILER | 'hepsi'>('hepsi');

  useEffect(() => {
    if (cantaUrunleri.length === 0) cantaYukle(VARSAYILAN_LISTE);
  }, []);

  const liste = cantaUrunleri.length ? cantaUrunleri : VARSAYILAN_LISTE;
  const filtrelenmis = aktifKategori === 'hepsi' ? liste : liste.filter((u) => u.kategori === aktifKategori);
  const tamamlanan = liste.filter((u) => u.tamamlandi).length;
  const kritikEksik = liste.filter((u) => u.kritik && !u.tamamlandi).length;
  const ilerleme = Math.round((tamamlanan / liste.length) * 100);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">72h Deprem Çantası</h1>

      {/* İlerleme */}
      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl font-semibold text-gray-900">{ilerleme}%</span>
          <div>
            <p className="text-sm text-gray-600">{tamamlanan} / {liste.length} hazır</p>
            {kritikEksik > 0 && (
              <p className="text-xs text-red-500 font-medium">{kritikEksik} kritik ürün eksik!</p>
            )}
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${ilerleme}%`, backgroundColor: ilerleme === 100 ? '#1D9E75' : '#EF9F27' }}
          />
        </div>
      </div>

      {/* Kategori filtreleri */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
        <button
          onClick={() => setAktifKategori('hepsi')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            aktifKategori === 'hepsi' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
          }`}
        >
          Tümü
        </button>
        {(Object.keys(KATEGORILER) as (keyof typeof KATEGORILER)[]).map((k) => (
          <button
            key={k}
            onClick={() => setAktifKategori(k)}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              aktifKategori === k ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
            }`}
          >
            <span>{KATEGORILER[k].emoji}</span>
            <span>{KATEGORILER[k].ad}</span>
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {(Object.keys(KATEGORILER) as (keyof typeof KATEGORILER)[])
          .filter((k) => aktifKategori === 'hepsi' || aktifKategori === k)
          .map((kat) => {
            const katItems = filtrelenmis.filter((u) => u.kategori === kat);
            if (!katItems.length) return null;
            const kr = KATEGORILER[kat];
            return (
              <div key={kat} className="rounded-xl overflow-hidden border border-gray-100">
                <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: kr.renk }}>
                  <span>{kr.emoji}</span>
                  <span className="flex-1 text-sm font-semibold" style={{ color: kr.text }}>{kr.ad}</span>
                  <span className="text-xs font-medium" style={{ color: kr.text }}>
                    {katItems.filter((u) => u.tamamlandi).length}/{katItems.length}
                  </span>
                </div>
                {katItems.map((urun) => (
                  <button
                    key={urun.id}
                    onClick={() => urunTamamla(urun.id)}
                    className={`w-full flex items-start gap-3 px-4 py-3 border-t border-gray-50 bg-white hover:bg-gray-50 transition-colors text-left ${
                      urun.tamamlandi ? 'opacity-50' : ''
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      urun.tamamlandi ? 'bg-[#1D9E75] border-[#1D9E75]' : 'border-gray-300'
                    }`}>
                      {urun.tamamlandi && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm font-medium ${urun.tamamlandi ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {urun.ad}
                        </span>
                        {urun.kritik && !urun.tamamlandi && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-500 rounded-full font-semibold">kritik</span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-[#1D9E75]">{urun.miktar}</p>
                      <p className="text-xs text-gray-400">{urun.aciklama}</p>
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
      </div>

      {ilerleme === 100 && (
        <div className="bg-green-50 rounded-xl p-5 text-center mt-4">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-sm font-medium text-green-800">Çantanız hazır! Düzenli kontrol etmeyi unutmayın.</p>
        </div>
      )}
    </div>
  );
}
