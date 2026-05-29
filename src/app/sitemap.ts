import type { MetadataRoute } from 'next';

const BASE = 'https://depremhatti.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sayfalar = [
    // Ana & analiz
    { url: '/',                          priority: 1.0,  changeFrequency: 'daily'   },
    { url: '/bolge-analizi',             priority: 0.95, changeFrequency: 'weekly'  },
    { url: '/harita',                    priority: 0.9,  changeFrequency: 'hourly'  },
    { url: '/karsilastir',               priority: 0.85, changeFrequency: 'weekly'  },
    { url: '/risk-haritasi',             priority: 0.85, changeFrequency: 'monthly' },
    { url: '/istatistikler',             priority: 0.85, changeFrequency: 'daily'   },
    { url: '/artci-tahmin',              priority: 0.8,  changeFrequency: 'monthly' },
    // Tarih & izleme
    { url: '/tarihsel',                  priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/uzman',                     priority: 0.8,  changeFrequency: 'weekly'  },
    { url: '/fay-hatlari',               priority: 0.75, changeFrequency: 'monthly' },
    { url: '/bildirimler',               priority: 0.7,  changeFrequency: 'monthly' },
    // Hazırlık
    { url: '/canta',                     priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/aile-plani',                priority: 0.75, changeFrequency: 'monthly' },
    { url: '/hazirlik-testi',            priority: 0.75, changeFrequency: 'monthly' },
    { url: '/acil-numaralar',            priority: 0.75, changeFrequency: 'monthly' },
    { url: '/toplanma-alani',            priority: 0.75, changeFrequency: 'monthly' },
    { url: '/dask',                      priority: 0.7,  changeFrequency: 'monthly' },
    { url: '/ilk-yardim',               priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/enkaz-altinda',             priority: 0.8,  changeFrequency: 'monthly' },
    // Rehber makaleleri
    { url: '/deprem-nedir',              priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/depreme-hazirlik',          priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/deprem-aninda',             priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/turkiyede-deprem-riski',    priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/zemin-tipleri',             priority: 0.75, changeFrequency: 'monthly' },
    { url: '/deprem-cantasi-rehberi',    priority: 0.75, changeFrequency: 'monthly' },
    // Blog
    { url: '/blog',                      priority: 0.75, changeFrequency: 'weekly'  },
    { url: '/blog/istanbul-depreme-nasil-hazirlanilir', priority: 0.7, changeFrequency: 'monthly' },
    // Kurumsal
    { url: '/hakkimizda',                priority: 0.4,  changeFrequency: 'yearly'  },
    { url: '/iletisim',                  priority: 0.4,  changeFrequency: 'yearly'  },
    { url: '/gizlilik',                  priority: 0.3,  changeFrequency: 'yearly'  },
  ] as const;

  return sayfalar.map((s) => ({
    url: `${BASE}${s.url}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));
}
