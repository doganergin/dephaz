'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DepremNedirPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">{TR ? 'Temel Bilgi' : 'Fundamentals'}</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'Deprem Nedir? Nasıl Oluşur?' : 'What is an Earthquake? How Does It Form?'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Tektonik plakalardan sismik dalgalara deprem bilimi' : 'Earthquake science from tectonic plates to seismic waves'}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Depremin Tanımı' : 'Definition'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem, yer kabuğundaki kayaçların ani kırılması sonucu açığa çıkan enerjinin sismik dalgalar halinde yayılmasıyla oluşan doğal bir yer sarsıntısıdır. Günümüzde dünya genelinde her yıl yaklaşık 500.000 deprem meydana gelmekte, bunların yaklaşık 100.000\'i insanlar tarafından hissedilebilmekte ve yaklaşık 100 tanesi hasar oluşturabilmektedir.'
            : 'An earthquake is a natural ground shaking caused by the sudden rupture of rocks in the Earth\'s crust, releasing energy in the form of seismic waves. About 500,000 earthquakes occur worldwide every year; around 100,000 can be felt by humans and roughly 100 cause damage.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Depremin oluştuğu noktaya odak noktası (hiposantr), yeryüzündeki dikey projeksiyonuna ise merkez üs (episantr) adı verilir.'
            : 'The point where the earthquake originates underground is called the focus (hypocenter), while its projection on the Earth\'s surface is called the epicenter.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Tektonik Plakalar ve Fay Hatları' : 'Tectonic Plates and Fault Lines'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Dünya\'nın katı dış kabuğu olan litosfer, tektonik plakalar adı verilen büyük parçalara bölünmüştür. Bu plakalar birbirlerine sürtündükçe, birbirinin altına dalınca ya da birbirinden uzaklaştıkça kayaçlarda gerilim birikir. Bu gerilim belirli bir eşiği aştığında kayaç aniden kırılır; bu kırıklar fay hatları olarak bilinir.'
            : 'The Earth\'s solid outer shell (lithosphere) is divided into large pieces called tectonic plates. As these plates grind against each other, subduct, or pull apart, stress builds up in the rocks. When this stress exceeds a threshold, the rock ruptures suddenly — these ruptures are known as fault lines.'}
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-[var(--border)] rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">{TR ? 'Fay Türleri' : 'Fault Types'}</p>
          <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed">
            {TR ? (
              <>
                <li><strong>Normal Fay:</strong> Plakalar birbirinden uzaklaştığında oluşur.</li>
                <li><strong>Ters Fay:</strong> Plakalar birbirine yaklaştığında oluşur.</li>
                <li><strong>Doğrultu Atımlı Fay:</strong> Plakalar yatay yönde birbirine sürtünür. Kuzey Anadolu Fay Hattı bu türdedir.</li>
              </>
            ) : (
              <>
                <li><strong>Normal Fault:</strong> Forms when plates move apart.</li>
                <li><strong>Reverse Fault:</strong> Forms when plates converge.</li>
                <li><strong>Strike-Slip Fault:</strong> Plates slide horizontally past each other. The North Anatolian Fault is this type.</li>
              </>
            )}
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Türkiye Neden Bu Kadar Çok Deprem Yaşıyor?' : 'Why Does Turkey Experience So Many Earthquakes?'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Türkiye, üç büyük tektonik plakanın (Avrasya, Afrika ve Arap plakaları) sıkıştırdığı Anadolu Levhası üzerinde yer almaktadır. Bu durum iki kritik fay sisteminin oluşmasına yol açmıştır: Kuzey Anadolu Fay Hattı (KAFH) ve Doğu Anadolu Fay Hattı (DAFH).'
            : 'Turkey sits on the Anatolian Plate, which is squeezed by three major tectonic plates (Eurasian, African, and Arabian). This has produced two critical fault systems: the North Anatolian Fault (NAF) and the East Anatolian Fault (EAF). Around 92% of Turkey\'s territory lies in earthquake zones.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Sismik Dalgalar' : 'Seismic Waves'}</h2>
        <div className="space-y-2">
          {[
            { tr: 'P Dalgası (Birincil)', en: 'P-Wave (Primary)', trA: 'En hızlı dalgadır; hem katı hem sıvı ortamda ilerler. Sıkışma ve genleşme hareketi yapar.', enA: 'The fastest wave; travels through both solid and liquid. Produces compression and expansion motion.' },
            { tr: 'S Dalgası (İkincil)', en: 'S-Wave (Secondary)', trA: 'P dalgasından daha yavaştır, yalnızca katı ortamda ilerler. Yapılar için daha yıkıcıdır.', enA: 'Slower than P-waves; travels only through solids. More destructive to structures.' },
            { tr: 'Yüzey Dalgaları', en: 'Surface Waves', trA: 'Yeryüzü boyunca ilerleyen en yavaş ama genellikle en yıkıcı dalgalardır.', enA: 'The slowest but usually most destructive waves; travel along the Earth\'s surface.' },
          ].map((d) => (
            <div key={d.tr} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <p className="text-xs font-bold text-[var(--foreground)]">{TR ? d.tr : d.en}</p>
              <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{TR ? d.trA : d.enA}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Moment Magnitüd Ölçeği' : 'Moment Magnitude Scale'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Günümüzde bilim insanlarının tercih ettiği Moment Magnitüd (Mw) ölçeği, fayın kırılan alanı, kayma miktarı ve kayaç sertliği gibi fiziksel parametrelere dayanır. Logaritmik bir ölçektir: her bir tam sayılık artış, açığa çıkan enerjide yaklaşık 31,6 kat artışa karşılık gelir.'
            : 'The Moment Magnitude (Mw) scale preferred by modern scientists is based on physical parameters such as the ruptured fault area, slip amount, and rock stiffness. It is logarithmic: each whole-number increase corresponds to roughly 31.6 times more energy released.'}
        </p>
      </section>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">{TR ? 'Bölgenizin Deprem Riskini Öğrenin' : 'Check Your Region\'s Earthquake Risk'}</p>
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mb-3">
          {TR
            ? 'Türkiye\'nin herhangi bir ilçesi için fay mesafesi, zemin yapısı ve tarihsel deprem verilerini analiz edebilirsiniz.'
            : 'Analyse fault distance, soil conditions, and historical earthquake data for any district in Turkey.'}
        </p>
        <Link href="/bolge-analizi" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          {TR ? 'Bölge Analizi Yap →' : 'Run Risk Analysis →'}
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">{TR ? 'Kaynaklar' : 'Sources'}</p>
        <p>• USGS Earthquake Hazards Program — earthquake.usgs.gov</p>
        <p>• Kandilli Rasathanesi (KOERI) — koeri.boun.edu.tr</p>
        <p>• AFAD Deprem Dairesi — afad.gov.tr</p>
      </div>
    </article>
  );
}
