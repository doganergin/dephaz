'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Backpack, Search, User, ShieldCheck, Database, BookOpen, MapPin, Heart } from 'lucide-react';

export default function HakkimizdaPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Kurumsal' : 'About'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'Hakkımızda' : 'About Us'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR ? 'Deprem Hattı nedir, ne yapar, kim tarafından yapıldı?' : 'What is Deprem Hattı, what does it do, and who built it?'}
        </p>
      </div>

      {/* Misyon */}
      <section className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5 space-y-3">
        <p className="text-lg font-bold text-red-700 dark:text-red-400">{TR ? 'Misyonumuz' : 'Our Mission'}</p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Türkiye, dünyada en fazla deprem üreten ülkeler arasında yer almaktadır. Kuzey Anadolu Fayı, Doğu Anadolu Fayı ve Ege Genişleme Sistemi olmak üzere üç ana tektonik kuşağın etkisiyle her yıl binlerce sarsıntı kaydedilmektedir. Ne var ki bu büyük tehdidin yanında deprem bilinci hâlâ yetersiz kalmakta, doğru bilgiye ulaşmak ise çoğu zaman zor olmaktadır.'
            : 'Turkey is among the countries most affected by earthquakes worldwide. Thousands of tremors are recorded each year due to three major tectonic belts: the North Anatolian Fault, the East Anatolian Fault, and the Aegean Extensional System. Yet earthquake awareness remains insufficient, and accessing accurate information is often difficult.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı, bu boşluğu doldurmak için kurulmuştur. Kandilli Rasathanesi (KOERI), AFAD, USGS ve MTA gibi resmi kurumların açık verilerini kullanarak; bölgesel risk analizlerini, hazırlık rehberlerini ve eğitim içeriklerini sade, anlaşılır ve bilimsel bir dilde sunarız. Amacımız korku yaratmak değil, bilinçli ve hazırlıklı bir toplum inşa etmektir.'
            : 'Deprem Hattı was founded to bridge this gap. Using open data from official institutions such as Kandilli Observatory (KOERI), AFAD, USGS, and MTA, we present regional risk analyses, preparedness guides, and educational content in a clear, accessible, and scientific language. Our aim is not to create fear, but to help build an informed and prepared society.'}
        </p>
      </section>

      {/* Neden Farklıyız */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Neden Deprem Hattı?' : 'Why Deprem Hattı?'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Pek çok platform deprem verilerini ham formatta sunarken, Deprem Hattı bu veriyi anlamlı, uygulanabilir ve bağlamsal hâle getirir. Bir mahallede yaşayan biri, o bölgenin fay mesafesini, zemin türünü, tarihsel deprem kaydını ve bina stokunu tek bir ekranda görebilir — ve buradan kişisel hazırlık adımlarına geçebilir.'
            : 'While many platforms present earthquake data in raw form, Deprem Hattı makes this data meaningful, actionable, and contextual. A resident of a neighbourhood can view the area\'s fault distance, soil type, historical earthquake records, and building stock on a single screen — and from there, move on to personal preparedness steps.'}
        </p>
        <div className="grid grid-cols-1 gap-2 mt-1">
          {[
            { Icon: Database, tr: 'Gerçek zamanlı resmi veri', en: 'Real-time official data', trA: 'Kandilli, AFAD ve USGS verisi anlık olarak güncellenmektedir.', enA: 'Kandilli, AFAD, and USGS data is updated in real time.' },
            { Icon: MapPin, tr: 'Mahalle düzeyinde analiz', en: 'Neighbourhood-level analysis', trA: 'İl/ilçe/mahalle bazında fay mesafesi, zemin riski ve bina yaşı.', enA: 'Fault distance, soil risk, and building age by province/district/neighbourhood.' },
            { Icon: BookOpen, tr: 'Bilimsel kaynaklara dayalı içerik', en: 'Science-backed content', trA: 'Hakemli makaleler ve uzman görüşleriyle desteklenen rehberler.', enA: 'Guides backed by peer-reviewed research and expert assessments.' },
            { Icon: ShieldCheck, tr: 'Pratik hazırlık araçları', en: 'Practical preparedness tools', trA: '72 saatlik çanta listesi, aile buluşma planı, deprem anında yapılacaklar.', enA: '72-hour kit checklist, family meeting plan, and what to do during a quake.' },
            { Icon: Heart, tr: 'Tamamen ücretsiz', en: 'Completely free', trA: 'Hiçbir içerik ücret duvarının arkasında değildir.', enA: 'No content is behind a paywall.' },
          ].map((item) => (
            <div key={item.tr} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <span className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center shrink-0">
                <item.Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--foreground)]">{TR ? item.tr : item.en}</p>
                <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{TR ? item.trA : item.enA}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ne Sunuyoruz */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Özelliklerimiz' : 'Our Features'}</h2>
        <div className="space-y-3">
          {[
            { Icon: MapPin, tr: 'Bölge Risk Analizi', en: 'Regional Risk Analysis', trA: 'İl, ilçe ve mahalle bazında fay mesafesi, zemin yapısı, bina stoku ve tarihsel deprem verileriyle kapsamlı risk skoru.', enA: 'Comprehensive risk score by province, district, and neighbourhood — including fault distance, soil conditions, building stock, and historical data.' },
            { Icon: Globe, tr: 'Canlı Deprem Haritası', en: 'Live Earthquake Map', trA: 'Kandilli, AFAD ve USGS kaynaklarından anlık deprem verilerini interaktif harita üzerinde görselleştirme.', enA: 'Real-time earthquake data from Kandilli, AFAD, and USGS visualised on an interactive map.' },
            { Icon: Backpack, tr: '72 Saatlik Deprem Çantası', en: '72-Hour Emergency Kit', trA: 'AFAD, FEMA ve Kızılay kılavuzlarına dayanan, tamamlama takibi yapılabilen interaktif hazırlık listesi.', enA: 'Interactive preparedness checklist based on AFAD, FEMA, and Red Crescent guidelines with completion tracking.' },
            { Icon: Search, tr: 'Uzman Değerlendirmeleri', en: 'Expert Assessments', trA: 'Sismologların hakemli makalelere dayanan açıklamaları ve bölgesel tehlike analizleri.', enA: 'Expert statements based on peer-reviewed research and regional hazard analyses.' },
            { Icon: BookOpen, tr: 'Eğitim Rehberleri', en: 'Educational Guides', trA: 'Deprem nedir, fay hatları, zemin tipleri, bina güvenliği ve depremde hayatta kalma rehberleri.', enA: 'What is an earthquake, fault lines, soil types, building safety, and earthquake survival guides.' },
          ].map((item) => (
            <div key={item.tr} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
              <span className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 text-[var(--foreground)] flex items-center justify-center shrink-0">
                <item.Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--foreground)]">{TR ? item.tr : item.en}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">{TR ? item.trA : item.enA}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Veri Kaynakları */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Veri Kaynaklarımız' : 'Our Data Sources'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sitedeki tüm veriler, kamuya açık resmi ve bilimsel kaynaklardan derlenmektedir. Hiçbir veri spekülatif değildir; kaynak bağlantıları ilgili sayfalarda şeffaf biçimde paylaşılmaktadır.'
            : 'All data on the site is compiled from publicly available official and scientific sources. No data is speculative; source links are transparently shared on relevant pages.'}
        </p>
        <div className="space-y-2">
          {[
            { ad: 'Kandilli Rasathanesi (KOERI)', tr: 'Gerçek zamanlı deprem kayıtları, sismik katalog', en: 'Real-time earthquake records, seismic catalog', link: 'http://www.koeri.boun.edu.tr' },
            { ad: 'AFAD', tr: 'Türkiye Deprem Tehlike Haritası 2018, resmi uyarılar', en: 'Turkey Earthquake Hazard Map 2018, official alerts', link: 'https://www.afad.gov.tr' },
            { ad: 'USGS', tr: 'Küresel deprem veritabanı ve gerçek zamanlı API', en: 'Global earthquake database and real-time API', link: 'https://earthquake.usgs.gov' },
            { ad: 'MTA', tr: 'Türkiye Aktif Fay Haritası ve zemin verileri', en: 'Turkey Active Fault Map and soil data', link: 'https://www.mta.gov.tr' },
            { ad: 'TÜİK', tr: 'Bina Sayımı 2021 — yapı yaşı ve yapı kalitesi istatistikleri', en: '2021 Building Census — building age and quality statistics', link: 'https://data.tuik.gov.tr' },
          ].map((k) => (
            <div key={k.ad} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[var(--foreground)]">{k.ad}</p>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">{TR ? k.tr : k.en}</p>
              </div>
              <a href={k.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-500 hover:underline shrink-0">
                {TR ? 'Ziyaret et →' : 'Visit →'}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Geliştirici */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Geliştirici' : 'Developer'}</h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
            <User size={24} className="text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--foreground)]">Doğan Ergin</p>
            <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
              {TR
                ? 'Yazılım Mühendisliği öğrencisi olan Doğan Ergin, 2023 Kahramanmaraş depremlerinin ardından doğru ve erişilebilir deprem bilgisine duyulan ihtiyacı fark ederek Deprem Hattı\'nı geliştirmiştir. Platform; Next.js, TypeScript ve açık veri API\'leri ile inşa edilmiş bağımsız bir sivil teknoloji projesidir.'
                : 'Doğan Ergin, a software engineering student, developed Deprem Hattı after recognizing the need for accurate and accessible earthquake information following the 2023 Kahramanmaraş earthquakes. The platform is an independent civic-tech project built with Next.js, TypeScript, and open data APIs.'}
            </p>
            <a href="mailto:iletisim@depremhatti.com" className="text-[11px] text-blue-500 hover:underline mt-1.5 block">
              iletisim@depremhatti.com
            </a>
          </div>
        </div>
      </section>

      {/* Sorumluluk Reddi */}
      <section className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2">
          {TR ? 'Önemli Sorumluluk Reddi' : 'Important Disclaimer'}
        </p>
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          {TR
            ? 'Deprem Hattı, herhangi bir deprem kehaneti veya resmi uyarı hizmeti sunmamaktadır. Sitedeki tüm risk değerlendirmeleri, kamuya açık bilimsel verilerden istatistiksel yöntemlerle türetilmiş tahminlerdir ve resmi afet uyarısı niteliği taşımaz. Acil durumlarda AFAD\'ın resmi kanallarını takip ediniz.'
            : 'Deprem Hattı does not provide earthquake predictions or official warning services. All risk assessments on the site are estimates derived statistically from publicly available scientific data and do not constitute official disaster warnings. In emergencies, follow AFAD\'s official channels.'}
        </p>
      </section>

      <div className="flex gap-3">
        <Link href="/iletisim" className="flex-1 text-center bg-gray-900 dark:bg-gray-700 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition-colors">
          {TR ? 'İletişime Geç' : 'Contact Us'}
        </Link>
        <Link href="/bolge-analizi" className="flex-1 text-center border border-[var(--border)] text-[var(--foreground)] rounded-xl py-3 text-sm font-semibold hover:border-red-300 transition-colors">
          {TR ? 'Risk Analizi →' : 'Risk Analysis →'}
        </Link>
      </div>
    </div>
  );
}
