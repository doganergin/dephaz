import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Deprem Hazırlığı ve Güvenlik Rehberleri | Deprem Hattı',
  description:
    'Deprem hazırlığı, fay hatları, bina güvenliği ve Türkiye\'deki sismik riskler hakkında uzman görüşleri ve bilimsel makaleler.',
  alternates: { canonical: '/blog' },
};

const makaleler = [
  {
    slug: 'istanbul-depreme-nasil-hazirlanilir',
    baslik: "İstanbul'da Depreme Nasıl Hazırlanılır? Adım Adım Rehber",
    ozet: "Kuzey Anadolu Fayı'nın gölgesinde yaşayan İstanbullular için bölge riski, bina kontrolü, deprem çantası ve aile planına dair bilimsel verilere dayalı kapsamlı rehber.",
    tarih: '21 Mayıs 2026',
    okumaStr: '~8 dk',
    etiket: 'Hazırlık',
  },
  {
    slug: 'kuzey-anadolu-fayi-neden-tehlikeli',
    baslik: 'Kuzey Anadolu Fayı Neden Bu Kadar Tehlikeli?',
    ozet: '1939\'dan 1999\'a sistematik biçimde batıya kayan deprem dalgası, Marmara segmentinin kritik konumu ve İstanbul için ne anlama geldiği.',
    tarih: 'Yakında',
    okumaStr: '~6 dk',
    etiket: 'Bilim',
  },
  {
    slug: 'zemin-turu-bina-hasarini-nasil-etkiler',
    baslik: 'Zemin Türü Bina Hasarını Nasıl Etkiler?',
    ozet: 'Alüvyon, kaya ve dolgu zemin farkı; 1999 Avcılar deneyimi ve sismik büyütme etkisinin bina güvenliği üzerindeki rolü.',
    tarih: 'Yakında',
    okumaStr: '~5 dk',
    etiket: 'Bilim',
  },
  {
    slug: '72-saatlik-deprem-cantasi-nasil-hazirlanir',
    baslik: '72 Saatlik Deprem Çantası Nasıl Hazırlanır?',
    ozet: 'AFAD ve FEMA kılavuzlarına göre deprem çantasında bulunması gereken 25 temel ürün, saklama koşulları ve ne zaman yenilenmesi gerektiği.',
    tarih: 'Yakında',
    okumaStr: '~4 dk',
    etiket: 'Hazırlık',
  },
  {
    slug: 'turkiyede-depreme-dayanikli-bina-nasil-anlasilir',
    baslik: "Türkiye'de Depreme Dayanıklı Bina Nasıl Anlaşılır?",
    ozet: 'Ruhsat yılı, kolon-kiriş sistemi, zemin etüdü ve kentsel dönüşüm hakkı: kendi binanızın deprem güvenliğini değerlendirmenin yolları.',
    tarih: 'Yakında',
    okumaStr: '~7 dk',
    etiket: 'Bina Güvenliği',
  },
];

const etiketRenk: Record<string, string> = {
  'Hazırlık': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Bilim': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Bina Güvenliği': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Deprem Hattı Blog</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Rehberler ve Makaleler</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Deprem hazırlığı, fay sistemleri ve bina güvenliği hakkında bilimsel verilere dayalı içerikler.
        </p>
      </div>

      <div className="space-y-3">
        {makaleler.map((m) => (
          <div key={m.slug} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${etiketRenk[m.etiket] ?? 'bg-gray-100 text-gray-600'}`}>
                {m.etiket}
              </span>
              <span className="text-[11px] text-[var(--muted)]">{m.tarih} · {m.okumaStr}</span>
            </div>
            <h2 className="text-sm font-bold text-[var(--foreground)] leading-snug">
              {m.tarih === 'Yakında' ? (
                m.baslik
              ) : (
                <Link href={`/blog/${m.slug}`} className="hover:text-red-600 transition-colors">
                  {m.baslik}
                </Link>
              )}
            </h2>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed">{m.ozet}</p>
            {m.tarih !== 'Yakında' && (
              <Link href={`/blog/${m.slug}`} className="text-xs text-blue-500 hover:underline">
                Makaleyi Oku →
              </Link>
            )}
            {m.tarih === 'Yakında' && (
              <span className="text-[11px] text-[var(--muted)] italic">Yakında yayımlanacak</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
