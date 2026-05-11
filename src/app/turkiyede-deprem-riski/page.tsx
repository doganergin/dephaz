'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TurkiyeDepremRiskiPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const bolgeler = TR ? [
    { b: 'Marmara Bölgesi', r: 'Çok Yüksek', renk: 'red', a: 'İstanbul, Kocaeli, Sakarya, Bursa. KAFH\'nın aktif batı segmenti.' },
    { b: 'Ege Bölgesi', r: 'Yüksek', renk: 'orange', a: 'İzmir, Manisa, Denizli. Batı Anadolu graben sistemi.' },
    { b: 'Doğu Anadolu', r: 'Çok Yüksek', renk: 'red', a: 'Kahramanmaraş, Hatay, Malatya. DAFH ve çevre faylar.' },
    { b: 'İç Anadolu', r: 'Orta', renk: 'amber', a: 'Ankara çevresinde daha düşük risk; bazı ilçeler aktif faya yakın.' },
    { b: 'Karadeniz', r: 'Orta-Düşük', renk: 'green', a: 'Genel olarak daha az aktif; ancak kuzey kıyı şeridi risk taşır.' },
  ] : [
    { b: 'Marmara Region', r: 'Very High', renk: 'red', a: 'Istanbul, Kocaeli, Sakarya, Bursa. Active western segment of NAF.' },
    { b: 'Aegean Region', r: 'High', renk: 'orange', a: 'Izmir, Manisa, Denizli. Western Anatolia graben system.' },
    { b: 'Eastern Anatolia', r: 'Very High', renk: 'red', a: 'Kahramanmaraş, Hatay, Malatya. EAF and surrounding faults.' },
    { b: 'Central Anatolia', r: 'Moderate', renk: 'amber', a: 'Lower risk around Ankara; some districts close to active faults.' },
    { b: 'Black Sea Region', r: 'Low–Moderate', renk: 'green', a: 'Generally less active; northern coastal strip carries some risk.' },
  ];

  const depremler = [
    { tarih: '17.08.1999', yer: TR ? 'Gölcük / Kocaeli' : 'Gölcük / Kocaeli', mag: 'Mw 7.4', kayip: '17,000+' },
    { tarih: '12.11.1999', yer: 'Düzce', mag: 'Mw 7.2', kayip: '845' },
    { tarih: '23.10.2011', yer: 'Van', mag: 'Mw 7.1', kayip: '604' },
    { tarih: '30.10.2020', yer: TR ? 'İzmir-Seferihisar' : 'Izmir-Seferihisar', mag: 'Mw 6.9', kayip: '114' },
    { tarih: '06.02.2023', yer: 'Kahramanmaraş', mag: 'Mw 7.7 + 7.6', kayip: '50,000+' },
  ];

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">{TR ? 'Risk Analizi' : 'Risk Analysis'}</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? "Türkiye'de Deprem Riski" : 'Earthquake Risk in Turkey'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Neden bu kadar çok deprem oluyor ve hangi bölgeler risk altında?' : 'Why so many earthquakes and which regions are at risk?'}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { sayi: '%92', tr: 'Deprem bölgesindeki yüzey', en: 'Territory in seismic zones' },
          { sayi: '%95', tr: 'Risk altındaki nüfus', en: 'Population at risk' },
          { sayi: '~1,500', tr: 'Aktif fay hattı (km)', en: 'Active fault length (km)' },
        ].map((item) => (
          <div key={item.sayi} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center glow-card glow-red">
            <p className="text-lg font-bold text-red-600">{item.sayi}</p>
            <p className="text-[10px] text-[var(--muted)] mt-1 leading-tight">{TR ? item.tr : item.en}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Ana Fay Sistemleri' : 'Main Fault Systems'}</h2>
        <div className="space-y-3">
          {[
            {
              tr: 'Kuzey Anadolu Fay Hattı (KAFH)',
              en: 'North Anatolian Fault (NAF)',
              trA: '~1.500 km uzunluğunda sağ yanal doğrultu atımlı fay. 1939\'dan bu yana batıya doğru ilerleyen büyük deprem dizisine sahne olmuştur. Marmara segmenti İstanbul için en büyük riski oluşturmaktadır.',
              enA: '~1,500 km right-lateral strike-slip fault. Has produced a westward-migrating sequence of major earthquakes since 1939. The Marmara segment poses the greatest risk to Istanbul.',
            },
            {
              tr: 'Doğu Anadolu Fay Hattı (DAFH)',
              en: 'East Anatolian Fault (EAF)',
              trA: '~580 km uzunluğunda sol yanal fay. Şubat 2023\'te Mw 7.7 + 7.6 büyüklüğünde depremler üreterek 50.000\'den fazla kişinin hayatını kaybetmesine neden oldu.',
              enA: '~580 km left-lateral fault. In February 2023 it produced Mw 7.7 + 7.6 earthquakes, causing over 50,000 fatalities and destroying approximately 120,000 buildings.',
            },
          ].map((f) => (
            <div key={f.tr} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 glow-card glow-red">
              <p className="text-sm font-bold text-[var(--foreground)]">{TR ? f.tr : f.en}</p>
              <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{TR ? f.trA : f.enA}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Bölgesel Risk Durumu' : 'Regional Risk Overview'}</h2>
        <div className="space-y-2">
          {bolgeler.map((item) => (
            <div key={item.b} className={`flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 glow-card glow-${item.renk}`}>
              <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${item.renk === 'red' ? 'bg-red-500' : item.renk === 'orange' ? 'bg-orange-500' : item.renk === 'amber' ? 'bg-amber-500' : 'bg-green-500'}`} />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-bold text-[var(--foreground)]">{item.b}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.renk === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : item.renk === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : item.renk === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' : 'bg-green-100 dark:bg-green-900/30 text-green-600'}`}>{item.r}</span>
                </div>
                <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Son 25 Yılın Büyük Depremleri' : 'Major Earthquakes of the Last 25 Years'}</h2>
        <div className="space-y-2">
          {depremler.map((d) => (
            <div key={d.tarih} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 glow-card glow-red">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-xs font-bold text-red-600 shrink-0">{d.mag.split(' ')[0]}</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[var(--foreground)]">{d.yer}</p>
                <p className="text-[11px] text-[var(--muted)]">{d.tarih} · {d.kayip} {TR ? 'kayıp' : 'fatalities'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4 glow-card glow-red">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">{TR ? 'Kendi Bölgenizi Analiz Edin' : 'Analyse Your Region'}</p>
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mb-3">
          {TR ? 'Yaşadığınız ilçenin fay mesafesini, zemin yapısını ve risk skorunu öğrenin.' : 'Learn the fault distance, soil type, and risk score for your district.'}
        </p>
        <Link href="/bolge-analizi" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          {TR ? 'Bölge Analizi Yap →' : 'Run Risk Analysis →'}
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">{TR ? 'Kaynaklar' : 'Sources'}</p>
        <p>• AFAD {TR ? 'Türkiye Deprem Tehlike Haritası 2018' : 'Turkey Earthquake Hazard Map 2018'}</p>
        <p>• Emre, Ö. et al. (2018). Active Fault Database of Turkey. Bulletin of Earthquake Engineering.</p>
      </div>
    </article>
  );
}
