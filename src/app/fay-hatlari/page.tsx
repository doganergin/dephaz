import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Türkiye'deki Fay Hatları — Deprem Hattı",
  description: "Türkiye'deki aktif fay hatları: Kuzey Anadolu, Doğu Anadolu, Batı Anadolu fay sistemleri ve deprem riski.",
};

export default function FayHatlariPage() {
  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Sismik Jeoloji</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Türkiye'deki Fay Hatları</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Hangi fay nerede, ne kadar tehlikeli?</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Fay Hattı Nedir?</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Fay hattı, yer kabuğunda gerilim birikmesi sonucu oluşan kırıklardır. Bu kırıkların iki
          tarafındaki kayaç blokları birbirine göre hareket edebilir. Aktif faylar, son 11.000 yıl
          içinde (Holosen) hareket etmiş ya da hareket etme potansiyeli taşıyan faylardır. Türkiye,
          dünyanın en yüksek aktif fay yoğunluklarından birine sahiptir.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          MTA (Maden ve Tetkik Arama) verilerine göre Türkiye'de 485'in üzerinde aktif fay segmenti
          belgelenmiştir. Bu fayların büyük bölümü ülke nüfusunun yoğun olduğu kentlerin yakınından
          geçmektedir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Ana Fay Sistemleri</h2>
        <div className="space-y-3">
          {[
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
          ].map((fay) => (
            <div key={fay.ad} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-[var(--foreground)]">{fay.ad}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  fay.renk === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                  fay.renk === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                }`}>Aktif</span>
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
        <h2 className="text-base font-bold text-[var(--foreground)]">Fay Mesafesi ve Bina Güvenliği</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Bir binayı fay hattından ne kadar uzak tutmak gerekir? Türk deprem yönetmeliğine göre
          aktif fay hatlarına belirli mesafelerde yapı yasakları veya özel yapım koşulları uygulanmaktadır.
          Ancak yönetmeliğin uygulanmasındaki aksaklıklar nedeniyle pek çok yapı aktif faylara
          tehlikeli yakınlıkta inşa edilmiştir.
        </p>
        <div className="space-y-2">
          {[
            { mesafe: '0–50 m', durum: 'Kesinlikle yasak', aciklama: 'Aktif fayın gövdesi veya hemen yanı' },
            { mesafe: '50–200 m', durum: 'Özel inceleme', aciklama: 'Zemin etüdü ve mühendislik çözümü zorunlu' },
            { mesafe: '200–500 m', durum: 'Dikkatli yaklaşım', aciklama: 'Yönetmeliklere tam uyum kritik' },
            { mesafe: '500 m+', durum: 'Genel standartlar', aciklama: 'Normal yapı yönetmelikleri uygulanır' },
          ].map((item) => (
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
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">Yaşadığınız Yerin Fay Mesafesini Öğrenin</p>
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mb-3">
          Deprem Hattı, her ilçe için en yakın aktif fay hattına olan mesafeyi ve beklenen maksimum
          deprem büyüklüğünü göstermektedir.
        </p>
        <Link href="/" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Fay Mesafemi Öğren →
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">Kaynaklar</p>
        <p>• MTA Aktif Fay Haritası — mta.gov.tr</p>
        <p>• Emre, Ö. ve ark. (2018). Active Fault Database of Turkey. Bulletin of Earthquake Engineering, 16(8).</p>
        <p>• Şengör, A.M.C. ve ark. (2005). The North Anatolian Fault. Annual Review of Earth and Planetary Sciences.</p>
        <p>• TBDY 2018 — Türkiye Bina Deprem Yönetmeliği</p>
      </div>
    </article>
  );
}
