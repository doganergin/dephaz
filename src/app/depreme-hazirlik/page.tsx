'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Backpack, Globe } from 'lucide-react';

export default function DepremHazirlikPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const steps = TR ? [
    { n: '1', t: 'Ev Güvenliği', a: 'Dolap ve kitaplıkları duvara sabitleyin. Yatak ve koltuk üzerindeki çerçeveleri kaldırın. Gaz vanasının yerini öğrenin. Binanızın deprem yönetmeliğine uygunluğunu kontrol ettirin.' },
    { n: '2', t: 'Aile Planı', a: 'Eviniz yakınında bir buluşma noktası belirleyin. Tüm aile üyelerinin birbirinin numarasını ve şehir dışı referans kişiyi bilmesini sağlayın. Çocuklarınızın okulunun tahliye prosedürünü öğrenin.' },
    { n: '3', t: '72 Saatlik Çanta', a: 'Kişi başı 9 litre su, 3 günlük konserve gıda, ilk yardım kiti, el feneri, pilli radyo, powerbank, ilaçlar (7 günlük) ve önemli belgeler.' },
    { n: '4', t: 'Deprem Anında', a: 'Çök — Kapan — Tutun. Sağlam bir masa altına girin, baş ve boynu koruyun. Dışarı koşmayın, camlardan uzak durun, asansör kullanmayın.' },
    { n: '5', t: 'Deprem Sonrasında', a: 'Gaz kokusu varsa uzaklaşın. Hasarlı binaya girmeyin. Artçı sarsıntılara hazırlıklı olun. Resmi açıklamalar için AFAD\'ı takip edin.' },
  ] : [
    { n: '1', t: 'Home Safety', a: 'Secure bookshelves and wardrobes to walls. Remove frames above beds. Learn where the gas shut-off is. Have your building checked for compliance with earthquake regulations.' },
    { n: '2', t: 'Family Plan', a: 'Designate a meeting point near your home. Make sure everyone knows each other\'s numbers and has an out-of-town contact. Learn your children\'s school evacuation procedure.' },
    { n: '3', t: '72-Hour Kit', a: '9 litres of water per person, 3 days of canned food, first aid kit, flashlight, battery radio, powerbank, medications (7-day supply), and important documents.' },
    { n: '4', t: 'During the Earthquake', a: 'Drop — Cover — Hold On. Get under a sturdy table, protect your head and neck. Do not run outside, stay away from windows, do not use the lift.' },
    { n: '5', t: 'After the Earthquake', a: 'If you smell gas, leave the area. Do not enter damaged buildings. Expect aftershocks. Follow AFAD for official announcements.' },
  ];

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">{TR ? 'Hazırlık Rehberi' : 'Preparedness Guide'}</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? 'Depreme Hazırlık Rehberi' : 'Earthquake Preparedness Guide'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Depremden önce, sırasında ve sonrasında yapılacaklar' : 'What to do before, during, and after an earthquake'}</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          {TR
            ? 'Türkiye\'de bir deprem hiçbir uyarı olmaksızın günün herhangi bir saatinde gerçekleşebilir. Hazırlık; panik değil, plan yapmaktır. Bu rehber AFAD, JICA ve FEMA kılavuzları esas alınarak hazırlanmıştır.'
            : 'An earthquake in Turkey can strike at any hour without warning. Preparedness means planning, not panicking. This guide is based on AFAD, JICA, and FEMA guidelines.'}
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 glow-card glow-red">
            <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 text-sm font-bold flex items-center justify-center shrink-0">{s.n}</div>
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">{s.t}</p>
              <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">{s.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/canta" className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white rounded-xl py-3 text-xs font-semibold hover:bg-gray-800 transition-colors">
          <Backpack size={14} className="shrink-0" /> {TR ? 'Çanta Listesi' : 'Kit Checklist'}
        </Link>
        <Link href="/bolge-analizi" className="flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--foreground)] rounded-xl py-3 text-xs font-semibold hover:border-red-300 transition-colors">
          <Globe size={14} className="shrink-0" /> {TR ? 'Bölge Analizi' : 'Risk Analysis'}
        </Link>
      </div>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">{TR ? 'Kaynaklar' : 'Sources'}</p>
        <p>• AFAD {TR ? 'Deprem Hazırlık Kılavuzu' : 'Earthquake Preparedness Guide'} — afad.gov.tr</p>
        <p>• FEMA — Ready.gov</p>
        <p>• JICA {TR ? 'Türkiye Deprem Hazırlık Projesi' : 'Turkey Earthquake Preparedness Project'}</p>
      </div>
    </article>
  );
}
