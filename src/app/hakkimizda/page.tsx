'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HakkimizdaPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'Hakkımızda' : 'About Us'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Deprem Hattı nedir, kim tarafından yapıldı?' : 'What is Deprem Hattı and who built it?'}</p>
      </div>

      <section className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5 space-y-3">
        <p className="text-lg font-bold text-red-700 dark:text-red-400">{TR ? 'Misyonumuz' : 'Our Mission'}</p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Türkiye, dünyanın en aktif deprem kuşaklarından birinde yer almaktadır. Her yıl binlerce deprem yaşanmakta, zaman zaman bu depremler büyük can ve mal kayıplarına yol açmaktadır. Deprem Hattı, vatandaşların kendi bölgelerindeki deprem riskini bilimsel verilerle, sade bir dille anlamalarına yardımcı olmak amacıyla kurulmuştur.'
            : 'Turkey sits on one of the world\'s most seismically active zones. Thousands of earthquakes occur every year, and periodically they cause devastating loss of life and property. Deprem Hattı was founded to help citizens understand the earthquake risk in their region through scientific data presented in a clear and accessible way.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Amacımız korku yaratmak değil, bilinçli hazırlık sağlamaktır. Deprem anında ne yapacağını bilen, çantasını hazırlamış ve binasının riskini öğrenmiş bir toplum kayıpları en aza indirebilir.'
            : 'Our goal is not to create fear, but to foster informed preparedness. A society that knows what to do during an earthquake, has an emergency kit ready, and understands the risks of its buildings can minimise casualties.'}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Ne Sunuyoruz?' : 'What We Offer'}</h2>
        <div className="space-y-3">
          {[
            { icon: '🗺️', tr: 'Bölge Risk Analizi', en: 'Regional Risk Analysis', trA: 'İl, ilçe ve mahalle bazında fay mesafesi, zemin yapısı, bina stoku ve tarihsel deprem verileriyle kapsamlı risk değerlendirmesi.', enA: 'Comprehensive risk assessment by province, district, and neighbourhood — including fault distance, soil conditions, building stock, and historical earthquake data.' },
            { icon: '🌍', tr: 'Canlı Deprem Haritası', en: 'Live Earthquake Map', trA: 'Kandilli, AFAD ve USGS kaynaklarından anlık deprem verilerini harita üzerinde görselleştirme.', enA: 'Real-time earthquake data from Kandilli, AFAD, and USGS visualised on an interactive map.' },
            { icon: '🎒', tr: '72 Saatlik Deprem Çantası', en: '72-Hour Emergency Kit', trA: 'AFAD, FEMA ve Kızılay kılavuzlarına dayanan interaktif hazırlık listesi.', enA: 'Interactive preparedness checklist based on AFAD, FEMA, and Red Crescent guidelines.' },
            { icon: '🔬', tr: 'Uzman Değerlendirmeleri', en: 'Expert Assessments', trA: 'Deprem bilimcilerin hakemli makalelere dayanan açıklamaları ve analizleri.', enA: 'Peer-reviewed analyses and sourced expert statements from seismologists and geologists.' },
          ].map((item) => (
            <div key={item.tr} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-[var(--foreground)]">{TR ? item.tr : item.en}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">{TR ? item.trA : item.enA}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Veri Kaynaklarımız' : 'Our Data Sources'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR ? 'Sitedeki tüm veriler kamuya açık resmi ve bilimsel kaynaklardan derlenmektedir.' : 'All data on the site is compiled from publicly available official and scientific sources.'}
        </p>
        <div className="space-y-2">
          {[
            { ad: 'Kandilli Rasathanesi (KOERI)', tr: 'Gerçek zamanlı deprem kayıtları', en: 'Real-time earthquake records', link: 'http://www.koeri.boun.edu.tr' },
            { ad: 'AFAD', tr: 'Türkiye Deprem Tehlike Haritası 2018', en: 'Turkey Earthquake Hazard Map 2018', link: 'https://www.afad.gov.tr' },
            { ad: 'USGS', tr: 'Küresel deprem veritabanı', en: 'Global earthquake database', link: 'https://earthquake.usgs.gov' },
            { ad: 'MTA', tr: 'Türkiye Aktif Fay Haritası', en: 'Turkey Active Fault Map', link: 'https://www.mta.gov.tr' },
            { ad: 'TÜİK', tr: 'Bina Sayımı 2021 verileri', en: '2021 Building Census data', link: 'https://data.tuik.gov.tr' },
          ].map((k) => (
            <div key={k.ad} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className="flex-1">
                <p className="text-xs font-bold text-[var(--foreground)]">{k.ad}</p>
                <p className="text-[11px] text-[var(--muted)]">{TR ? k.tr : k.en}</p>
              </div>
              <a href={k.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-500 hover:underline shrink-0">{TR ? 'Ziyaret et →' : 'Visit →'}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Geliştirici' : 'Developer'}</h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-2xl shrink-0">👤</div>
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">Doğan Ergin</p>
            <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
              {TR
                ? 'Doğan Ergin, teknolojiyle pratik çözümler üretmeye odaklanan bir yazılım mühendisliği öğrencisidir. 2023 depremlerinin ardından tasarladığı bağımsız Deprem Hattı projesiyle, zemin kontrolü ve acil durum hazırlıklarını modern bir dijital altyapıya taşımayı amaçlıyor.'
                : 'Doğan Ergin is a software engineering student focused on building practical, tech-driven solutions. With his independent project Deprem Hatti , he aims to modernize disaster awareness and emergency preparedness.'}
            </p>
            <a href="mailto:dogan.ergin@depremhatti.com" className="text-[11px] text-blue-500 hover:underline mt-1.5 block">doganergin15@gmail.com</a>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2">{TR ? 'Önemli Not' : 'Important Note'}</p>
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          {TR
            ? 'Deprem Hattı herhangi bir deprem kehaneti sunmamaktadır. Sitedeki tüm veriler bilimsel kaynaklardan derlenerek istatistiksel yöntemlerle yorumlanmış tahminlerdir ve resmi uyarı niteliği taşımaz.'
            : 'Deprem Hattı does not provide earthquake predictions. All data on the site is derived from scientific sources and represents statistical estimates. It does not constitute an official warning.'}
        </p>
      </section>

      <div className="flex gap-3">
        <Link href="/iletisim" className="flex-1 text-center bg-gray-900 dark:bg-gray-700 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition-colors">
          {TR ? 'İletişime Geç' : 'Contact Us'}
        </Link>
        <Link href="/bolge-analizi" className="flex-1 text-center border border-[var(--border)] text-[var(--foreground)] rounded-xl py-3 text-sm font-semibold hover:border-red-300 transition-colors">
          {TR ? 'Bölge Analizine Git' : 'Go to Risk Analysis'}
        </Link>
      </div>
    </div>
  );
}
