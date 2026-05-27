'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wind, Droplets, Radio, EyeOff, Move, Clock, ShieldAlert, PhoneOff } from 'lucide-react';

export default function EnkazAltindaPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Hayatta Kalma Rehberi' : 'Survival Guide'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Enkaz Altında Ne Yapmalı?' : 'What to Do If Trapped Under Debris?'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Depremde enkaz altında kalırsanız sakin kalmak ve doğru adımları atmak hayat kurtarır.'
            : 'If you are trapped under debris in an earthquake, staying calm and taking the right steps saves lives.'}
        </p>
      </div>

      {/* Kritik gerçek */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1">
          {TR ? 'Kritik Gerçek' : 'Critical Fact'}
        </p>
        <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
          {TR
            ? '2023 Kahramanmaraş depremi verilerine göre enkaz altından canlı kurtulanların büyük bölümü ilk 72 saat içinde kurtarıldı. Ancak bazı kurtarmalar 200 saati aştı. Dayanmak ve sinyal vermek esastır.'
            : 'According to 2023 Kahramanmaraş earthquake data, most people rescued alive from debris were found within the first 72 hours. However, some rescues exceeded 200 hours. Enduring and signalling are essential.'}
        </p>
      </div>

      {/* Paniklememe */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center shrink-0">
            <EyeOff size={16} strokeWidth={1.8} />
          </span>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            {TR ? '1. Paniklememe — Önce Nefes' : '1. Don\'t Panic — Breathe First'}
          </h2>
        </div>
        <div className="space-y-2 pl-2">
          {[
            { tr: 'Derin nefes alın. Panik oksijen tüketimini artırır ve sizi zayıflatır.', en: 'Take deep breaths. Panic increases oxygen consumption and weakens you.' },
            { tr: 'Mevcut pozisyonunuzu değerlendirin — hangi yönün boş olduğunu belirleyin.', en: 'Assess your current position — determine which direction is open.' },
            { tr: 'Eğer yaralıysanız ve kanıyorsanız önce kanamayı durdurun.', en: 'If injured and bleeding, stop the bleeding first.' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold text-purple-600 shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{TR ? a.tr : a.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hava yolu */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
            <Wind size={16} strokeWidth={1.8} />
          </span>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            {TR ? '2. Hava Yolunu Açık Tutun' : '2. Keep Your Airway Open'}
          </h2>
        </div>
        <div className="space-y-2 pl-2">
          {[
            { tr: 'Ağzınızı ve burnunuzu toz ve molozdan korumak için bir kumaş parçası kullanın.', en: 'Use a piece of cloth to protect your mouth and nose from dust and debris.' },
            { tr: 'Beton tozu solumak akciğerlere zarar verir — mümkünse ıslak tutun.', en: 'Inhaling concrete dust damages lungs — keep the cloth damp if possible.' },
            { tr: 'Büyük nefes almak yerine yavaş ve düzenli soluyun.', en: 'Instead of taking big breaths, breathe slowly and steadily.' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold text-blue-600 shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{TR ? a.tr : a.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sinyal verme */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center shrink-0">
            <Radio size={16} strokeWidth={1.8} />
          </span>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            {TR ? '3. Sinyal Verin' : '3. Signal for Help'}
          </h2>
        </div>
        <div className="space-y-2 pl-2">
          {[
            { tr: 'Bağırmak enerjinizi tüketir ve tozun yutulmasına yol açar — yalnızca kurtarma sesi duyduğunuzda bağırın.', en: 'Shouting wastes energy and causes dust inhalation — only shout when you hear rescue sounds.' },
            { tr: 'Bir boru, taş veya metal parçayla çevrenize ritimli vurun: üç kısa, üç uzun, üç kısa (SOS).', en: 'Tap rhythmically on a pipe, stone or metal piece: three short, three long, three short (SOS).' },
            { tr: 'Düdüğünüz varsa 3\'lü gruplar halinde çalın ve dinleyin.', en: 'If you have a whistle, blow in groups of 3 and then listen.' },
            { tr: 'Cep telefonunuzun pilini koruyun — sadece 112\'yi arayın veya konum gönderin.', en: 'Conserve your phone battery — only call 112 or send your location.' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold text-orange-600 shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{TR ? a.tr : a.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hareket etme */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center shrink-0">
            <Move size={16} strokeWidth={1.8} />
          </span>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            {TR ? '4. Hareket Kararı' : '4. Decision to Move'}
          </h2>
        </div>
        <p className="text-sm text-[var(--foreground)] leading-relaxed pl-2">
          {TR
            ? 'Hareket etmek her zaman doğru değildir. Yanlış bir hamle ek göçüğe neden olabilir.'
            : 'Moving is not always the right decision. A wrong move can cause additional collapse.'}
        </p>
        <div className="space-y-2 pl-2">
          {[
            { tr: 'Eğer üzerinizde ağır bir yük yoksa ve çıkış açıkça görünüyorsa yavaşça hareket edin.', en: 'If there is no heavy load on you and an exit is clearly visible, move slowly.' },
            { tr: 'Büyük moloz parçalarını kaldırmaya çalışmayın — tavan veya başka bir kısım çökebilir.', en: 'Don\'t try to lift large debris pieces — a ceiling or another section may collapse.' },
            { tr: 'Küçük parçaları dikkatlice bir kenara itin ve ilerlemeniz için yer açın.', en: 'Carefully push small pieces aside and clear a path to move forward.' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold text-red-600 shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{TR ? a.tr : a.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Su ve sıcaklık */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center shrink-0">
            <Droplets size={16} strokeWidth={1.8} />
          </span>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            {TR ? '5. Su ve Vücut Sıcaklığı' : '5. Water and Body Temperature'}
          </h2>
        </div>
        <div className="space-y-2 pl-2">
          {[
            { tr: 'Yanınızda su yoksa hareket etmeyin — susuzluk en büyük tehlikelerden biridir.', en: 'If you have no water, do not exert yourself — dehydration is one of the greatest dangers.' },
            { tr: 'Suyun nereden geçtiğini takip edin (nem, damlama); kirli olsa bile küçük miktarda hayat kurtarabilir.', en: 'Track where water passes (moisture, drips); even if dirty, a small amount can save a life.' },
            { tr: 'Soğuktan korunmak için kıyafet ve molozdan yalıtım oluşturun.', en: 'Use clothing and debris for insulation to protect against cold.' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold text-teal-600 shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{TR ? a.tr : a.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Telefon */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0">
            <PhoneOff size={16} strokeWidth={1.8} />
          </span>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            {TR ? '6. Telefonu Akıllı Kullanın' : '6. Use Your Phone Wisely'}
          </h2>
        </div>
        <div className="space-y-2 pl-2">
          {[
            { tr: 'Ekranı kısın ve uçak modunu dönüşümlü kullanın — pili uzatmak kritiktir.', en: 'Dim the screen and toggle airplane mode — extending battery life is critical.' },
            { tr: '112\'yi arayın. Konuşamıyorsanız hattı açık bırakın ve operatörün sizi bulmasına izin verin.', en: 'Call 112. If you can\'t speak, leave the line open and allow the operator to locate you.' },
            { tr: 'SMS daha küçük bant genişliği kullandığından sıkışık hatları daha kolay aşar.', en: 'SMS uses less bandwidth and can get through congested networks more easily.' },
            { tr: 'GPS konumunuzu WhatsApp veya SMS ile paylaşın.', en: 'Share your GPS location via WhatsApp or SMS.' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs font-bold text-green-600 shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{TR ? a.tr : a.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zaman */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[var(--muted)] shrink-0" />
          <p className="text-xs font-bold text-[var(--foreground)]">
            {TR ? 'Hayatta Kalma Pencereleri' : 'Survival Windows'}
          </p>
        </div>
        <div className="space-y-1.5">
          {[
            { sure: '0–24 saat / 0–24 hours', tr: 'Kurtarma en yoğun bu aralıkta gerçekleşir. Aktif sinyal verin.', en: 'Rescue is most intensive in this window. Signal actively.' },
            { sure: '24–72 saat', tr: 'Susuzluk kritik hale gelir. Su bulmaya öncelik verin.', en: 'Dehydration becomes critical. Prioritise finding water.' },
            { sure: '72–200+ saat', tr: 'Hayatta kalmalar mümkündür. Sakin kalın, enerjinizi koruyun.', en: 'Survival is still possible. Stay calm, conserve energy.' },
          ].map((s) => (
            <div key={s.sure} className="flex items-start gap-2">
              <span className="text-[11px] font-bold text-red-500 shrink-0 min-w-[80px]">{s.sure}</span>
              <p className="text-[11px] text-[var(--muted)]">{TR ? s.tr : s.en}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hazırlık notu */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert size={16} className="text-amber-500 shrink-0" />
          <p className="text-xs font-bold text-[var(--foreground)]">
            {TR ? 'En İyi Strateji: Önceden Hazırlık' : 'Best Strategy: Prepare in Advance'}
          </p>
        </div>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
          {TR
            ? 'Deprem çantanıza düdük, el feneri ve küçük su reservi eklemek, enkaz altı senaryosunda hayatta kalma şansınızı dramatik biçimde artırır.'
            : 'Adding a whistle, flashlight, and small water reserve to your emergency kit dramatically increases your survival chances in a debris scenario.'}
        </p>
      </div>
    </article>
  );
}
