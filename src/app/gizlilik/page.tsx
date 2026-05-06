'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GizlilikPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'Gizlilik Politikası' : 'Privacy Policy'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Son güncelleme: Nisan 2026' : 'Last updated: April 2026'}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '1. Genel Bilgi' : '1. Overview'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı (depremhatti.com), Türkiye\'deki deprem risklerine ilişkin bilimsel veriler sunan, tamamen bilgilendirme amaçlı bir web platformudur. Bu Gizlilik Politikası, sitemizi ziyaret ettiğinizde hangi verilerin toplandığını ve nasıl kullanıldığını açıklamaktadır.'
            : 'Deprem Hattı (depremhatti.com) is an informational web platform providing scientific data on earthquake risks in Turkey. This Privacy Policy explains what data is collected when you visit our site and how it is used.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '2. Toplanan Veriler' : '2. Data We Collect'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı, kişisel bilgilerinizi doğrudan toplamaz veya sunucularında saklamaz. Tarayıcınızda yalnızca aşağıdaki tercihler yerel olarak (localStorage) kaydedilmektedir:'
            : 'Deprem Hattı does not directly collect or store personal information on its servers. Only the following preferences are saved locally in your browser (localStorage):'}
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-1.5 pl-4 leading-relaxed">
          <li>• <strong>{TR ? 'Tema tercihi:' : 'Theme preference:'}</strong> {TR ? 'Açık / koyu / siyah mod' : 'Light / dark / black mode'}</li>
          <li>• <strong>{TR ? 'Dil tercihi:' : 'Language preference:'}</strong> {TR ? 'Türkçe veya İngilizce' : 'Turkish or English'}</li>
        </ul>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Bu veriler yalnızca cihazınızda tutulur, hiçbir sunucuya iletilmez.'
            : 'These values remain only on your device and are never transmitted to any server.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '3. Çerezler (Cookies)' : '3. Cookies'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sitemiz, Google AdSense ve Google Analytics gibi üçüncü taraf hizmetleri bünyesinde çerez kullanmaktadır. Bu çerezler reklam kişiselleştirme ve site trafiği analizi amacıyla kullanılabilir.'
            : 'Our site uses cookies through third-party services such as Google AdSense and Google Analytics. These cookies may be used for ad personalisation and traffic analysis.'}
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-[var(--border)] rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide mb-2">{TR ? 'Üçüncü Taraf Hizmetler' : 'Third-Party Services'}</p>
          <ul className="text-sm text-[var(--foreground)] space-y-2 leading-relaxed">
            <li>• <strong>Google AdSense:</strong> {TR ? 'Reklam gösterimi için çerez kullanır.' : 'Uses cookies for ad delivery and personalisation.'}{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{TR ? 'Google Gizlilik Politikası →' : 'Google Privacy Policy →'}</a>
            </li>
            <li>• <strong>Google Analytics:</strong> {TR ? 'Anonim site trafiği analizi için kullanılır.' : 'Used for anonymous site traffic analysis.'}</li>
          </ul>
        </div>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz.'
            : 'You can disable cookies through your browser settings.'}
          {' '}<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">adssettings.google.com</a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '4. Dış Veri Kaynakları' : '4. External Data Sources'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı, aşağıdaki kamu kurumlarının açık API\'lerinden veri çekmektedir. Bu işlemler sırasında kullanıcıya ait hiçbir kişisel bilgi bu kurumlara iletilmemektedir.'
            : 'Deprem Hattı fetches data from the public APIs of the institutions listed below. No personal user data is transmitted to these institutions in the process.'}
        </p>
        <ul className="text-sm text-[var(--foreground)] space-y-1 pl-4 leading-relaxed">
          <li>• Kandilli Rasathanesi (KOERI)</li>
          <li>• AFAD</li>
          <li>• USGS</li>
          <li>• MTA</li>
          <li>• TÜİK</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '5. Veri Güvenliği' : '5. Data Security'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Deprem Hattı, sunucu tarafında herhangi bir kullanıcı verisi barındırmamaktadır. Reklam hizmetleri dışında kişisel veri işlenmesi söz konusu değildir.'
            : 'Deprem Hattı stores no user data on its servers. No personal data is processed outside of the advertising services described above.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '6. Çocukların Gizliliği' : "6. Children's Privacy"}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Sitemiz 13 yaşın altındaki çocuklardan bilerek kişisel veri toplamaz.'
            : 'Our site does not knowingly collect personal data from children under the age of 13.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '7. KVKK Kapsamındaki Haklarınız' : '7. Your Rights'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? '6698 sayılı KVKK kapsamında kişisel verileriniz hakkında bilgi talep etme, düzeltme ve silme haklarına sahipsiniz.'
            : 'Under applicable data protection law, you have the right to access, correct, and delete information relating to you.'}
        </p>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR ? 'İletişim:' : 'Contact:'}{' '}
          <a href="mailto:doganergin15@gmail.com" className="text-blue-500 hover:underline">doganergin15@gmail.com</a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? '8. Politika Değişiklikleri' : '8. Policy Changes'}</h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'Bu politika zaman zaman güncellenebilir. Değişiklikler yapıldığında sayfanın üst kısmındaki tarih güncellenecektir.'
            : 'This policy may be updated from time to time. When changes are made, the date at the top of the page will be updated.'}
        </p>
      </section>
    </div>
  );
}
