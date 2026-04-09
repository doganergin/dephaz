export type LangKey =
  | 'appName' | 'appSubtitle'
  | 'navBolgeAnalizi' | 'navAilePlani' | 'navDepremCantasi' | 'navHarita' | 'navYakinda' | 'navUzman'
  | 'pageTitle' | 'pageSubtitle'
  | 'selectIl' | 'selectIlce' | 'selectMahalle'
  | 'badgeSehir' | 'badgeIlce' | 'badgeMahalle'
  | 'loading' | 'error'
  | 'metricFay' | 'metricMw' | 'metricOlasilik' | 'metricDepremSayisi'
  | 'sectionZemin' | 'sectionBina' | 'sectionDepremler' | 'sectionOneriler'
  | 'sectionUzman' | 'sectionKaynak' | 'sectionSonDepremler'
  | 'kaynagaGit' | 'doiLabel' | 'kandilliLabel'
  | 'btnAilePlani' | 'btn72hCanta'
  | 'notLabel' | 'notMetin'
  | 'riskCokYuksek' | 'riskYuksek' | 'riskOrta' | 'riskDusukOrta' | 'riskDusuk'
  | 'skalaSectionTitle' | 'skalaSource'
  | 'depremAnindaTitle' | 'depremAnindaSubtitle'
  | 'haberlerTitle' | 'haberlerSubtitle'
  | 'kaynakcaTitle'
  | 'haritaTitle' | 'haritaTurkiye' | 'haritaDunya' | 'haritaYukleniyor'
  | 'haritaPopupBuyukluk' | 'haritaPopupTarih' | 'haritaPopupDerinlik'
  | 'atatürkSöz' | 'atatürkAd'
  | 'hissedilenDepremler'
  | 'ilSec' | 'ilceSec' | 'mahalleSec';

type Dict = Record<LangKey, string>;

const TR: Dict = {
  appName: 'Deprem Hattı',
  appSubtitle: 'Bölgeni Tanı Önlemini Al-Deprem Hazırlık Rehberi',
  navBolgeAnalizi: 'Bölge Analizi',
  navAilePlani: 'Aile Planı',
  navDepremCantasi: 'Deprem Çantası',
  navHarita: 'Harita',
  navUzman: 'Uzman Görüşleri',
  navYakinda: 'yakında',
  pageTitle: 'Bölge Analizi',
  pageSubtitle: 'İl, ilçe ve mahalle seçerek bölgenizdeki deprem risk analizini görüntüleyebilirsiniz',
  selectIl: 'İl',
  selectIlce: 'İlçe',
  selectMahalle: 'Mahalle',
  badgeSehir: 'şehir',
  badgeIlce: 'ilçe',
  badgeMahalle: 'mahalle',
  loading: 'Kandilli verisi alınıyor...',
  error: 'Veri alınamadı, lütfen tekrar deneyin.',
  metricFay: 'Fay mesafesi',
  metricMw: 'Beklenen Mw',
  metricOlasilik: '30 yıl içerinde olma olasılığı',
  metricDepremSayisi: 'Son hissedilen (M4+)',
  sectionZemin: 'Zemin yapısı',
  sectionBina: 'Bina stoğu',
  sectionDepremler: 'Son Depremler',
  sectionOneriler: 'Öneriler',
  sectionUzman: 'Uzman Görüşleri',
  sectionKaynak: 'Bilimsel Kaynaklar',
  sectionSonDepremler: 'Hissedilen Depremler (M4.0+)',
  kaynagaGit: 'Kaynağa git →',
  doiLabel: 'DOI:',
  kandilliLabel: 'Kandilli Rasathanesi',
  btnAilePlani: '👨‍👩‍👧 Aile Planı',
  btn72hCanta: '🎒 Deprem Çantası',
  notLabel: 'Not:',
  notMetin: 'M5.0–5.5 ve üzeri büyüklükteki depremler yapısal hasar oluşturma potansiyeline sahip kabul edilmektedir. Bu veriler bilgilendirme amaçlıdır; kesin bir deprem tahmini değildir.',
  riskCokYuksek: 'Çok Yüksek',
  riskYuksek: 'Yüksek',
  riskOrta: 'Orta',
  riskDusukOrta: 'Düşük-Orta',
  riskDusuk: 'Düşük',
  skalaSectionTitle: 'Deprem Büyüklük Skalası',
  skalaSource: 'Kaynak: USGS Magnitude / Intensity Comparison',
  depremAnindaTitle: 'Deprem Anında Ne Yapılır?',
  depremAnindaSubtitle: 'AFAD & JICA kılavuzlarından derlenen protokol',
  haberlerTitle: 'Uzman Değerlendirmeleri',
  haberlerSubtitle: 'Bilim insanlarının kaynaklı açıklamaları',
  kaynakcaTitle: 'Kaynakça',
  haritaTitle: 'Deprem Haritası',
  haritaTurkiye: 'Türkiye',
  haritaDunya: 'Dünya',
  haritaYukleniyor: 'Veriler yükleniyor...',
  haritaPopupBuyukluk: 'Büyüklük',
  haritaPopupTarih: 'Tarih',
  haritaPopupDerinlik: 'Derinlik',
  atatürkSöz: 'Hayatta en hakiki mürşit ilimdir.',
  atatürkAd: 'Mustafa Kemal Atatürk',
  hissedilenDepremler: 'Hissedilen depremler (M4.0+)',
  ilSec: '— İl seçin —',
  ilceSec: '— İlçe seçin —',
  mahalleSec: '— Mahalle seçin —',
};

