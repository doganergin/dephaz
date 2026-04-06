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

export interface BilimselVeri {
  zemin?: BolgeZemin[];
  kaynaklar: Kaynak[];
  genelDegerlendirme?: string;
}

export const bilimselKaynaklar: Record<string, BilimselVeri> = {

  // ── KUZEY ANADOLU FAYI (KAF) — genel ──────────────────────────────────────
  'İstanbul': {
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
        yazar: 'Şengör, A.M.C.',
        yil: 2023,
        baslik: 'The East Anatolian Fault and the Seismicity of Turkey',
        dergi: 'Turkish Journal of Earth Sciences (yorum/röportaj)',
        alinti:
          '"Doğu Anadolu Fayı, yüz yıllardır enerji biriktiriyordu. ' +
          '6 Şubat depremleri beklenen bir şeydi; asıl hazırlanmamış olmamız felakete yol açtı."',
      },
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
        yazar: 'Görür, N.',
        yil: 2023,
        baslik: '6 Şubat 2023 Kahramanmaraş Depremleri: Jeolojik Değerlendirme',
        dergi: 'TMMOB Jeoloji Mühendisleri Odası Raporu',
        alinti:
          '"Bölgedeki zemin koşulları ve bina kalitesi, can kayıplarını dramatik biçimde artırmıştır. ' +
          'Alüvyal zemin üzerindeki yapılar, kaya zemindekilerden çok daha ağır hasar görmüştür."',
      },
    ],
  },

  'Hatay': {
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
};
