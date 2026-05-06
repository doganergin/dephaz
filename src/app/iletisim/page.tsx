import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim — Deprem Hattı',
  description: 'Deprem Hattı ile iletişime geçin. Hata bildirimi, öneri ve geri bildirimleriniz için bizimle iletişime geçebilirsiniz.',
};

export default function IletisimPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">İletişim</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Sorularınız, önerileriniz veya hata bildirimleriniz için bize ulaşın.</p>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl shrink-0">📧</div>
          <div>
            <p className="text-sm font-bold text-[var(--foreground)]">E-posta</p>
            <a href="mailto:doganergin15@gmail.com" className="text-sm text-blue-500 hover:underline">
              doganergin15@gmail.com
            </a>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-4">
          E-postanıza genellikle 1-3 iş günü içinde yanıt verilmektedir.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">Ne Zaman İletişime Geçebilirsiniz?</h2>
        <div className="space-y-2">
          {[
            { icon: '🐛', baslik: 'Hata Bildirimi', aciklama: 'Sitede çalışmayan bir özellik veya yanlış veri gördüyseniz.' },
            { icon: '💡', baslik: 'Öneri', aciklama: 'Yeni özellik veya iyileştirme fikiriniz varsa.' },
            { icon: '📊', baslik: 'Veri Talebi', aciklama: 'Bölgenize ait eksik veya hatalı veri için.' },
            { icon: '🤝', baslik: 'İş Birliği', aciklama: 'Akademik veya kurumsal iş birliği teklifleri için.' },
            { icon: '⚖️', baslik: 'Hukuki Konular', aciklama: 'Telif hakkı veya gizlilik politikasına ilişkin talepler için.' },
          ].map((item) => (
            <div key={item.baslik} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <span className="text-lg shrink-0">{item.icon}</span>
              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">{item.baslik}</p>
                <p className="text-[11px] text-[var(--muted)] mt-0.5">{item.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4">
        <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">Deprem Acil Durumları İçin</p>
        <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
          Deprem sırasında veya sonrasında acil yardım için <strong>112</strong>'yi arayın
          veya <strong>AFAD'ın</strong> resmi kanallarını takip edin. Deprem Hattı acil müdahale hizmeti vermemektedir.
        </p>
        <a href="https://www.afad.gov.tr" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-500 hover:underline mt-2 block">
          AFAD Resmi Sitesi →
        </a>
      </section>
    </div>
  );
}
