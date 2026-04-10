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
  // --- NİSAN 2026 ---
  {
    uzman: 'Prof. Dr. Haluk Selim',
    unvan: 'Jeoloji Mühendisliği Bölümü Öğretim Üyesi',
    kurum: 'İstanbul Gelişim Üniversitesi',
    tarih: 'Nisan 2026',
    baslik: 'Marmara\'da Kırılmayan 115 Kilometrelik Fay Riski',
    ozet: 'Beklenen İstanbul depreminin istatistiksel periyotlara ve fayın tekrarlanma döngüsüne göre 2026 yılına kadar meydana gelme ihtimaline dikkat çekti.',
    kaynak: 'https://www.milliyet.com.tr/',
    kaynak_tur: 'universite'
  },
  {
    uzman: 'Prof. Dr. Naci Görür',
    unvan: 'Yer Bilimci, Bilim Akademisi Üyesi',
    kurum: 'Bilim Akademisi',
    tarih: 'Nisan 2026',
    baslik: 'Zaman Daralıyor: Dirençli Kentler Vurgusu',
    ozet: 'Science dergisindeki son araştırmalara atıfta bulunarak, tarih tartışmak yerine acilen İstanbul\'un altyapı ve yapı stoğunun depreme dirençli hale getirilmesi gerektiğini vurguladı.',
    kaynak: 'https://www.ntv.com.tr/naci-gorur',
    kaynak_tur: 'universite'
  },
  {
    uzman: 'Doç. Dr. Bülent Özmen',
    unvan: 'Afet Yönetimi Uzmanı',
    kurum: 'Gazi Üniversitesi Afet Yönetimi Merkezi',
    tarih: 'Nisan 2026',
    baslik: 'Beklenen Deprem Sadece İstanbul\'un Sorunu Değil',
    ozet: 'Marmara fayındaki kırılmanın faya yakınlıkları sebebiyle bölgedeki en az 10 ili ve 30 milyon kişiyi doğrudan etkileyecek ulusal bir güvenlik sorunu olduğunu raporladı.',
    kaynak: 'https://afet.gazi.edu.tr/',
    kaynak_tur: 'universite'
  },
  {
    uzman: 'Kurul Raporu',
    unvan: 'Sismik Gözlem Merkezi',
    kurum: 'Kandilli Rasathanesi ve DAE',
    tarih: 'Nisan 2026',
    baslik: 'Marmara Denizi Tabanı Gözlem Verileri',
    ozet: 'Marmara tabanındaki 7/24 deniz altı gözlem istasyonlarından elde edilen son verilere göre faydaki enerji birikiminin stabil şekilde artmaya devam ettiği raporlandı.',
    kaynak: 'http://www.koeri.boun.edu.tr/sismo/2/tr/',
    kaynak_tur: 'kurum'
  },
  {
    uzman: 'Kurul Raporu',
    unvan: 'Global Sismik Ağ',
    kurum: 'USGS (ABD Jeolojik Araştırmalar Kurumu)',
    tarih: 'Nisan 2026',
    baslik: 'Anadolu Levhası Stres Transferi Raporu',
    ozet: 'Türkiye\'nin tektonik konumunu değerlendiren kurum, 6 Şubat sarsıntıları sonrası faylardaki kayma açıklarının (slip deficit) Marmara sularında kritik seviyeye ulaştığını doğruladı.',
    kaynak: 'https://earthquake.usgs.gov/earthquakes/map/',
    kaynak_tur: 'kurum'
  },
  {
    uzman: 'Yoshinori Moriwaki',
    unvan: 'Yüksek Mimar ve Deprem Uzmanı',
    kurum: 'JICA (Japonya Uluslararası İşbirliği Ajansı)',
    tarih: 'Nisan 2026',
    baslik: 'Kuzey Anadolu Fayının Batıya İlerleyişi',
    ozet: 'Kuzey Anadolu Fay Hattı\'nın domino etkisiyle batıya doğru kırıldığını, Marmara segmentindeki hareketin Kıbrıs tarafını da etkileyebileceğini belirtti.',
    kaynak: 'https://www.dha.com.tr/',
    kaynak_tur: 'kurum'
  },

  // --- MART 2026 ---
  {
    uzman: 'Prof. Dr. Cenk Yaltırak',
    unvan: 'Jeoloji Mühendisi ve Yer Bilimci',
    kurum: 'İstanbul Teknik Üniversitesi (İTÜ)',
    tarih: 'Mart 2026',
    baslik: 'Marmara İçin Yanlış Bilinen Kesin Tarih İddiaları',
    ozet: 'Kamuoyunda dolaşan "2026\'ya kadar kesin deprem olacak" algısının bilimsel bir kesinliği olmadığını, ancak riskin sürekli ve yüksek olduğunu belirtti.',
    kaynak: 'https://teyit.org/analiz/jeoloji-profesoru-cenk-yaltirakin-depremin-siddetinin-11-oldugunu-soyledigi-iddiasi',
    kaynak_tur: 'universite'
  },
  {
    uzman: 'Prof. Dr. Ahmet Ercan',
    unvan: 'Jeofizik Yüksek Mühendisi',
    kurum: 'İstanbul Teknik Üniversitesi (İTÜ)',
    tarih: 'Mart 2026',
    baslik: 'Bingöl-Yedisu Hattında Vakit Doldu',
    ozet: 'Marmara\'nın aksine, Kuzey Anadolu ve Doğu Anadolu faylarının kesiştiği Bingöl-Yedisu segmentinde kırılma periyodunun çoktan dolduğunu ve acil önlem alınması gerektiğini belirtti.',
    kaynak: 'https://www.sozcu.com.tr/',
    kaynak_tur: 'universite'
  },
  {
    uzman: 'Prof. Dr. Shinji Toda',
    unvan: 'Sismolog',
    kurum: 'Tohoku Üniversitesi (Japonya)',
    tarih: 'Mart 2026',
    baslik: 'Anadolu İçlerine Doğru İlerleyen Stres',
    ozet: '2023 depremlerinin tetiklediği stres değişimlerinin Anadolu\'nun iç kesimlerine doğru ilerlediğini gösteren hakemli sismik yayını.',
    kaynak: 'https://www.nature.com/ngeo/',
    kaynak_tur: 'doi'
  },
  {
    uzman: 'Dr. Lucy Jones',
    unvan: 'Baş Sismolog',
    kurum: 'Caltech Sismoloji Laboratuvarı',
    tarih: 'Mart 2026',
    baslik: 'Deprem Değil, Binalar Öldürür',
    ozet: 'Türkiye\'nin yapı stoğunu inceleyen analizinde, fay hatlarının tahmininden ziyade tüm riskli bölgelerde kentsel dönüşümün hayati önem taşıdığını vurguladı.',
    kaynak: 'https://www.bbc.com/turkce/topics/c340q040p5xt',
    kaynak_tur: 'kurum' 
  },

  // --- ŞUBAT 2026 ---
  {
    uzman: 'Dr. Marco Bohnhoff',
    unvan: 'Sismolog ve Araştırma Yöneticisi',
    kurum: 'GFZ Alman Yer Bilimleri Merkezi',
    tarih: 'Şubat 2026',
    baslik: 'İstanbul Açıklarındaki Fayın Kilitlenme Analizi',
    ozet: 'İstanbul açıklarındaki fay hattının batı kesiminin tamamen kilitlendiğini (creep yapmadığını) ve 7.0 - 7.4 arası bir sarsıntıyla kırılacağını kanıtlayan araştırma raporu.',
    kaynak: 'https://bianet.org/haber/sismolog-prof-bohnhoff-dan-deprem-yorumu-iki-ihtimal-var-306756',
    kaynak_tur: 'doi'
  },
  {
    uzman: 'Prof. Dr. Okan Tüysüz',
    unvan: 'Jeoloji Yüksek Mühendisi',
    kurum: 'İstanbul Teknik Üniversitesi (İTÜ)',
    tarih: 'Şubat 2026',
    baslik: '7 ve Üzeri Deprem Her An Olabilir',
    ozet: 'Marmara Denizi\'ndeki tarihsel deprem döngülerini baz alarak, 7\'nin üzerinde bir sarsıntı olasılığının her an masada olduğunu ve kentsel dönüşümün yetersiz kaldığını açıkladı.',
    kaynak: 'https://gazeteoksijen.com/turkiye/prof-dr-tuysuzden-marmara-depremi-aciklamasi-7-ve-uzeri-deprem-kacinilmaz-istanbul-icinden-cikilmaz-bir-hale-gelir-260953',
    kaynak_tur: 'universite'
  },
  {
    uzman: 'Prof. Dr. Şükrü Ersoy',
    unvan: 'Doğa Bilimleri Uzmanı',
    kurum: 'Yıldız Teknik Üniversitesi',
    tarih: 'Şubat 2026',
    baslik: 'Marmara Denizi\'nde Tsunami Gerçeği',
    ozet: 'Olası depremde doğrudan fay kırığından ziyade, sarsıntının deniz tabanındaki yamaçlarda yaratacağı heyelanların tehlikeli tsunami dalgaları oluşturabileceğini açıkladı.',
    kaynak: 'https://dogabilimleri.yildiz.edu.tr/',
    kaynak_tur: 'universite'
  },
  {
    uzman: 'Prof. Dr. Süleyman Pampal',
    unvan: 'Afet Yönetimi Uzmanı',
    kurum: 'Gazi Üniversitesi',
    tarih: 'Şubat 2026',
    baslik: 'Adana Havzasında İkincil Fay Hareketleri',
    ozet: '6 Şubat depremlerinin ardından güneye inen stresin Adana havzası ve İskenderun açıklarındaki faylarda sismik aktivite yaratma potansiyelini değerlendirdi.',
    kaynak: 'https://artigercek.com/guncel/prof-dr-pampal-adanadaki-fay-hatlarini-anlatti-kac-buyuklugunde-deprem-olabilir-324040h',
    kaynak_tur: 'universite'
  },

  // --- OCAK 2026 ---
  {
    uzman: 'Prof. Dr. Celal Şengör',
    unvan: 'Yer Bilimci',
    kurum: 'İstanbul Teknik Üniversitesi (İTÜ)',
    tarih: 'Ocak 2026',
    baslik: 'Sahil Şeridinde Şiddet 10\'u Bulabilir',
    ozet: 'Özellikle Yeşilköy, Bakırköy ve Avcılar gibi alüvyon zeminli bölgelerde deprem şiddetinin 9 ile 10 bandında hissedileceği sismik senaryoları paylaştı.',
    kaynak: 'https://bilimakademisi.org/marmara-depremi/',
    kaynak_tur: 'universite'
  },

  // --- 2024 ---
  {
    uzman: 'Dr. Özlem Karagöz ve ekibi',
    unvan: 'Sismolog',
    kurum: 'Boğaziçi Üniversitesi KOERI',
    tarih: '2024',
    baslik: 'Marmara\'da Mikroismisitik Aktivite ve Fay Kilitleme',
    ozet: 'KOERI\'nin Marmara\'ya özgü sismik ağından derlenen verilerle yürütülen çalışma, Ana Marmara Fayı\'nın İstanbul segmentinde yıllık 2 cm dolayında sıkışma gerçekleştiğini göstermektedir. Mikrodeprem aktivitesinin görece düşük seyretmesi, fayın "tam kilitli" olduğuna ve enerji biriktirmeye devam ettiğine işaret etmektedir.',
    kaynak: 'https://www.koeri.boun.edu.tr',
    kaynak_tur: 'universite'
  },

  // --- 2023 ---
  {
    uzman: 'Prof. Dr. Diego Melgar ve ekibi',
    unvan: 'Jeofizik Profesörü',
    kurum: 'Oregon Üniversitesi',
    tarih: '2023',
    baslik: '6 Şubat Kahramanmaraş Deprem Dizisinin İlk Analizi',
    ozet: 'Melgar ve ark.\'nın Seismological Research Letters\'ta yayımlanan çalışmasına göre, 6 Şubat 2023 Pazarcık depremi 300 km\'den uzun bir fay segmentini kırmış ve bazı noktalarda 6 metreyi aşan yatay ötelenme ölçülmüştür. Çalışma, DAF üzerindeki iki farklı fay segmentinin birbirini tetiklediğini ortaya koymaktadır.',
    kaynak: 'https://doi.org/10.1785/0220230109',
    kaynak_tur: 'doi'
  },
  {
    uzman: 'AFAD Deprem Dairesi',
    unvan: 'Resmi Kurum Açıklaması',
    kurum: 'T.C. Afet ve Acil Durum Yönetimi Başkanlığı',
    tarih: '2023',
    baslik: '6 Şubat 2023 Kahramanmaraş Depremleri Hasar Tespit Raporu',
    ozet: 'AFAD\'ın yayımladığı rapora göre, Kahramanmaraş merkezli depremlerde 10 il genelinde 50.000\'i aşkın kişi hayatını kaybetmiş, 100.000\'den fazla bina ağır hasar görmüş ya da yıkılmıştır. Rapor; zemin koşulları, yapı yaşı ve can kayıpları arasındaki ilişkiyi de belgelemektedir.',
    kaynak: 'https://www.afad.gov.tr',
    kaynak_tur: 'kurum'
  },

  // --- 2022 ---
  {
    uzman: 'Prof. Dr. Naci Görür',
    unvan: 'Jeoloji Profesörü',
    kurum: 'İstanbul Teknik Üniversitesi / MTA',
    tarih: '2022',
    baslik: 'Marmara\'da Büyük Depremin Kaçınılmazlığı',
    ozet: 'Görür, Marmara Denizi\'nin altındaki Ana Marmara Fayı\'nın 1766\'dan bu yana kırılmamış olduğuna dikkat çekerek, bu fay segmentinde 250 yıllık birikmiş gerilmenin bir an önce boşalacağını vurgulamaktadır. İstanbul\'da 3 milyonun üzerinde kişinin yüksek riskli bölgelerde yaşadığını belirterek kentsel dönüşümün aciliyetine dikkat çekmektedir.',
    kaynak: 'https://www.itu.edu.tr',
    kaynak_tur: 'universite'
  },

  // --- 2021 ---
  {
    uzman: 'Prof. Dr. Hasan Sözbilir ve ekibi',
    unvan: 'Jeoloji Profesörü',
    kurum: 'Dokuz Eylül Üniversitesi',
    tarih: '2021',
    baslik: 'İzmir Körfezi ve Yakın Çevresi\'nin Aktif Tektoniği',
    ozet: 'Sözbilir ve ekibinin çalışmalarına göre, 2020 Sisam (Samos) depreminde en fazla hasarın görüldüğü Bayraklı ilçesi, alüvyal zemin ve yakın fay mesafesiyle İzmir\'in en riskli bölgelerinden biridir. İzmir Körfezi\'nin güney kıyısı boyunca aktif normal faylar haritalanmıştır.',
    kaynak: 'https://jeoloji.deu.edu.tr',
    kaynak_tur: 'universite'
  },

  // --- 2020 ---
  {
    uzman: 'Prof. Dr. Ahmet Cevdet Yalçıner ve ekibi',
    unvan: 'Kıyı ve Oşinografi Mühendisliği Profesörü',
    kurum: 'Orta Doğu Teknik Üniversitesi (ODTÜ)',
    tarih: '2020',
    baslik: 'Marmara Depremi Senaryolarında Tsunami Riski',
    ozet: 'Yalçıner ve ekibinin yürüttüğü sayısal modelleme çalışmalarına göre, Marmara Denizi\'nde M7+ bir deprem İstanbul\'un kıyı kesimlerinde 1–3 metre yüksekliğinde tsunami dalgalarına neden olabilir. Yenikapı, Kumkapı ve Kadıköy gibi alçak kıyı bölgeleri en yüksek risk altındadır.',
    kaynak: 'https://oceans.metu.edu.tr',
    kaynak_tur: 'universite'
  },

  // --- 2019 ---
  {
    uzman: 'Prof. Dr. Celal Şengör',
    unvan: 'Jeoloji ve Tektonik Profesörü',
    kurum: 'İstanbul Teknik Üniversitesi',
    tarih: '2019',
    baslik: 'Kuzey Anadolu Fayı\'nın Doğu\'dan Batı\'ya Göç Eden Sismisitesi',
    ozet: 'Şengör ve ekibinin çalışmalarına göre, KAF üzerindeki büyük depremler 1939\'dan itibaren doğudan batıya sıralı biçimde ilerlemiş; bu örüntü Marmara segmentinin sıradaki büyük kırılmaya en yakın segment olduğunu göstermektedir. Tarihsel verilere dayanan bu analiz, olası bir İstanbul depreminin zamanlaması için kritik bir referans niteliğindedir.',
    kaynak: 'https://www.itu.edu.tr',
    kaynak_tur: 'universite'
  },

  // --- 2018 ---
  {
    uzman: 'AFAD Deprem Dairesi',
    unvan: 'Resmi Kurum Raporu',
    kurum: 'T.C. Afet ve Acil Durum Yönetimi Başkanlığı',
    tarih: '2018',
    baslik: 'Türkiye Deprem Tehlike Haritası (TDTH 2018)',
    ozet: '2018 yılında yürürlüğe giren Türkiye Deprem Tehlike Haritası, önceki 1996 haritasının yerini almıştır. Güncel jeolojik ve sismolojik verilere dayanan harita, Türkiye\'nin %70\'inden fazlasının deprem tehlikesi taşıdığını ve kıyı Ege ile Doğu Anadolu\'nun en yüksek ivme değerlerine sahip bölgeler olduğunu göstermektedir.',
    kaynak: 'https://www.afad.gov.tr/deprem-tehlike-haritasi',
    kaynak_tur: 'kurum'
  },

  // --- 2017 ---
  {
    uzman: 'Prof. Dr. Marco Bohnhoff ve ekibi',
    unvan: 'Sismoloji Profesörü',
    kurum: 'GFZ Potsdam Alman Araştırma Merkezi',
    tarih: '2017',
    baslik: 'Marmara\'da Sismik Boşluk: İstanbul Segmenti',
    ozet: 'Bohnhoff ve ekibinin Nature Communications\'da yayımlanan çalışması, Ana Marmara Fayı\'nın İstanbul\'a en yakın 30 km\'lik segmentinde son 250 yılda sismik enerji birikmesine karşın hiç büyük deprem üretmediğini ortaya koymaktadır. Bu "kilitli" segmentin uzun vadeli gerilme birikimi nedeniyle M7+ üreteceği öngörülmektedir.',
    kaynak: 'https://doi.org/10.1038/s41467-017-01897-9',
    kaynak_tur: 'doi'
  },

  // --- 2008 ---
  {
    uzman: 'Prof. Dr. Eser Durukal ve Prof. Dr. Mustafa Erdik',
    unvan: 'Deprem Mühendisliği Araştırmacıları',
    kurum: 'Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü (KOERI)',
    tarih: '2008',
    baslik: 'İstanbul\'da Olası Bir Depremin Beklenen Kayıpları',
    ozet: 'Bu çalışma, M7.5 büyüklüğündeki bir Marmara depremi senaryosunda İstanbul\'da 30.000–50.000 arasında can kaybı, 50.000\'den fazla binanın ağır hasar ya da çöküş riski taşıdığını ortaya koymaktadır. Çalışma; zemin büyütmesi, yapı stoğu ve nüfus yoğunluğunu bir arada değerlendiren ilk kapsamlı senaryo analizlerinden biridir.',
    kaynak: 'https://doi.org/10.1007/s10518-008-9060-8',
    kaynak_tur: 'doi'
  },

  // --- 2004 ---
  {
    uzman: 'Dr. Tom Parsons',
    unvan: 'Kıdemli Araştırmacı Jeofizikçi',
    kurum: 'ABD Jeolojik Araştırma Kurumu (USGS)',
    tarih: '2004',
    baslik: 'Marmara\'da M≥7 Deprem Olasılığı Yeniden Hesaplandı',
    ozet: 'Parsons ve ekibinin Journal of Geophysical Research\'ta yayımlanan çalışmasına göre, Marmara Denizi altındaki ana fay segmentinde önümüzdeki 30 yıl içinde M≥7 deprem olasılığı %62 olarak hesaplanmıştır. Çalışma, 1999 depremi sonrasında fay üzerinde biriken gerilme miktarını ve tarihsel sismisiteyi baz almaktadır.',
    kaynak: 'https://doi.org/10.1029/2003JB002667',
    kaynak_tur: 'doi'
  },
  {
    uzman: 'Prof. Dr. Mustafa Erdik ve ekibi',
    unvan: 'Deprem Mühendisliği Profesörü',
    kurum: 'Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü (KOERI)',
    tarih: '2004',
    baslik: 'Marmara Bölgesinde Deprem Tehlikesi',
    ozet: 'Erdik ve ark.\'nın Soil Dynamics and Earthquake Engineering\'de yayımlanan çalışmasına göre, İstanbul\'un belirli semtlerinde zemin büyütmesi nedeniyle sismik ivme değerleri 2–3 kat artabilmektedir. Çalışma, zemin büyütme haritaları oluşturularak olası depremde beklenen şiddet dağılımını ortaya koymaktadır.',
    kaynak: 'https://doi.org/10.1016/j.soildyn.2004.04.003',
    kaynak_tur: 'doi'
  },

  // --- 2002 ---
  {
    uzman: 'Prof. Dr. Aykut Barka ve ekibi',
    unvan: 'Jeoloji Profesörü',
    kurum: 'İstanbul Teknik Üniversitesi',
    tarih: '2002',
    baslik: '1999 Kocaeli Depremi Yüzey Kırığı ve Atım Dağılımı',
    ozet: 'Barka ve ark.\'nın Bulletin of the Seismological Society of America\'da yayımlanan çalışmasına göre, 17 Ağustos 1999 Kocaeli depreminde yüzey kırığı 145 km uzunluğa ulaşmış, sağ yanal ötelenme yer yer 5 metreyi aşmıştır. Çalışma, KAF\'ın İzmit kolunun tarihsel sismik boşluk davranışını belgelemektedir.',
    kaynak: 'https://doi.org/10.1785/0120000841',
    kaynak_tur: 'doi'
  },

  // --- 2000 ---
  {
    uzman: 'Dr. Tom Parsons ve ekibi',
    unvan: 'Kıdemli Araştırmacı Jeofizikçi',
    kurum: 'ABD Jeolojik Araştırma Kurumu (USGS)',
    tarih: '2000',
    baslik: 'İstanbul\'da Yaklaşan Marmara Depremi Olasılığı',
    ozet: 'Parsons ve ark.\'nın Science dergisinde yayımlanan çalışması, 1999 İzmit depreminin ardından fay üzerindeki Coulomb gerilme aktarımını analiz etmiştir. 30 yıl içinde İstanbul\'a yakın segmentte M≥7 deprem olasılığı %62 (±15) olarak hesaplanmış; bu çalışma günümüzde hâlâ en çok atıf alan Marmara risk analizlerinden biridir.',
    kaynak: 'https://doi.org/10.1126/science.288.5466.661',
    kaynak_tur: 'doi'
  }
];
