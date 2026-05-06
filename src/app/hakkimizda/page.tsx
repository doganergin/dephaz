import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hakkımızda — Deprem Hattı',
  description: 'Deprem Hattı hakkında bilgi. Misyonumuz, kullandığımız veri kaynakları ve deprem bilincine katkımız.',
};

export default function HakkimizdaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Hakkımızda</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Deprem Hattı nedir, kim tarafından yapıldı?</p>
      </div>

      <section className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5 space-y-3">
        <p className="text-lg font-bold text-red-700 dark:text-red-400">Misyonumuz</p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Türkiye, dünyanın en aktif deprem kuşaklarından birinde yer almaktadır. Her yıl binlerce deprem
          yaşanmakta, zaman zaman bu depremler büyük can ve mal kayıplarına yol açmaktadır. Deprem Hattı,
          vatandaşların kendi bölgelerindeki deprem riskini bilimsel verilerle, sade bir dille anlamalarına
          yardımcı olmak amacıyla kurulmuştur.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Amacımız korku yaratmak değil, bilinçli hazırlık sağlamaktır. Deprem anında ne yapacağını bilen,
          çantasını hazırlamış ve binasının riskini öğrenmiş bir toplum kayıpları en aza indirebilir.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">Ne Sunuyoruz?</h2>
        <div className="space-y-3">
          {[
            { icon: '🗺️', baslik: 'Bölge Risk Analizi', aciklama: 'İl, ilçe ve mahalle bazında fay mesafesi, zemin yapısı, bina stoku ve tarihsel deprem verileriyle kapsamlı risk değerlendirmesi.' },
            { icon: '🌍', baslik: 'Canlı Deprem Haritası', aciklama: 'Kandilli, AFAD ve USGS kaynaklarından anlık deprem verilerini harita üzerinde görselleştirme.' },
            { icon: '🎒', baslik: '72 Saatlik Deprem Çantası', aciklama: 'AFAD, FEMA ve Kızılay kılavuzlarına dayanan interaktif hazırlık listesi.' },
            { icon: '🔬', baslik: 'Uzman Değerlendirmeleri', aciklama: 'Deprem bilimcilerin hakemli makalelere dayanan açıklamaları ve analizleri.' },
          ].map((item) => (
            <div key={item.baslik} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-[var(--foreground)]">{item.baslik}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">{item.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Veri Kaynaklarımız</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Sitedeki tüm veriler kamuya açık resmi ve bilimsel kaynaklardan derlenmektedir.
        </p>
        <div className="space-y-2">
          {[
            { ad: 'Kandilli Rasathanesi (KOERI)', aciklama: 'Gerçek zamanlı deprem kayıtları', link: 'http://www.koeri.boun.edu.tr' },
            { ad: 'AFAD', aciklama: 'Türkiye Deprem Tehlike Haritası 2018 ve deprem verileri', link: 'https://www.afad.gov.tr' },
            { ad: 'USGS', aciklama: 'Küresel deprem veritabanı', link: 'https://earthquake.usgs.gov' },
            { ad: 'MTA', aciklama: 'Türkiye Aktif Fay Haritası', link: 'https://www.mta.gov.tr' },
            { ad: 'TÜİK', aciklama: 'Bina Sayımı 2021 verileri', link: 'https://data.tuik.gov.tr' },
          ].map((k) => (
            <div key={k.ad} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className="flex-1">
                <p className="text-xs font-bold text-[var(--foreground)]">{k.ad}</p>
                <p className="text-[11px] text-[var(--muted)]">{k.aciklama}</p>
              </div>
              <a href={k.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-500 hover:underline shrink-0">Ziyaret et →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Geliştirici</h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-2xl shrink-0">👤</div>
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">Doğan Ergin</p>
            <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
              Yazılım geliştirici. Deprem Hattı, 2023 Kahramanmaraş depremleri sonrasında toplumsal deprem
              bilincini artırmak amacıyla başlatılmış bağımsız bir projedir.
            </p>
            <a href="mailto:doganergin15@gmail.com" className="text-[11px] text-blue-500 hover:underline mt-1.5 block">doganergin15@gmail.com</a>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2">Önemli Not</p>
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          Deprem Hattı herhangi bir deprem kehaneti sunmamaktadır. Sitedeki tüm veriler bilimsel kaynaklardan
          derlenerek istatistiksel yöntemlerle yorumlanmış tahminlerdir ve resmi uyarı niteliği taşımaz.
          Olası bir afet durumunda AFAD ve yerel yönetimlerin açıklamalarını takip ediniz.
        </p>
      </section>

      <div className="flex gap-3">
        <Link href="/iletisim" className="flex-1 text-center bg-gray-900 dark:bg-gray-700 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition-colors">
          İletişime Geç
        </Link>
        <Link href="/" className="flex-1 text-center border border-[var(--border)] text-[var(--foreground)] rounded-xl py-3 text-sm font-semibold hover:border-red-300 transition-colors">
          Bölge Analizine Git
        </Link>
      </div>
    </div>
  );
}
