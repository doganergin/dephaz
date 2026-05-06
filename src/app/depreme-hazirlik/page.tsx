import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Depreme Hazırlık Rehberi — Deprem Hattı',
  description: 'Depreme nasıl hazırlanılır? Ev güvenliği, acil durum planı, deprem çantası ve deprem anında yapılacaklar rehberi.',
};

export default function DepremHazirlikPage() {
  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Hazırlık Rehberi</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Depreme Hazırlık Rehberi</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Depremden önce, sırasında ve sonrasında yapılacaklar</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>Neden şimdi hazırlanmalısınız?</strong> Türkiye'de bir deprem, hiçbir uyarı olmaksızın
          günün herhangi bir saatinde gerçekleşebilir. Hazırlık; panik değil, plan yapmaktır. Bu rehber
          AFAD, JICA ve FEMA kılavuzları esas alınarak hazırlanmıştır.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">1. Ev Güvenliği Önlemleri</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Depreme hazırlığın ilk adımı, yaşadığınız mekanı güvenli hale getirmektir. Deprem sırasında
          düşen eşyalar, ciddi yaralanmaların en yaygın nedenleri arasında yer almaktadır.
        </p>
        <div className="space-y-2">
          {[
            { icon: '📚', aciklama: 'Kitaplık, dolap ve büyük mobilyaları duvara sabitleyip sabitlemeyin. Devrilmesi halinde kaçış yolunu kapatabilecek eşyaları yeniden konumlandırın.' },
            { icon: '🖼️', aciklama: 'Yatak ve koltuk gibi üzerinde oturduğunuz alanların üstüne çerçeve, ayna veya ağır dekoratif eşya asmaktan kaçının.' },
            { icon: '🔌', aciklama: 'Gaz tesisatını ve elektrik panosunu öğrenin. Deprem sonrası gaz kaçağı olup olmadığını nasıl anlayacağınızı ve vanayı kapatmayı öğrenin.' },
            { icon: '🏠', aciklama: 'Binanızın deprem yönetmeliğine uygunluğunu uzman bir inşaat mühendisine kontrol ettirin. Özellikle 1999 öncesi yapılar için bu kritik önem taşımaktadır.' },
            { icon: '💊', aciklama: 'İlaçlarınızı, pasaportunuzu ve önemli belgelerinizi hızlıca alabilecekiniz, kolay ulaşılır bir yerde saklayın.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <span className="text-lg shrink-0">{item.icon}</span>
              <p className="text-xs text-[var(--foreground)] leading-relaxed">{item.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-bold text-[var(--foreground)]">2. Aile Acil Durum Planı</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem anında aile üyeleri farklı yerlerde (iş, okul, market) olabilir. Önceden belirlenmiş
          bir plan kaos ortamında hayat kurtarır.
        </p>
        <div className="space-y-2">
          {[
            { baslik: 'Buluşma Noktası Belirleyin', aciklama: 'Evinizin yakınında herkesçe bilinen, açık bir buluşma noktası seçin. İkinci bir alternatif nokta da belirleyin.' },
            { baslik: 'Acil İletişim Planı', aciklama: 'Tüm aile üyelerinin birbirinin cep telefonu numarasını ve şehir dışında bir referans kişinin numarasını ezbere bilmesini sağlayın. Deprem sonrası yerel hatlar meşgul olabilir; şehir dışından aramak daha kolay olabilir.' },
            { baslik: 'Okul ve İş Yeri Planları', aciklama: 'Çocuklarınızın okulundaki tahliye ve teslim prosedürünü öğrenin. İş yerinizin acil durum planını gözden geçirin.' },
            { baslik: 'Özel İhtiyaçlar', aciklama: 'Yaşlı, engelli veya hareket kısıtlılığı olan aile üyeleri için özel tahliye planı hazırlayın.' },
          ].map((item) => (
            <div key={item.baslik} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <p className="text-xs font-bold text-[var(--foreground)]">{item.baslik}</p>
              <p className="text-[11px] text-[var(--muted)] mt-1 leading-relaxed">{item.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">3. 72 Saatlik Deprem Çantası</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Bir deprem sonrasında acil yardım ekiplerinin ilk 72 saatte tüm bölgelere ulaşması mümkün
          olmayabilir. Bu nedenle her hanenin en az 72 saatlik su, gıda ve temel malzeme içeren hazır
          bir çantası olmalıdır.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '💧', ad: 'Su (9 lt/kişi)' },
            { icon: '🥫', ad: 'Konserve Gıda' },
            { icon: '🩹', ad: 'İlk Yardım Kiti' },
            { icon: '🔦', ad: 'El Feneri + Pil' },
            { icon: '📻', ad: 'Pilli Radyo' },
            { icon: '📄', ad: 'Önemli Belgeler' },
            { icon: '💊', ad: 'İlaçlar (7 günlük)' },
            { icon: '📱', ad: 'Powerbank' },
          ].map((item) => (
            <div key={item.ad} className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <span>{item.icon}</span>
              <span className="text-xs font-medium text-[var(--foreground)]">{item.ad}</span>
            </div>
          ))}
        </div>
        <Link href="/canta" className="block text-center text-sm text-blue-500 hover:underline mt-1">
          Tam çanta listesi için tıklayın →
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">4. Deprem Anında Ne Yapmalısınız?</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem başladığında paniklemek yerine önceden öğrenilmiş adımları uygulamak hayat kurtarır.
          AFAD ve uluslararası deprem kuruluşlarının önerdiği protokol şudur:
        </p>
        <div className="space-y-2">
          {[
            { adim: '1', baslik: 'Çök, Kapan, Tutun', aciklama: 'Hemen yere çömelip sağlam bir masanın altına girin. Masa yoksa iç duvara yaslanın, başınızı ve boynunuzu kollarınızla koruyun. Sarsıntı durana kadar hareket etmeyin.' },
            { adim: '2', baslik: 'Camdan Uzak Durun', aciklama: 'Pencerelerin kırılarak fırlayan camları ağır yaralanmalara neden olabilir. Dış duvarlardan ve camlardan uzak durun.' },
            { adim: '3', baslik: 'Asansör Kullanmayın', aciklama: 'Deprem sırasında ve hemen sonrasında asansör kesinlikle kullanılmamalıdır. Merdivenler daha güvenlidir.' },
            { adim: '4', baslik: 'Dışarı Koşmayın', aciklama: 'Sarsıntı sırasında dışarı fırlamak tehlikelidir. Düşen moloz ve cam parçaları ciddi risk oluşturur. Sarsıntı durunca sakin ve kontrollü şekilde birayı terk edin.' },
          ].map((item) => (
            <div key={item.adim} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">{item.adim}</div>
              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">{item.baslik}</p>
                <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{item.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">5. Deprem Sonrasında</h2>
        <div className="space-y-2">
          {[
            'Gaz kokusu varsa hemen bölgeden uzaklaşın ve yetkilileri arayın.',
            'Çatlak veya hasar gördüğünüz binaya kesinlikle girmeyin.',
            'Artçı sarsıntılara hazırlıklı olun; artçılar günlerce sürebilir.',
            'Resmi açıklamalar için AFAD ve yerel yönetim kanallarını takip edin.',
            'Sosyal medyada dolaşan doğrulanmamış bilgilere itibar etmeyin.',
            'Yaralılar için 112\'yi arayın; gereksiz aramaları sınırlayın.',
          ].map((madde, i) => (
            <div key={i} className="flex gap-2 text-sm text-[var(--foreground)] leading-relaxed">
              <span className="text-green-500 shrink-0">✓</span>
              <span>{madde}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">Bölgenizin Riskini Öğrenin</p>
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mb-3">
          Hazırlık yaparken bölgenizin zemin yapısını, fay mesafesini ve risk skorunu bilmek önceliklendirme
          açısından kritik önem taşır.
        </p>
        <Link href="/" className="inline-block bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Bölge Analizi Yap →
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">Kaynaklar</p>
        <p>• AFAD Deprem Hazırlık Kılavuzu — afad.gov.tr</p>
        <p>• JICA Türkiye Deprem Hazırlık Projesi</p>
        <p>• FEMA — Ready.gov Earthquake Safety</p>
        <p>• Kızılay Afet Hazırlık Kılavuzu</p>
      </div>
    </article>
  );
}
