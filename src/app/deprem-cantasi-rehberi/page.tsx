'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DepremCantasiRehberiPage() {
  const { lang } = useLanguage();
  const TR = lang === 'TR';

  const kategoriler = TR ? [
    {
      kategori: 'Su ve Gıda',
      icon: '💧',
      onem: 'En Kritik',
      maddeler: [
        { ad: 'Su', detay: 'Kişi başı günde en az 3 litre. 3 günlük stok için kişi başı 9 litre. Çocuk, hasta ve sıcak havayı hesaba katarsanız daha fazla.' },
        { ad: 'Su arıtma tableti', detay: 'Aquatabs veya benzeri. Depoladığınız su tükenirse kirli suyu içilebilir hale getirir.' },
        { ad: 'Konserve gıda', detay: '3 günlük. Fasulye, ton balığı, fındık ezmesi gibi pişirme gerektirmeyen ürünler tercih edilmeli.' },
        { ad: 'Enerji barı / kuruyemiş', detay: 'Yüksek kalori, hafif ve uzun raf ömrü. Elektrik olmadan tüketilebilir.' },
        { ad: 'Mama açacağı', detay: 'Elektrikli açacağınız çalışmayabilir.' },
      ],
    },
    {
      kategori: 'İlk Yardım ve Sağlık',
      icon: '🩹',
      onem: 'Kritik',
      maddeler: [
        { ad: 'Hazır ilk yardım çantası', detay: 'Yara bandı, gazlı bez, flaster, antiseptik solüsyon, makasları içermelidir.' },
        { ad: 'Reçeteli ilaçlar', detay: 'En az 7 günlük. Tansiyon, diyabet, kalp ve epilepsi ilaçları öncelikli.' },
        { ad: 'Ağrı kesici', detay: 'Parasetamol ve ibuprofen. Çocuk dozu da bulundurun.' },
        { ad: 'FFP2/N95 maske', detay: 'Enkaz tozu çok tehlikelidir. En az 5 adet.' },
        { ad: 'El dezenfektanı', detay: 'Su olmayabilir. En az 2 şişe.' },
        { ad: 'Turnike / basınç bandajı', detay: 'Ciddi kanamalar için. Nasıl kullanılacağını önceden öğrenin.' },
      ],
    },
    {
      kategori: 'Belgeler ve Para',
      icon: '📄',
      onem: 'Önemli',
      maddeler: [
        { ad: 'Kimlik fotokopisi', detay: 'Kaybetmemek için asıl nüfus cüzdanınızın yanı sıra fotokopi bulundurun.' },
        { ad: 'Nakit para', detay: 'ATM\'ler ve POS cihazları çalışmayabilir. Küçük banknotlar tercih edin.' },
        { ad: 'Önemli belgeler', detay: 'DASK poliçesi, tapu, sağlık sigortası bilgileri su geçirmez torba içinde.' },
        { ad: 'Acil telefon numaraları', detay: 'Kağıda yazılı liste. Telefon şarjı bitebilir.' },
      ],
    },
    {
      kategori: 'Aydınlatma ve İletişim',
      icon: '🔦',
      onem: 'Kritik',
      maddeler: [
        { ad: 'El feneri (LED)', detay: 'En az 2 adet. Yedek pillerini de ekleyin.' },
        { ad: 'Kafa lambası', detay: 'Eller serbest çalışmak için. Enkaz kaldırma ve ilk yardımda kritik.' },
        { ad: 'Pilli/şarjlı radyo', detay: 'Elektrik olmadan resmi açıklamaları takip etmek için.' },
        { ad: 'Powerbank', detay: 'Tam şarjlı, yüksek kapasiteli. Telefon şarj etmek için.' },
        { ad: 'Düdük', detay: 'Enkaz altında konum bildirmek için. Ses çıkarmak güçleştikçe düdük hayat kurtarır.' },
      ],
    },
  ] : [
    {
      kategori: 'Water and Food',
      icon: '💧',
      onem: 'Most Critical',
      maddeler: [
        { ad: 'Water', detay: 'At least 3 litres per person per day. That is 9 litres per person for a 3-day supply. Factor in more for children, the ill, and hot weather.' },
        { ad: 'Water purification tablets', detay: 'Aquatabs or similar. If your stored water runs out, these make contaminated water drinkable.' },
        { ad: 'Canned food', detay: '3-day supply. Prefer items that need no cooking — beans, tuna, nut butter.' },
        { ad: 'Energy bars / nuts', detay: 'High calorie, lightweight, long shelf life. Can be consumed without electricity.' },
        { ad: 'Manual can opener', detay: 'Your electric opener may not work.' },
      ],
    },
    {
      kategori: 'First Aid and Health',
      icon: '🩹',
      onem: 'Critical',
      maddeler: [
        { ad: 'Ready-made first aid kit', detay: 'Should include bandages, gauze pads, plasters, antiseptic solution, and scissors.' },
        { ad: 'Prescription medications', detay: 'At least 7-day supply. Prioritise blood pressure, diabetes, cardiac, and epilepsy medications.' },
        { ad: 'Pain relief', detay: 'Paracetamol and ibuprofen. Include child-appropriate doses.' },
        { ad: 'FFP2/N95 masks', detay: 'Rubble dust is highly dangerous. At least 5 masks.' },
        { ad: 'Hand sanitiser', detay: 'Water may be unavailable. At least 2 bottles.' },
        { ad: 'Tourniquet / pressure bandage', detay: 'For serious bleeding. Learn how to use one in advance.' },
      ],
    },
    {
      kategori: 'Documents and Cash',
      icon: '📄',
      onem: 'Important',
      maddeler: [
        { ad: 'ID photocopy', detay: 'Keep a copy alongside your original ID in case of loss.' },
        { ad: 'Cash', detay: 'ATMs and card terminals may not work. Prefer small banknotes.' },
        { ad: 'Important documents', detay: 'DASK (earthquake insurance) policy, title deeds, health insurance info — stored in a waterproof bag.' },
        { ad: 'Emergency contact list', detay: 'Written on paper. Your phone battery may die.' },
      ],
    },
    {
      kategori: 'Lighting and Communication',
      icon: '🔦',
      onem: 'Critical',
      maddeler: [
        { ad: 'LED torch', detay: 'At least 2. Include spare batteries.' },
        { ad: 'Head torch', detay: 'To keep hands free. Critical for debris removal and first aid.' },
        { ad: 'Battery / hand-crank radio', detay: 'To receive official announcements without electricity.' },
        { ad: 'Powerbank', detay: 'Fully charged, high capacity. To charge your phone.' },
        { ad: 'Whistle', detay: 'To signal your location from under rubble. As your voice weakens, a whistle saves lives.' },
      ],
    },
  ];

  const cantaBilgi = TR ? [
    { baslik: 'Çanta Seçimi', aciklama: '30–50 litre, su geçirmez veya yağmurluk kılıflı bir sırt çantası idealdir. Tekerlekli bavul deprem enkazında kullanışlı olmaz.' },
    { baslik: 'Saklama Yeri', aciklama: 'Kapı kenarı, dolap önü veya araç gibi hızla ulaşabileceğiniz yerler. Serin ve kuru olmasına dikkat edin.' },
    { baslik: 'Periyodik Kontrol', aciklama: '6 ayda bir çantanızı açıp kontrol edin. İlaç ve gıdaların son kullanma tarihlerini yenileyin, pillerinizi değiştirin.' },
    { baslik: 'Her Aile Üyesi İçin', aciklama: 'İdeal olan her kişinin taşıyabileceği bir çantanın olmasıdır. Özellikle küçük çocuklar ve yaşlılar için ayrı bir paket hazırlayın.' },
  ] : [
    { baslik: 'Choosing a Bag', aciklama: 'A 30–50 litre backpack that is waterproof or has a rain cover is ideal. A wheeled suitcase is impractical in earthquake rubble.' },
    { baslik: 'Storage Location', aciklama: 'Keep it somewhere you can grab quickly — near the door, beside a wardrobe, or in the car. Keep it cool and dry.' },
    { baslik: 'Periodic Check', aciklama: 'Open and check your kit every 6 months. Refresh medication and food expiry dates; replace batteries.' },
    { baslik: 'One Per Family Member', aciklama: 'Ideally every person has a bag they can carry. Prepare separate packs for young children and elderly family members.' },
  ];

  return (
    <article className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">{TR ? 'Hazırlık Rehberi' : 'Preparedness Guide'}</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{TR ? '72 Saatlik Deprem Çantası' : '72-Hour Earthquake Kit'}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{TR ? 'Deprem çantasına ne koyulur, nasıl hazırlanır?' : 'What goes in an earthquake kit and how to prepare one'}</p>
      </div>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
        <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed">
          <strong>{TR ? 'Neden 72 saat?' : 'Why 72 hours?'}</strong>{' '}
          {TR
            ? 'Büyük bir deprem sonrasında arama-kurtarma ekiplerinin tüm etkilenen bölgelere ulaşması zaman alabilir. İlk 72 saat, kendi kendinize yeterli olabilmeniz gereken kritik penceredir. Bu süre zarfında elektrik, su ve doğalgaz kesintisi yaşanabilir.'
            : 'After a major earthquake, search-and-rescue teams may take time to reach all affected areas. The first 72 hours is the critical window during which you need to be self-sufficient. Electricity, water, and natural gas supplies may be cut during this period.'}
        </p>
      </div>

      <section className="space-y-4">
        {kategoriler.map((kat) => (
          <section key={kat.kategori} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <span className="text-xl">{kat.icon}</span>
                <p className="text-sm font-bold text-[var(--foreground)]">{kat.kategori}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                kat.onem === 'En Kritik' || kat.onem === 'Most Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                kat.onem === 'Kritik' || kat.onem === 'Critical' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
              }`}>{kat.onem}</span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {kat.maddeler.map((m) => (
                <div key={m.ad} className="px-4 py-3">
                  <p className="text-xs font-bold text-[var(--foreground)]">{m.ad}</p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{m.detay}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-[var(--foreground)]">{TR ? 'Çanta Seçimi ve Saklama' : 'Choosing and Storing Your Kit'}</h2>
        <div className="space-y-2">
          {cantaBilgi.map((item) => (
            <div key={item.baslik} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-3">
              <p className="text-xs font-bold text-[var(--foreground)]">{item.baslik}</p>
              <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">{item.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      <Link href="/canta" className="flex items-center justify-between bg-gray-900 dark:bg-gray-700 text-white rounded-xl p-4 hover:bg-gray-800 transition-colors">
        <div>
          <p className="text-sm font-bold">{TR ? 'İnteraktif Çanta Listesi' : 'Interactive Kit Checklist'}</p>
          <p className="text-xs text-gray-400 mt-0.5">{TR ? 'İşaretleyerek takip edebileceğiniz tam liste' : 'Full list you can tick off as you prepare'}</p>
        </div>
        <span className="text-xl">🎒</span>
      </Link>

      <div className="text-[11px] text-[var(--muted)] space-y-1 border-t border-[var(--border)] pt-4">
        <p className="font-semibold">{TR ? 'Kaynaklar' : 'Sources'}</p>
        <p>• AFAD {TR ? 'Deprem Hazırlık Kılavuzu' : 'Earthquake Preparedness Guide'} — afad.gov.tr</p>
        <p>• FEMA — Ready.gov Emergency Supply List</p>
        <p>• {TR ? 'Kızılay Afet Hazırlık Rehberi' : 'Turkish Red Crescent Disaster Preparedness Guide'}</p>
      </div>
    </article>
  );
}
