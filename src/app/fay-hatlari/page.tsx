'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';

const FayHaritasi = dynamic(() => import('@/components/FayHaritasi'), { ssr: false });

export default function FayHatlariPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const faylar = TR ? [
    {
      ad: 'Kuzey Anadolu Fay Sistemi (KAFS)',
      tip: 'Sağ Yanal Doğrultu Atımlı',
      uzunluk: '~1.500 km',
      rota: 'Karlıova → Marmara Denizi',
      aciklama: 'Türkiye\'nin en uzun ve en iyi bilinen fayıdır. Son 80 yılda batıya doğru ilerleyen deprem dizisine sahne olmuş; 1939\'dan 1999\'a kadar M7+ büyüklüğünde 7 büyük deprem üretmiştir. Marmara segmenti, İstanbul\'a yakınlığı nedeniyle en kritik segment olarak değerlendirilmektedir.',
      renk: 'red',
    },
    {
      ad: 'Doğu Anadolu Fay Sistemi (DAFS)',
      tip: 'Sol Yanal Doğrultu Atımlı',
      uzunluk: '~580 km',
      rota: 'Karlıova → Hatay (İskenderun Körfezi)',
      aciklama: 'Şubat 2023\'te Kahramanmaraş merkezli Mw 7.7 ve Mw 7.6 depremlerine neden olan faydır. Bu depremler öncesinde fayın büyük bir bölümü yaklaşık 500 yıldır enerji biriktiriyordu. Uzun sessizlik periyodları bu tür fayları özellikle tehlikeli kılar.',
      renk: 'red',
    },
    {
      ad: 'Batı Anadolu Genişleme Sistemi',
      tip: 'Normal Faylar',
      uzunluk: 'Birden fazla segment',
      rota: 'Ege Bölgesi geneli',
      aciklama: 'Batı Anadolu, tektonik olarak genişlemekte olan bir bölgedir. Bu bölgedeki normal faylar; Büyük Menderes, Gediz ve Bakırçay gibi grabenler boyunca uzanmaktadır. 2020 İzmir depremi (Mw 6.9) bu sistemin Seferihisar fayı üzerinde oluşmuştur.',
      renk: 'orange',
    },
    {
      ad: 'Ölü Deniz Fay Sistemi (ÖDFS)',
      tip: 'Sol Yanal Doğrultu Atımlı',
      uzunluk: '~1.000 km (Türkiye içi kısmı ~150 km)',
      rota: 'Hatay — Suriye sınırı',
      aciklama: 'Afrika Plakası\'nın Arap Plakası\'ndan ayrıldığı bu transform fay, Türkiye\'nin güney ucundan geçmektedir. Hatay ve çevresini etkilemekte olup Doğu Anadolu Fay Sistemi ile birleştiği nokta özellikle aktif sismik aktivite göstermektedir.',
      renk: 'amber',
    },
  ] : [
    {
      ad: 'North Anatolian Fault System (NAF)',
      tip: 'Right-Lateral Strike-Slip',
      uzunluk: '~1,500 km',
      rota: 'Karlıova → Sea of Marmara',
      aciklama: 'Turkey\'s longest and best-known fault. Over the past 80 years it has hosted a westward-migrating earthquake sequence, producing 7 M7+ earthquakes from 1939 to 1999. The Marmara segment is considered the most critical due to its proximity to Istanbul.',
      renk: 'red',
    },
    {
      ad: 'East Anatolian Fault System (EAF)',
      tip: 'Left-Lateral Strike-Slip',
      uzunluk: '~580 km',
      rota: 'Karlıova → Hatay (Gulf of Iskenderun)',
      aciklama: 'This is the fault responsible for the Mw 7.7 and Mw 7.6 earthquakes centred on Kahramanmaraş in February 2023. Before those earthquakes, much of the fault had been accumulating energy for roughly 500 years. Long periods of seismic silence make such faults especially dangerous.',
      renk: 'red',
    },
    {
      ad: 'Western Anatolia Extensional System',
      tip: 'Normal Faults',
      uzunluk: 'Multiple segments',
      rota: 'Aegean Region',
      aciklama: 'Western Anatolia is a tectonically extending region. The normal faults here run along grabens such as the Büyük Menderes, Gediz, and Bakırçay valleys. The 2020 Izmir earthquake (Mw 6.9) occurred on the Seferihisar fault of this system.',
      renk: 'orange',
    },
    {
      ad: 'Dead Sea Fault System (DSF)',
      tip: 'Left-Lateral Strike-Slip',
      uzunluk: '~1,000 km (Turkey section ~150 km)',
      rota: 'Hatay — Syrian border',
      aciklama: 'This transform fault, where the African Plate separates from the Arabian Plate, crosses the southernmost tip of Turkey. It affects Hatay and surrounding areas; the junction with the East Anatolian Fault System shows particularly active seismicity.',
      renk: 'amber',
    },
  ];

  const mesafeler = TR ? [
    { mesafe: '0–50 m', durum: 'Kesinlikle yasak', aciklama: 'Aktif fayın gövdesi veya hemen yanı' },
    { mesafe: '50–200 m', durum: 'Özel inceleme', aciklama: 'Zemin etüdü ve mühendislik çözümü zorunlu' },
    { mesafe: '200–500 m', durum: 'Dikkatli yaklaşım', aciklama: 'Yönetmeliklere tam uyum kritik' },
    { mesafe: '500 m+', durum: 'Genel standartlar', aciklama: 'Normal yapı yönetmelikleri uygulanır' },
  ] : [
    { mesafe: '0–50 m', durum: 'Strictly prohibited', aciklama: 'The fault body itself or immediately adjacent' },
    { mesafe: '50–200 m', durum: 'Special investigation', aciklama: 'Soil survey and engineering solution required' },
    { mesafe: '200–500 m', durum: 'Cautious approach', aciklama: 'Full compliance with regulations critical' },
    { mesafe: '500 m+', durum: 'General standards', aciklama: 'Standard building codes apply' },
  ];

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">{TR ? 'Sismik Jeoloji' : 'Seismic Geology'}</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'Türkiye\'deki Fay Hatları' : 'Fault Lines in Turkey'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Hangi fay nerede, ne kadar tehlikeli?' : 'Which fault is where, and how dangerous is it?'}</p>
      </div>

      {/* Interactive fault map */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Türkiye Aktif Fay Haritası' : 'Turkey Active Fault Map'}
        </h2>
        <p className="text-xs text-[var(--muted)]">
          {TR ? 'Fay hatlarına tıklayarak detaylı bilgi alabilirsiniz.' : 'Click on fault lines to view detailed information.'}
        </p>
        <FayHaritasi lang={lang} yukseklik={420} />
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { renk: '#dc2626', ad: TR ? 'KAF (Kuzey Anadolu)' : 'NAF (North Anatolian)' },
            { renk: '#ea580c', ad: TR ? 'DAF (Doğu Anadolu)' : 'EAF (East Anatolian)' },
            { renk: '#7c3aed', ad: TR ? 'Gediz Grabeni' : 'Gediz Graben' },
            { renk: '#0891b2', ad: TR ? 'B. Menderes Grabeni' : 'B. Menderes Graben' },
            { renk: '#d97706', ad: TR ? 'Fethiye-Burdur' : 'Fethiye-Burdur' },
            { renk: '#be185d', ad: TR ? 'Van Fayı' : 'Van Fault' },
          ].map((item) => (
            <span key={item.ad} className="flex items-center gap-1 text-[10px] text-[var(--muted)]">
              <span className="w-4 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.renk }} />
              {item.ad}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Fay Hattı Nedir?' : 'What Is a Fault Line?'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Fay hattı, yer kabuğunda gerilim birikmesi sonucu oluşan kırıklardır. Bu kırıkların iki tarafındaki kayaç blokları birbirine göre hareket edebilir. Aktif faylar, son 11.000 yıl içinde (Holosen) hareket etmiş ya da hareket etme potansiyeli taşıyan faylardır. Türkiye, dünyanın en yüksek aktif fay yoğunluklarından birine sahiptir.'
            : 'A fault line is a fracture in the Earth\'s crust where stress has accumulated. The rock blocks on either side of the fracture can move relative to each other. Active faults are those that have moved within the last 11,000 years (Holocene) or have the potential to move. Turkey has one of the highest concentrations of active faults in the world.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'MTA (Maden ve Tetkik Arama) verilerine göre Türkiye\'de 485\'in üzerinde aktif fay segmenti belgelenmiştir. Bu fayların büyük bölümü ülke nüfusunun yoğun olduğu kentlerin yakınından geçmektedir.'
            : 'According to MTA (General Directorate of Mineral Research and Exploration) data, more than 485 active fault segments have been documented in Turkey. A large proportion of these faults pass close to the country\'s most densely populated cities.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Ana Fay Sistemleri' : 'Main Fault Systems'}</h2>
        <div className="space-y-3">
          {faylar.map((fay) => (
            <div key={fay.ad} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[var(--foreground)]">{fay.ad}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  fay.renk === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                  fay.renk === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                }`}>{TR ? 'Aktif' : 'Active'}</span>
              </div>
              <div className="flex gap-4 text-[10px] text-[var(--muted)]">
                <span>📏 {fay.uzunluk}</span>
                <span>↔ {fay.tip}</span>
              </div>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">{fay.rota}</p>
              <p className="text-xs text-[var(--foreground)] leading-relaxed border-t border-[var(--border)] pt-2">{fay.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Fay Mesafesi ve Bina Güvenliği' : 'Fault Distance and Building Safety'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Bir binayı fay hattından ne kadar uzak tutmak gerekir? Türk deprem yönetmeliğine göre aktif fay hatlarına belirli mesafelerde yapı yasakları veya özel yapım koşulları uygulanmaktadır. Ancak yönetmeliğin uygulanmasındaki aksaklıklar nedeniyle pek çok yapı aktif faylara tehlikeli yakınlıkta inşa edilmiştir.'
            : 'How far from a fault line should a building be? Turkish earthquake regulations impose construction prohibitions or special conditions within certain distances of active faults. However, due to enforcement failures, many structures have been built dangerously close to active faults.'}
        </p>
        <div className="space-y-2">
          {mesafeler.map((item) => (
            <div key={item.mesafe} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className="text-xs font-bold text-[var(--foreground)] w-20 shrink-0">{item.mesafe}</div>
              <div>
                <p className="text-[11px] font-semibold text-[var(--foreground)]">{item.durum}</p>
                <p className="text-[10px] text-[var(--muted)]">{item.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">{TR ? 'Yaşadığınız Yerin Fay Mesafesini Öğrenin' : 'Find the Fault Distance for Your Location'}</p>
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mb-3">
          {TR
            ? 'Deprem Hattı, her ilçe için en yakın aktif fay hattına olan mesafeyi ve beklenen maksimum deprem büyüklüğünü göstermektedir.'
            : 'Deprem Hattı shows the distance to the nearest active fault and the expected maximum earthquake magnitude for every district.'}
        </p>
        <Link href="/bolge-analizi" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          {TR ? 'Fay Mesafemi Öğren →' : 'Find My Fault Distance →'}
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">{TR ? 'Kaynaklar' : 'Sources'}</p>
        <p>• MTA {TR ? 'Aktif Fay Haritası' : 'Active Fault Map'} — mta.gov.tr</p>
        <p>• Emre, Ö. {TR ? 've ark.' : 'et al.'} (2018). Active Fault Database of Turkey. Bulletin of Earthquake Engineering, 16(8).</p>
        <p>• Şengör, A.M.C. {TR ? 've ark.' : 'et al.'} (2005). The North Anatolian Fault. Annual Review of Earth and Planetary Sciences.</p>
        <p>• TBDY 2018 — {TR ? 'Türkiye Bina Deprem Yönetmeliği' : 'Turkish Building Earthquake Code 2018'}</p>
      </div>
    </article>
  );
}
