export interface Il {
  id: number;
  name: string;
}

export interface Ilce {
  id: number;
  name: string;
  provinceId: number;
}

export interface Mahalle {
  id: number;
  name: string;
  districtId: number;
}

export interface ZeminTipi {
  ad: string;
  yuzde: number;
  risk: 'dusuk' | 'orta' | 'yuksek';
  aciklama: string;
}

export interface BinaStok {
  donem: string;
  yuzde: number;
  renk: string;
}

export interface Deprem {
  buyukluk: number;
  baslik: string;
  tarih: string;
  derinlik: number;
}

export interface BolgeRisk {
  mahalle: string;
  ilce: string;
  il: string;
  riskSkoru: number;
  riskSinifi: 'dusuk' | 'orta' | 'yuksek';
  riskMetni: string;
  aciklama: string;
  fayMesafe: number;
  beklenenMax: string;
  olasilik30Yil: string;
  depremSayisi: number;
  sonDeprem: string;
  maxBuyukluk: string;
  zemin: ZeminTipi[] | null;
  ilZemini: ZeminTipi[] | null;
  binalar: BinaStok[];
  depremler: Deprem[];
  tavsiyeler: Tavsiye[];
  toplanmaAlanlari: string[];
}

export interface Tavsiye {
  tur: 'acil' | 'onemli' | 'bilgi';
  metin: string;
  key?: string;
}

export interface AileUyesi {
  id: string;
  ad: string;
  rol: 'ebeveyn' | 'cocuk' | 'buyukanne' | 'diger';
  telefon: string;
  normalKonum: 'ev' | 'okul' | 'is' | 'diger';
  avatar: string;
}

export interface BulusmaNokta {
  id: string;
  ad: string;
  tur: 'birincil' | 'yedek';
  adres: string;
  latitude: number;
  longitude: number;
  mesafe: string;
}

export interface KacisRotasi {
  id: string;
  ad: string;
  tur: 'birincil' | 'yedek' | 'acil';
  aciklama: string;
  sureDk: number;
}

export interface CantaUrun {
  id: string;
  kategori: 'su' | 'gida' | 'ilkYardim' | 'belgeler' | 'arac' | 'giysi' | 'iletisim';
  ad: string;
  miktar: string;
  aciklama: string;
  tamamlandi: boolean;
  sonKullanmaTarihi?: string;
  kritik: boolean;
}
