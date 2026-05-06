import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Deprem Nedir? Nasıl Oluşur? — Deprem Hattı',
  description: 'Deprem nedir, nasıl oluşur? Tektonik plakalar, fay hatları ve sismik dalgalar hakkında kapsamlı bilgi.',
};

export default function DepremNedirPage() {
  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Temel Bilgi</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Deprem Nedir? Nasıl Oluşur?</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Tektonik plakalardan sismik dalgalara deprem bilimi</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Depremin Tanımı</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem, yer kabuğundaki kayaçların ani kırılması sonucu açığa çıkan enerjinin sismik dalgalar
          halinde yayılmasıyla oluşan doğal bir yer sarsıntısıdır. Günümüzde dünya genelinde her yıl
          yaklaşık 500.000 deprem meydana gelmekte, bunların yaklaşık 100.000'i insanlar tarafından
          hissedilebilmekte ve yaklaşık 100 tanesi hasar oluşturabilmektedir.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Depremin oluştuğu noktaya <strong>odak noktası (hiposantr)</strong>, yeryüzündeki dikey
          projeksiyonuna ise <strong>merkez üs (episantr)</strong> adı verilir. Depremin etkisi, merkez
          üsden uzaklaştıkça azalmakla birlikte zemin yapısına, bina kalitesine ve derinliğe bağlı olarak
          farklılık gösterebilir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Tektonik Plakalar ve Fay Hatları</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Dünya'nın katı dış kabuğu olan litosfer, <strong>tektonik plakalar</strong> adı verilen büyük
          parçalara bölünmüştür. Bu plakalar, altındaki akışkan astenosfer üzerinde yavaşça hareket eder.
          Yılda ortalama birkaç santimetre olan bu hareket, milyonlarca yıl boyunca dağları, ovaları ve
          okyanusları şekillendirmiştir.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Plakalar birbirlerine sürtündükçe, birbirinin altına dalınca ya da birbirinden uzaklaştıkça
          kayaçlarda gerilim birikir. Bu gerilim belirli bir eşiği aştığında kayaç aniden kırılır ve
          biriken enerji sismik dalgalar halinde çevreye yayılır. Bu kırıklar, <strong>fay hatları</strong>
          olarak bilinir.
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-[var(--border)] rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">Fay Türleri</p>
          <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed">
            <li><strong>Normal Fay:</strong> Plakalar birbirinden uzaklaştığında oluşur. Bir blok diğerinin altına düşer.</li>
            <li><strong>Ters Fay:</strong> Plakalar birbirine yaklaştığında oluşur. Bir blok diğerinin üzerine çıkar.</li>
            <li><strong>Doğrultu Atımlı Fay:</strong> Plakalar yatay yönde birbirine sürtünür. Kuzey Anadolu Fay Hattı bu türdedir.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Türkiye Neden Bu Kadar Çok Deprem Yaşıyor?</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Türkiye, üç büyük tektonik plakanın (Avrasya, Afrika ve Arap plakaları) sıkıştırdığı Anadolu
          Levhası üzerinde yer almaktadır. Arap Levhası'nın kuzeye doğru hareketi, Anadolu Levhası'nı
          batıya doğru itmektedir. Bu durum iki kritik fay sisteminin oluşmasına yol açmıştır:
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-2 pl-4 leading-relaxed">
          <li>
            • <strong>Kuzey Anadolu Fay Hattı (KAFH):</strong> İran sınırından Marmara Denizi'ne kadar
            uzanan yaklaşık 1.500 km'lik bir sağ yanal doğrultu atımlı faydır. 1939'dan bu yana batıya
            doğru ilerleyen deprem serisine sahne olmuştur.
          </li>
          <li>
            • <strong>Doğu Anadolu Fay Hattı (DAFH):</strong> Karlıova'dan Hatay'a uzanan bu fay hattı,
            Şubat 2023'te Kahramanmaraş merkezli yıkıcı depremlere neden olmuştur.
          </li>
        </ul>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Türkiye topraklarının yaklaşık yüzde 92'si deprem bölgelerinde, nüfusun ise yaklaşık yüzde
          95'i deprem riski taşıyan alanlarda yaşamaktadır.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Sismik Dalgalar</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Depremin açığa çıkardığı enerji farklı türlerde sismik dalgalar halinde yayılır:
        </p>
        <div className="space-y-2">
          {[
            { ad: 'P Dalgası (Birincil)', aciklama: 'En hızlı dalgadır; hem katı hem de sıvı ortamda ilerleyebilir. Sıkışma ve genleşme hareketi yapar. Depremden önce uğultu şeklinde hissedilebilir.' },
            { ad: 'S Dalgası (İkincil)', aciklama: 'P dalgasından daha yavaştır ve yalnızca katı ortamda ilerler. Yatay sarsıntıya neden olur; yapılar için daha yıkıcıdır.' },
            { ad: 'Yüzey Dalgaları', aciklama: 'Yeryüzü boyunca ilerleyen en yavaş ama genellikle en yıkıcı dalgalardır. Love ve Rayleigh dalgaları olarak iki türü vardır.' },
          ].map((dalga) => (
            <div key={dalga.ad} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <p className="text-xs font-bold text-[var(--foreground)]">{dalga.ad}</p>
              <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{dalga.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Richter ve Moment Magnitüd Ölçekleri</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem büyüklüğü ölçmek için kullanılan en yaygın iki sistem şunlardır:
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          <strong>Richter Ölçeği (ML):</strong> 1935'te Charles Richter tarafından geliştirilen logaritmik
          bir ölçektir. Her bir tam sayılık artış, sismografta ölçülen genlikte 10 kat, açığa çıkan enerjide
          ise yaklaşık 31,6 kat artışa karşılık gelir.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          <strong>Moment Magnitüd (Mw):</strong> Günümüzde bilim insanlarının tercih ettiği bu ölçek,
          fayın kırılan alanı, kayma miktarı ve kayaç sertliği gibi fiziksel parametrelere dayanır.
          Büyük depremler için daha güvenilir sonuçlar verir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Artçı Sarsıntılar</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Ana depremin ardından aynı bölgede daha küçük depremler oluşabilir. Bu artçı sarsıntılar
          günler, haftalar hatta aylarca sürebilir. Hasar görmüş yapılar için artçı sarsıntılar ek
          risk oluşturabilir. Öte yandan bazı "artçı" sarsıntılar, asıl büyük depremin öncülü de
          olabilir; bu nedenle depremin hemen ardından binalara girmek tehlikeli olabilir.
        </p>
      </section>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">Bölgenizin Deprem Riskini Öğrenin</p>
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mb-3">
          Türkiye'nin herhangi bir ilçesi için fay mesafesi, zemin yapısı ve tarihsel deprem verilerini
          Deprem Hattı üzerinden analiz edebilirsiniz.
        </p>
        <Link href="/" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Bölge Analizi Yap →
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">Kaynaklar</p>
        <p>• USGS Earthquake Hazards Program — earthquake.usgs.gov</p>
        <p>• Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü — koeri.boun.edu.tr</p>
        <p>• AFAD Deprem Dairesi Başkanlığı — afad.gov.tr</p>
      </div>
    </article>
  );
}
