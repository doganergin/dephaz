'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeartPulse, Hand, Bone, Brain, CircleAlert, Eye, Wind } from 'lucide-react';

const bolumler = [
  {
    icon: Brain,
    tr: 'Bilinç Kontrolü',
    en: 'Consciousness Check',
    renk: 'purple',
    adimlar: [
      { tr: 'Kişinin omzuna hafifçe vurarak "İyi misiniz?" diye sorun.', en: 'Tap the person\'s shoulder gently and ask "Are you OK?"' },
      { tr: 'Yanıt yoksa çevresini güvenli hale getirin, yüzüstü yatırmayın.', en: 'If no response, make the surroundings safe; do not lay them face down.' },
      { tr: 'Baş ve boyun hizasını koruyun, bükmeyin.', en: 'Keep the head and neck aligned; do not bend.' },
      { tr: 'Hemen 112\'yi arayın veya çağırın.', en: 'Call or shout for 112 immediately.' },
    ],
  },
  {
    icon: Wind,
    tr: 'Solunum & CPR Temelleri',
    en: 'Breathing & Basic CPR',
    renk: 'blue',
    adimlar: [
      { tr: 'Göğsün inip kalktığına bakın — solunumu 10 saniye gözlemleyin.', en: 'Look for chest rise and fall — observe breathing for 10 seconds.' },
      { tr: 'Solunum yoksa CPR\'a başlayın: göğüs merkezine, dakikada 100–120 baskı.', en: 'If no breathing, start CPR: press the centre of the chest, 100–120 times/minute.' },
      { tr: 'Yetişkin için 5–6 cm derinlikte, güçlü ve ritmik baskı uygulayın.', en: 'For adults, apply firm, rhythmic compressions 5–6 cm deep.' },
      { tr: 'Eğitimli değilseniz ağız ağıza solunum uygulamak zorunda değilsiniz; sürekli baskı yapın.', en: 'If untrained, you don\'t need mouth-to-mouth; maintain continuous compressions.' },
    ],
  },
  {
    icon: Hand,
    tr: 'Kanama Kontrolü',
    en: 'Bleeding Control',
    renk: 'red',
    adimlar: [
      { tr: 'Temiz bir bez veya kıyafet parçasını yara üzerine koyun.', en: 'Place a clean cloth or piece of clothing over the wound.' },
      { tr: 'Baskı kesilmeden en az 10 dakika tutun.', en: 'Apply continuous pressure for at least 10 minutes without stopping.' },
      { tr: 'Bez kanla dolursa üstüne kat ekleyin; ilkini kaldırmayın.', en: 'If the cloth fills with blood, add layers on top; do not remove the first one.' },
      { tr: 'Uzuv kanaması için kol veya bacağı kalp seviyesinin üzerine kaldırın.', en: 'For limb bleeding, raise the arm or leg above heart level.' },
      { tr: 'Kanamanın durmaması durumunda turnike uygulanabilir — en az 5 cm genişlikte bir bant kullanın.', en: 'If bleeding does not stop, a tourniquet may be applied — use a band at least 5 cm wide.' },
    ],
  },
  {
    icon: Bone,
    tr: 'Kırık Şüphesi',
    en: 'Suspected Fracture',
    renk: 'amber',
    adimlar: [
      { tr: 'Kırık bölgeyi hareket ettirmeyin veya yerine oturtmaya çalışmayın.', en: 'Do not move the fractured area or try to realign it.' },
      { tr: 'Tahta, karton veya atkı ile mevcut pozisyonda sabitleyin (atel).', en: 'Splint in the current position using wood, cardboard, or a scarf.' },
      { tr: 'Açık kırık (kemik görünüyorsa) varsa temiz bezle kapatın, bastırmayın.', en: 'For open fractures (bone visible), cover with a clean cloth; do not press.' },
      { tr: 'Omurga kırığı şüphesinde kişiyi kesinlikle taşımayın.', en: 'If spinal fracture is suspected, do not move the person at all.' },
    ],
  },
  {
    icon: Eye,
    tr: 'Göz / Toz / Enkaz Yaralanması',
    en: 'Eye / Dust / Debris Injury',
    renk: 'teal',
    adimlar: [
      { tr: 'Gözü ovalamayın; temiz suyla 15 dakika boyunca yıkayın.', en: 'Do not rub the eye; rinse with clean water for 15 minutes.' },
      { tr: 'Gözde batmış cisim varsa çıkarmayın, üstünü kapatın.', en: 'If an object is embedded in the eye, do not remove it; cover it.' },
      { tr: 'Betonu tozunu solumayı en aza indirmek için ağzı kapatın ya da ıslak bez kullanın.', en: 'To minimise breathing concrete dust, cover the mouth or use a damp cloth.' },
    ],
  },
];

const renkMap: Record<string, { bg: string; text: string }> = {
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600' },
  blue:   { bg: 'bg-blue-100 dark:bg-blue-900/30',   text: 'text-blue-600' },
  red:    { bg: 'bg-red-100 dark:bg-red-900/30',     text: 'text-red-600' },
  amber:  { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600' },
  teal:   { bg: 'bg-teal-100 dark:bg-teal-900/30',  text: 'text-teal-600' },
};

export default function IlkYardimPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Afet Sağlığı' : 'Disaster Health'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Deprem Sonrası İlk Yardım' : 'First Aid After an Earthquake'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Profesyonel yardım gelene kadar hayat kurtaran temel müdahaleler.'
            : 'Life-saving basic interventions until professional help arrives.'}
        </p>
      </div>

      {/* Uyarı */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <CircleAlert size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
            {TR
              ? 'Bu içerik genel bilgi amaçlıdır. Mümkün olan ilk fırsatta 112\'yi arayın. Ciddi yaralanmalarda uzman müdahalesi zorunludur.'
              : 'This content is for general information only. Call 112 at the first opportunity. Expert intervention is essential for serious injuries.'}
          </p>
        </div>
      </div>

      {/* Bölümler */}
      {bolumler.map((b) => {
        const Icon = b.icon;
        const r = renkMap[b.renk];
        return (
          <section key={b.tr} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-xl ${r.bg} ${r.text} flex items-center justify-center shrink-0`}>
                <Icon size={16} strokeWidth={1.8} />
              </span>
              <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? b.tr : b.en}</h2>
            </div>
            <div className="space-y-2 pl-2">
              {b.adimlar.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`text-xs font-bold ${r.text} shrink-0 mt-0.5`}>{i + 1}.</span>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">{TR ? a.tr : a.en}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Eğitim tavsiyesi */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <HeartPulse size={16} className="text-red-500 shrink-0" />
          <p className="text-xs font-bold text-[var(--foreground)]">
            {TR ? 'İlk Yardım Eğitimi Alın' : 'Get First Aid Training'}
        </p>
        </div>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
          {TR
            ? 'Türk Kızılay ve AFAD, ücretsiz veya düşük maliyetli temel ilk yardım kursları sunmaktadır. Bu bilgileri pratikte uygulamak, bir kitap okumaktan çok daha etkilidir.'
            : 'The Turkish Red Crescent and AFAD offer free or low-cost basic first aid courses. Applying this knowledge in practice is far more effective than reading about it.'}
        </p>
        <a
          href="https://www.kizilay.org.tr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline block mt-1"
        >
          kizilay.org.tr →
        </a>
      </div>
    </article>
  );
}
