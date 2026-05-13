'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Backpack, Check, Lightbulb, AlertTriangle } from 'lucide-react';

interface Esya {
  id: string;
  adTR: string; adEN: string;
  aciklamaTR?: string; aciklamaEN?: string;
  kritik?: boolean;
}

interface Kategori {
  icon: string;
  baslikTR: string; baslikEN: string;
  renk: string;
  esyalar: Esya[];
}

const KATEGORILER: Kategori[] = [
  {
    icon: '💧', baslikTR: 'Su ve Gıda', baslikEN: 'Water and Food', renk: 'blue',
    esyalar: [
      { id: 'su', adTR: 'Su (kişi başı min. 9 litre)', adEN: 'Water (min. 9 litres per person)', aciklamaTR: '3 lt/gün × 3 gün × kişi sayısı', aciklamaEN: '3 L/day × 3 days × number of people', kritik: true },
      { id: 'su-tablet', adTR: 'Su arıtma tabletleri', adEN: 'Water purification tablets', aciklamaTR: 'Aquatabs veya benzeri', aciklamaEN: 'Aquatabs or similar' },
      { id: 'konserve', adTR: 'Konserve gıda (3 günlük)', adEN: 'Canned food (3-day supply)', aciklamaTR: 'Fasulye, ton balığı, zeytin vb.', aciklamaEN: 'Beans, tuna, olives, etc.', kritik: true },
      { id: 'kuruyemis', adTR: 'Kuruyemiş ve kuru meyve', adEN: 'Dried nuts and fruit', aciklamaTR: 'Yüksek kalori, uzun raf ömrü', aciklamaEN: 'High calorie, long shelf life' },
      { id: 'enerji-bar', adTR: 'Enerji barı / bisküvi', adEN: 'Energy bars / biscuits', aciklamaTR: 'En az 6 adet', aciklamaEN: 'At least 6' },
      { id: 'bebek-mama', adTR: 'Bebek maması / mama (varsa)', adEN: 'Baby food / formula (if needed)', aciklamaTR: 'Gerekiyorsa', aciklamaEN: 'If required' },
      { id: 'acici', adTR: 'Mama açacağı', adEN: 'Manual can opener', kritik: true },
      { id: 'kasik-catal', adTR: 'Çatal, kaşık, plastik tabak', adEN: 'Fork, spoon, plastic plate', aciklamaTR: 'Tek kullanımlık olabilir', aciklamaEN: 'Can be disposable' },
    ],
  },
  {
    icon: '🩹', baslikTR: 'İlk Yardım ve Sağlık', baslikEN: 'First Aid and Health', renk: 'red',
    esyalar: [
      { id: 'ilk-yardim-canta', adTR: 'Hazır ilk yardım çantası', adEN: 'Ready-made first aid kit', kritik: true },
      { id: 'yara-bandi', adTR: 'Yara bandı (çeşitli boyut)', adEN: 'Bandages (various sizes)', kritik: true },
      { id: 'gazli-bez', adTR: 'Gazlı bez ve rulo flaster', adEN: 'Gauze pads and roll plaster' },
      { id: 'antiseptik', adTR: 'Antiseptik solüsyon (tentürdiyot vb.)', adEN: 'Antiseptic solution (iodine etc.)' },
      { id: 'agri-kesici', adTR: 'Ağrı kesici (parasetamol, ibuprofen)', adEN: 'Pain relief (paracetamol, ibuprofen)', kritik: true },
      { id: 'recete-ilac', adTR: 'Reçeteli ilaçlar (en az 7 günlük)', adEN: 'Prescription medications (7-day supply)', aciklamaTR: 'Tansiyon, diyabet, kalp vb.', aciklamaEN: 'Blood pressure, diabetes, cardiac, etc.', kritik: true },
      { id: 'alerji', adTR: 'Alerji ilacı / epipen (gerekiyorsa)', adEN: 'Allergy medication / EpiPen (if needed)' },
      { id: 'ishal', adTR: 'İshal ve mide ilaçları', adEN: 'Diarrhoea and stomach medication' },
      { id: 'makas-pens', adTR: 'Makas, cımbız, güvenlik iğnesi', adEN: 'Scissors, tweezers, safety pin' },
      { id: 'turnike', adTR: 'Turnike / basınç bandajı', adEN: 'Tourniquet / pressure bandage' },
      { id: 'termometre', adTR: 'Termometre', adEN: 'Thermometer' },
      { id: 'dezenfektan', adTR: 'El dezenfektanı (en az 2 şişe)', adEN: 'Hand sanitiser (at least 2 bottles)', kritik: true },
      { id: 'maske', adTR: 'FFP2/N95 maske (en az 5 adet)', adEN: 'FFP2/N95 mask (at least 5)', aciklamaTR: 'Enkaz tozu için kritik', aciklamaEN: 'Critical for rubble dust', kritik: true },
      { id: 'eldiven-tek', adTR: 'Tek kullanımlık lateks eldiven (10 çift)', adEN: 'Disposable latex gloves (10 pairs)' },
    ],
  },
  {
    icon: '📄', baslikTR: 'Belgeler ve Para', baslikEN: 'Documents and Cash', renk: 'amber',
    esyalar: [
      { id: 'kimlik', adTR: 'Kimlik kartı / nüfus cüzdanı fotokopisi', adEN: 'ID card / national ID photocopy', kritik: true },
      { id: 'pasaport', adTR: 'Pasaport (geçerliyse)', adEN: 'Passport (if valid)' },
      { id: 'saglik-karti', adTR: 'Sağlık kartı ve sigorta bilgileri', adEN: 'Health card and insurance details' },
      { id: 'tapu', adTR: 'Tapu / kira sözleşmesi fotokopisi', adEN: 'Title deed / lease agreement photocopy' },
      { id: 'arac-evrak', adTR: 'Araç ruhsatı ve sürücü belgesi fotokopisi', adEN: 'Vehicle registration and driving licence photocopy' },
      { id: 'banka', adTR: 'Banka / kredi kartı bilgileri (not kağıdı)', adEN: 'Bank / credit card details (written note)' },
      { id: 'nakit', adTR: 'Nakit para (küçük banknotlar)', adEN: 'Cash (small banknotes)', aciklamaTR: 'ATM\'ler çalışmayabilir', aciklamaEN: 'ATMs may not work', kritik: true },
      { id: 'fotoğraf', adTR: 'Aile fotoğrafı (kayıp ilanı için)', adEN: 'Family photo (for missing person notice)' },
      { id: 'acil-numara', adTR: 'Önemli telefon numaraları (kağıda yazılı)', adEN: 'Important phone numbers (written on paper)', kritik: true },
    ],
  },
  {
    icon: '🔦', baslikTR: 'Aydınlatma ve İletişim', baslikEN: 'Lighting and Communication', renk: 'yellow',
    esyalar: [
      { id: 'el-feneri', adTR: 'El feneri (LED)', adEN: 'LED torch', kritik: true },
      { id: 'pil', adTR: 'Yedek pil (AA ve AAA)', adEN: 'Spare batteries (AA and AAA)', kritik: true },
      { id: 'kafa-lambasi', adTR: 'Kafa lambası', adEN: 'Head torch', aciklamaTR: 'Eller serbest çalışmak için', aciklamaEN: 'For hands-free work' },
      { id: 'duduk', adTR: 'Düdük (plastik)', adEN: 'Whistle (plastic)', aciklamaTR: 'Enkaz altında konum bildirme', aciklamaEN: 'Signal location from under rubble', kritik: true },
      { id: 'radyo', adTR: 'Pilli / şarjlı taşınabilir radyo', adEN: 'Battery / hand-crank portable radio', aciklamaTR: 'Elektrik kesilmesinde haberler için', aciklamaEN: 'For news when power is cut', kritik: true },
      { id: 'powerbank', adTR: 'Powerbank (yüksek kapasiteli)', adEN: 'High-capacity powerbank', kritik: true },
      { id: 'sarj-kablosu', adTR: 'Şarj kabloları (farklı tip)', adEN: 'Charging cables (various types)' },
      { id: 'mum', adTR: 'Mum ve çakmak / kibrit', adEN: 'Candles and lighter / matches' },
      { id: 'ayna', adTR: 'Sinyal aynası', adEN: 'Signal mirror', aciklamaTR: 'Güneşe yansıtarak konum bildirme', aciklamaEN: 'Reflect sunlight to signal position' },
    ],
  },
  {
    icon: '👕', baslikTR: 'Kıyafet ve Koruma', baslikEN: 'Clothing and Protection', renk: 'green',
    esyalar: [
      { id: 'degisim-kiyafet', adTR: 'Değişim kıyafeti (2 set)', adEN: 'Change of clothes (2 sets)', kritik: true },
      { id: 'sağlam-ayakkabi', adTR: 'Sağlam, kapalı burunlu ayakkabı', adEN: 'Sturdy, closed-toe shoes', aciklamaTR: 'Kırık cam ve enkaz için', aciklamaEN: 'For broken glass and rubble', kritik: true },
      { id: 'corap', adTR: 'Kalın çorap (3 çift)', adEN: 'Thick socks (3 pairs)' },
      { id: 'yağmurluk', adTR: 'Yağmurluk veya anorak', adEN: 'Raincoat or anorak' },
      { id: 'battaniye', adTR: 'Termal battaniye (folyo)', adEN: 'Thermal blanket (foil)', kritik: true },
      { id: 'uyku-tulumu', adTR: 'Uyku tulumu veya ince battaniye', adEN: 'Sleeping bag or thin blanket' },
      { id: 'is-eldiveni', adTR: 'Kalın çalışma eldiveni', adEN: 'Heavy work gloves', aciklamaTR: 'Enkaz kaldırmak için', aciklamaEN: 'For debris removal', kritik: true },
      { id: 'baret', adTR: 'Baret veya inşaat kaskı', adEN: 'Hard hat or construction helmet', aciklamaTR: 'Düşen nesnelere karşı', aciklamaEN: 'Against falling objects', kritik: true },
      { id: 'güneş-gözlük', adTR: 'Güneş gözlüğü / toz gözlüğü', adEN: 'Sunglasses / dust goggles' },
    ],
  },
  {
    icon: '🧼', baslikTR: 'Hijyen ve Temizlik', baslikEN: 'Hygiene and Cleaning', renk: 'purple',
    esyalar: [
      { id: 'islak-mendil', adTR: 'Islak mendil (çok paket)', adEN: 'Wet wipes (multiple packs)', kritik: true },
      { id: 'tuvalet-kagidi', adTR: 'Tuvalet kağıdı (en az 4 rulo)', adEN: 'Toilet paper (at least 4 rolls)', kritik: true },
      { id: 'sabun', adTR: 'Katı sabun', adEN: 'Bar soap' },
      { id: 'dis-fircasi', adTR: 'Diş fırçası ve macun', adEN: 'Toothbrush and toothpaste' },
      { id: 'sampuan-dry', adTR: 'Kuru şampuan', adEN: 'Dry shampoo' },
      { id: 'hijyen', adTR: 'Kadın hijyen ürünleri (gerekiyorsa)', adEN: 'Feminine hygiene products (if needed)' },
      { id: 'bebek-bezi', adTR: 'Bebek bezi (gerekiyorsa)', adEN: 'Nappies (if needed)' },
      { id: 'cop-poseti', adTR: 'Büyük çöp poşeti (10 adet)', adEN: 'Large bin bags (10)', aciklamaTR: 'Tuvalet, barınak, yağmurluk yerine', aciklamaEN: 'For toilet, shelter, and as a rain cover' },
      { id: 'kese-kagidi', adTR: 'Kese kağıdı veya fermuarlı poşet', adEN: 'Paper bags or zip-lock bags' },
    ],
  },
  {
    icon: '🔧', baslikTR: 'Alet ve Ekipman', baslikEN: 'Tools and Equipment', renk: 'gray',
    esyalar: [
      { id: 'caki', adTR: 'Çakı veya çok amaçlı alet (Swiss Army vb.)', adEN: 'Pocket knife or multi-tool (Swiss Army etc.)', kritik: true },
      { id: 'bant', adTR: 'Duct tape / yapışkan bant', adEN: 'Duct tape', aciklamaTR: 'Her şeye yarar', aciklamaEN: 'Useful for everything' },
      { id: 'ip', adTR: 'Sağlam naylon ip (10+ metre)', adEN: 'Strong nylon rope (10+ metres)' },
      { id: 'tarp', adTR: 'Naylon örtü / tarp', adEN: 'Tarpaulin / tarp', aciklamaTR: 'Barınak ve yağmur koruması', aciklamaEN: 'For shelter and rain protection' },
      { id: 'p3-maske', adTR: 'P3 toz maskesi (yedek)', adEN: 'P3 dust mask (spare)', aciklamaTR: 'Enkaz çalışmaları için', aciklamaEN: 'For debris work' },
      { id: 'kalem-defter', adTR: 'Kalem ve not defteri', adEN: 'Pen and notepad', kritik: true },
      { id: 'harita', adTR: 'Kağıt harita (il/ilçe)', adEN: 'Paper map (province/district)', aciklamaTR: 'Telefon ve internet olmadığında', aciklamaEN: 'When phone and internet fail' },
      { id: 'kompas', adTR: 'Pusula / kompas', adEN: 'Compass' },
      { id: 'kilidi', adTR: 'Küçük asma kilit', adEN: 'Small padlock', aciklamaTR: 'Çantanı korumak için', aciklamaEN: 'To secure your bag' },
      { id: 'kablo-baği', adTR: 'Kablo bağı / kelepçe (20 adet)', adEN: 'Cable ties / zip ties (20)' },
    ],
  },
  {
    icon: '👶', baslikTR: 'Özel İhtiyaçlar', baslikEN: 'Special Needs', renk: 'pink',
    esyalar: [
      { id: 'bebek-mama2', adTR: 'Bebek maması veya mama (gerekiyorsa)', adEN: 'Baby food or formula (if needed)', aciklamaTR: '72 saatlik stok', aciklamaEN: '72-hour supply' },
      { id: 'bebek-bezi2', adTR: 'Yeterli bebek bezi (gerekiyorsa)', adEN: 'Adequate nappies (if needed)' },
      { id: 'oyuncak', adTR: 'Küçük oyuncak / kitap (çocuk için)', adEN: 'Small toy / book (for children)', aciklamaTR: 'Psikolojik destek', aciklamaEN: 'Psychological support' },
      { id: 'yasli-ilac', adTR: 'Yaşlı/engelli bireylerin ilaçları', adEN: 'Medications for elderly/disabled', kritik: true },
      { id: 'gozluk', adTR: 'Yedek gözlük veya lens solüsyonu', adEN: 'Spare glasses or contact lens solution' },
      { id: 'isitme-cihazi', adTR: 'Yedek işitme cihazı pili (gerekiyorsa)', adEN: 'Spare hearing aid battery (if needed)' },
      { id: 'evcil-mama', adTR: 'Evcil hayvan maması (gerekiyorsa)', adEN: 'Pet food (if needed)' },
      { id: 'stres-top', adTR: 'Stres topu / oyun kartı', adEN: 'Stress ball / card game', aciklamaTR: 'Uzun bekleme süreleri için', aciklamaEN: 'For long waiting periods' },
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
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const [tamamlanan, setTamamlanan] = useState<Set<string>>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('depremCanta') || '[]');
      return new Set<string>(Array.isArray(saved) ? saved : []);
    } catch { return new Set<string>(); }
  });
  const [sadaceKritik, setSadaceKritik] = useState(false);

  const toggle = (id: string) => {
    setTamamlanan((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      localStorage.setItem('depremCanta', JSON.stringify([...s]));
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
      localStorage.setItem('depremCanta', JSON.stringify([...s]));
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
        <h1 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
          <Backpack size={20} className="shrink-0" /> {TR ? '72 Saatlik Deprem Çantası' : '72-Hour Earthquake Kit'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">
          {TOPLAM} {TR ? 'eşya' : 'items'} · {KRITIK} {TR ? 'kritik' : 'critical'} · {TR ? 'Depremden sonra ilk 72 saat için hazırlık listesi' : 'Preparedness checklist for the first 72 hours after an earthquake'}
        </p>
      </div>

      {/* İlerleme */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[var(--foreground)]">
            {tamamlananSayi} / {gosterilenToplam} {TR ? 'tamamlandı' : 'completed'}
          </span>
          <span className="text-sm font-bold text-[var(--foreground)]">{TR ? `%${yuzde}` : `${yuzde}%`}</span>
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
            <Check size={14} className="inline text-green-500 mr-1" />{TR ? 'Çantanız hazır! Depreme hazırsınız.' : 'Your kit is ready! You are prepared.'}
          </p>
        )}
      </div>

      {/* Kontroller */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSadaceKritik(!sadaceKritik)}
          className={`px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors flex items-center gap-1.5 ${
            sadaceKritik
              ? 'bg-red-500 text-white border-red-500'
              : 'bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 inline-block" /> {TR ? 'Yalnız kritik eşyalar' : 'Critical items only'}
        </button>
        <button
          onClick={tumunuIsaretle}
          className="px-3 py-1.5 text-[11px] font-semibold rounded-full border bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] transition-colors hover:text-[var(--foreground)]"
        >
          {gosterilenEsyalar.every((e) => tamamlanan.has(e.id))
            ? (TR ? '☐ Tümünü kaldır' : '☐ Uncheck all')
            : (TR ? '☑ Tümünü işaretle' : '☑ Check all')}
        </button>
      </div>

      {/* Kategoriler */}
      {KATEGORILER.map((kat) => {
        const gorunenler = kat.esyalar.filter((e) => !sadaceKritik || e.kritik);
        if (gorunenler.length === 0) return null;
        const katTamamlanan = gorunenler.filter((e) => tamamlanan.has(e.id)).length;

        return (
          <div key={kat.baslikTR} className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden glow-card glow-${kat.renk}`}>
            <div className={`flex items-center justify-between px-4 py-3 border-b border-[var(--border)] ${RENK_MAP[kat.renk].split(' ').slice(0, 2).join(' ')}`}>
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-base ${ICON_BG[kat.renk]}`}>
                  {kat.icon}
                </span>
                <span className="text-sm font-bold text-[var(--foreground)]">{TR ? kat.baslikTR : kat.baslikEN}</span>
              </div>
              <span className="text-[11px] font-semibold text-[var(--muted)]">
                {katTamamlanan}/{gorunenler.length}
              </span>
            </div>

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
                          {TR ? esya.adTR : esya.adEN}
                        </span>
                        {esya.kritik && !tamam && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 leading-none">
                            {TR ? 'KRİTİK' : 'CRITICAL'}
                          </span>
                        )}
                      </div>
                      {(TR ? esya.aciklamaTR : esya.aciklamaEN) && (
                        <p className="text-[11px] text-[var(--muted)] mt-0.5">
                          {TR ? esya.aciklamaTR : esya.aciklamaEN}
                        </p>
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
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3 glow-card glow-blue">
        <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
          <span className="font-semibold flex items-center gap-1"><Lightbulb size={14} className="text-amber-500 shrink-0" />{TR ? 'İpucu:' : 'Tip:'}</span>{' '}
          {TR
            ? 'Çantanı serin, kuru ve hızlı ulaşılabilir bir yerde (kapı kenarı, dolap önü) saklayın. 6 ayda bir kontrol edip ilaç ve gıdaların son kullanma tarihlerini yenileyin.'
            : 'Store your kit in a cool, dry, easily accessible place (by the door, in front of a cupboard). Check it every 6 months and refresh medication and food expiry dates.'}
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl p-3 glow-card glow-amber">
        <p className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
          <span className="font-semibold flex items-center gap-1"><AlertTriangle size={14} className="text-amber-500 shrink-0" />{TR ? 'Kaynak:' : 'Source:'}</span>{' '}
          {TR
            ? 'Bu liste AFAD, FEMA ve Kızılay deprem hazırlık kılavuzları esas alınarak hazırlanmıştır. Aile büyüklüğünüze ve özel ihtiyaçlarınıza göre uyarlayın.'
            : 'This list is based on AFAD, FEMA, and Turkish Red Crescent earthquake preparedness guides. Adapt it to your household size and special needs.'}
        </p>
      </div>
    </div>
  );
}
