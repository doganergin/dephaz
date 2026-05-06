import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zemin Tipleri ve Deprem Riski — Deprem Hattı',
  description: 'Zemin yapısı deprem hasarını nasıl etkiler? Kaya, sıkı toprak, gevşek zemin ve sıvılaşma riski hakkında bilgi.',
};

export default function ZeminTipleriPage() {
  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Zemin Bilimi</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Zemin Tipleri ve Deprem Riski</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Altınızdaki zemin depremin şiddetini nasıl değiştirir?</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>Neden önemli?</strong> 1985 Meksika ve 1989 Loma Prieta depremlerinde gözlemlendiği
          üzere, aynı büyüklükteki deprem bazı bölgelerde hiç hasar vermezken bazı bölgelerde tüm
          binaları yıkabilir. Bu farkın büyük bölümü zemin türünden kaynaklanmaktadır.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Zemin Sınıflandırması (TBDY 2018)</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Türkiye Bina Deprem Yönetmeliği 2018 (TBDY 2018), zeminleri kayma dalgası hızına (Vs30) göre
          sınıflandırmaktadır. Vs30, zeminin üst 30 metresindeki ortalama kayma dalgası hızıdır ve
          zeminin sismik davranışını belirleyen en önemli parametrelerden biridir.
        </p>
        <div className="space-y-2">
          {[
            { sinif: 'ZA — Sağlam Kaya', vs: 'Vs30 > 1500 m/s', renk: 'green', aciklama: 'En güvenli zemin tipi. Deprem dalgalarını minimal amplifikasyonla iletir. Granit, bazalt ve sert kireçtaşı bu sınıfa girer.' },
            { sinif: 'ZB — Az Ayrışmış Kaya', vs: '760–1500 m/s', renk: 'green', aciklama: 'Yüzeysel çatlaklar içerebilir ancak deprem davranışı hâlâ iyi kabul edilir.' },
            { sinif: 'ZC — Sıkı Kum/Çakıl', vs: '360–760 m/s', renk: 'amber', aciklama: 'Sıkı toprak veya çakıl. Orta derecede amplifikasyon. Çoğu kentsel alanın zemin sınıfıdır.' },
            { sinif: 'ZD — Gevşek Zemin', vs: '180–360 m/s', renk: 'orange', aciklama: 'Gevşek kum, silt ve kil. Sismik dalgaları önemli ölçüde büyütür. Eski nehir yatakları ve dolgu alanlar bu sınıfa girer.' },
            { sinif: 'ZE — Yumuşak Zemin', vs: '< 180 m/s', renk: 'red', aciklama: 'En riskli zemin tipi. Bataklık, yumuşak kil ve çok gevşek zemin. Dalgaları 5-10 kat büyütebilir ve sıvılaşma riski taşır.' },
          ].map((item) => (
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
        <h2 className="text-base font-bold text-[var(--foreground)]">Zemin Sıvılaşması</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Sıvılaşma (likefaksiyon), deprem titreşimi sırasında doygun kumlu zeminlerin geçici olarak
          sıvı gibi davranması olgusudur. Su ile doygun gevşek kumlu zeminlerde deprem titreşimleri
          tanecikler arasındaki su basıncını artırarak zeminin taşıma kapasitesini yitirir ve üzerindeki
          yapılar çöker, devrilir ya da batar.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Sıvılaşma; sahil şeritlerinde, eski nehir yataklarında, göl kenarlarında ve deniz dolgu
          alanlarında çok sık görülür. 1999 Gölcük depremi sırasında Körfez ilçesinde binalar adeta
          zemine gömülmüş, bu durum sıvılaşmanın yıkıcı etkisini gözler önüne sermiştir.
        </p>
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-3">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">Sıvılaşma Riski Yüksek Alanlar</p>
          <ul className="text-[11px] text-red-800 dark:text-red-300 space-y-1 leading-relaxed">
            <li>• Dolgu alanlar ve kazanılmış araziler</li>
            <li>• Nehir delta ve taşkın ovaları</li>
            <li>• Eski göl ve bataklık alanları</li>
            <li>• Sahil şeridi yakınındaki kumlu alanlar</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Zemin Amplifikasyonu</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem dalgaları sert kayadan yumuşak zemine geçtiğinde yavaşlar ve büyür. Bu olaya
          <strong> zemin amplifikasyonu</strong> denir. Yumuşak zemin üzerindeki yapılar, kayalık
          zemin üzerindeki yapılara kıyasla aynı depremde çok daha fazla sallanabilir.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          1985 Meksika City depreminde şehir merkezi, depremin odak noktasına 400 km uzaklıkta
          olmasına karşın, eski göl dolgusu üzerinde kurulu olduğu için büyük yıkım yaşadı. Sert
          kayalık alanlarda ise hasar çok daha sınırlı kaldı. Bu olay, zemin etkisinin ne denli
          belirleyici olduğunun en çarpıcı örneklerinden biridir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Zemin Etüdü Neden Önemlidir?</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Türkiye'de her yapı projesi başlamadan önce <strong>zemin etüdü</strong> yapılması zorunludur.
          Zemin etüdü; sondaj, laboratuvar deneyleri ve sismik ölçümlerle zeminin taşıma kapasitesini,
          sıvılaşma olasılığını ve zemin sınıfını belirler.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Ancak gerçekte pek çok yapının zemin etüdü ya hiç yapılmamış ya da kurallara uygun
          yapılmamıştır. 2023 Kahramanmaraş depreminde yıkılan binaların büyük çoğunluğunda zemin
          sorunlarının yapısal hasara katkıda bulunduğu belgelenmiştir.
        </p>
      </section>

      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
        <p className="text-xs font-bold text-[var(--foreground)] mb-2">Bölgenizin Zemin Yapısını Öğrenin</p>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed mb-3">
          Deprem Hattı, Türkiye genelinde ilçe bazında zemin sınıflandırma verilerini sunmaktadır.
          Yaşadığınız ilçenin zemin tipini ve deprem riskini öğrenmek için bölge analizini kullanabilirsiniz.
        </p>
        <Link href="/" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Zemin Bilgisini Gör →
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">Kaynaklar</p>
        <p>• TBDY 2018 — Türkiye Bina Deprem Yönetmeliği</p>
        <p>• MTA Zemin Etüt Veritabanı — mta.gov.tr</p>
        <p>• Seed, H.B. & Idriss, I.M. (1971). Simplified procedure for evaluating soil liquefaction potential. ASCE Journal.</p>
      </div>
    </article>
  );
}
