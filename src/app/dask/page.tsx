'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, CircleAlert, CheckCircle, Phone, ExternalLink, HelpCircle, Banknote } from 'lucide-react';

export default function DaskPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Zorunlu Sigorta' : 'Mandatory Insurance'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'DASK — Zorunlu Deprem Sigortası' : 'DASK — Mandatory Earthquake Insurance'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Türkiye\'de her konut için yasal zorunluluk olan DASK sigortası hakkında bilmeniz gereken her şey.'
            : 'Everything you need to know about DASK earthquake insurance, a legal requirement for every residence in Turkey.'}
        </p>
      </div>

      {/* Uyarı kutusu */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <CircleAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
              {TR ? 'Kritik Bilgi' : 'Key Fact'}
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              {TR
                ? 'Türkiye\'deki konutların yaklaşık %40\'ının hâlâ geçerli DASK poliçesi bulunmamaktadır. DASK olmadan elektrik, su, doğalgaz aboneliği yapılamaz ve tapu işlemleri gerçekleştirilemez.'
                : 'Approximately 40% of residences in Turkey still do not have a valid DASK policy. Without DASK, you cannot get electricity, water, or gas subscriptions, or complete title deed transactions.'}
            </p>
          </div>
        </div>
      </div>

      {/* DASK nedir */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'DASK Nedir?' : 'What Is DASK?'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'DASK (Doğal Afet Sigortaları Kurumu), 1999 Marmara depreminin ardından 2000 yılında kurulan devlet destekli zorunlu sigorta sistemidir. Deprem nedeniyle oluşan yapısal hasarları teminat altına alır.'
            : 'DASK (Natural Disaster Insurance Institution) is a state-backed mandatory insurance system established in 2000 following the 1999 Marmara earthquake. It covers structural damage caused by earthquakes.'}
        </p>
      </section>

      {/* Teminat kapsamı */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Teminat Kapsamı' : 'Coverage Scope'}
        </h2>
        <div className="space-y-2">
          {[
            {
              kapsam: true,
              tr: 'Deprem, deprem yangını, deprem tsunami ve yer kaymasından kaynaklanan yapısal hasar',
              en: 'Structural damage from earthquake, earthquake fire, earthquake tsunami and landslide',
            },
            {
              kapsam: true,
              tr: 'Bina ana yapısı (kolon, kiriş, duvar, döşeme, çatı)',
              en: 'Main building structure (columns, beams, walls, floors, roof)',
            },
            {
              kapsam: false,
              tr: 'Eşya ve mobilya hasarı (ayrı konut sigortası gerekir)',
              en: 'Furniture and content damage (requires separate home insurance)',
            },
            {
              kapsam: false,
              tr: 'İşyeri ve tarım binaları',
              en: 'Workplaces and agricultural buildings',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <CheckCircle
                size={16}
                strokeWidth={2}
                className={`shrink-0 mt-0.5 ${item.kapsam ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}
              />
              <p className={`text-xs leading-relaxed ${item.kapsam ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
                {TR ? item.tr : item.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Prim bilgisi */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Prim Ne Kadar?' : 'How Much Is the Premium?'}
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Banknote size={16} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--foreground)] leading-relaxed">
              {TR
                ? 'Prim; binanızın inşaat tarzına, yüzölçümüne ve bulunduğu deprem bölgesine göre değişir. Türkiye\'nin en riskli deprem bölgesindeki (1. bölge) 100 m² bir daire için yıllık prim genellikle 300–800 TL arasındadır.'
                : 'The premium varies by building construction type, floor area, and earthquake zone. For a 100 m² apartment in Turkey\'s highest-risk zone (Zone 1), the annual premium is generally between 300–800 TL.'}
            </p>
          </div>
          <p className="text-[11px] text-[var(--muted)]">
            {TR ? '* 2024 yılı baz fiyatları. Güncel teklif için sigorta şirketi veya dask.gov.tr\'yi ziyaret edin.' : '* 2024 base prices. Visit an insurance company or dask.gov.tr for a current quote.'}
          </p>
        </div>
      </section>

      {/* Nasıl alınır */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Nasıl Alınır?' : 'How to Get It?'}
        </h2>
        <div className="space-y-2">
          {[
            { num: '1', tr: 'Herhangi bir sigorta acentesine veya bankanıza gidin.', en: 'Visit any insurance agency or your bank.' },
            { num: '2', tr: 'Tapu fotokopisi ve nüfus cüzdanı yeterlidir.', en: 'A copy of your title deed and ID are sufficient.' },
            { num: '3', tr: 'Dask.gov.tr üzerinden online alabilir veya sorgulayabilirsiniz.', en: 'You can buy or query it online at dask.gov.tr.' },
            { num: '4', tr: 'Poliçe genellikle aynı gün hazır olur, 1 yıl geçerlidir.', en: 'The policy is usually ready the same day and valid for 1 year.' },
          ].map((s) => (
            <div key={s.num} className="flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">{s.num}</span>
              <p className="text-xs text-[var(--foreground)] leading-relaxed">{TR ? s.tr : s.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Poliçe sorgula */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Poliçemi Nasıl Sorgularım?' : 'How Do I Check My Policy?'}
        </h2>
        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {TR
            ? 'DASK\'ın resmi sitesinden veya telefon hattından tapu bilgilerinizle sorgulama yapabilirsiniz.'
            : 'You can query your policy using your title deed information on the official DASK website or phone line.'}
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="https://www.dask.gov.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <ShieldCheck size={16} className="text-blue-500 shrink-0" />
            <p className="text-xs font-bold text-blue-500">dask.gov.tr</p>
            <ExternalLink size={12} className="text-[var(--muted)] ml-auto" />
          </a>
          <a
            href="tel:08505500055"
            className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <Phone size={16} className="text-blue-500 shrink-0" />
            <p className="text-xs font-bold text-[var(--foreground)]">0850 550 00 55</p>
            <p className="text-[11px] text-[var(--muted)] ml-2">{TR ? 'DASK Çağrı Merkezi' : 'DASK Call Centre'}</p>
          </a>
        </div>
      </section>

      {/* SSS */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">
          {TR ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}
        </h2>
        {[
          {
            s: { tr: 'Kiracıysam DASK almak zorunda mıyım?', en: 'Do I need DASK if I\'m a tenant?' },
            c: { tr: 'DASK konut sahibine aittir, kiracıdan istenemez. Ancak konut sahibi almamışsa ilgili kurumlardan başvuru yapılabilir.', en: 'DASK belongs to the homeowner, not the tenant. If the owner hasn\'t taken it, applications can be made to the relevant institutions.' },
          },
          {
            s: { tr: 'Kiralık dairem için de gerekli mi?', en: 'Is it required for my rental apartment?' },
            c: { tr: 'Evet, konutun kullanım durumundan bağımsız olarak malik adına zorunludur.', en: 'Yes, it is mandatory in the owner\'s name regardless of whether the property is rented out.' },
          },
          {
            s: { tr: 'Hasarımı nasıl talep ederim?', en: 'How do I make a damage claim?' },
            c: { tr: 'Depremden sonra 15 gün içinde DASK veya sigorta acentenizi arayın. Fotoğraflı hasar belgesi hazırlayın.', en: 'Within 15 days of the earthquake, call DASK or your insurance agent. Prepare photographic damage documentation.' },
          },
        ].map((sss, i) => (
          <div key={i} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3 space-y-1.5">
            <div className="flex items-start gap-2">
              <HelpCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-[var(--foreground)]">{TR ? sss.s.tr : sss.s.en}</p>
            </div>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed pl-5">{TR ? sss.c.tr : sss.c.en}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
