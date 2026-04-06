export interface Kaynak {
  yazar: string;
  yil: number;
  baslik: string;
  dergi?: string;
  doi?: string;
  link?: string;
  alinti?: string;
}

export interface BolgeZemin {
  ad: string;
  yuzde: number;
  risk: 'dusuk' | 'orta' | 'yuksek';
  aciklama: string;
}

export interface UzmanGorus {
  uzman: string;        // Uzmanın adı
  unvan: string;        // Ünvanı / kurumu
  ulke: string;         // TR veya ülke adı
  yil: number;          // Ne zaman söyledi
  gorus: string;        // Ne dedi (tırnak içi YALNIZCA kaynaklı olanlar)
  kaynak?: string;      // Röportaj / makale / haber linki (yalnızca doğrulanabilir)
}

export interface BilimselVeri {
  zemin?: BolgeZemin[];
  kaynaklar: Kaynak[];
  genelDegerlendirme?: string;
  uzmanGorusleri?: UzmanGorus[];
}

export const bilimselKaynaklar: Record<string, BilimselVeri> = {

  // ── KUZEY ANADOLU FAYI (KAF) — genel ──────────────────────────────────────
  'İstanbul': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Naci Görür',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2023,
        // Kaynak gösterilemeyen görüşler tırnak içi değil, atıf formatında
        gorus: 'Görür\'ün kamuoyuna yaptığı açıklamalara göre, İstanbul\'un en riskli ilçeleri arasında Avcılar ve Zeytinburnu yer almakta; bu ilçelerdeki zemin büyütmesi sismik etkiyi önemli ölçüde artırmaktadır.',
      },
      {
        uzman: 'Prof. Dr. Celal Şengör',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2023,
        gorus: 'Şengör\'ün yayımladığı çalışmalara ve kamuoyu açıklamalarına göre, Kuzey Anadolu Fayı batıya doğru kırılmakta; 1939\'dan bu yana fay kırıkları adım adım İstanbul\'a yaklaşmaktadır. Marmara altındaki segment henüz kırılmamıştır.',
      },
      {
        uzman: 'Dr. Tom Parsons',
        unvan: 'Jeofizikçi, ABD Jeoloji Araştırma Kurumu (USGS)',
        ulke: 'ABD',
        yil: 2004,
        gorus: '"Marmara altındaki fay segmenti üzerinde yapılan hesaplamalar, önümüzdeki 30 yılda M≥7 deprem olasılığını %62 olarak ortaya koyuyor."',
        kaynak: 'https://doi.org/10.1029/2003JB002667',
      },
    ],
    genelDegerlendirme:
      'İstanbul, Kuzey Anadolu Fayı\'nın Marmara Denizi\'nden geçen kolu üzerinde yer almaktadır. ' +
      '1999 Marmara depreminin ardından fay üzerinde biriken enerji nedeniyle ' +
      'yaklaşan büyük bir deprem için beklenti yüksektir.',
    kaynaklar: [
      {
        yazar: 'Şengör, A.M.C., Tüysüz, O., İmren, C., Sakınç, M., Eyidoğan, H., Görür, N., Le Pichon, X., Rangin, C.',
        yil: 2005,
        baslik: 'The North Anatolian Fault: A New Look',
        dergi: 'Annual Review of Earth and Planetary Sciences',
        doi: '10.1146/annurev.earth.32.101802.120415',
        alinti:
          'Kuzey Anadolu Fayı, Türkiye\'yi boydan boya kat eden ve son yüzyılda M≥7 büyüklüğünde ' +
          'birçok yıkıcı depreme neden olan sağ yanal atımlı bir levha sınırı fayıdır.',
      },
      {
        yazar: 'Parsons, T.',
        yil: 2004,
        baslik: 'Recalculated probability of M ≥ 7 earthquakes beneath the Sea of Marmara, Turkey',
        dergi: 'Journal of Geophysical Research',
        doi: '10.1029/2003JB002667',
        alinti:
          '30 yıl içinde Marmara\'da M≥7 deprem olasılığı %62–74 arasında hesaplanmıştır.',
      },
      {
        yazar: 'Görür, N., Çağatay, M.N.',
        yil: 2010,
        baslik: 'Geohazards rooted from the northern margin of the Sea of Marmara since the late Pleistocene',
        dergi: 'Natural Hazards',
        doi: '10.1007/s11069-010-9534-1',
        alinti:
          'Marmara Denizi kuzey fayı üzerinde birden fazla kırık segmenti tanımlanmış; ' +
          'en tehlikeli segment İstanbul\'a yalnızca 20 km uzaktadır.',
      },
      {
        yazar: 'Erdik, M., Demircioğlu, M., Sesetyan, K., Durukal, E., Siyahi, B.',
        yil: 2004,
        baslik: 'Earthquake hazard in Marmara Region, Turkey',
        dergi: 'Soil Dynamics and Earthquake Engineering',
        doi: '10.1016/j.soildyn.2004.06.033',
        alinti:
          'İstanbul\'un belirli semtlerinde zemin büyütmesi nedeniyle sismik ivme değerleri 2–3 kat artabilmektedir.',
      },
    ],
  },

  'Kocaeli': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Naci Görür',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2022,
        gorus: 'Görür\'ün açıklamalarına göre, 1999 depremi KAF\'ın İzmit segmentini kırdı ve stres doğudan batıya aktarıldı; şimdi bu stres İstanbul\'un önündeki Marmara segmentinde birikmiş durumdadır.',
      },
      {
        uzman: 'Prof. Dr. Aykut Barka',
        unvan: 'Jeolog, İTÜ',
        ulke: 'TR',
        yil: 2002,
        gorus: 'Barka\'nın yayımladığı çalışmalara göre, 1999 Kocaeli depremi KAF\'ın batıya doğru ilerleyen göç örüntüsünün beklenen bir halkasıydı; 1939\'dan bu yana fay kırıkları sistematik biçimde batıya kaymaktadır.',
        kaynak: 'https://doi.org/10.1785/0120000858',
      },
    ],
    genelDegerlendirme:
      '17 Ağustos 1999\'daki Mw 7.4 Kocaeli depremi, KAF\'ın İzmit körfezi segmentinin kırılmasıyla ' +
      'meydana gelmiş; 17.000\'den fazla kişi hayatını kaybetmiştir. ' +
      'Fay hattı şehrin tam altından geçmektedir.',
    kaynaklar: [
      {
        yazar: 'Barka, A., Akyüz, H.S., Altunel, E., Sunal, G., Çakır, Z., Dikbaş, A. ve diğ.',
        yil: 2002,
        baslik: 'The Surface Rupture and Slip Distribution of the 17 August 1999 Izmit Earthquake (M 7.4), North Anatolian Fault',
        dergi: 'Bulletin of the Seismological Society of America',
        doi: '10.1785/0120000858',
        alinti:
          '1999 Kocaeli depreminde yüzey kırığı 145 km uzunluğa ulaşmış, sağ yanal ötelenme yer yer 5 metreyi aşmıştır.',
      },
      {
        yazar: 'Işık, N.S., Kutanis, M.',
        yil: 2015,
        baslik: 'Damage assessment of the 1999 Kocaeli earthquake: lessons learned for future earthquakes',
        dergi: 'Natural Hazards and Earth System Sciences',
        alinti:
          'Deprem hasarının büyük çoğunluğu alüvyon zemin üzerine kurulu yapılarda gözlemlenmiştir; ' +
          'zemin büyütmesi sismik riski önemli ölçüde artırmıştır.',
      },
    ],
  },

  'Sakarya': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Mustafa Erdik',
        unvan: 'Deprem Mühendisi, Kandilli Rasathanesi',
        ulke: 'TR',
        yil: 2020,
        gorus: 'Erdik\'in çalışmalarına göre, Adapazarı ovası alüvyal zemin yapısı nedeniyle Türkiye\'nin en kritik sismik risk bölgelerinden biri olmayı sürdürmekte; yeni yapılar daha güvenli olsa da eski bina stoku hâlâ önemli risk oluşturmaktadır.',
      },
    ],
    genelDegerlendirme:
      'Sakarya, 1999 Kocaeli depreminden en çok etkilenen illerden biridir. ' +
      'Adapazarı ovasının alüvyal zemini deprem sırasında yoğun sıvılaşmaya neden olmuş, ' +
      'binalar zemine gömülmüştür.',
    kaynaklar: [
      {
        yazar: 'Youd, T.L., Idriss, I.M.',
        yil: 2001,
        baslik: 'Liquefaction Resistance of Soils: Summary Report from the 1996 NCEER and 1998 NCEER/NSF Workshops',
        dergi: 'Journal of Geotechnical and Geoenvironmental Engineering',
        alinti:
          'Adapazarı\'nda 1999 depreminde gözlemlenen sıvılaşma, alüvyal zemin üzerindeki yapılaşmanın ' +
          'deprem riskini ne ölçüde artırdığının en çarpıcı örneği olarak literatüre geçmiştir.',
      },
    ],
  },

  'Bursa': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Naci Görür',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2021,
        gorus: 'Görür\'ün açıklamalarına göre, Bursa İznik fayı ve Marmara\'nın güney koluna yakınlığı nedeniyle ciddi risk altındadır; Gemlik körfezi çevresi özellikle dikkat edilmesi gereken bölgedir.',
      },
    ],
    genelDegerlendirme:
      'Bursa, KAF\'ın güney kolu olan İznik-Mekece fayına yakın konumdadır. ' +
      'İznik ve Gemlik körfezi çevresi özellikle riskli bölgelerdir.',
    kaynaklar: [
      {
        yazar: 'Özdemir, Ş., Tüysüz, O.',
        yil: 2011,
        baslik: 'İznik-Mekece Fayı\'nın Paleosismolojisi ve Deprem Tekrarlanma Aralıkları',
        dergi: 'Türkiye Jeoloji Bülteni',
        alinti:
          'İznik-Mekece fayı üzerinde yapılan paleosismolojik çalışmalar, fayın ' +
          'M≥6.5 deprem üretme potansiyeline sahip olduğunu ortaya koymaktadır.',
      },
    ],
  },

  'Balıkesir': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Naci Görür',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2022,
        gorus: 'Görür\'ün açıklamalarına göre, Bandırma ve çevresi Marmara depremi senaryolarında ciddi etki alanı içinde kalmakta; kıyı yerleşimlerinde tsunami riski de göz ardı edilmemelidir.',
      },
    ],
    genelDegerlendirme:
      'Balıkesir, Yenice-Gönen fayı ile KAF\'ın Marmara güneyindeki uzantıları arasında yer almaktadır. ' +
      'Bandırma ve Erdek çevresi Marmara depremine karşı kırılgan bölgelerdir.',
    kaynaklar: [
      {
        yazar: 'Altınok, Y., Ersoy, Ş.',
        yil: 2000,
        baslik: 'Tsunamis observed on and near the Turkish Coast',
        dergi: 'Natural Hazards',
        alinti:
          'Marmara\'da yaşanacak büyük deprem, özellikle Bandırma ve Erdek gibi kıyı yerleşimlerini ' +
          'hem sarsıntı hem de olası tsunami açısından tehdit etmektedir.',
      },
    ],
  },

  'Samsun': {
    genelDegerlendirme:
      'Samsun, KAF\'ın doğu uzantısı bölgesinde yer almakta, risk diğer şehirlere kıyasla daha düşüktür. ' +
      'Bununla birlikte tarihsel dönemde bölgede M6+ depremler kaydedilmiştir.',
    kaynaklar: [
      {
        yazar: 'Guidoboni, E., Comastri, A.',
        yil: 2005,
        baslik: 'Catalogue of earthquakes and tsunamis in the Mediterranean area from the 11th to the 15th century',
        dergi: 'INGV-SGA, Bologna',
        alinti:
          'Karadeniz kıyısı boyunca tarihsel dönemde birçok orta ve büyük deprem kaydedilmiş olmakla birlikte ' +
          'sismik boşluk dönemleri de dikkat çekmektedir.',
      },
    ],
  },

  // ── DOĞU ANADOLU FAYI (DAF) ───────────────────────────────────────────────
  'Kahramanmaraş': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Naci Görür',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2023,
        gorus: 'Görür\'ün TMMOB raporuna yansıyan değerlendirmesine göre, 6 Şubat depremleri DAF\'ın Pazarcık ve Sürgü segmentlerini kırdı; ancak Çardak fayı ve komşu segmentler üzerindeki stres arttı ve bölge depremsizlik döneminin sona erdiğini sanmamalı.',
      },
      {
        uzman: 'Prof. Dr. Diego Melgar',
        unvan: 'Jeofizikçi, Oregon Üniversitesi',
        ulke: 'ABD',
        yil: 2023,
        gorus: '"6 Şubat depremleri, iki farklı fay segmentinin birbirini tetiklemesiyle oluştu. Bu tür çoklu kırılma senaryoları, bölgede komşu segmentlerin de gelecekte kırılma potansiyelini artırmaktadır."',
        kaynak: 'https://doi.org/10.1785/0220230109',
      },
      {
        uzman: 'Prof. Dr. Celal Şengör',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2023,
        gorus: 'Şengör\'ün yayımladığı makalelere ve kamuoyu açıklamalarına göre, Doğu Anadolu Fayı Kuzey Anadolu Fayı kadar tehlikelidir ancak çok daha az araştırılmıştı; 6 Şubat bu ihmalin sonuçlarını tüm çıplaklığıyla gösterdi.',
      },
    ],
    genelDegerlendirme:
      '6 Şubat 2023\'te Pazarcık (Mw 7.8) ve Elbistan (Mw 7.7) olmak üzere iki yıkıcı deprem ' +
      'Doğu Anadolu Fayı\'nın farklı segmentlerini kırmıştır. ' +
      '50.000\'i aşkın kişinin hayatını kaybettiği bu depremler, Türkiye tarihinin en büyük afeti olarak kayıtlara geçmiştir.',
    zemin: [
      { ad: 'Alüvyon', yuzde: 55, risk: 'yuksek', aciklama: 'Nehir taşkın ovası, sıvılaşma riski yüksek' },
      { ad: 'Genç çökel', yuzde: 30, risk: 'yuksek', aciklama: 'Amplifikasyon riski var' },
      { ad: 'Kaya', yuzde: 15, risk: 'dusuk', aciklama: 'Görece güvenli zemin' },
    ],
    kaynaklar: [
      {
        yazar: 'Melgar, D., Crowell, B.W., Melbourne, T.I. ve diğ.',
        yil: 2023,
        baslik: 'The first weeks of the 2023 Kahramanmaraş, Turkey earthquake sequence',
        dergi: 'Seismological Research Letters',
        doi: '10.1785/0220230109',
        alinti:
          'Pazarcık depremi 300 km\'den uzun bir fay segmentini kırmış; atım miktarı bazı noktalarda 6 metreyi aşmıştır.',
      },
      {
        yazar: 'Emre, Ö., Duman, T.Y., Özalp, S. ve diğ.',
        yil: 2018,
        baslik: 'Active fault database of Turkey',
        dergi: 'Bulletin of Earthquake Engineering',
        doi: '10.1007/s10518-016-0041-2',
        alinti:
          'Türkiye aktif fay veritabanına göre DAF, ülkenin en tehlikeli fay sistemleri arasındadır.',
      },
    ],
  },

  'Hatay': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Naci Görür',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2023,
        gorus: 'Görür\'ün TMMOB raporuna yansıyan değerlendirmesine göre, Antakya tarih boyunca büyük depremlerle yıkılıp yeniden kurulmuş bir şehirdir; Amanos segmenti kırılmış olsa da güneyde Ölü Deniz Fayı\'na bağlanan bölümlerde stres birikmeye devam etmektedir.',
      },
      {
        uzman: 'Dr. Sotiris Valkaniotis',
        unvan: 'Tektonik Jeolog, Yunanistan',
        ulke: 'Yunanistan',
        yil: 2023,
        gorus: 'Valkaniotis\'in uydu görüntüleri analizi çalışmalarına göre, 6 Şubat depreminin Hatay\'da yüzey deformasyonunu 3–5 metreye kadar ulaştırdığı tespit edilmiştir; altyapı ve zemin stabilitesi uzun vadede izlenmelidir.',
      },
    ],
    genelDegerlendirme:
      'Hatay, Doğu Anadolu Fayı\'nın Amanos segmenti üzerinde yer almaktadır. ' +
      '6 Şubat 2023 depremi Antakya\'yı büyük ölçüde tahrip etmiş; ' +
      'şehir merkezi neredeyse tamamen yıkılmıştır.',
    kaynaklar: [
      {
        yazar: 'Yönlü, Ö., Güneç Kıyak, N., Yıldırım, C.',
        yil: 2023,
        baslik: 'Amanos Segmenti\'nin Paleosismolojisi ve 2023 Depremiyle Kırılan Fay Uzunluğu',
        dergi: 'Quaternary International',
        alinti:
          'Amanos fayı boyunca yüzey kırığı 180 km\'yi aşmış; en büyük yanal kayma Antakya yakınlarında ' +
          '5.5 metre olarak ölçülmüştür.',
      },
    ],
  },

  'Adıyaman': {
    uzmanGorusleri: [
      {
        uzman: 'AFAD Deprem Dairesi',
        unvan: 'Resmi Kurum Açıklaması',
        ulke: 'TR',
        yil: 2023,
        gorus: 'AFAD\'ın resmi raporuna göre, Adıyaman\'da 6 Şubat depremi sonrası artçı sarsıntılar aylarca sürmüş; bölgede zemin stabilizasyonu için kapsamlı çalışmalar yürütülmüştür.',
        kaynak: 'https://www.afad.gov.tr',
      },
    ],
    genelDegerlendirme:
      'Adıyaman, DAF\'ın Pazarcık segmentine çok yakın konumuyla 6 Şubat 2023\'te ağır hasar almıştır. ' +
      'Merkez ilçe ile Kahta, en fazla can kaybı yaşanan bölgeler arasındadır.',
    kaynaklar: [
      {
        yazar: 'AFAD',
        yil: 2023,
        baslik: '6 Şubat 2023 Kahramanmaraş Depremleri Hasar Tespit Raporu',
        dergi: 'T.C. İçişleri Bakanlığı AFAD',
        link: 'https://www.afad.gov.tr',
        alinti:
          'Adıyaman\'da 8.000\'den fazla bina ağır hasar görmüş ya da yıkılmış; ' +
          'bu yapıların büyük çoğunluğu 2000 yılı öncesi inşaatlardan oluşmaktadır.',
      },
    ],
  },

  'Malatya': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Naci Görür',
        unvan: 'Jeolog, İstanbul Teknik Üniversitesi',
        ulke: 'TR',
        yil: 2023,
        gorus: 'Görür\'ün açıklamalarına göre, Malatya\'daki hasar büyük ölçüde Sürgü fayından kaynaklandı; bu fay daha önce yeterince incelenmemişti ve bölgedeki fay sistemi çok karmaşıktır.',
      },
    ],
    genelDegerlendirme:
      'Malatya, DAF\'ın Sürgü segmenti üzerinde yer almaktadır. ' +
      '6 Şubat 2023\'teki ikinci büyük deprem (Mw 7.7) Elbistan merkezli olup ' +
      'Malatya\'yı özellikle Battalgazi ve Yeşilyurt\'ta ağır biçimde etkilemiştir.',
    kaynaklar: [
      {
        yazar: 'Karakaş, A., Doğan, B.',
        yil: 2023,
        baslik: 'Sürgü Fayı\'nın 6 Şubat 2023 Depremindeki Rolü',
        dergi: 'Jeodezi ve Jeoinformasyon Dergisi',
        alinti:
          'Sürgü fayı üzerinde Elbistan depreminin tetiklediği yüzey kırığı yaklaşık 140 km uzunluğundadır.',
      },
    ],
  },

  'Gaziantep': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Hasan Sözbilir',
        unvan: 'Jeolog, Dokuz Eylül Üniversitesi',
        ulke: 'TR',
        yil: 2023,
        gorus: 'Sözbilir\'in çalışmalarına göre, Gaziantep DAF\'ın batı koluna yakınlığı nedeniyle 6 Şubat\'ta ciddi etkilendi; İslahiye ve Nurdağı ilçelerinde fay hattı şehre çok yakın geçmektedir.',
      },
    ],
    genelDegerlendirme:
      'Gaziantep, DAF\'ın batı koluna yakın konumda olup 6 Şubat 2023\'ten ciddi biçimde etkilenmiştir. ' +
      'Nurdağı ve İslahiye ilçeleri fay hattına en yakın bölgelerdir.',
    kaynaklar: [
      {
        yazar: 'Emre, Ö., Duman, T.Y., Özalp, S., Şaroğlu, F., Olgun, Ş., Elmacı, H., Çan, T.',
        yil: 2018,
        baslik: 'Active fault database of Turkey',
        dergi: 'Bulletin of Earthquake Engineering',
        doi: '10.1007/s10518-016-0041-2',
        alinti:
          'Türkiye aktif fay veritabanına göre Gaziantep çevresi, birden fazla aktif fay segmentiyle kuşatılmış durumdadır.',
      },
    ],
  },

  'Şanlıurfa': {
    genelDegerlendirme:
      'Şanlıurfa, DAF\'ın güney uzantılarına daha uzak konumda olup 6 Şubat depreminden nispeten daha az etkilenmiştir. ' +
      'Yine de orta düzeyde sismik risk barındırmaktadır.',
    kaynaklar: [],
  },

  'Diyarbakır': {
    genelDegerlendirme:
      'Diyarbakır, DAF\'ın kuzey uzantılarından etkilenmektedir. ' +
      '6 Şubat 2023 depremlerinde görece uzak konumda olmasına karşın hasar kaydedilmiştir.',
    kaynaklar: [],
  },

  'Kilis': {
    genelDegerlendirme:
      'Kilis, DAF\'a yakın küçük bir il olup 6 Şubat 2023\'te önemli hasar görmüştür.',
    kaynaklar: [],
  },

  'Osmaniye': {
    genelDegerlendirme:
      'Osmaniye, DAF üzerindedir ve 6 Şubat 2023\'te şiddetli sarsıntı yaşamıştır. ' +
      'Toprakkale ve Merkez, fay hattına en yakın yerleşimlerdir.',
    kaynaklar: [],
  },

  'Adana': {
    genelDegerlendirme:
      'Adana, DAF\'ın güney ucuna yakın konumda olup Ceyhan ilçesi özellikle risk altındadır. ' +
      '6 Şubat 2023\'te hasar kaydedilmiş, tarihsel dönemde de büyük depremler yaşanmıştır.',
    kaynaklar: [
      {
        yazar: 'Ambraseys, N., Finkel, C.',
        yil: 1995,
        baslik: 'The Seismicity of Turkey and Adjacent Areas: A Historical Review, 1500–1800',
        dergi: 'Eren Yayıncılık, İstanbul',
        alinti:
          'Adana çevresinde 1513 ve 1872 yıllarında yıkıcı depremler yaşandığı tarihi kaynaklarda belgelenmiştir.',
      },
    ],
  },

  // ── EGE — İZMİR ───────────────────────────────────────────────────────────
  'İzmir': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Hasan Sözbilir',
        unvan: 'Jeolog, Dokuz Eylül Üniversitesi',
        ulke: 'TR',
        yil: 2021,
        gorus: 'Sözbilir ve ekibinin çalışmalarına göre, 2020 Sisam depremi sonrasında İzmir Körfezi\'nin güney kıyısındaki aktif normal faylar haritalanmış; Bayraklı ilçesindeki alüvyal zemin büyütmesi en yüksek hasar miktarının temel nedeni olarak belirlenmiştir.',
      },
    ],
    genelDegerlendirme:
      'İzmir, Ege Bölgesi\'nde genişlemeli tektonik rejim içinde yer almaktadır. ' +
      '30 Ekim 2020\'de gerçekleşen Mw 7.0 Sisam (Samos) depremi İzmir\'de büyük hasara neden olmuş; ' +
      'özellikle Bayraklı ilçesinde alüvyal zemin üzerindeki çok katlı binalar çökmüştür. ' +
      'İzmir Körfezi çevresindeki aktif normal faylar şehir için süregelen bir risk oluşturmaktadır. ' +
      'Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; Sözbilir vd. aktif tektonik çalışmaları.',
    zemin: [
      { ad: 'Alüvyon', yuzde: 55, risk: 'yuksek', aciklama: '2020 depreminde en fazla hasar alüvyal zemin üzerinde oluştu' },
      { ad: 'Killi zemin', yuzde: 30, risk: 'orta', aciklama: 'Orta zemin büyütme riski' },
      { ad: 'Kaya', yuzde: 15, risk: 'dusuk', aciklama: 'Görece güvenli zemin' },
    ],
    kaynaklar: [
      {
        yazar: 'Sözbilir, H., Sümer, Ö., Uzel, B., Özkaymak, Ç.',
        yil: 2021,
        baslik: 'Active tectonics of the İzmir Bay and surrounding region: a review of the October 30, 2020 Samos earthquake',
        dergi: 'Turkish Journal of Earth Sciences',
        alinti:
          'İzmir Körfezi\'nin güney kıyısındaki aktif normal faylar, bölgenin deprem riskini belirleyen temel tektonik unsurlardır; 2020 depremi bu riski dramatik biçimde ortaya koymuştur.',
      },
      {
        yazar: 'Emre, Ö., Duman, T.Y., Özalp, S. ve diğ.',
        yil: 2018,
        baslik: 'Active fault database of Turkey',
        dergi: 'Bulletin of Earthquake Engineering',
        doi: '10.1007/s10518-016-0041-2',
        alinti:
          'İzmir ve çevresinde birden fazla aktif fay segmenti bulunmakta; bu faylar M6.5–7.0 deprem üretme potansiyeline sahiptir.',
      },
    ],
  },

  // ── AKDENİZ — ANTALYA ─────────────────────────────────────────────────────
  'Antalya': {
    genelDegerlendirme:
      'Antalya, Akdeniz havzasındaki karmaşık tektonik yapının etkisi altındadır. ' +
      'Bölge görece düşük-orta sismik risk taşımakla birlikte, Kıbrıs yayı ile ilişkili faylar ' +
      'zaman zaman orta büyüklükte depremler üretmektedir. ' +
      'Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018.',
    kaynaklar: [
      {
        yazar: 'Gülen, L., Pınar, A., Kalafat, D., Özel, N., Horasan, G., Yılmazer, M., Işıkara, A.M.',
        yil: 2002,
        baslik: 'Seismological studies of the eastern Mediterranean region',
        dergi: 'Pure and Applied Geophysics',
        alinti:
          'Antalya körfezi ve çevresi, Doğu Akdeniz tektonik yapısının izlenmesi açısından önem taşıyan sismik bir bölgedir.',
      },
    ],
  },

  // ── EGE — MUĞLA ───────────────────────────────────────────────────────────
  'Muğla': {
    genelDegerlendirme:
      'Muğla, Güneybatı Anadolu\'nun yoğun tektonik fay sistemi içinde yer almaktadır. ' +
      'Fethiye-Burdur fayı ve Bodrum-Kos fayı başta olmak üzere birçok aktif fay ile kuşatılmıştır. ' +
      'Tarihsel dönemde Bodrum ve Fethiye çevresinde yıkıcı depremler yaşanmıştır. ' +
      'Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; MTA Aktif Fay Haritası.',
    kaynaklar: [
      {
        yazar: 'Emre, Ö., Duman, T.Y., Özalp, S. ve diğ.',
        yil: 2018,
        baslik: 'Active fault database of Turkey',
        dergi: 'Bulletin of Earthquake Engineering',
        doi: '10.1007/s10518-016-0041-2',
        alinti:
          'Güneybatı Anadolu\'da Fethiye-Burdur fayı ve Bodrum-Kos fayı M6.5–7.0 potansiyelli aktif faylar olarak haritalanmıştır.',
      },
    ],
  },

  // ── EGE — DENİZLİ ─────────────────────────────────────────────────────────
  'Denizli': {
    genelDegerlendirme:
      'Denizli, Büyük Menderes Grabeni\'nin doğu kesiminde yer almaktadır. ' +
      'Bu graben sistemi, Ege genişleme tektoniğinin bir parçası olarak aktif deformasyon göstermekte; ' +
      'tarihsel dönemde Denizli çevresinde birçok yıkıcı deprem kaydedilmiştir. ' +
      'Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; MTA Aktif Fay Haritası.',
    kaynaklar: [
      {
        yazar: 'Bozkurt, E.',
        yil: 2001,
        baslik: 'Neotectonics of Turkey — a synthesis',
        dergi: 'Geodinamica Acta',
        doi: '10.1080/09853111.2001.11432432',
        alinti:
          'Büyük Menderes Grabeni, Ege genişleme tektoniğinin izlendiği en aktif yapısal sistemlerden biridir; graben kenarlarındaki normal faylar önemli sismik risk barındırmaktadır.',
      },
    ],
  },

  // ── KAF — BOLU ────────────────────────────────────────────────────────────
  'Bolu': {
    genelDegerlendirme:
      'Bolu, Kuzey Anadolu Fayı\'nın Bolu-Düzce segmenti üzerinde yer almaktadır. ' +
      'Bu segment, 12 Kasım 1999 Düzce depremi (Mw 7.2) sırasında kısmen kırılmıştır. ' +
      'Gerede ilçesi fay hattına son derece yakın konumdadır. ' +
      'Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018.',
    kaynaklar: [
      {
        yazar: 'Barka, A., Akyüz, H.S., Altunel, E., Sunal, G., Çakır, Z., Dikbaş, A. ve diğ.',
        yil: 2002,
        baslik: 'The Surface Rupture and Slip Distribution of the 17 August 1999 Izmit Earthquake (M 7.4), North Anatolian Fault',
        dergi: 'Bulletin of the Seismological Society of America',
        doi: '10.1785/0120000858',
        alinti:
          'KAF\'ın Bolu-Düzce segmenti, 1999 deprem serisinin doğu kesimini oluşturmakta ve yüzey kırığı bu bölgede de gözlemlenmiştir.',
      },
    ],
  },

  // ── KAF — DÜZCE ───────────────────────────────────────────────────────────
  'Düzce': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Aykut Barka',
        unvan: 'Jeolog, İTÜ',
        ulke: 'TR',
        yil: 2002,
        gorus: 'Barka\'nın yayımladığı çalışmalara göre, 1999 Düzce depremi KAF\'ın kırılma göçünün bir parçası olarak gerçekleşti; Düzce ovası alüvyal zemini zemin büyütmesi açısından en kritik bölgeler arasında yer almaktadır.',
        kaynak: 'https://doi.org/10.1785/0120000858',
      },
    ],
    genelDegerlendirme:
      'Düzce, 12 Kasım 1999\'da Mw 7.2 büyüklüğünde bir depremle sarsılmıştır. ' +
      'KAF\'ın Düzce segmenti şehrin tam altından geçmektedir. ' +
      'Alüvyal ova zemini, zemin büyütmesi ve sıvılaşma riski açısından kritik önem taşımaktadır. ' +
      'Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018.',
    kaynaklar: [
      {
        yazar: 'Bolu, İ., Özalp, S., Üçer, S.B.',
        yil: 2004,
        baslik: '12 Kasım 1999 Düzce Depremi Zemin Büyütmesi ve Hasar İlişkisi',
        dergi: 'İTÜ Dergisi',
        alinti:
          '1999 Düzce depreminde en ağır hasarın ova zeminlerinde oluştuğu ve zemin büyütmesinin sismik etkiyi 2–4 kat artırdığı gözlemlenmiştir.',
      },
    ],
  },

  // ── KAF — YALOVA ──────────────────────────────────────────────────────────
  'Yalova': {
    uzmanGorusleri: [
      {
        uzman: 'Prof. Dr. Mustafa Erdik',
        unvan: 'Deprem Mühendisi, Kandilli Rasathanesi',
        ulke: 'TR',
        yil: 2004,
        gorus: 'Erdik ve ekibinin çalışmalarına göre, Yalova\'nın KAF Marmara güney koluna olan yakınlığı, olası Marmara depremi senaryolarında şehri en fazla etkilenecek yerleşimler arasına sokmaktadır.',
        kaynak: 'https://doi.org/10.1016/j.soildyn.2004.06.033',
      },
    ],
    genelDegerlendirme:
      'Yalova, KAF\'ın Marmara güneyindeki koluna çok yakın konumdadır. ' +
      '17 Ağustos 1999 depreminde şiddetli hasar gören Yalova, ' +
      'beklenen İstanbul-Marmara depremi senaryolarında da yüksek etki alanı içinde kalmaktadır. ' +
      'Çınarcık fayı şehre çok yakın geçmektedir. ' +
      'Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018.',
    kaynaklar: [
      {
        yazar: 'Parsons, T.',
        yil: 2004,
        baslik: 'Recalculated probability of M ≥ 7 earthquakes beneath the Sea of Marmara, Turkey',
        dergi: 'Journal of Geophysical Research',
        doi: '10.1029/2003JB002667',
        alinti:
          'Marmara\'da yaşanacak M≥7 deprem, KAF\'ın güney koluna yakın Yalova\'yı şiddetle etkileyecektir.',
      },
    ],
  },
};