const EN: Dict = {
  appName: 'Deprem Hattı',
  appSubtitle: 'Earthquake Preparedness Guide',
  navBolgeAnalizi: 'Risk Analysis',
  navAilePlani: 'Family Plan',
  navDepremCantasi: 'Emergency Kit',
  navHarita: 'Map',
  navUzman: 'Expert Opinions',
  navYakinda: 'soon',
  pageTitle: 'Regional Analysis',
  pageSubtitle: 'Select a province, district, and neighbourhood to view the earthquake risk assessment',
  selectIl: 'Province',
  selectIlce: 'District',
  selectMahalle: 'Neighbourhood',
  badgeSehir: 'provinces',
  badgeIlce: 'districts',
  badgeMahalle: 'neighbourhoods',
  loading: 'Loading seismic data…',
  error: 'Could not retrieve data. Please try again.',
  metricFay: 'Nearest fault',
  metricMw: 'Expected magnitude',
  metricOlasilik: '30-yr probability',
  metricDepremSayisi: 'Recently felt (M4+)',
  sectionZemin: 'Soil conditions',
  sectionBina: 'Building stock',
  sectionDepremler: 'Recent Earthquakes',
  sectionOneriler: 'Recommendations',
  sectionUzman: 'Expert Opinions',
  sectionKaynak: 'Scientific Sources',
  sectionSonDepremler: 'Felt Earthquakes (M4.0+)',
  kaynagaGit: 'View source →',
  doiLabel: 'DOI:',
  kandilliLabel: 'Kandilli Observatory & Earthquake Research Institute',
  btnAilePlani: '👨‍👩‍👧 Family Plan',
  btn72hCanta: '🎒 Emergency Kit',
  notLabel: 'Note:',
  notMetin: 'Earthquakes of magnitude M5.0–5.5 and above are generally considered capable of causing structural damage. This data is provided for informational purposes only and does not constitute an earthquake forecast.',
  riskCokYuksek: 'Very High',
  riskYuksek: 'High',
  riskOrta: 'Moderate',
  riskDusukOrta: 'Low–Moderate',
  riskDusuk: 'Low',
  skalaSectionTitle: 'Earthquake Magnitude Scale',
  skalaSource: 'Source: USGS Magnitude / Intensity Comparison',
  depremAnindaTitle: 'What to Do During an Earthquake',
  depremAnindaSubtitle: 'Protocol based on AFAD & JICA preparedness guidelines',
  haberlerTitle: 'Expert Assessments',
  haberlerSubtitle: 'Peer-reviewed analyses and sourced expert statements',
  kaynakcaTitle: 'References',
  haritaTitle: 'Earthquake Map',
  haritaTurkiye: 'Turkey',
  haritaDunya: 'World',
  haritaYukleniyor: 'Loading map data…',
  haritaPopupBuyukluk: 'Magnitude',
  haritaPopupTarih: 'Date',
  haritaPopupDerinlik: 'Depth',
  atatürkSöz: 'The most genuine guide in life is science.',
  atatürkAd: 'Mustafa Kemal Atatürk',
  hissedilenDepremler: 'Felt earthquakes (M4.0+)',
  ilSec: '— Select province —',
  ilceSec: '— Select district —',
  mahalleSec: '— Select neighbourhood —',
};

export function t(key: LangKey, lang: 'TR' | 'EN'): string {
  return (lang === 'EN' ? EN : TR)[key] ?? key;
}
