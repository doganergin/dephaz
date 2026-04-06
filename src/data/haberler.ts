export interface Haber {
  uzman: string;
  unvan: string;
  kurum: string;
  tarih: string;
  baslik: string;
  ozet: string;
  kaynak: string;
  kaynak_tur: 'doi' | 'kurum' | 'universite';
}

export const haberler: Haber[] = [
  {
    uzman: 'Dr. Tom Parsons',
    unvan: 'Kıdemli Araştırmacı Jeofizikçi',
    kurum: 'ABD Jeolojik Araştırma Kurumu (USGS)',
    tarih: '2004',
    baslik: 'Marmara\'da M≥7 Deprem Olasılığı Yeniden Hesaplandı',
    ozet: 'Parsons ve ekibinin Journal of Geophysical Research\'ta yayımlanan çalışmasına göre, Marmara Denizi altındaki ana fay segmentinde önümüzdeki 30 yıl içinde M≥7 deprem olasılığı %62 olarak hesaplanmıştır. Çalışma, 1999 depremi sonrasında fay üzerinde biriken gerilme miktarını ve tarihsel sismisiteyi baz almaktadır.',
    kaynak: 'https://doi.org/10.1029/2003JB002667',
    kaynak_tur: 'doi',
  },
  {
    uzman: 'Prof. Dr. Diego Melgar ve ekibi',
    unvan: 'Jeofizik Profesörü',
    kurum: 'Oregon Üniversitesi',
    tarih: '2023',
    baslik: '6 Şubat Kahramanmaraş Deprem Dizisinin İlk Analizi',
    ozet: 'Melgar ve ark.\'nın Seismological Research Letters\'ta yayımlanan çalışmasına göre, 6 Şubat 2023 Pazarcık depremi 300 km\'den uzun bir fay segmentini kırmış ve bazı noktalarda 6 metreyi aşan yatay ötelenme ölçülmüştür. Çalışma, DAF üzerindeki iki farklı fay segmentinin birbirini tetiklediğini ortaya koymaktadır.',
    kaynak: 'https://doi.org/10.1785/0220230109',
    kaynak_tur: 'doi',
  },
  {
    uzman: 'Prof. Dr. Aykut Barka ve ekibi',
    unvan: 'Jeoloji Profesörü',
    kurum: 'İstanbul Teknik Üniversitesi',
    tarih: '2002',
    baslik: '1999 Kocaeli Depremi Yüzey Kırığı ve Atım Dağılımı',
    ozet: 'Barka ve ark.\'nın Bulletin of the Seismological Society of America\'da yayımlanan çalışmasına göre, 17 Ağustos 1999 Kocaeli depreminde yüzey kırığı 145 km uzunluğa ulaşmış, sağ yanal ötelenme yer yer 5 metreyi aşmıştır. Çalışma, KAF\'ın İzmit kolunun tarihsel sismik boşluk davranışını belgelemektedir.',
    kaynak: 'https://doi.org/10.1785/0120000858',
    kaynak_tur: 'doi',
  },
  {
    uzman: 'AFAD Deprem Dairesi',
    unvan: 'Resmi Kurum Açıklaması',
    kurum: 'T.C. Afet ve Acil Durum Yönetimi Başkanlığı',
    tarih: '2023',
    baslik: '6 Şubat 2023 Kahramanmaraş Depremleri Hasar Tespit Raporu',
    ozet: 'AFAD\'ın yayımladığı rapora göre, Kahramanmaraş merkezli depremlerde 10 il genelinde 50.000\'i aşkın kişi hayatını kaybetmiş, 100.000\'den fazla bina ağır hasar görmüş ya da yıkılmıştır. Rapor; zemin koşulları, yapı yaşı ve can kayıpları arasındaki ilişkiyi de belgelemektedir.',
    kaynak: 'https://www.afad.gov.tr',
    kaynak_tur: 'kurum',
  },
  {
    uzman: 'Prof. Dr. Mustafa Erdik ve ekibi',
    unvan: 'Deprem Mühendisliği Profesörü',
    kurum: 'Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü (KOERI)',
    tarih: '2004',
    baslik: 'Marmara Bölgesinde Deprem Tehlikesi',
    ozet: 'Erdik ve ark.\'nın Soil Dynamics and Earthquake Engineering\'de yayımlanan çalışmasına göre, İstanbul\'un belirli semtlerinde zemin büyütmesi nedeniyle sismik ivme değerleri 2–3 kat artabilmektedir. Çalışma, zemin büyütme haritaları oluşturularak olası depremde beklenen şiddet dağılımını ortaya koymaktadır.',
    kaynak: 'https://doi.org/10.1016/j.soildyn.2004.06.033',
    kaynak_tur: 'doi',
  },
  {
    uzman: 'Prof. Dr. Hasan Sözbilir ve ekibi',
    unvan: 'Jeoloji Profesörü',
    kurum: 'Dokuz Eylül Üniversitesi',
    tarih: '2021',
    baslik: 'İzmir Körfezi ve Yakın Çevresi\'nin Aktif Tektoniği',
    ozet: 'Sözbilir ve ekibinin çalışmalarına göre, 2020 Sisam (Samos) depreminde en fazla hasarın görüldüğü Bayraklı ilçesi, alüvyal zemin ve yakın fay mesafesiyle İzmir\'in en riskli bölgelerinden biridir. İzmir Körfezi\'nin güney kıyısı boyunca aktif normal faylar haritalanmıştır.',
    kaynak: 'https://www.deu.edu.tr/jeoloji',
    kaynak_tur: 'universite',
  },
];
