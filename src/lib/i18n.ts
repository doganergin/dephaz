export type LangKey =
  | 'appName' | 'appSubtitle'
  | 'navBolgeAnalizi' | 'navAilePlani' | 'nav72hCanta' | 'navHarita' | 'navYakinda' | 'navUzman'
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
  appName: 'DepHaz',
  appSubtitle: 'Deprem Hazırlık Rehberi',
  navBolgeAnalizi: 'Bölge Analizi',
  navAilePlani: 'Aile Planı',
  nav72hCanta: '72h Çanta',
  navHarita: 'Harita',
  navUzman: 'Uzmanlar',
  navYakinda: 'yakında',
  pageTitle: 'Bölge Analizi',
  pageSubtitle: 'İl, ilçe ve mahalle seçerek deprem risk analizini görüntüle',
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
  metricOlasilik: '30 yıl olasılık',
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
  btn72hCanta: '🎒 72h Çanta',
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
  appName: 'DepHaz',
  appSubtitle: 'Earthquake Preparedness Guide',
  navBolgeAnalizi: 'Risk Analysis',
  navAilePlani: 'Family Plan',
  nav72hCanta: '72h Kit',
  navHarita: 'Map',
  navUzman: 'Experts',
  navYakinda: 'soon',
  pageTitle: 'Regional Analysis',
  pageSubtitle: 'Select province, district and neighbourhood to view earthquake risk analysis',
  selectIl: 'Province',
  selectIlce: 'District',
  selectMahalle: 'Neighbourhood',
  badgeSehir: 'cities',
  badgeIlce: 'districts',
  badgeMahalle: 'neighbourhoods',
  loading: 'Fetching Kandilli data...',
  error: 'Could not fetch data, please try again.',
  metricFay: 'Fault distance',
  metricMw: 'Expected Mw',
  metricOlasilik: '30-year probability',
  metricDepremSayisi: 'Recent felt (M4+)',
  sectionZemin: 'Soil type',
  sectionBina: 'Building stock',
  sectionDepremler: 'Recent Earthquakes',
  sectionOneriler: 'Recommendations',
  sectionUzman: 'Expert Opinions',
  sectionKaynak: 'Scientific Sources',
  sectionSonDepremler: 'Felt Earthquakes (M4.0+)',
  kaynagaGit: 'Go to source →',
  doiLabel: 'DOI:',
  kandilliLabel: 'Kandilli Observatory',
  btnAilePlani: '👨‍👩‍👧 Family Plan',
  btn72hCanta: '🎒 72h Kit',
  notLabel: 'Note:',
  notMetin: 'Earthquakes of M5.0–5.5 and above are considered to have structural damage potential. This data is for informational purposes only; it is not a definitive earthquake prediction.',
  riskCokYuksek: 'Very High',
  riskYuksek: 'High',
  riskOrta: 'Medium',
  riskDusukOrta: 'Low-Medium',
  riskDusuk: 'Low',
  skalaSectionTitle: 'Earthquake Magnitude Scale',
  skalaSource: 'Source: USGS Magnitude / Intensity Comparison',
  depremAnindaTitle: 'What to Do During an Earthquake?',
  depremAnindaSubtitle: 'Protocol compiled from AFAD & JICA guidelines',
  haberlerTitle: 'Expert Assessments',
  haberlerSubtitle: 'Sourced statements from scientists',
  kaynakcaTitle: 'References',
  haritaTitle: 'Earthquake Map',
  haritaTurkiye: 'Turkey',
  haritaDunya: 'World',
  haritaYukleniyor: 'Loading data...',
  haritaPopupBuyukluk: 'Magnitude',
  haritaPopupTarih: 'Date',
  haritaPopupDerinlik: 'Depth',
  atatürkSöz: 'The most truthful guide in life is science.',
  atatürkAd: 'Mustafa Kemal Atatürk',
  hissedilenDepremler: 'Felt earthquakes (M4.0+)',
  ilSec: '— Select Province —',
  ilceSec: '— Select District —',
  mahalleSec: '— Select Neighbourhood —',
};

export function t(key: LangKey, lang: 'TR' | 'EN'): string {
  return (lang === 'EN' ? EN : TR)[key] ?? key;
}
