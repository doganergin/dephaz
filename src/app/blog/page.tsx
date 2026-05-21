'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const makaleler = [
  {
    slug: 'istanbul-depreme-nasil-hazirlanilir',
    tr: {
      baslik: "İstanbul'da Depreme Nasıl Hazırlanılır? Adım Adım Rehber",
      ozet: "Kuzey Anadolu Fayı'nın gölgesinde yaşayan İstanbullular için bölge riski, bina kontrolü, deprem çantası ve aile planına dair bilimsel verilere dayalı kapsamlı rehber.",
      etiket: 'Hazırlık',
    },
    en: {
      baslik: 'How to Prepare for an Earthquake in Istanbul? A Step-by-Step Guide',
      ozet: 'A comprehensive, science-backed guide for Istanbul residents covering regional risk, building assessment, emergency kit, and family plan — all in the shadow of the North Anatolian Fault.',
      etiket: 'Preparedness',
    },
    tarih: { tr: '21 Mayıs 2026', en: 'May 21, 2026' },
    okumaStr: '~8 min',
    yayin: true,
  },
  {
    slug: 'kuzey-anadolu-fayi-neden-tehlikeli',
    tr: {
      baslik: 'Kuzey Anadolu Fayı Neden Bu Kadar Tehlikeli?',
      ozet: '1939\'dan 1999\'a sistematik biçimde batıya kayan deprem dalgası, Marmara segmentinin kritik konumu ve İstanbul için ne anlama geldiği.',
      etiket: 'Bilim',
    },
    en: {
      baslik: 'Why Is the North Anatolian Fault So Dangerous?',
      ozet: 'The earthquake sequence that systematically migrated westward from 1939 to 1999, the critical position of the Marmara segment, and what it means for Istanbul.',
      etiket: 'Science',
    },
    tarih: { tr: 'Yakında', en: 'Coming Soon' },
    okumaStr: '~6 min',
    yayin: false,
  },
  {
    slug: 'zemin-turu-bina-hasarini-nasil-etkiler',
    tr: {
      baslik: 'Zemin Türü Bina Hasarını Nasıl Etkiler?',
      ozet: 'Alüvyon, kaya ve dolgu zemin farkı; 1999 Avcılar deneyimi ve sismik büyütme etkisinin bina güvenliği üzerindeki rolü.',
      etiket: 'Bilim',
    },
    en: {
      baslik: 'How Does Soil Type Affect Building Damage?',
      ozet: 'The difference between alluvial, rock, and fill soil; the 1999 Avcılar experience; and the role of seismic amplification on building safety.',
      etiket: 'Science',
    },
    tarih: { tr: 'Yakında', en: 'Coming Soon' },
    okumaStr: '~5 min',
    yayin: false,
  },
  {
    slug: '72-saatlik-deprem-cantasi-nasil-hazirlanir',
    tr: {
      baslik: '72 Saatlik Deprem Çantası Nasıl Hazırlanır?',
      ozet: 'AFAD ve FEMA kılavuzlarına göre deprem çantasında bulunması gereken 25 temel ürün, saklama koşulları ve yenileme sıklığı.',
      etiket: 'Hazırlık',
    },
    en: {
      baslik: 'How to Prepare a 72-Hour Earthquake Emergency Kit',
      ozet: '25 essential items for your emergency kit according to AFAD and FEMA guidelines, storage conditions, and how often to refresh them.',
      etiket: 'Preparedness',
    },
    tarih: { tr: 'Yakında', en: 'Coming Soon' },
    okumaStr: '~4 min',
    yayin: false,
  },
  {
    slug: 'turkiyede-depreme-dayanikli-bina-nasil-anlasilir',
    tr: {
      baslik: "Türkiye'de Depreme Dayanıklı Bina Nasıl Anlaşılır?",
      ozet: 'Ruhsat yılı, taşıyıcı sistem, zemin etüdü ve kentsel dönüşüm: kendi binanızın deprem güvenliğini değerlendirmenin yolları.',
      etiket: 'Bina Güvenliği',
    },
    en: {
      baslik: 'How to Assess Earthquake Safety of a Building in Turkey',
      ozet: 'Permit year, structural system, soil survey, and urban renewal rights: how to evaluate your own building\'s earthquake safety.',
      etiket: 'Building Safety',
    },
    tarih: { tr: 'Yakında', en: 'Coming Soon' },
    okumaStr: '~7 min',
    yayin: false,
  },
];

const etiketRenk: Record<string, string> = {
  'Hazırlık':       'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Preparedness':   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Bilim':          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Science':        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Bina Güvenliği': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'Building Safety':'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

export default function BlogPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {TR ? 'Deprem Hattı Blog' : 'Deprem Hattı Blog'}
        </p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {TR ? 'Rehberler ve Makaleler' : 'Guides & Articles'}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {TR
            ? 'Deprem hazırlığı, fay sistemleri ve bina güvenliği hakkında bilimsel verilere dayalı içerikler.'
            : 'Science-backed content on earthquake preparedness, fault systems, and building safety.'}
        </p>
      </div>

      <div className="space-y-3">
        {makaleler.map((m) => {
          const icerik = TR ? m.tr : m.en;
          const tarih  = TR ? m.tarih.tr : m.tarih.en;
          return (
            <div key={m.slug} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${etiketRenk[icerik.etiket] ?? 'bg-gray-100 text-gray-600'}`}>
                  {icerik.etiket}
                </span>
                <span className="text-[11px] text-[var(--muted)]">{tarih} · {m.okumaStr}</span>
              </div>
              <h2 className="text-sm font-bold text-[var(--foreground)] leading-snug">
                {m.yayin ? (
                  <Link href={`/blog/${m.slug}`} className="hover:text-red-600 transition-colors">
                    {icerik.baslik}
                  </Link>
                ) : (
                  icerik.baslik
                )}
              </h2>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">{icerik.ozet}</p>
              {m.yayin ? (
                <Link href={`/blog/${m.slug}`} className="text-xs text-blue-500 hover:underline">
                  {TR ? 'Makaleyi Oku →' : 'Read Article →'}
                </Link>
              ) : (
                <span className="text-[11px] text-[var(--muted)] italic">
                  {TR ? 'Yakında yayımlanacak' : 'Coming soon'}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
