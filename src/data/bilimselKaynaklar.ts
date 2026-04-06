// ─────────────────────────────────────────────────────────────
// Bilimsel kaynaklar ve zemin verileri
// Her bölge için araştırma sonuçlarını buraya ekle.
//
// Nasıl eklersin:
//   'İl-İlçe' formatında key yaz (veya sadece 'İl')
//   zemin[] → zemin tipi verileri (boş bırakırsan riskApi.ts'deki hesaplama kullanılır)
//   kaynaklar[] → makaleler, kitaplar, alıntılar
// ─────────────────────────────────────────────────────────────

export interface Kaynak {
  yazar: string;        // Örn: "Celal Şengör"
  yil: number;          // Örn: 2023
  baslik: string;       // Makale / kitap adı
  dergi?: string;       // Yayımlandığı dergi (varsa)
  doi?: string;         // DOI numarası (varsa)
  link?: string;        // URL (varsa)
  alinti?: string;      // Önemli bir alıntı veya özet
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
  genelDegerlendirme?: string; // Bölge hakkında genel bilimsel değerlendirme
}

// ─── Buraya ekle ──────────────────────────────────────────────

export const bilimselKaynaklar: Record<string, BilimselVeri> = {

  // Örnek — Kahramanmaraş
  'Kahramanmaraş': {
    genelDegerlendirme:
      'Kahramanmaraş, Doğu Anadolu Fayı (DAF) üzerinde yer almakta olup ' +
      '6 Şubat 2023 tarihinde Mw 7.8 ve Mw 7.7 büyüklüğünde iki yıkıcı ' +
      'deprem yaşanmıştır.',
    zemin: [
      { ad: 'Alüvyon', yuzde: 55, risk: 'yuksek', aciklama: 'Nehir taşkın ovası, sıvılaşma riski yüksek' },
      { ad: 'Genç çökel', yuzde: 30, risk: 'yuksek', aciklama: 'Gevşek tutturulmuş, amplifikasyon riski var' },
      { ad: 'Kaya', yuzde: 15, risk: 'dusuk', aciklama: 'Görece güvenli zemin' },
    ],
    kaynaklar: [
      // Buraya makale ekle — örnek format:
      // {
      //   yazar: 'Celal Şengör',
      //   yil: 2023,
      //   baslik: 'Makale adı',
      //   dergi: 'Dergi adı',
      //   link: 'https://...',
      //   alinti: 'Önemli alıntı...',
      // },
    ],
  },

  // Örnek — İstanbul (Avcılar)
  'İstanbul-Avcılar': {
    genelDegerlendirme: '',
    zemin: [
      { ad: 'Alüvyon', yuzde: 78, risk: 'yuksek', aciklama: 'Çok yüksek sıvılaşma riski' },
      { ad: 'Killi zemin', yuzde: 18, risk: 'orta', aciklama: 'Orta risk' },
      { ad: 'Kaya', yuzde: 4, risk: 'dusuk', aciklama: 'Çok sınırlı alan' },
    ],
    kaynaklar: [
      // Buraya ekle...
    ],
  },

  // Yeni bölge eklemek için aşağıya kopyala:
  // 'İl-İlçe': {
  //   genelDegerlendirme: '',
  //   zemin: [],
  //   kaynaklar: [],
  // },

};
