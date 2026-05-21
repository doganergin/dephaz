'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GizlilikPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Yasal Bilgilendirme' : 'Legal'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Gizlilik ve Çerez Politikası' : 'Privacy & Cookie Policy'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Son güncelleme: Mayıs 2026' : 'Last updated: May 2026'}</p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
          {TR
            ? 'Bu politika; depremhatti.com sitesini ziyaret ettiğinizde hangi verilerin toplandığını, nasıl işlendiğini ve üçüncü taraf hizmetlerin çerez kullanımını açıklamaktadır.'
            : 'This policy explains what data is collected when you visit depremhatti.com, how it is processed, and how third-party services use cookies.'}
        </p>
      </div>

      {/* 1. Genel */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '1. Genel Bilgi' : '1. Overview'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı (depremhatti.com), Türkiye\'deki deprem risklerine ilişkin bilimsel veriler sunan, kamuya açık ve tamamen bilgilendirme amaçlı bir web platformudur. Platform; Kandilli Rasathanesi (KOERI), AFAD, USGS ve MTA gibi resmi kurumların açık verilerini işleyerek vatandaşlara bölgesel risk analizi, hazırlık rehberleri ve eğitim içerikleri sunmaktadır.'
            : 'Deprem Hattı (depremhatti.com) is a publicly accessible, informational web platform providing scientific data on earthquake risks in Turkey. The platform processes open data from official institutions such as Kandilli Observatory (KOERI), AFAD, USGS, and MTA to provide users with regional risk analyses, preparedness guides, and educational content.'}
        </p>
      </section>

      {/* 2. Toplanan Veriler */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '2. Toplanan Veriler' : '2. Data We Collect'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı, sunucu tarafında doğrudan kişisel veri toplamamaktadır. Tarayıcınızda yalnızca aşağıdaki tercihler localStorage aracılığıyla yerel olarak saklanmaktadır:'
            : 'Deprem Hattı does not collect personal data directly on its servers. Only the following preferences are stored locally in your browser via localStorage:'}
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-1.5 pl-4 leading-relaxed">
          <li>• <strong>{TR ? 'Tema tercihi:' : 'Theme preference:'}</strong> {TR ? 'Açık / koyu / siyah mod seçimi' : 'Light / dark / black mode selection'}</li>
          <li>• <strong>{TR ? 'Dil tercihi:' : 'Language preference:'}</strong> {TR ? 'Türkçe veya İngilizce' : 'Turkish or English'}</li>
          <li>• <strong>{TR ? 'Kullanıcı hesabı (isteğe bağlı):' : 'User account (optional):'}</strong> {TR ? 'Clerk kimlik doğrulama servisi aracılığıyla yönetilen oturum bilgileri.' : 'Session data managed through the Clerk authentication service.'}</li>
        </ul>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Bu veriler yalnızca cihazınızda tutulur ve üçüncü taraflara iletilmez.'
            : 'These values remain only on your device and are not transmitted to third parties.'}
        </p>
      </section>

      {/* 3. Çerezler */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '3. Çerezler (Cookies)' : '3. Cookies'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sitemiz, reklam gösterimi ve site trafiği analizi amacıyla üçüncü taraf çerezleri kullanmaktadır. Bu çerezler tarafımızca kontrol edilmemekte olup ilgili hizmet sağlayıcıların gizlilik politikalarına tabidir.'
            : 'Our site uses third-party cookies for advertising and site traffic analysis. These cookies are not controlled by us and are subject to the privacy policies of the respective service providers.'}
        </p>

        {/* Google AdSense */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">Google AdSense</p>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            {TR
              ? 'Deprem Hattı, Google tarafından sağlanan AdSense reklam hizmetini kullanmaktadır. Google ve iş ortakları, sitemizi ziyaret ettiğinizde ilgi alanlarınıza göre kişiselleştirilmiş reklamlar sunabilmek için çerezler kullanmaktadır.'
              : 'Deprem Hattı uses the AdSense advertising service provided by Google. Google and its partners use cookies to serve personalised ads based on your interests when you visit our site.'}
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">DoubleClick DART {TR ? 'Çerezi' : 'Cookie'}</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              {TR
                ? 'Google, reklam gösterimi sırasında DoubleClick DART çerezini kullanabilir. Bu çerez, google.com ve internetteki diğer sitelerdeki ziyaretlerinize dayalı olarak size alakalı reklamlar sunmak amacıyla kullanılmaktadır. Kullanıcılar, DoubleClick DART çerezinin kullanımını Google Reklam ve İçerik Ağı gizlilik politikası sayfasını ziyaret ederek devre dışı bırakabilir.'
                : 'Google may use the DoubleClick DART cookie when serving ads. This cookie is used to serve relevant ads to you based on your visits to google.com and other sites on the internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy page.'}
            </p>
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline mt-1 block"
            >
              {TR ? 'Google Reklam Politikası →' : 'Google Advertising Policy →'}
            </a>
          </div>
        </div>

        {/* Google Analytics */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">Google Analytics</p>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            {TR
              ? 'Site trafiğini analiz etmek amacıyla Google Analytics kullanılmaktadır. Bu hizmet; ziyaret edilen sayfalar, oturum süresi ve coğrafi konum gibi anonim istatistiksel verileri toplamaktadır. IP adresleri anonimleştirilmektedir.'
              : 'Google Analytics is used to analyse site traffic. This service collects anonymous statistical data such as pages visited, session duration, and geographic region. IP addresses are anonymised.'}
          </p>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline"
          >
            {TR ? 'Google Gizlilik Politikası →' : 'Google Privacy Policy →'}
          </a>
        </div>

        {/* Clerk */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">Clerk {TR ? '(Kimlik Doğrulama)' : '(Authentication)'}</p>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            {TR
              ? 'Oturum açma işlemleri için Clerk kimlik doğrulama hizmeti kullanılmaktadır. Clerk, oturum yönetimi amacıyla çerezler kullanır. Bu veriler Clerk\'in gizlilik politikasına tabidir.'
              : 'The Clerk authentication service is used for sign-in. Clerk uses cookies for session management. This data is subject to Clerk\'s privacy policy.'}
          </p>
          <a
            href="https://clerk.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline"
          >
            {TR ? 'Clerk Gizlilik Politikası →' : 'Clerk Privacy Policy →'}
          </a>
        </div>
      </section>

      {/* 4. Çerez Yönetimi */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '4. Çerez Tercihlerinizi Yönetme' : '4. Managing Your Cookie Preferences'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Üçüncü taraf çerezlerinin kullanımını aşağıdaki yöntemlerle kısıtlayabilirsiniz:'
            : 'You can restrict the use of third-party cookies through the following methods:'}
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-2 pl-4 leading-relaxed">
          <li>• <strong>{TR ? 'Tarayıcı ayarları:' : 'Browser settings:'}</strong> {TR ? 'Tarayıcınızın gizlilik/çerez ayarlarından tüm çerezleri engelleyebilirsiniz.' : 'You can block all cookies from your browser\'s privacy/cookie settings.'}</li>
          <li>• <strong>{TR ? 'Google reklam tercihleri:' : 'Google ad preferences:'}</strong>{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">adssettings.google.com</a>
          </li>
          <li>• <strong>{TR ? 'Network Advertising Initiative:' : 'Network Advertising Initiative:'}</strong>{' '}
            <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">optout.networkadvertising.org</a>
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          {TR
            ? 'Not: Çerezleri devre dışı bırakmak bazı site özelliklerinin çalışmamasına neden olabilir.'
            : 'Note: Disabling cookies may cause some site features to stop working.'}
        </p>
      </section>

      {/* 5. Dış Veri Kaynakları */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '5. Dış Veri Kaynakları' : '5. External Data Sources'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı, aşağıdaki kamu kurumlarının açık API\'lerinden veri çekmektedir. Bu işlemler sırasında kullanıcıya ait hiçbir kişisel bilgi bu kurumlara iletilmez.'
            : 'Deprem Hattı fetches data from the public APIs of the institutions listed below. No personal user data is transmitted to these institutions.'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {['Kandilli Rasathanesi (KOERI)', 'AFAD', 'USGS', 'MTA', 'TÜİK', 'Vercel (hosting)'].map((k) => (
            <div key={k} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs font-medium text-[var(--foreground)]">
              {k}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Kullanıcı Hesapları */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '6. Kullanıcı Hesapları' : '6. User Accounts'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sitemizde isteğe bağlı kullanıcı kaydı yapılabilmektedir. Kayıt esnasında yalnızca e-posta adresi talep edilmektedir. Bu veriler Clerk altyapısında güvenli biçimde saklanmakta olup tarafımızca üçüncü taraflarla paylaşılmamaktadır. Hesap verinizi silmek için iletisim@depremhatti.com adresine başvurabilirsiniz.'
            : 'Optional user registration is available on our site. Only an email address is requested at registration. This data is securely stored in Clerk\'s infrastructure and is not shared with third parties by us. To delete your account data, contact iletisim@depremhatti.com.'}
        </p>
      </section>

      {/* 7. Çocukların Gizliliği */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '7. Çocukların Gizliliği' : "7. Children's Privacy"}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sitemiz 13 yaşın altındaki çocuklara yönelik değildir ve bu kişilerden bilerek kişisel veri toplamaz. 13 yaşın altında bir kullanıcıdan veri toplandığını fark edersek söz konusu verileri derhal sileriz.'
            : 'Our site is not directed at children under 13 and does not knowingly collect personal data from them. If we become aware that data has been collected from a user under 13, we will delete it immediately.'}
        </p>
      </section>

      {/* 8. KVKK Hakları */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '8. KVKK Kapsamındaki Haklarınız' : '8. Your Rights (GDPR / KVKK)'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki haklara sahipsiniz:'
            : 'Under Law No. 6698 on Personal Data Protection (KVKK) and the GDPR, you have the following rights:'}
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-1 pl-4 leading-relaxed">
          <li>• {TR ? 'Kişisel verilerinizin işlenip işlenmediğini öğrenme' : 'The right to know whether your personal data is being processed'}</li>
          <li>• {TR ? 'Verilerinize erişim talep etme' : 'The right to request access to your data'}</li>
          <li>• {TR ? 'Yanlış verilerin düzeltilmesini isteme' : 'The right to request correction of inaccurate data'}</li>
          <li>• {TR ? 'Verilerinizin silinmesini talep etme' : 'The right to request deletion of your data'}</li>
          <li>• {TR ? 'İşleme itiraz etme' : 'The right to object to processing'}</li>
        </ul>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR ? 'Bu haklarınızı kullanmak için:' : 'To exercise your rights, contact:'}{' '}
          <a href="mailto:iletisim@depremhatti.com" className="text-blue-500 hover:underline">iletisim@depremhatti.com</a>
        </p>
      </section>

      {/* 9. Güncellemeler */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '9. Politika Güncellemeleri' : '9. Policy Updates'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Bu politika, hizmetlerimiz veya yasal yükümlülüklerimizde meydana gelen değişikliklere göre güncellenebilir. Önemli değişiklikler sayfanın üst kısmında tarih olarak belirtilecektir. Siteyi kullanmaya devam etmeniz güncel politikayı kabul ettiğiniz anlamına gelir.'
            : 'This policy may be updated in response to changes in our services or legal obligations. Material changes will be indicated by updating the date at the top of this page. Continued use of the site constitutes acceptance of the current policy.'}
        </p>
      </section>

      <div className="border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
        <p>{TR ? 'Sorularınız için:' : 'For questions:'} <a href="mailto:iletisim@depremhatti.com" className="text-blue-500 hover:underline">iletisim@depremhatti.com</a></p>
        <p className="mt-1">depremhatti.com — {TR ? 'Türkiye Deprem Bilgi Platformu' : 'Turkey Earthquake Information Platform'}</p>
      </div>
    </div>
  );
}
