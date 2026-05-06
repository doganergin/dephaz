'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ZeminTipleriPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const siniflar = TR ? [
    { sinif: 'ZA — Sağlam Kaya', vs: 'Vs30 > 1500 m/s', renk: 'green', aciklama: 'En güvenli zemin tipi. Deprem dalgalarını minimal amplifikasyonla iletir. Granit, bazalt ve sert kireçtaşı bu sınıfa girer.' },
    { sinif: 'ZB — Az Ayrışmış Kaya', vs: '760–1500 m/s', renk: 'green', aciklama: 'Yüzeysel çatlaklar içerebilir ancak deprem davranışı hâlâ iyi kabul edilir.' },
    { sinif: 'ZC — Sıkı Kum/Çakıl', vs: '360–760 m/s', renk: 'amber', aciklama: 'Sıkı toprak veya çakıl. Orta derecede amplifikasyon. Çoğu kentsel alanın zemin sınıfıdır.' },
    { sinif: 'ZD — Gevşek Zemin', vs: '180–360 m/s', renk: 'orange', aciklama: 'Gevşek kum, silt ve kil. Sismik dalgaları önemli ölçüde büyütür. Eski nehir yatakları ve dolgu alanlar bu sınıfa girer.' },
    { sinif: 'ZE — Yumuşak Zemin', vs: '< 180 m/s', renk: 'red', aciklama: 'En riskli zemin tipi. Bataklık, yumuşak kil ve çok gevşek zemin. Dalgaları 5-10 kat büyütebilir ve sıvılaşma riski taşır.' },
  ] : [
    { sinif: 'ZA — Hard Rock', vs: 'Vs30 > 1500 m/s', renk: 'green', aciklama: 'The safest soil type. Transmits seismic waves with minimal amplification. Granite, basalt, and hard limestone fall in this class.' },
    { sinif: 'ZB — Slightly Weathered Rock', vs: '760–1500 m/s', renk: 'green', aciklama: 'May contain surface fractures but seismic behaviour is still considered good.' },
    { sinif: 'ZC — Dense Sand / Gravel', vs: '360–760 m/s', renk: 'amber', aciklama: 'Dense soil or gravel. Moderate amplification. The soil class of most urban areas.' },
    { sinif: 'ZD — Loose Soil', vs: '180–360 m/s', renk: 'orange', aciklama: 'Loose sand, silt, and clay. Significantly amplifies seismic waves. Old riverbeds and fill areas fall in this class.' },
    { sinif: 'ZE — Soft Soil', vs: '< 180 m/s', renk: 'red', aciklama: 'The riskiest soil type. Marshland, soft clay, and very loose soil. Can amplify waves 5–10 times and carries liquefaction risk.' },
  ];

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">{TR ? 'Zemin Bilimi' : 'Soil Science'}</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'Zemin Tipleri ve Deprem Riski' : 'Soil Types and Earthquake Risk'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Altınızdaki zemin depremin şiddetini nasıl değiştirir?' : 'How does the ground beneath you change earthquake intensity?'}</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>{TR ? 'Neden önemli?' : 'Why does it matter?'}</strong>{' '}
          {TR
            ? '1985 Meksika ve 1989 Loma Prieta depremlerinde gözlemlendiği üzere, aynı büyüklükteki deprem bazı bölgelerde hiç hasar vermezken bazı bölgelerde tüm binaları yıkabilir. Bu farkın büyük bölümü zemin türünden kaynaklanmaktadır.'
            : 'As observed in the 1985 Mexico City and 1989 Loma Prieta earthquakes, the same magnitude earthquake can leave some areas undamaged while destroying all buildings in others. Much of this difference comes from the type of soil.'}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Zemin Sınıflandırması (TBDY 2018)' : 'Soil Classification (TBDY 2018)'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Türkiye Bina Deprem Yönetmeliği 2018 (TBDY 2018), zeminleri kayma dalgası hızına (Vs30) göre sınıflandırmaktadır. Vs30, zeminin üst 30 metresindeki ortalama kayma dalgası hızıdır ve zeminin sismik davranışını belirleyen en önemli parametrelerden biridir.'
            : 'The Turkish Building Earthquake Code 2018 (TBDY 2018) classifies soils according to shear wave velocity (Vs30). Vs30 is the average shear wave velocity in the top 30 metres of soil and is one of the most important parameters determining the seismic behaviour of a site.'}
        </p>
        <div className="space-y-2">
          {siniflar.map((item) => (
            <div key={item.sinif} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-[var(--foreground)]">{item.sinif}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.renk === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-700' :
                  item.renk === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700' :
                  item.renk === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700' :
                  'bg-red-100 dark:bg-red-900/30 text-red-700'
                }`}>{item.vs}</span>
              </div>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">{item.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Zemin Sıvılaşması' : 'Soil Liquefaction'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sıvılaşma (likefaksiyon), deprem titreşimi sırasında doygun kumlu zeminlerin geçici olarak sıvı gibi davranması olgusudur. Su ile doygun gevşek kumlu zeminlerde deprem titreşimleri tanecikler arasındaki su basıncını artırarak zeminin taşıma kapasitesini yitirir ve üzerindeki yapılar çöker, devrilir ya da batar.'
            : 'Liquefaction is the phenomenon where saturated sandy soils temporarily behave like a liquid during earthquake shaking. In water-saturated loose sands, earthquake vibrations increase pore water pressure, causing the soil to lose its bearing capacity — buildings above may collapse, tilt, or sink.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sıvılaşma; sahil şeritlerinde, eski nehir yataklarında, göl kenarlarında ve deniz dolgu alanlarında çok sık görülür. 1999 Gölcük depremi sırasında Körfez ilçesinde binalar adeta zemine gömülmüş, bu durum sıvılaşmanın yıkıcı etkisini gözler önüne sermiştir.'
            : 'Liquefaction is very common in coastal strips, old riverbeds, lake shores, and marine reclamation areas. During the 1999 Gölcük earthquake, buildings in the Körfez district literally sank into the ground, dramatically demonstrating the destructive power of liquefaction.'}
        </p>
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-3">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">{TR ? 'Sıvılaşma Riski Yüksek Alanlar' : 'High Liquefaction Risk Areas'}</p>
          <ul className="text-[11px] text-red-800 dark:text-red-300 space-y-1 leading-relaxed">
            <li>• {TR ? 'Dolgu alanlar ve kazanılmış araziler' : 'Fill areas and reclaimed land'}</li>
            <li>• {TR ? 'Nehir delta ve taşkın ovaları' : 'River deltas and floodplains'}</li>
            <li>• {TR ? 'Eski göl ve bataklık alanları' : 'Former lake and marsh areas'}</li>
            <li>• {TR ? 'Sahil şeridi yakınındaki kumlu alanlar' : 'Sandy areas near the coastline'}</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Zemin Amplifikasyonu' : 'Site Amplification'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem dalgaları sert kayadan yumuşak zemine geçtiğinde yavaşlar ve büyür. Bu olaya zemin amplifikasyonu denir. Yumuşak zemin üzerindeki yapılar, kayalık zemin üzerindeki yapılara kıyasla aynı depremde çok daha fazla sallanabilir.'
            : 'When seismic waves pass from hard rock into soft soil they slow down and grow larger. This is called site amplification. Buildings on soft ground can experience far greater shaking than those on rock during the same earthquake.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? '1985 Meksika City depreminde şehir merkezi, depremin odak noktasına 400 km uzaklıkta olmasına karşın, eski göl dolgusu üzerinde kurulu olduğu için büyük yıkım yaşadı. Sert kayalık alanlarda ise hasar çok daha sınırlı kaldı. Bu olay, zemin etkisinin ne denli belirleyici olduğunun en çarpıcı örneklerinden biridir.'
            : 'During the 1985 Mexico City earthquake, the city centre — 400 km from the epicentre — suffered massive destruction because it was built on ancient lake bed sediments. Damage in areas of hard rock was far more limited. This event is one of the most striking demonstrations of how decisive soil conditions can be.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Zemin Etüdü Neden Önemlidir?' : 'Why Is a Soil Survey Important?'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Türkiye\'de her yapı projesi başlamadan önce zemin etüdü yapılması zorunludur. Zemin etüdü; sondaj, laboratuvar deneyleri ve sismik ölçümlerle zeminin taşıma kapasitesini, sıvılaşma olasılığını ve zemin sınıfını belirler.'
            : 'In Turkey, a soil survey (zemin etüdü) is legally required before any construction project. The survey uses drilling, laboratory tests, and seismic measurements to determine the soil\'s bearing capacity, liquefaction potential, and classification class.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Ancak gerçekte pek çok yapının zemin etüdü ya hiç yapılmamış ya da kurallara uygun yapılmamıştır. 2023 Kahramanmaraş depreminde yıkılan binaların büyük çoğunluğunda zemin sorunlarının yapısal hasara katkıda bulunduğu belgelenmiştir.'
            : 'In practice, however, many buildings were constructed with no soil survey or with one that did not comply with the rules. It has been documented that soil problems contributed to structural damage in the majority of buildings that collapsed in the 2023 Kahramanmaraş earthquake.'}
        </p>
      </section>

      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
        <p className="text-xs font-bold text-[var(--foreground)] mb-2">{TR ? 'Bölgenizin Zemin Yapısını Öğrenin' : 'Find the Soil Type for Your Region'}</p>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed mb-3">
          {TR
            ? 'Deprem Hattı, Türkiye genelinde ilçe bazında zemin sınıflandırma verilerini sunmaktadır. Yaşadığınız ilçenin zemin tipini ve deprem riskini öğrenmek için bölge analizini kullanabilirsiniz.'
            : 'Deprem Hattı provides district-level soil classification data across Turkey. Use the risk analysis tool to find out the soil type and earthquake risk for your district.'}
        </p>
        <Link href="/bolge-analizi" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          {TR ? 'Zemin Bilgisini Gör →' : 'View Soil Information →'}
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">{TR ? 'Kaynaklar' : 'Sources'}</p>
        <p>• TBDY 2018 — {TR ? 'Türkiye Bina Deprem Yönetmeliği' : 'Turkish Building Earthquake Code 2018'}</p>
        <p>• MTA {TR ? 'Zemin Etüt Veritabanı' : 'Soil Survey Database'} — mta.gov.tr</p>
        <p>• Seed, H.B. & Idriss, I.M. (1971). Simplified procedure for evaluating soil liquefaction potential. ASCE Journal.</p>
      </div>
    </article>
  );
}
