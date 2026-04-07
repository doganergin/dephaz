'use client';
import { useState } from 'react';

interface Esya {
  id: string;
  ad: string;
  aciklama?: string;
  kritik?: boolean;
}

interface Kategori {
  icon: string;
  baslik: string;
  renk: string;
  esyalar: Esya[];
}

const KATEGORILER: Kategori[] = [
  {
    icon: '💧',
    baslik: 'Su ve Gıda',
    renk: 'blue',
    esyalar: [
      { id: 'su', ad: 'Su (kişi başı min. 9 litre)', aciklama: '3 lt/gün × 3 gün × kişi sayısı', kritik: true },
      { id: 'su-tablet', ad: 'Su arıtma tabletleri', aciklama: 'Aquatabs veya benzeri' },
      { id: 'konserve', ad: 'Konserve gıda (3 günlük)', aciklama: 'Fasulye, ton balığı, zeytin vb.', kritik: true },
      { id: 'kuruyemis', ad: 'Kuruyemiş ve kuru meyve', aciklama: 'Yüksek kalori, uzun raf ömrü' },
      { id: 'enerji-bar', ad: 'Enerji barı / bisküvi', aciklama: 'En az 6 adet' },
      { id: 'bebek-mama', ad: 'Bebek maması / mama (varsa)', aciklama: 'Gerekiyorsa' },
      { id: 'acici', ad: 'Mama açacağı', kritik: true },
      { id: 'kasik-catal', ad: 'Çatal, kaşık, plastik tabak', aciklama: 'Tek kullanımlık olabilir' },
    ],
  },
  {
    icon: '🩹',
    baslik: 'İlk Yardım ve Sağlık',
    renk: 'red',
    esyalar: [
      { id: 'ilk-yardim-canta', ad: 'Hazır ilk yardım çantası', kritik: true },
      { id: 'yara-bandi', ad: 'Yara bandı (çeşitli boyut)', kritik: true },
      { id: 'gazli-bez', ad: 'Gazlı bez ve rulo flaster' },
      { id: 'antiseptik', ad: 'Antiseptik solüsyon (tentürdiyot vb.)' },
      { id: 'agri-kesici', ad: 'Ağrı kesici (parasetamol, ibuprofen)', kritik: true },
      { id: 'recete-ilac', ad: 'Reçeteli ilaçlar (en az 7 günlük)', aciklama: 'Tansiyon, diyabet, kalp vb.', kritik: true },
      { id: 'alerji', ad: 'Alerji ilacı / epipen (gerekiyorsa)' },
      { id: 'ishal', ad: 'İshal ve mide ilaçları' },
      { id: 'makas-pens', ad: 'Makas, cımbız, güvenlik iğnesi' },
      { id: 'turnike', ad: 'Turnike / basınç bandajı' },
      { id: 'termometre', ad: 'Termometre' },
      { id: 'dezenfektan', ad: 'El dezenfektanı (en az 2 şişe)', kritik: true },
      { id: 'maske', ad: 'FFP2/N95 maske (en az 5 adet)', aciklama: 'Enkaz tozu için kritik', kritik: true },
      { id: 'eldiven-tek', ad: 'Tek kullanımlık lateks eldiven (10 çift)' },
    ],
  },
  {
    icon: '📄',
    baslik: 'Belgeler ve Para',
    renk: 'amber',
    esyalar: [
      { id: 'kimlik', ad: 'Kimlik kartı / nüfus cüzdanı fotokopisi', kritik: true },
      { id: 'pasaport', ad: 'Pasaport (geçerliyse)' },
      { id: 'saglik-karti', ad: 'Sağlık kartı ve sigorta bilgileri' },
      { id: 'tapu', ad: 'Tapu / kira sözleşmesi fotokopisi' },
      { id: 'arac-evrak', ad: 'Araç ruhsatı ve sürücü belgesi fotokopisi' },
      { id: 'banka', ad: 'Banka / kredi kartı bilgileri (not kağıdı)' },
      { id: 'nakit', ad: 'Nakit para (küçük banknotlar)', aciklama: 'ATM\'ler çalışmayabilir', kritik: true },
      { id: 'fotoğraf', ad: 'Aile fotoğrafı (kayıp ilanı için)' },
      { id: 'acil-numara', ad: 'Önemli telefon numaraları (kağıda yazılı)', kritik: true },
    ],
  },
  {
    icon: '🔦',
    baslik: 'Aydınlatma ve İletişim',
    renk: 'yellow',
    esyalar: [
      { id: 'el-feneri', ad: 'El feneri (LED)', kritik: true },
      { id: 'pil', ad: 'Yedek pil (AA ve AAA)', kritik: true },
      { id: 'kafa-lambasi', ad: 'Kafa lambası', aciklama: 'Eller serbest çalışmak için' },
      { id: 'duduk', ad: 'Düdük (plastik)', aciklama: 'Enkaz altında konum bildirme', kritik: true },
      { id: 'radyo', ad: 'Pilli / şarjlı taşınabilir radyo', aciklama: 'Elektrik kesilmesinde haberler için', kritik: true },
      { id: 'powerbank', ad: 'Powerbank (yüksek kapasiteli)', kritik: true },
      { id: 'sarj-kablosu', ad: 'Şarj kabloları (farklı tip)' },
      { id: 'mum', ad: 'Mum ve çakmak / kibrit' },
      { id: 'ayna', ad: 'Sinyal aynası', aciklama: 'Güneşe yansıtarak konum bildirme' },
    ],
  },
  {
    icon: '👕',
    baslik: 'Kıyafet ve Koruma',
    renk: 'green',
    esyalar: [
      { id: 'degisim-kiyafet', ad: 'Değişim kıyafeti (2 set)', kritik: true },
      { id: 'sağlam-ayakkabi', ad: 'Sağlam, kapalı burunlu ayakkabı', aciklama: 'Kırık cam ve enkaz için', kritik: true },
      { id: 'corap', ad: 'Kalın çorap (3 çift)' },
      { id: 'yağmurluk', ad: 'Yağmurluk veya anorak' },
      { id: 'battaniye', ad: 'Termal battaniye (folyo)', kritik: true },
      { id: 'uyku-tulumu', ad: 'Uyku tulumu veya ince battaniye' },
      { id: 'is-eldiveni', ad: 'Kalın çalışma eldiveni', aciklama: 'Enkaz kaldırmak için', kritik: true },
      { id: 'baret', ad: 'Baret veya inşaat kaskı', aciklama: 'Düşen nesnelere karşı', kritik: true },
      { id: 'güneş-gözlük', ad: 'Güneş gözlüğü / toz gözlüğü' },
    ],
  },
  {
    icon: '🧼',
    baslik: 'Hijyen ve Temizlik',
    renk: 'purple',
    esyalar: [
      { id: 'islak-mendil', ad: 'Islak mendil (çok paket)', kritik: true },
      { id: 'tuvalet-kagidi', ad: 'Tuvalet kağıdı (en az 4 rulo)', kritik: true },
      { id: 'sabun', ad: 'Katı sabun' },
      { id: 'dis-fircasi', ad: 'Diş fırçası ve macun' },
      { id: 'sampuan-dry', ad: 'Kuru şampuan' },
      { id: 'hijyen', ad: 'Kadın hijyen ürünleri (gerekiyorsa)' },
      { id: 'bebek-bezi', ad: 'Bebek bezi (gerekiyorsa)' },
      { id: 'cop-poseti', ad: 'Büyük çöp poşeti (10 adet)', aciklama: 'Tuvalet, barınak, yağmurluk yerine' },
      { id: 'kese-kagidi', ad: 'Kese kağıdı veya fermuarlı poşet' },
    ],
  },
  {
    icon: '🔧',
    baslik: 'Alet ve Ekipman',
    renk: 'gray',
    esyalar: [
      { id: 'caki', ad: 'Çakı veya çok amaçlı alet (Swiss Army vb.)', kritik: true },
      { id: 'bant', ad: 'Duct tape / yapışkan bant', aciklama: 'Her şeye yarar' },
      { id: 'ip', ad: 'Sağlam naylon ip (10+ metre)' },
      { id: 'tarp', ad: 'Naylon örtü / tarp', aciklama: 'Barınak ve yağmur koruması' },
      { id: 'p3-maske', ad: 'P3 toz maskesi (yedek)', aciklama: 'Enkaz çalışmaları için' },
      { id: 'kalem-defter', ad: 'Kalem ve not defteri', kritik: true },
      { id: 'harita', ad: 'Kağıt harita (il/ilçe)', aciklama: 'Telefon ve internet olmadığında' },
      { id: 'kompas', ad: 'Pusula / kompas' },
      { id: 'kilidi', ad: 'Küçük asma kilit', aciklama: 'Çantanı korumak için' },
      { id: 'kablo-baği', ad: 'Kablo bağı / kelepçe (20 adet)' },
    ],
  },
  {
    icon: '👶',
    baslik: 'Özel İhtiyaçlar',
    renk: 'pink',
    esyalar: [
      { id: 'bebek-mama2', ad: 'Bebek maması veya mama (gerekiyorsa)', aciklama: '72 saatlik stok' },
      { id: 'bebek-bezi2', ad: 'Yeterli bebek bezi (gerekiyorsa)' },
      { id: 'oyuncak', ad: 'Küçük oyuncak / kitap (çocuk için)', aciklama: 'Psikolojik destek' },
      { id: 'yasli-ilac', ad: 'Yaşlı/engelli bireylerin ilaçları', kritik: true },
      { id: 'gozluk', ad: 'Yedek gözlük veya lens solüsyonu' },
      { id: 'isitme-cihazi', ad: 'Yedek işitme cihazı pili (gerekiyorsa)' },
      { id: 'evcil-mama', ad: 'Evcil hayvan maması (gerekiyorsa)' },
      { id: 'stres-top', ad: 'Stres topu / oyun kartı', aciklama: 'Uzun bekleme süreleri için' },
    ],
  },
];

