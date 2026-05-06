import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Türkiye'de Deprem Riski — Deprem Hattı",
  description: "Türkiye'nin deprem riski neden yüksek? Kuzey Anadolu ve Doğu Anadolu fay hatları, risk bölgeleri ve tarihsel depremler.",
};

export default function TurkiyeDepremRiskiPage() {
  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Risk Analizi</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Türkiye'de Deprem Riski</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Neden bu kadar çok deprem oluyor ve hangi bölgeler risk altında?</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Genel Tablo</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Türkiye, dünya genelindeki depremlerin yaklaşık yüzde üçüne ev sahipliği yapmaktadır.
          Ülke topraklarının yüzde 92'si deprem bölgelerinde yer almakta, nüfusun ise yaklaşık
          yüzde 95'i deprem riski taşıyan alanlarda yaşamaktadır. Son yüzyılda meydana gelen
          yıkıcı depremler, Türkiye'yi dünyanın en fazla depremden etkilenen ülkeleri arasına sokmuştur.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { sayi: '%92', aciklama: 'Deprem bölgesindeki yüzey' },
            { sayi: '%95', aciklama: 'Risk altındaki nüfus' },
            { sayi: '~1.500', aciklama: 'Aktif fay hattı (km)' },
          ].map((item) => (
            <div key={item.aciklama} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-red-600">{item.sayi}</p>
              <p className="text-[10px] text-[var(--muted)] mt-1 leading-tight">{item.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Kuzey Anadolu Fay Hattı (KAFH)</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Dünyanın en tehlikeli fay hatlarından biri olan Kuzey Anadolu Fay Hattı, doğuda Karlıova
          (Bingöl) ilçesinden batıda Marmara Denizi'ne uzanır. Toplam uzunluğu yaklaşık 1.500 km
          olan bu sağ yanal doğrultu atımlı fay, yılda ortalama 20–25 mm hareket etmektedir.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          1939'dan bu yana fay boyunca batıya doğru ilerleyen büyük deprem dizisi dikkat çekicidir:
          1939 Erzincan (M7.8), 1942 Niksar-Erbaa (M7.0), 1943 Tosya (M7.2), 1944 Bolu-Gerede
          (M7.3), 1957 Abant (M7.0), 1967 Mudurnu (M7.1), 1999 Gölcük (M7.4) ve 1999 Düzce (M7.2).
          Bu dizi, Marmara bölgesinde büyük bir depremin olasılığını artırmaktadır.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Doğu Anadolu Fay Hattı (DAFH)</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Karlıova'dan Hatay'a kadar uzanan ve yaklaşık 580 km uzunluğundaki Doğu Anadolu Fay Hattı,
          Şubat 2023'e kadar uzun süre büyük bir deprem üretmemişti. 6 Şubat 2023 tarihinde saat
          04:17'de gerçekleşen Mw 7.7 büyüklüğündeki Kahramanmaraş depremi ve ardından gelen Mw 7.6
          büyüklüğündeki Elbistan depremi, bu fayın ne denli tehlikeli olduğunu acı bir şekilde
          gözler önüne serdi.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Bu deprem çifti, 10 ilde 50.000'den fazla kişinin hayatını kaybetmesine, yaklaşık 120.000
          binanın yıkılmasına veya ağır hasar görmesine neden oldu. Tarihsel kayıtlar incelendiğinde,
          fayın son büyük depreminin 1513 yılına ait Mw 7.4 büyüklüğündeki Maraş depremi olduğu
          görülmektedir; yani fay yaklaşık 500 yıldır enerji biriktiriyordu.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">İstanbul ve Marmara Depremi Riski</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          İstanbul, Kuzey Anadolu Fay Hattı'nın Marmara Denizi'ndeki kolu üzerindeki konumuyla
          Türkiye'nin en yüksek deprem riskiyle karşı karşıya olan megakentidir. Bilim insanları,
          İstanbul'da yakın gelecekte (30-50 yıl içinde) büyük bir deprem oluşma olasılığını yüzde
          60-70 olarak tahmin etmektedir.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Beklenen İstanbul depreminin Mw 7.0 veya üzerinde olabileceği öngörülmektedir. 17 Ağustos
          1999 Gölcük depremi bu segment üzerinde oluşmuş ve İzmit-Gölcük-Adapazarı hattında
          17.000'den fazla kişinin hayatını kaybetmesine neden olmuştu.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Bölgesel Risk Durumu</h2>
        <div className="space-y-2">
          {[
            { bolge: 'Marmara Bölgesi', risk: 'Çok Yüksek', renk: 'red', aciklama: 'İstanbul, Kocaeli, Sakarya, Bursa. KAFH\'nın aktif batı segmenti.' },
            { bolge: 'Ege Bölgesi', risk: 'Yüksek', renk: 'orange', aciklama: 'İzmir, Manisa, Denizli. Batı Anadolu graben sistemi ve aktif normal faylar.' },
            { bolge: 'Doğu Anadolu', risk: 'Çok Yüksek', renk: 'red', aciklama: 'Kahramanmaraş, Hatay, Malatya, Gaziantep. DAFH ve çevre faylar.' },
            { bolge: 'İç Anadolu', risk: 'Orta', renk: 'amber', aciklama: 'Ankara çevresinde daha düşük risk; ancak bazı ilçeler aktif faya yakın.' },
            { bolge: 'Karadeniz', risk: 'Orta-Düşük', renk: 'green', aciklama: 'Genel olarak daha az aktif; ancak Türkiye\'nin kuzey kıyı şeridi risk taşır.' },
          ].map((item) => (
            <div key={item.bolge} className="flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                item.renk === 'red' ? 'bg-red-500' :
                item.renk === 'orange' ? 'bg-orange-500' :
                item.renk === 'amber' ? 'bg-amber-500' : 'bg-green-500'
              }`} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-[var(--foreground)]">{item.bolge}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.renk === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                    item.renk === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                    item.renk === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                    'bg-green-100 dark:bg-green-900/30 text-green-600'
                  }`}>{item.risk}</span>
                </div>
                <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{item.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Son 25 Yılın Büyük Depremleri</h2>
        <div className="space-y-2">
          {[
            { tarih: '17 Ağustos 1999', yer: 'Gölcük / Kocaeli', buyukluk: 'Mw 7.4', kayip: '17.000+' },
            { tarih: '12 Kasım 1999', yer: 'Düzce', buyukluk: 'Mw 7.2', kayip: '845' },
            { tarih: '1 Mayıs 2003', yer: 'Bingöl', buyukluk: 'Mw 6.4', kayip: '176' },
            { tarih: '23 Ekim 2011', yer: 'Van', buyukluk: 'Mw 7.1', kayip: '604' },
            { tarih: '24 Ocak 2020', yer: 'Elazığ-Sivrice', buyukluk: 'Mw 6.8', kayip: '41' },
            { tarih: '30 Ekim 2020', yer: 'İzmir-Seferihisar', buyukluk: 'Mw 6.9', kayip: '114' },
            { tarih: '6 Şubat 2023', yer: 'Kahramanmaraş', buyukluk: 'Mw 7.7 + 7.6', kayip: '50.000+' },
          ].map((dep) => (
            <div key={dep.tarih} className="flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-xs font-bold text-red-600 shrink-0">{dep.buyukluk.split(' ')[0]}</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[var(--foreground)]">{dep.yer}</p>
                <p className="text-[11px] text-[var(--muted)]">{dep.tarih} · {dep.kayip} kayıp</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">Kendi Bölgenizi Analiz Edin</p>
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mb-3">
          Yaşadığınız ilçenin fay mesafesini, zemin yapısını ve risk skorunu öğrenmek için Deprem Hattı
          Bölge Analizi aracını kullanabilirsiniz.
        </p>
        <Link href="/" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Bölge Analizi Yap →
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">Kaynaklar</p>
        <p>• AFAD Türkiye Deprem Tehlike Haritası 2018</p>
        <p>• Kandilli Rasathanesi Tarihsel Deprem Kataloğu</p>
        <p>• Emre, Ö. ve ark. (2018). Active Fault Database of Turkey. Bulletin of Earthquake Engineering.</p>
        <p>• Şengör, A.M.C. ve ark. (2005). The North Anatolian Fault: a new look. Annual Review of Earth and Planetary Sciences.</p>
      </div>
    </article>
  );
}
