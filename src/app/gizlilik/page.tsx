import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası — Deprem Hattı',
  description: 'Deprem Hattı gizlilik politikası. Kişisel veriler, çerezler ve üçüncü taraf hizmetler hakkında bilgi.',
};

export default function GizlilikPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Gizlilik Politikası</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Son güncelleme: Nisan 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">1. Genel Bilgi</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem Hattı (<strong>depremhatti.com</strong>), Türkiye'deki deprem risklerine ilişkin bilimsel veriler sunan,
          tamamen bilgilendirme amaçlı bir web platformudur. Bu Gizlilik Politikası, sitemizi ziyaret ettiğinizde
          hangi verilerin toplandığını, nasıl kullanıldığını ve haklarınızın neler olduğunu açıklamaktadır.
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Sitemize erişerek bu politikayı kabul etmiş sayılırsınız. Sorularınız için lütfen bizimle iletişime geçin.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">2. Toplanan Veriler</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem Hattı, kullanıcıların kişisel bilgilerini (ad, soyad, e-posta vb.) doğrudan toplamaz veya
          sunucularında saklamaz. Tarayıcınızda yalnızca aşağıdaki tercihler <strong>yerel olarak (localStorage)</strong> kaydedilmektedir:
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-1.5 pl-4 leading-relaxed">
          <li>• <strong>Tema tercihi:</strong> Açık / koyu / siyah mod seçimi</li>
          <li>• <strong>Dil tercihi:</strong> Türkçe veya İngilizce seçimi</li>
        </ul>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Bu veriler yalnızca cihazınızda tutulur, hiçbir sunucuya iletilmez ve tarayıcı verilerinizi
          temizlediğinizde otomatik olarak silinir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">3. Çerezler (Cookies)</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Sitemiz, Google AdSense ve Google Analytics gibi üçüncü taraf hizmetleri bünyesinde çerez kullanmaktadır.
          Bu çerezler, reklam kişiselleştirme ve site trafiği analizi amacıyla kullanılabilir.
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-[var(--border)] rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-2">Üçüncü Taraf Hizmetler</p>
          <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed">
            <li>
              • <strong>Google AdSense:</strong> Reklam gösterimi ve kişiselleştirme için çerez kullanır.{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Google Gizlilik Politikası →
              </a>
            </li>
            <li>• <strong>Google Analytics:</strong> Anonim site trafiği ve kullanım istatistikleri için kullanılır.</li>
          </ul>
        </div>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz. Ancak bu durumda sitenin bazı
          özellikleri düzgün çalışmayabilir. Google reklam tercihlerini yönetmek için{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            adssettings.google.com
          </a>{' '}
          adresini ziyaret edebilirsiniz.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">4. Dış Veri Kaynakları</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem Hattı, aşağıdaki kamu kurumları ve uluslararası kuruluşların açık API'lerinden veri çekmektedir.
          Bu işlemler sırasında kullanıcıya ait hiçbir kişisel bilgi bu kurumlara iletilmemektedir.
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-1.5 pl-4 leading-relaxed">
          <li>• Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü (KOERI)</li>
          <li>• AFAD — Afet ve Acil Durum Yönetimi Başkanlığı</li>
          <li>• USGS — ABD Jeolojik Araştırma Kurumu</li>
          <li>• MTA — Maden ve Tetkik Arama Genel Müdürlüğü</li>
          <li>• TÜİK — Türkiye İstatistik Kurumu</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">5. Veri Güvenliği</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Deprem Hattı, sunucu tarafında herhangi bir kullanıcı verisi barındırmamaktadır. Site tamamen
          istemci taraflı çalışmakta olup kullanıcı verisi toplanmamakta ve üçüncü taraflarla
          paylaşılmamaktadır. Reklam hizmetleri dışında kişisel veri işlenmesi söz konusu değildir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">6. Çocukların Gizliliği</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Sitemiz 13 yaşın altındaki çocuklardan bilerek kişisel veri toplamaz. Ebeveynler veya veliler
          bu konuda endişe duyuyorlarsa bizimle iletişime geçebilir.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">7. KVKK Kapsamındaki Haklarınız</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-1.5 pl-4 leading-relaxed">
          <li>• Kişisel verilerinizin işlenip işlenmediğini öğrenme hakkı</li>
          <li>• Kişisel verilerinize ilişkin bilgi talep etme hakkı</li>
          <li>• Kişisel verilerinizin silinmesini veya yok edilmesini isteme hakkı</li>
          <li>• Otomatik sistemler aracılığıyla aleyhinize çıkan sonuçlara itiraz hakkı</li>
        </ul>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Bu haklarınızı kullanmak için <a href="mailto:doganergin15@gmail.com" className="text-blue-500 hover:underline">doganergin15@gmail.com</a> adresine e-posta gönderebilirsiniz.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">8. Politika Değişiklikleri</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          Bu Gizlilik Politikası zaman zaman güncellenebilir. Değişiklikler yapıldığında sayfanın üst
          kısmındaki tarih güncellenecektir. Politikayı düzenli olarak incelemenizi öneririz.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">9. İletişim</h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-[var(--border)] rounded-xl p-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">Deprem Hattı</p>
          <p className="text-sm text-[var(--muted)] mt-1">
            E-posta:{' '}
            <a href="mailto:doganergin15@gmail.com" className="text-blue-500 hover:underline">
              doganergin15@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
