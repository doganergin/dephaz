import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "İstanbul'da Depreme Nasıl Hazırlanılır? Adım Adım Rehber | Deprem Hattı",
  description:
    "İstanbul'da yaşayan birinin depreme hazırlık için bilmesi gereken her şey: bölge riski, deprem çantası, aile planı, bina kontrolü ve resmi kaynaklar. Bilimsel verilere dayalı kapsamlı rehber.",
  alternates: { canonical: '/blog/istanbul-depreme-nasil-hazirlanilir' },
  openGraph: {
    title: "İstanbul'da Depreme Nasıl Hazırlanılır?",
    description:
      "Kuzey Anadolu Fayı'nın gölgesinde yaşayan İstanbullular için bilimsel verilere dayalı deprem hazırlık rehberi.",
    type: 'article',
    publishedTime: '2026-05-21',
  },
};

export default function IstanbulDepremHazirlikPage() {
  return (
    <article className="space-y-6 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--muted)] flex items-center gap-1">
        <Link href="/" className="hover:text-[var(--foreground)]">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[var(--foreground)]">Blog</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">İstanbul Deprem Hazırlığı</span>
      </nav>

      {/* Başlık */}
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Hazırlık Rehberi</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)] leading-snug">
          İstanbul'da Depreme Nasıl Hazırlanılır? Adım Adım Kapsamlı Rehber
        </h1>
        <div className="flex items-center gap-3 mt-3 text-xs text-[var(--muted)]">
          <span>Doğan Ergin</span>
          <span>•</span>
          <span>21 Mayıs 2026</span>
          <span>•</span>
          <span>~8 dk okuma</span>
        </div>
      </div>

      {/* Özet kutu */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-1 uppercase tracking-wide">Önemli Bağlam</p>
        <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
          Türkiye Deprem Tehlike Haritası'na göre İstanbul'da önümüzdeki 30 yıl içinde M≥7 büyüklüğünde
          deprem olasılığı <strong>%62</strong>'dir (Parsons, 2004, JGR). Bu makale, bu gerçeklik altında
          yaşayan İstanbullular için bilimsel veriye dayalı, pratik bir hazırlık rehberidir.
        </p>
      </div>

      {/* Giriş */}
      <section className="prose prose-sm max-w-none text-[var(--foreground)]">
        <p className="text-sm leading-relaxed">
          İstanbul; 15 milyonu aşan nüfusu, yüzyıllık yapı stoğu ve Kuzey Anadolu Fayı'na olan
          yakınlığıyla Türkiye'nin en yüksek deprem riskine sahip kentidir. Şehrin hemen güneyinden
          geçen Marmara fayı, 1999 depreminden bu yana sessizliğini korusa da jeodinamik modeller
          bu sessizliğin kalıcı olmadığına işaret etmektedir.
        </p>
        <p className="text-sm leading-relaxed mt-3">
          Peki ne yapmalı? Korku değil, hazırlık. Bu rehberde İstanbul'da yaşayan bir kişinin depreme
          hazırlıklı olmak için atabileceği somut adımları — bölge riskini öğrenmekten aile planı
          oluşturmaya kadar — sırasıyla ele alıyoruz.
        </p>
      </section>

      {/* H2: Riskinizi Öğrenin */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          1. Kendi Bölgenizin Riskini Öğrenin
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          İstanbul'un 39 ilçesi aynı risk düzeyinde değildir. Avcılar, Zeytinburnu ve Bakırköy gibi
          kıyı ilçeleri yumuşak alüvyal zemin üzerinde kurulu olduğundan sismik dalgaları çok daha
          şiddetli hisseder. Öte yandan Beşiktaş, Sarıyer gibi kaya zemine oturan ilçelerde aynı
          depremin etkisi belirgin biçimde azalır.
        </p>

        <h3 className="text-sm font-bold text-[var(--foreground)]">Zemin Türü Neden Bu Kadar Önemli?</h3>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          1999 Kocaeli depreminde Avcılar, merkez üssüne olan uzaklığına rağmen şiddetli hasar
          gördü. Bunun temel nedeni "rezonans" etkisiydi: Yumuşak alüvyal zemin, deprem dalgalarını
          tıpkı bir hoparlör gibi büyütür. Avcılar'daki ivme, kaya zemine oturan Beşiktaş'ın
          yaklaşık 20 katıydı.
        </p>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-2">Ne Yapmalısınız?</p>
          <ul className="text-sm text-[var(--foreground)] space-y-1.5 leading-relaxed">
            <li>• Deprem Hattı'nın <Link href="/bolge-analizi" className="text-blue-500 hover:underline">Bölge Analizi</Link> aracıyla mahallenizin fay mesafesini ve zemin riskini öğrenin.</li>
            <li>• İBB Deprem ve Zemin İnceleme Müdürlüğü'nün (DEZİM) Vs30 haritasını inceleyin.</li>
            <li>• AFAD'ın Türkiye Deprem Tehlike Haritası üzerinde bulunduğunuz bölgenin tehlike sınıfını kontrol edin.</li>
          </ul>
        </div>
      </section>

      {/* H2: Binanızı Değerlendirin */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          2. Binanızı Değerlendirin
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          İstanbul'daki yapıların büyük bölümü, mevcut deprem yönetmeliklerinden önce inşa edilmiştir.
          1999 öncesi yapılan binaların önemli bir kısmı, günümüz standartlarında yetersiz kalmaktadır.
          TÜİK 2021 verilerine göre İstanbul'daki binaların yaklaşık %38'i 1980 yılından önce inşa
          edilmiştir.
        </p>

        <h3 className="text-sm font-bold text-[var(--foreground)]">Bina Güvenliğini Anlamanın Yolları</h3>
        <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed pl-3">
          <li>
            <strong>Ruhsat yılını öğrenin:</strong> Yapı ruhsatı 1999'dan önceyse yürürlükteki
            deprem yönetmeliği (DBYBHY-1997) kapsamı dışında olabilir.
          </li>
          <li>
            <strong>Bina incelemesi yaptırın:</strong> Lisanslı bir yapı denetim firması veya inşaat
            mühendisi, binanızın mevcut durumunu değerlendirebilir.
          </li>
          <li>
            <strong>İBB Kentsel Dönüşüm:</strong> Risk altındaki binalar için İBB kentsel dönüşüm
            kredisi ve dönüşüm prosedürleri hakkında bilgi alabilirsiniz.
          </li>
          <li>
            <strong>Güçlendirme:</strong> Yıkmak yerine güçlendirme (retrofitting) de bir seçenektir;
            özellikle tarihî değeri olan yapılar için mühendis görüşü alınmalıdır.
          </li>
        </ul>
      </section>

      {/* H2: Deprem Çantası */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          3. 72 Saatlik Deprem Çantası Hazırlayın
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Büyük bir depremden sonra ilk 72 saat hem en kritik hem de yardımın en zor ulaştığı
          dönemdir. Arama-kurtarma ekipleri önce ağır hasarlı alanlara yöneldiği için kendi
          imkânlarınızla hayatta kalmanız gerekebilir. Çanta; su, gıda, ilk yardım malzemesi,
          belge kopyaları ve iletişim araçlarından oluşmalıdır.
        </p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { kat: 'Su', detay: 'Kişi başı 3 lt/gün × 3 gün' },
            { kat: 'Gıda', detay: 'Hazır / uzun ömürlü ürünler' },
            { kat: 'İlk Yardım', detay: 'Sarmal, antiseptik, ilaçlar' },
            { kat: 'Belgeler', detay: 'Kimlik, tapu, sağlık kopyası' },
            { kat: 'El feneri', detay: 'Ekstra pil veya şarjlı' },
            { kat: 'Düdük', detay: 'Enkaz altında sinyal için' },
          ].map((item) => (
            <div key={item.kat} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-2.5">
              <p className="text-xs font-bold text-[var(--foreground)]">{item.kat}</p>
              <p className="text-[11px] text-[var(--muted)]">{item.detay}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">
          Tam liste için:{' '}
          <Link href="/canta" className="text-blue-500 hover:underline">
            Deprem Hattı 72 Saatlik Çanta Kontrol Listesi →
          </Link>
        </p>
      </section>

      {/* H2: Aile Planı */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          4. Aile İletişim ve Buluşma Planı Oluşturun
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Büyük bir depremde cep telefonu şebekeleri saatlerce çalışmayabilir. Bu nedenle aile
          bireylerinin önceden belirlenmiş bir buluşma noktası ve kısa mesajlı (SMS) iletişim
          planı olmalıdır; SMS'ler sesli arama başarısız olduğunda bile iletilebilir.
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed pl-3">
          <li><strong>Birincil buluşma noktası:</strong> Evinizin hemen yakınında, açık bir alan (park, meydan).</li>
          <li><strong>İkincil buluşma noktası:</strong> Mahallenin dışında, herkesin kolayca ulaşabileceği belirli bir yer.</li>
          <li><strong>Yurt dışı/şehir dışı referans kişi:</strong> Başka şehirde yaşayan bir yakın; afet bölgesindeki iletişim daha zor olduğundan dışarıdaki biri aile bireylerinin durumunu aktarabilir.</li>
          <li><strong>Çocuklar için okul planı:</strong> Okulun deprem protokolünü ve teslim alma prosedürünü öğrenin.</li>
        </ul>
        <p className="text-xs text-[var(--muted)]">
          <Link href="/aile-plani" className="text-blue-500 hover:underline">
            Deprem Hattı Aile Planı aracını kullanın →
          </Link>
        </p>
      </section>

      {/* H2: Deprem Anında */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          5. Deprem Anında Ne Yapacağınızı Öğrenin
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Hazırlığın en önemli parçalarından biri bilgidir — özellikle panik anında refleks hâline
          gelen bilgi. "Kapı çerçevesine koş" gibi eski ve hatalı bilgiler hâlâ yaygındır. Güncel
          araştırmalar, sarsıntı sırasında yapılacak en doğru şeyin <strong>Çök — Kapan — Tutun</strong>{' '}
          yöntemi olduğunu göstermektedir.
        </p>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold text-sm shrink-0">1.</span>
            <p className="text-sm text-[var(--foreground)]"><strong>Çök:</strong> Yere in, ayakta durma. Sarsıntı sizi devirebilir.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold text-sm shrink-0">2.</span>
            <p className="text-sm text-[var(--foreground)]"><strong>Kapan:</strong> Sağlam bir masa veya sandalyenin altına gir; yoksa başını ve enseni kollarınla koru.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold text-sm shrink-0">3.</span>
            <p className="text-sm text-[var(--foreground)]"><strong>Tutun:</strong> Sarsıntı durana kadar tutunmaya devam et; öne gitme, kaçmaya çalışma.</p>
          </div>
        </div>
      </section>

      {/* Sonuç */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--foreground)] border-l-4 border-red-500 pl-3">
          Sonuç: Hazırlık Ertelenecek Bir Şey Değil
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          İstanbul için olası bir büyük depremin "eğer" değil "ne zaman" sorusu olduğu, bilim
          insanları tarafından uzun süredir vurgulanmaktadır. Bu gerçeği kabullenmek korku
          yaratmak zorunda değildir; aksine hazırlıklı olmak, o kritik anlarda sakin ve etkili
          davranabilmenin tek yoludur.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Yukarıdaki beş adımı bugün atabilirsiniz: bölgenizin riskini öğrenmek on dakika,
          çantanızı hazırlamak bir hafta sonu, aile planınızı oluşturmak bir akşam yemeği sohbeti
          alır. Karşılığı ise paha biçilemez.
        </p>
      </section>

      {/* Kaynaklar */}
      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold text-xs mb-2">Kaynaklar</p>
        <p>• Parsons, T. (2004). Recalculated probability of M≥7 earthquakes beneath the Sea of Marmara. <em>JGR</em>. doi:10.1029/2003JB002667</p>
        <p>• AFAD (2018). Türkiye Deprem Tehlike Haritası. afad.gov.tr</p>
        <p>• İBB DEZİM, Vs30 Haritası (2019)</p>
        <p>• TÜİK, Bina Sayımı 2021</p>
        <p>• FEMA (2020). Drop, Cover, and Hold On. ready.gov</p>
      </div>

      {/* CTA */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
        <p className="text-xs font-bold text-[var(--foreground)] mb-3">Hazırlığa Şimdi Başlayın</p>
        <div className="flex flex-col gap-2">
          <Link href="/bolge-analizi" className="text-xs text-blue-500 hover:underline">→ Mahallenizin Risk Skorunu Öğrenin</Link>
          <Link href="/canta" className="text-xs text-blue-500 hover:underline">→ 72 Saatlik Deprem Çantası Listesi</Link>
          <Link href="/aile-plani" className="text-xs text-blue-500 hover:underline">→ Aile Buluşma Planı Oluşturun</Link>
          <Link href="/deprem-aninda" className="text-xs text-blue-500 hover:underline">→ Deprem Anında Ne Yapmalı?</Link>
        </div>
      </div>
    </article>
  );
}