const RENK_MAP: Record<string, string> = {
  blue:   'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300',
  red:    'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-700 dark:text-red-300',
  amber:  'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-300',
  yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
  green:  'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-700 dark:text-green-300',
  purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800 text-purple-700 dark:text-purple-300',
  gray:   'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300',
  pink:   'bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-800 text-pink-700 dark:text-pink-300',
};

const ICON_BG: Record<string, string> = {
  blue:   'bg-blue-100 dark:bg-blue-900/40',
  red:    'bg-red-100 dark:bg-red-900/40',
  amber:  'bg-amber-100 dark:bg-amber-900/40',
  yellow: 'bg-yellow-100 dark:bg-yellow-900/40',
  green:  'bg-green-100 dark:bg-green-900/40',
  purple: 'bg-purple-100 dark:bg-purple-900/40',
  gray:   'bg-gray-100 dark:bg-gray-700',
  pink:   'bg-pink-100 dark:bg-pink-900/40',
};

const TOPLAM = KATEGORILER.reduce((t, k) => t + k.esyalar.length, 0);
const KRITIK = KATEGORILER.reduce((t, k) => t + k.esyalar.filter((e) => e.kritik).length, 0);

export default function CantaPage() {
  const [tamamlanan, setTamamlanan] = useState<Set<string>>(new Set());
  const [sadaceKritik, setSadaceKritik] = useState(false);

  const toggle = (id: string) => {
    setTamamlanan((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const tumunuIsaretle = () => {
    const tumIds = KATEGORILER.flatMap((k) =>
      k.esyalar.filter((e) => !sadaceKritik || e.kritik).map((e) => e.id)
    );
    const hepsiTamam = tumIds.every((id) => tamamlanan.has(id));
    setTamamlanan((prev) => {
      const s = new Set(prev);
      if (hepsiTamam) tumIds.forEach((id) => s.delete(id));
      else tumIds.forEach((id) => s.add(id));
      return s;
    });
  };

  const gosterilenEsyalar = KATEGORILER.flatMap((k) =>
    k.esyalar.filter((e) => !sadaceKritik || e.kritik)
  );
  const gosterilenToplam = gosterilenEsyalar.length;
  const tamamlananSayi = gosterilenEsyalar.filter((e) => tamamlanan.has(e.id)).length;
  const yuzde = gosterilenToplam > 0 ? Math.round((tamamlananSayi / gosterilenToplam) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Başlık */}
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">🎒 72 Saatlik Deprem Çantası</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">
          {TOPLAM} eşya · {KRITIK} kritik · Depremden sonra ilk 72 saat için hazırlık listesi
        </p>
      </div>

      {/* İlerleme */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[var(--foreground)]">
            {tamamlananSayi} / {gosterilenToplam} tamamlandı
          </span>
          <span className="text-sm font-bold text-[var(--foreground)]">%{yuzde}</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-300"
            style={{
              width: `${yuzde}%`,
              backgroundColor: yuzde === 100 ? '#10B981' : yuzde >= 60 ? '#F59E0B' : '#EF4444',
            }}
          />
        </div>
        {yuzde === 100 && (
          <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-2 text-center">
            ✅ Çantanız hazır! Depreme hazırsınız.
          </p>
        )}
      </div>

      {/* Kontroller */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSadaceKritik(!sadaceKritik)}
          className={`px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors ${
            sadaceKritik
              ? 'bg-red-500 text-white border-red-500'
              : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)]'
          }`}
        >
          🔴 Yalnız kritik eşyalar
        </button>
        <button
          onClick={tumunuIsaretle}
          className="px-3 py-1.5 text-[11px] font-semibold rounded-full border bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] transition-colors hover:text-[var(--foreground)]"
        >
          {gosterilenEsyalar.every((e) => tamamlanan.has(e.id)) ? '☐ Tümünü kaldır' : '☑ Tümünü işaretle'}
        </button>
      </div>

      {/* Kategoriler */}
      {KATEGORILER.map((kat) => {
        const gorunenler = kat.esyalar.filter((e) => !sadaceKritik || e.kritik);
        if (gorunenler.length === 0) return null;
        const katTamamlanan = gorunenler.filter((e) => tamamlanan.has(e.id)).length;

        return (
          <div key={kat.baslik} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden">
            {/* Kategori başlık */}
            <div className={`flex items-center justify-between px-4 py-3 border-b border-[var(--border)] ${RENK_MAP[kat.renk].split(' ').slice(0,2).join(' ')}`}>
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-base ${ICON_BG[kat.renk]}`}>
                  {kat.icon}
                </span>
                <span className="text-sm font-bold text-[var(--foreground)]">{kat.baslik}</span>
              </div>
              <span className="text-[11px] font-semibold text-[var(--muted)]">
                {katTamamlanan}/{gorunenler.length}
              </span>
            </div>

            {/* Eşyalar */}
            <div className="divide-y divide-[var(--border)]">
              {gorunenler.map((esya) => {
                const tamam = tamamlanan.has(esya.id);
                return (
                  <button
                    key={esya.id}
                    onClick={() => toggle(esya.id)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${tamam ? 'opacity-60' : ''}`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      tamam
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {tamam && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-xs font-medium ${tamam ? 'line-through text-[var(--muted)]' : 'text-[var(--foreground)]'}`}>
                          {esya.ad}
                        </span>
                        {esya.kritik && !tamam && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 leading-none">
                            KRİTİK
                          </span>
                        )}
                      </div>
                      {esya.aciklama && (
                        <p className="text-[11px] text-[var(--muted)] mt-0.5">{esya.aciklama}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Bilgi notu */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
        <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
          <span className="font-semibold">💡 İpucu:</span> Çantanı serin, kuru ve hızlı ulaşılabilir bir yerde (kapı kenarı, dolap önü) saklayın. 6 ayda bir kontrol edip ilaç ve gıdaların son kullanma tarihlerini yenileyin.
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl p-3">
        <p className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
          <span className="font-semibold">⚠️ Kaynak:</span> Bu liste AFAD, FEMA ve Kızılay deprem hazırlık kılavuzları esas alınarak hazırlanmıştır. Aile büyüklüğünüze ve özel ihtiyaçlarınıza göre uyarlayın.
        </p>
      </div>
    </div>
  );
}
