'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function IstanbulDepremHazirlikPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <article className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--muted)] flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-[var(--foreground)]">{TR ? 'Ana Sayfa' : 'Home'}</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[var(--foreground)]">Blog</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{TR ? 'İstanbul Deprem Hazırlığı' : 'Istanbul Earthquake Preparedness'}</span>
      </nav>

      {/* Başlık */}
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
          {TR ? 'Hazırlık Rehberi' : 'Preparedness Guide'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)] leading-snug">
          {TR
            ? "İstanbul'da Depreme Nasıl Hazırlanılır? Adım Adım Kapsamlı Rehber"
            : 'How to Prepare for an Earthquake in Istanbul? A Comprehensive Step-by-Step Guide'}
        </h1>
        <div className="flex items-center gap-3 mt-3 text-xs text-[var(--muted)] flex-wrap">
          <span>Doğan Ergin</span>
          <span>•</span>
          <span>{TR ? '21 Mayıs 2026' : 'May 21, 2026'}</span>
          <span>•</span>
          <span>{TR ? '~8 dk okuma' : '~8 min read'}</span>
        </div>
      </div>

      {/* Bağlam kutusu */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-1 uppercase tracking-wide">
          {TR ? 'Önemli Bağlam' : 'Key Context'}
        </p>
        <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
          {TR
            ? <>Türkiye Deprem Tehlike Haritası'na göre İstanbul'da önümüzdeki 30 yıl içinde M≥7 büyüklüğünde deprem olasılığı <strong>%62</strong>'dir (Parsons, 2004, JGR). Bu makale, bu gerçeklik altında yaşayan İstanbullular için bilimsel veriye dayalı, pratik bir hazırlık rehberidir.</>
            : <>According to the Turkey Earthquake Hazard Map, the probability of a M≥7 earthquake beneath Istanbul in the next 30 years is <strong>62%</strong> (Parsons, 2004, JGR). This article is a science-backed, practical preparedness guide for those living under this reality.</>}
        </p>
      </div>

      {/* Giriş */}
      <section className="space-y-3">
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "İstanbul; 15 milyonu aşan nüfusu, yüzyıllık yapı stoğu ve Kuzey Anadolu Fayı'na olan yakınlığıyla Türkiye'nin en yüksek deprem riskine sahip kentidir. Şehrin hemen güneyinden geçen Marmara fayı, 1999 depreminden bu yana sessizliğini korusa da jeodinamik modeller bu sessizliğin kalıcı olmadığına işaret etmektedir."
            : "Istanbul — with its population of over 15 million, century-old building stock, and proximity to the North Anatolian Fault — is Turkey's highest seismic risk city. The Marmara fault, which runs just south of the city, has been quiet since 1999, but geodynamic models indicate this silence is not permanent."}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "Peki ne yapmalı? Korku değil, hazırlık. Bu rehberde İstanbul'da yaşayan bir kişinin depreme hazırlıklı olmak için atabileceği somut adımları — bölge riskini öğrenmekten aile planı oluşturmaya kadar — sırasıyla ele alıyoruz."
            : "So what should you do? Not fear — preparedness. In this guide we walk through the concrete steps an Istanbul resident can take to be ready, from learning your regional risk to creating a family plan."}
        </p>
      </section>

      {/* Adım 1 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          {TR ? '1. Kendi Bölgenizin Riskini Öğrenin' : '1. Learn Your Regional Risk'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "İstanbul'un 39 ilçesi aynı risk düzeyinde değildir. Avcılar, Zeytinburnu ve Bakırköy gibi kıyı ilçeleri yumuşak alüvyal zemin üzerinde kurulu olduğundan sismik dalgaları çok daha şiddetli hisseder. Beşiktaş ve Sarıyer gibi kaya zemine oturan ilçelerde ise aynı depremin etkisi belirgin biçimde azalır."
            : "Istanbul's 39 districts are not at equal risk. Coastal districts like Avcılar, Zeytinburnu, and Bakırköy sit on soft alluvial soil and experience seismic waves far more intensely. Districts such as Beşiktaş and Sarıyer, which rest on rock, see the same earthquake's impact significantly reduced."}
        </p>
        <h3 className="text-sm font-bold text-[var(--foreground)]">
          {TR ? 'Zemin Türü Neden Bu Kadar Önemli?' : 'Why Does Soil Type Matter So Much?'}
        </h3>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "1999 Kocaeli depreminde Avcılar, merkez üssüne olan uzaklığına rağmen şiddetli hasar gördü. Bunun temel nedeni rezonans etkisiydi: Yumuşak alüvyal zemin, deprem dalgalarını tıpkı bir hoparlör gibi büyütür. Avcılar'daki ivme, kaya zemine oturan Beşiktaş'ın yaklaşık 20 katıydı."
            : "During the 1999 Kocaeli earthquake, Avcılar suffered severe damage despite its distance from the epicentre. The main reason was the resonance effect: soft alluvial soil amplifies seismic waves much like a loudspeaker. Ground acceleration in Avcılar was approximately 20 times greater than in bedrock-seated Beşiktaş."}
        </p>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-2">
            {TR ? 'Ne Yapmalısınız?' : 'What Should You Do?'}
          </p>
          <ul className="text-sm text-[var(--foreground)] space-y-1.5 leading-relaxed">
            <li>• <Link href="/bolge-analizi" className="text-blue-500 hover:underline">{TR ? 'Bölge Analizi' : 'Risk Analysis'}</Link> {TR ? "aracıyla mahallenizin fay mesafesini ve zemin riskini öğrenin." : "tool to learn your neighbourhood's fault distance and soil risk."}</li>
            <li>• {TR ? "İBB DEZİM'in Vs30 haritasını inceleyin." : "Check İBB DEZİM's Vs30 soil amplification map."}</li>
            <li>• {TR ? "AFAD Türkiye Deprem Tehlike Haritası'nda bulunduğunuz bölgenin tehlike sınıfını kontrol edin." : "Check your hazard zone on the AFAD Turkey Earthquake Hazard Map."}</li>
          </ul>
        </div>
      </section>

      {/* Adım 2 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          {TR ? '2. Binanızı Değerlendirin' : '2. Assess Your Building'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "İstanbul'daki yapıların büyük bölümü, mevcut deprem yönetmeliklerinden önce inşa edilmiştir. TÜİK 2021 verilerine göre İstanbul'daki binaların yaklaşık %38'i 1980 yılından önce yapılmıştır."
            : "A large proportion of Istanbul's buildings were constructed before current earthquake codes. According to TÜİK 2021 data, approximately 38% of buildings in Istanbul were built before 1980."}
        </p>
        <h3 className="text-sm font-bold text-[var(--foreground)]">
          {TR ? 'Bina Güvenliğini Anlamanın Yolları' : 'Ways to Understand Building Safety'}
        </h3>
        <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed pl-3">
          <li><strong>{TR ? 'Ruhsat yılını öğrenin:' : 'Check the permit year:'}</strong> {TR ? "1999 öncesi ruhsatlı yapılar DBYBHY-1997 kapsamı dışında kalabilir." : "Permits before 1999 may fall outside the DBYBHY-1997 earthquake code."}</li>
          <li><strong>{TR ? 'Bina incelemesi yaptırın:' : 'Commission a structural inspection:'}</strong> {TR ? "Lisanslı bir inşaat mühendisi mevcut durumu değerlendirebilir." : "A licensed structural engineer can assess the current condition."}</li>
          <li><strong>{TR ? 'İBB Kentsel Dönüşüm:' : 'İBB Urban Renewal:'}</strong> {TR ? "Risk altındaki binalar için kentsel dönüşüm kredi ve prosedürleri hakkında bilgi alın." : "Learn about urban renewal credits and procedures for at-risk buildings."}</li>
        </ul>
      </section>

      {/* Adım 3 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          {TR ? '3. 72 Saatlik Deprem Çantası Hazırlayın' : '3. Prepare a 72-Hour Emergency Kit'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "Büyük bir depremden sonra ilk 72 saat hem en kritik hem de yardımın en zor ulaştığı dönemdir. Kendi imkânlarınızla hayatta kalmanız gerekebilir."
            : "The first 72 hours after a major earthquake are both the most critical and the hardest period to receive outside help. You may need to survive on your own resources."}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { tr: 'Su', en: 'Water', trD: 'Kişi başı 3 lt/gün × 3 gün', enD: '3 L/person/day × 3 days' },
            { tr: 'Gıda', en: 'Food', trD: 'Hazır / uzun ömürlü ürünler', enD: 'Ready-to-eat / long-shelf-life items' },
            { tr: 'İlk Yardım', en: 'First Aid', trD: 'Sarmal, antiseptik, ilaçlar', enD: 'Bandages, antiseptic, medications' },
            { tr: 'Belgeler', en: 'Documents', trD: 'Kimlik, tapu, sağlık kopyası', enD: 'ID, deed, health record copies' },
            { tr: 'El Feneri', en: 'Flashlight', trD: 'Ekstra pil veya şarjlı', enD: 'Extra batteries or rechargeable' },
            { tr: 'Düdük', en: 'Whistle', trD: 'Enkaz altında sinyal için', enD: 'For signalling under debris' },
          ].map((item) => (
            <div key={item.tr} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2.5">
              <p className="text-xs font-bold text-[var(--foreground)]">{TR ? item.tr : item.en}</p>
              <p className="text-[11px] text-[var(--muted)]">{TR ? item.trD : item.enD}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">
          <Link href="/canta" className="text-blue-500 hover:underline">
            {TR ? 'Tam Liste: 72 Saatlik Deprem Çantası →' : 'Full List: 72-Hour Emergency Kit →'}
          </Link>
        </p>
      </section>

      {/* Adım 4 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          {TR ? '4. Aile İletişim ve Buluşma Planı Oluşturun' : '4. Create a Family Communication & Meeting Plan'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "Büyük bir depremde cep telefonu şebekeleri saatlerce çalışmayabilir. Aile bireylerinin önceden belirlenmiş bir buluşma noktası ve SMS iletişim planı olmalıdır — SMS'ler sesli arama başarısız olduğunda bile iletilebilir."
            : "After a major earthquake, mobile networks may be down for hours. Family members need a pre-agreed meeting point and SMS communication plan — text messages can get through even when voice calls fail."}
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed pl-3">
          <li><strong>{TR ? 'Birincil buluşma noktası:' : 'Primary meeting point:'}</strong> {TR ? "Evinizin yakınında açık bir alan (park, meydan)." : "An open area near your home (park, square)."}</li>
          <li><strong>{TR ? 'İkincil buluşma noktası:' : 'Secondary meeting point:'}</strong> {TR ? "Mahallenin dışında, herkesin kolayca ulaşabileceği belirli bir yer." : "A specific place outside the neighbourhood everyone can reach easily."}</li>
          <li><strong>{TR ? 'Şehir dışı referans kişi:' : 'Out-of-city contact person:'}</strong> {TR ? "Başka şehirde bir yakın aile bireylerinin durumunu aktarabilir." : "A relative in another city can relay family members' status."}</li>
          <li><strong>{TR ? 'Çocuklar için okul planı:' : "Children's school plan:"}</strong> {TR ? "Okulun deprem protokolünü ve teslim alma prosedürünü öğrenin." : "Learn the school's earthquake protocol and pick-up procedure."}</li>
        </ul>
        <p className="text-xs text-[var(--muted)]">
          <Link href="/aile-plani" className="text-blue-500 hover:underline">
            {TR ? 'Aile Buluşma Planı Aracı →' : 'Family Meeting Plan Tool →'}
          </Link>
        </p>
      </section>

      {/* Adım 5 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          {TR ? '5. Deprem Anında Ne Yapacağınızı Öğrenin' : '5. Learn What to Do During Shaking'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? '"Kapı çerçevesine koş" gibi eski ve hatalı bilgiler hâlâ yaygındır. Güncel araştırmalar, sarsıntı sırasında yapılacak en doğru şeyin Çök — Kapan — Tutun yöntemi olduğunu göstermektedir.'
            : 'Old and incorrect advice like "run to a doorframe" is still widespread. Current research shows the correct action during shaking is Drop — Cover — Hold On.'}
        </p>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
          {[
            { num: '1', tr: 'Çök', en: 'Drop', trA: 'Yere in, ayakta durma. Sarsıntı sizi devirebilir.', enA: 'Get down to the ground. Shaking can knock you off your feet.' },
            { num: '2', tr: 'Kapan', en: 'Cover', trA: 'Sağlam bir masa altına gir; yoksa başını ve enseni kollarınla koru.', enA: 'Get under a sturdy table; if none, cover your head and neck with your arms.' },
            { num: '3', tr: 'Tutun', en: 'Hold On', trA: 'Sarsıntı durana kadar tutunmaya devam et; kaçmaya çalışma.', enA: 'Keep holding until the shaking stops. Do not try to run.' },
          ].map((s) => (
            <div key={s.num} className="flex items-start gap-2">
              <span className="text-red-500 font-bold text-sm shrink-0">{s.num}.</span>
              <p className="text-sm text-[var(--foreground)]">
                <strong>{TR ? s.tr : s.en}:</strong>{' '}{TR ? s.trA : s.enA}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sonuç */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          {TR ? 'Sonuç: Hazırlık Ertelenecek Bir Şey Değil' : 'Conclusion: Preparedness Cannot Be Postponed'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "İstanbul için olası büyük bir depremin \"eğer\" değil \"ne zaman\" sorusu olduğu, bilim insanları tarafından uzun süredir vurgulanmaktadır. Bu gerçeği kabullenmek korku yaratmak zorunda değildir; aksine hazırlıklı olmak, o kritik anlarda sakin ve etkili davranabilmenin tek yoludur."
            : "Scientists have long emphasized that a major earthquake for Istanbul is a question of \"when,\" not \"if.\" Accepting this reality does not have to mean living in fear — on the contrary, being prepared is the only way to remain calm and effective in those critical moments."}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? "Yukarıdaki beş adımı bugün atabilirsiniz: bölgenizin riskini öğrenmek on dakika, çantanızı hazırlamak bir hafta sonu, aile planınızı oluşturmak bir akşam yemeği sohbeti alır. Karşılığı ise paha biçilemez."
            : "You can take the five steps above today: learning your risk takes ten minutes, preparing your kit takes a weekend, and creating a family plan takes one dinner conversation. The return is priceless."}
        </p>
      </section>

      {/* Kaynaklar */}
      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold text-xs mb-2">{TR ? 'Kaynaklar' : 'Sources'}</p>
        <p>• Parsons, T. (2004). Recalculated probability of M≥7 earthquakes beneath the Sea of Marmara. <em>Journal of Geophysical Research</em>. doi:10.1029/2003JB002667</p>
        <p>• AFAD (2018). {TR ? 'Türkiye Deprem Tehlike Haritası' : 'Turkey Earthquake Hazard Map'}. afad.gov.tr</p>
        <p>• İBB DEZİM, Vs30 {TR ? 'Haritası' : 'Map'} (2019)</p>
        <p>• TÜİK, {TR ? 'Bina Sayımı 2021' : 'Building Census 2021'}</p>
        <p>• FEMA (2020). Drop, Cover, and Hold On. ready.gov</p>
      </div>

      {/* CTA */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
        <p className="text-xs font-bold text-[var(--foreground)] mb-3">
          {TR ? 'Hazırlığa Şimdi Başlayın' : 'Start Preparing Now'}
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/bolge-analizi" className="text-xs text-blue-500 hover:underline">→ {TR ? 'Mahallenizin Risk Skorunu Öğrenin' : 'Check Your Neighbourhood Risk Score'}</Link>
          <Link href="/canta" className="text-xs text-blue-500 hover:underline">→ {TR ? '72 Saatlik Deprem Çantası Listesi' : '72-Hour Emergency Kit Checklist'}</Link>
          <Link href="/aile-plani" className="text-xs text-blue-500 hover:underline">→ {TR ? 'Aile Buluşma Planı Oluşturun' : 'Create Your Family Meeting Plan'}</Link>
          <Link href="/deprem-aninda" className="text-xs text-blue-500 hover:underline">→ {TR ? 'Deprem Anında Ne Yapmalı?' : 'What to Do During an Earthquake?'}</Link>
        </div>
      </div>
    </article>
  );
}
