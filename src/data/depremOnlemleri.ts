export interface DepremOnlem {
  adim: number;
  baslik: string;
  baslikEN: string;
  aciklama: string;
  aciklamaEN: string;
  ikon: string;
}

export const depremAnindaOnlemler: DepremOnlem[] = [
  {
    adim: 1,
    baslik: 'Çök, Kapan, Tutun',
    baslikEN: 'Drop, Cover, Hold On',
    aciklama: 'Hemen yere çök, sağlam bir masa veya eşyanın altına gir; yoksa iç duvara yaslan, başını ve boynunu kollarınla koru. Sarsıntı durana kadar yerinde kal.',
    aciklamaEN: 'Drop to the ground immediately, take cover under a sturdy table or piece of furniture; if none available, lean against an interior wall and protect your head and neck with your arms. Stay in place until shaking stops.',
    ikon: '🫳',
  },
  {
    adim: 2,
    baslik: 'Pencere ve Camdan Uzak Dur',
    baslikEN: 'Stay Away from Windows',
    aciklama: 'Camların kırılma ve dışarı fırlama riski yüksektir. Kıyı bölgelerinde pencereye yakın dış duvarlardan uzak dur.',
    aciklamaEN: 'Windows have a high risk of breaking and projecting glass. Stay away from exterior walls near windows, especially in coastal areas.',
    ikon: '🪟',
  },
  {
    adim: 3,
    baslik: 'Asansörü Kullanma',
    baslikEN: 'Do Not Use Elevators',
    aciklama: 'Deprem sırasında ve hemen ardından asansöre binme. Güç kesintisi veya hasarla kapana kısılabilirsin.',
    aciklamaEN: 'Do not use elevators during or immediately after the earthquake. You may get trapped due to power outages or structural damage.',
    ikon: '🛗',
  },
  {
    adim: 4,
    baslik: 'Dışarıdaysan Açık Alanda Kal',
    baslikEN: 'If Outside, Stay in the Open',
    aciklama: 'Binalardan, elektrik direklerinden ve ağaçlardan uzaklaş. Açık alanda çök ve başını koru.',
    aciklamaEN: 'Move away from buildings, utility lines, and trees. Drop to the ground in an open area and protect your head.',
    ikon: '🌳',
  },
  {
    adim: 5,
    baslik: 'Araçtaysan Dur',
    baslikEN: 'If in a Vehicle, Pull Over',
    aciklama: 'Yavaşlayarak köprü, köprüaltı ve elektrik hatlarından uzakta güvenli bir yerde dur. Sarsıntı geçene kadar araçta kal.',
    aciklamaEN: 'Slowly pull over away from bridges, overpasses, and power lines. Stay inside the vehicle until shaking stops.',
    ikon: '🚗',
  },
  {
    adim: 6,
    baslik: 'Sarsıntı Durduğunda Çık',
    baslikEN: 'Evacuate When Shaking Stops',
    aciklama: 'Yangın, gaz kokusu veya yapısal hasar varsa binayı terk et. Kaçış yolunda merdiveni kullan, asansörü değil. Toplanma alanına git.',
    aciklamaEN: 'If there is fire, smell of gas, or structural damage, evacuate the building. Use stairs, not elevators. Proceed to your designated assembly area.',
    ikon: '🚪',
  },
];

export const depremSonrasiOnlemler: DepremOnlem[] = [
  {
    adim: 1,
    baslik: 'Artçı Sarsıntılara Hazır Ol',
    baslikEN: 'Expect Aftershocks',
    aciklama: 'Büyük depremlerin ardından artçı sarsıntılar olabilir. Her artçı sarsıntıda çök-kapan-tutun pozisyonunu al.',
    aciklamaEN: 'Aftershocks may follow large earthquakes. Assume Drop-Cover-Hold On position with each aftershock.',
    ikon: '⚠️',
  },
  {
    adim: 2,
    baslik: 'Gaz Sızıntısı Kontrol Et',
    baslikEN: 'Check for Gas Leaks',
    aciklama: 'Gaz kokusu alıyorsan pencereleri aç, anahtarı dokunma, binayı hemen terk et ve dışarıdan gaz şirketini ara.',
    aciklamaEN: 'If you smell gas, open windows, do not touch switches, evacuate immediately and call the gas company from outside.',
    ikon: '🔥',
  },
  {
    adim: 3,
    baslik: 'İlk Yardım ve 112',
    baslikEN: 'First Aid and Emergency Services',
    aciklama: 'Yaralıları taşımadan önce omurga yaralanması olup olmadığını değerlendir. Ağır yaralanmalarda 112\'yi ara.',
    aciklamaEN: 'Before moving injured persons, assess for spinal injuries. For serious injuries, call 112.',
    ikon: '🏥',
  },
  {
    adim: 4,
    baslik: 'Enkaza Girmek Yasak',
    baslikEN: 'Do Not Enter Damaged Buildings',
    aciklama: 'Hasar görmüş binalara girme. Artçı sarsıntılar yıkık yapıyı çökertebilir.',
    aciklamaEN: 'Do not enter damaged buildings. Aftershocks can collapse already weakened structures.',
    ikon: '🏚️',
  },
];

export const kaynaklar = [
  {
    ad: 'AFAD Deprem Önlemleri Kılavuzu',
    link: 'https://www.afad.gov.tr',
  },
  {
    ad: 'JICA Earthquake Preparedness Manual (Türkiye)',
    link: 'https://www.jica.go.jp/',
  },
  {
    ad: 'USGS Earthquake Hazards Program — Safety',
    link: 'https://www.usgs.gov/programs/earthquake-hazards',
  },
];
