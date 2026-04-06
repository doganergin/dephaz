import type { BolgeRisk, Deprem } from '../types';
import { bilimselKaynaklar } from '../data/bilimselKaynaklar';

export async function kandilliDepremleriGetir(il?: string, limit = 15): Promise<Deprem[]> {
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (il) params.set('il', il.toUpperCase());
    const res = await fetch(`/api/kandilli?${params}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.map((d: { buyukluk: number; konum: string; tarih: string; saat: string; derinlik: number }) => ({
      buyukluk: d.buyukluk,
      baslik: d.konum,
      tarih: `${d.tarih} ${d.saat}`,
      derinlik: d.derinlik,
    }));
  } catch {
    return TARIHI_DEPREMLER;
  }
}

export async function bolgeRiskGetir(il: string, ilce: string, mahalle: string): Promise<BolgeRisk> {
  const depremler = await kandilliDepremleriGetir(il, 10);
  return hesaplaRisk(il, ilce, mahalle, depremler);
}

function olasilikEtiket(oran: number): string {
  if (oran >= 80) return 'Çok Yüksek';
  if (oran >= 60) return 'Yüksek';
  if (oran >= 40) return 'Orta';
  if (oran >= 20) return 'Düşük-Orta';
  return 'Düşük';
}

// ─── Risk Veritabanı ─────────────────────────────────────────────────────────
// riskSkoru: 0-100  |  fayMesafe: km  |  olasilik30: %  |  beklenenMw: string
interface RiskVeri {
  riskSkoru: number;
  fayMesafe: number;
  olasilik30: number;
  beklenenMw: string;
  fayAdi: string;
}

const RISK_DB: Record<string, RiskVeri> = {
  // ── İSTANBUL ──────────────────────────────────────────────────────────────
  'İstanbul-Avcılar':        { riskSkoru: 92, fayMesafe: 12,  olasilik30: 64, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Zeytinburnu':    { riskSkoru: 88, fayMesafe: 13,  olasilik30: 64, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Bakırköy':       { riskSkoru: 85, fayMesafe: 14,  olasilik30: 64, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Bayrampaşa':     { riskSkoru: 82, fayMesafe: 15,  olasilik30: 64, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Esenyurt':       { riskSkoru: 82, fayMesafe: 16,  olasilik30: 64, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Büyükçekmece':   { riskSkoru: 80, fayMesafe: 15,  olasilik30: 60, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Bahçelievler':   { riskSkoru: 78, fayMesafe: 16,  olasilik30: 60, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Fatih':          { riskSkoru: 76, fayMesafe: 16,  olasilik30: 60, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Kadıköy':        { riskSkoru: 75, fayMesafe: 17,  olasilik30: 58, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Kartal':         { riskSkoru: 74, fayMesafe: 18,  olasilik30: 58, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Pendik':         { riskSkoru: 73, fayMesafe: 19,  olasilik30: 56, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Maltepe':        { riskSkoru: 72, fayMesafe: 18,  olasilik30: 56, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Üsküdar':        { riskSkoru: 70, fayMesafe: 18,  olasilik30: 55, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Ümraniye':       { riskSkoru: 68, fayMesafe: 22,  olasilik30: 52, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Beşiktaş':       { riskSkoru: 62, fayMesafe: 18,  olasilik30: 50, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Şişli':          { riskSkoru: 58, fayMesafe: 20,  olasilik30: 48, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Beyoğlu':        { riskSkoru: 62, fayMesafe: 19,  olasilik30: 50, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Sarıyer':        { riskSkoru: 48, fayMesafe: 28,  olasilik30: 42, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },
  'İstanbul-Başakşehir':     { riskSkoru: 60, fayMesafe: 22,  olasilik30: 48, beklenenMw: 'Mw 7.2–7.6', fayAdi: 'KAF Marmara' },

  // ── KOCAELİ ───────────────────────────────────────────────────────────────
  'Kocaeli-Gölcük':          { riskSkoru: 98, fayMesafe: 2,   olasilik30: 72, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },
  'Kocaeli-İzmit':           { riskSkoru: 95, fayMesafe: 4,   olasilik30: 70, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },
  'Kocaeli-Körfez':          { riskSkoru: 92, fayMesafe: 5,   olasilik30: 68, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },
  'Kocaeli-Derince':         { riskSkoru: 90, fayMesafe: 6,   olasilik30: 66, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },
  'Kocaeli-Başiskele':       { riskSkoru: 88, fayMesafe: 7,   olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },
  'Kocaeli-Kartepe':         { riskSkoru: 85, fayMesafe: 8,   olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },
  'Kocaeli-Gebze':           { riskSkoru: 82, fayMesafe: 10,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },
  'Kocaeli-Kandıra':         { riskSkoru: 70, fayMesafe: 22,  olasilik30: 50, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF' },
  'Kocaeli-Karamürsel':      { riskSkoru: 78, fayMesafe: 12,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF İzmit' },

  // ── SAKARYA ───────────────────────────────────────────────────────────────
  'Sakarya-Adapazarı':       { riskSkoru: 95, fayMesafe: 5,   olasilik30: 68, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Sakarya-Arifiye':         { riskSkoru: 93, fayMesafe: 6,   olasilik30: 66, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Sakarya-Serdivan':        { riskSkoru: 90, fayMesafe: 7,   olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Sakarya-Erenler':         { riskSkoru: 88, fayMesafe: 8,   olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Sakarya-Akyazı':          { riskSkoru: 85, fayMesafe: 10,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF' },
  'Sakarya-Hendek':          { riskSkoru: 80, fayMesafe: 14,  olasilik30: 56, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF' },
  'Sakarya-Sapanca':         { riskSkoru: 82, fayMesafe: 12,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF' },
  'Sakarya-Kaynarca':        { riskSkoru: 72, fayMesafe: 20,  olasilik30: 50, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF' },

  // ── BURSA ─────────────────────────────────────────────────────────────────
  'Bursa-Osmangazi':         { riskSkoru: 62, fayMesafe: 38,  olasilik30: 45, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF güney kolu' },
  'Bursa-Nilüfer':           { riskSkoru: 58, fayMesafe: 42,  olasilik30: 42, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF güney kolu' },
  'Bursa-Yıldırım':          { riskSkoru: 60, fayMesafe: 40,  olasilik30: 44, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF güney kolu' },
  'Bursa-Gemlik':            { riskSkoru: 72, fayMesafe: 18,  olasilik30: 52, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF Marmara güney' },
  'Bursa-Mudanya':           { riskSkoru: 70, fayMesafe: 20,  olasilik30: 50, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF Marmara güney' },
  'Bursa-Orhangazi':         { riskSkoru: 68, fayMesafe: 22,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF' },
  'Bursa-İznik':             { riskSkoru: 75, fayMesafe: 15,  olasilik30: 54, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İznik Fayı' },
  'Bursa-İnegöl':            { riskSkoru: 55, fayMesafe: 50,  olasilik30: 38, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İnegöl Fayı' },

  // ── BALIKESİR ─────────────────────────────────────────────────────────────
  'Balıkesir-Altıeylül':     { riskSkoru: 52, fayMesafe: 55,  olasilik30: 36, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Yenice-Gönen' },
  'Balıkesir-Karesi':        { riskSkoru: 50, fayMesafe: 58,  olasilik30: 34, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Yenice-Gönen' },
  'Balıkesir-Bandırma':      { riskSkoru: 68, fayMesafe: 22,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF Marmara güney' },
  'Balıkesir-Erdek':         { riskSkoru: 65, fayMesafe: 25,  olasilik30: 46, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'KAF Marmara güney' },
  'Balıkesir-Gönen':         { riskSkoru: 62, fayMesafe: 18,  olasilik30: 44, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Yenice-Gönen' },
  'Balıkesir-Manyas':        { riskSkoru: 60, fayMesafe: 20,  olasilik30: 42, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Yenice-Gönen' },
  'Balıkesir-Edremit':       { riskSkoru: 58, fayMesafe: 35,  olasilik30: 40, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Edremit Fayı' },
  'Balıkesir-Susurluk':      { riskSkoru: 55, fayMesafe: 45,  olasilik30: 38, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Yenice-Gönen' },

  // ── SAMSUN ────────────────────────────────────────────────────────────────
  'Samsun-İlkadım':          { riskSkoru: 45, fayMesafe: 80,  olasilik30: 30, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'KAF doğu uzantısı' },
  'Samsun-Canik':            { riskSkoru: 42, fayMesafe: 85,  olasilik30: 28, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'KAF doğu uzantısı' },
  'Samsun-Atakum':           { riskSkoru: 40, fayMesafe: 88,  olasilik30: 26, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'KAF doğu uzantısı' },
  'Samsun-Tekkeköy':         { riskSkoru: 44, fayMesafe: 82,  olasilik30: 29, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'KAF doğu uzantısı' },
  'Samsun-Bafra':            { riskSkoru: 48, fayMesafe: 70,  olasilik30: 32, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'KAF doğu uzantısı' },
  'Samsun-Alaçam':           { riskSkoru: 45, fayMesafe: 75,  olasilik30: 30, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'KAF doğu uzantısı' },
  'Samsun-Terme':            { riskSkoru: 42, fayMesafe: 80,  olasilik30: 28, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'KAF doğu uzantısı' },

  // ── KAHRAMANMARAŞ ─────────────────────────────────────────────────────────
  'Kahramanmaraş-Pazarcık':  { riskSkoru: 99, fayMesafe: 1,   olasilik30: 78, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Pazarcık' },
  'Kahramanmaraş-Onikişubat':{ riskSkoru: 97, fayMesafe: 3,   olasilik30: 75, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Pazarcık' },
  'Kahramanmaraş-Türkoğlu':  { riskSkoru: 95, fayMesafe: 5,   olasilik30: 72, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF' },
  'Kahramanmaraş-Elbistan':  { riskSkoru: 96, fayMesafe: 2,   olasilik30: 74, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Sürgü' },
  'Kahramanmaraş-Göksun':    { riskSkoru: 85, fayMesafe: 15,  olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Kahramanmaraş-Afşin':     { riskSkoru: 88, fayMesafe: 10,  olasilik30: 65, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF Sürgü' },
  'Kahramanmaraş-Andırın':   { riskSkoru: 78, fayMesafe: 25,  olasilik30: 55, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Kahramanmaraş-Nurhak':    { riskSkoru: 82, fayMesafe: 18,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },

  // ── HATAY ─────────────────────────────────────────────────────────────────
  'Hatay-Antakya':           { riskSkoru: 97, fayMesafe: 3,   olasilik30: 76, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Amanos' },
  'Hatay-İskenderun':        { riskSkoru: 94, fayMesafe: 5,   olasilik30: 72, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Amanos' },
  'Hatay-Kırıkhan':          { riskSkoru: 96, fayMesafe: 2,   olasilik30: 74, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Amanos' },
  'Hatay-Samandağ':          { riskSkoru: 93, fayMesafe: 4,   olasilik30: 70, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Amanos' },
  'Hatay-Dörtyol':           { riskSkoru: 90, fayMesafe: 8,   olasilik30: 67, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF Amanos' },
  'Hatay-Reyhanlı':          { riskSkoru: 88, fayMesafe: 10,  olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Hatay-Hassa':             { riskSkoru: 86, fayMesafe: 12,  olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Hatay-Altınözü':          { riskSkoru: 90, fayMesafe: 6,   olasilik30: 66, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF Amanos' },
  'Hatay-Arsuz':             { riskSkoru: 88, fayMesafe: 9,   olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF Amanos' },
  'Hatay-Yayladağı':         { riskSkoru: 85, fayMesafe: 14,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Hatay-Belen':             { riskSkoru: 82, fayMesafe: 18,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },

  // ── ADIYAMAN ──────────────────────────────────────────────────────────────
  'Adıyaman-Merkez':         { riskSkoru: 96, fayMesafe: 4,   olasilik30: 74, beklenenMw: 'Mw 7.5–8.0', fayAdi: 'DAF Pazarcık' },
  'Adıyaman-Kahta':          { riskSkoru: 88, fayMesafe: 15,  olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Adıyaman-Besni':          { riskSkoru: 84, fayMesafe: 18,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Adıyaman-Gölbaşı':        { riskSkoru: 80, fayMesafe: 22,  olasilik30: 56, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Adıyaman-Samsat':         { riskSkoru: 78, fayMesafe: 25,  olasilik30: 54, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Adıyaman-Sincik':         { riskSkoru: 72, fayMesafe: 32,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF' },
  'Adıyaman-Çelikhan':       { riskSkoru: 82, fayMesafe: 18,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },

  // ── MALATYA ───────────────────────────────────────────────────────────────
  'Malatya-Battalgazi':      { riskSkoru: 92, fayMesafe: 6,   olasilik30: 68, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF Sürgü' },
  'Malatya-Yeşilyurt':       { riskSkoru: 90, fayMesafe: 8,   olasilik30: 66, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF Sürgü' },
  'Malatya-Doğanşehir':      { riskSkoru: 88, fayMesafe: 10,  olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF Sürgü' },
  'Malatya-Pütürge':         { riskSkoru: 87, fayMesafe: 12,  olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Malatya-Kale':            { riskSkoru: 85, fayMesafe: 14,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Malatya-Akçadağ':         { riskSkoru: 83, fayMesafe: 16,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Malatya-Hekimhan':        { riskSkoru: 78, fayMesafe: 22,  olasilik30: 52, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF' },
  'Malatya-Arapgir':         { riskSkoru: 75, fayMesafe: 28,  olasilik30: 50, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF' },

  // ── GAZİANTEP ─────────────────────────────────────────────────────────────
  'Gaziantep-Şahinbey':      { riskSkoru: 85, fayMesafe: 22,  olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Gaziantep-Şehitkamil':    { riskSkoru: 83, fayMesafe: 24,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Gaziantep-Nurdağı':       { riskSkoru: 88, fayMesafe: 15,  olasilik30: 65, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Gaziantep-İslahiye':      { riskSkoru: 90, fayMesafe: 10,  olasilik30: 67, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Gaziantep-Araban':        { riskSkoru: 80, fayMesafe: 28,  olasilik30: 56, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Gaziantep-Oğuzeli':       { riskSkoru: 75, fayMesafe: 35,  olasilik30: 52, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF' },
  'Gaziantep-Karkamış':      { riskSkoru: 72, fayMesafe: 40,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF' },

  // ── ŞANLIURFA ─────────────────────────────────────────────────────────────
  'Şanlıurfa-Eyyübiye':      { riskSkoru: 65, fayMesafe: 75,  olasilik30: 44, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Şanlıurfa-Haliliye':      { riskSkoru: 63, fayMesafe: 78,  olasilik30: 42, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Şanlıurfa-Karaköprü':     { riskSkoru: 60, fayMesafe: 82,  olasilik30: 40, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Şanlıurfa-Birecik':       { riskSkoru: 68, fayMesafe: 55,  olasilik30: 46, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Şanlıurfa-Bozova':        { riskSkoru: 62, fayMesafe: 70,  olasilik30: 42, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },

  // ── DİYARBAKIR ────────────────────────────────────────────────────────────
  'Diyarbakır-Bağlar':       { riskSkoru: 58, fayMesafe: 90,  olasilik30: 38, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'DAF kuzey' },
  'Diyarbakır-Kayapınar':    { riskSkoru: 55, fayMesafe: 95,  olasilik30: 36, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'DAF kuzey' },
  'Diyarbakır-Sur':          { riskSkoru: 57, fayMesafe: 92,  olasilik30: 37, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'DAF kuzey' },
  'Diyarbakır-Yenişehir':    { riskSkoru: 55, fayMesafe: 95,  olasilik30: 36, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'DAF kuzey' },
  'Diyarbakır-Ergani':       { riskSkoru: 62, fayMesafe: 70,  olasilik30: 42, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'DAF kuzey' },
  'Diyarbakır-Çermik':       { riskSkoru: 64, fayMesafe: 65,  olasilik30: 44, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'DAF kuzey' },

  // ── KİLİS ─────────────────────────────────────────────────────────────────
  'Kilis-Merkez':            { riskSkoru: 88, fayMesafe: 14,  olasilik30: 65, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Kilis-Musabeyli':         { riskSkoru: 82, fayMesafe: 20,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Kilis-Polateli':          { riskSkoru: 80, fayMesafe: 22,  olasilik30: 56, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Kilis-Elbeyli':           { riskSkoru: 78, fayMesafe: 25,  olasilik30: 54, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },

  // ── OSMANİYE ──────────────────────────────────────────────────────────────
  'Osmaniye-Merkez':         { riskSkoru: 90, fayMesafe: 8,   olasilik30: 67, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Osmaniye-Kadirli':        { riskSkoru: 82, fayMesafe: 18,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Osmaniye-Düziçi':         { riskSkoru: 85, fayMesafe: 14,  olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Osmaniye-Toprakkale':     { riskSkoru: 88, fayMesafe: 10,  olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },
  'Osmaniye-Bahçe':          { riskSkoru: 84, fayMesafe: 16,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'DAF' },

  // ── ADANA ─────────────────────────────────────────────────────────────────
  'Adana-Seyhan':            { riskSkoru: 72, fayMesafe: 45,  olasilik30: 50, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Adana-Yüreğir':           { riskSkoru: 70, fayMesafe: 48,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Adana-Çukurova':          { riskSkoru: 68, fayMesafe: 52,  olasilik30: 46, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Adana-Sarıçam':           { riskSkoru: 65, fayMesafe: 55,  olasilik30: 44, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Adana-Ceyhan':            { riskSkoru: 78, fayMesafe: 30,  olasilik30: 54, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Adana-Kozan':             { riskSkoru: 70, fayMesafe: 45,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF' },
  'Adana-Karataş':           { riskSkoru: 72, fayMesafe: 42,  olasilik30: 50, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF güney' },
  'Adana-İmamoğlu':          { riskSkoru: 75, fayMesafe: 35,  olasilik30: 52, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'DAF' },

  // ── İZMİR ─────────────────────────────────────────────────────────────────
  // Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; Sözbilir vd. aktif tektonik çalışmaları
  // 2020 Sisam (Samos) Mw 7.0 depremi İzmir'i ağır etkiledi; Bayraklı en fazla hasar gören ilçe
  'İzmir-Bayraklı':          { riskSkoru: 90, fayMesafe: 8,   olasilik30: 65, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İzmir Körfezi Fayı' },
  'İzmir-Bornova':           { riskSkoru: 78, fayMesafe: 12,  olasilik30: 56, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İzmir Körfezi Fayı' },
  'İzmir-Karşıyaka':         { riskSkoru: 80, fayMesafe: 10,  olasilik30: 58, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İzmir Körfezi Fayı' },
  'İzmir-Konak':             { riskSkoru: 82, fayMesafe: 9,   olasilik30: 60, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İzmir Körfezi Fayı' },
  'İzmir-Buca':              { riskSkoru: 72, fayMesafe: 18,  olasilik30: 50, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Buca Fayı' },
  'İzmir-Gaziemir':          { riskSkoru: 68, fayMesafe: 22,  olasilik30: 46, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Buca Fayı' },
  'İzmir-Karabağlar':        { riskSkoru: 75, fayMesafe: 15,  olasilik30: 52, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İzmir Körfezi Fayı' },
  'İzmir-Çiğli':             { riskSkoru: 76, fayMesafe: 14,  olasilik30: 54, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'İzmir Körfezi Fayı' },
  'İzmir-Narlıdere':         { riskSkoru: 65, fayMesafe: 20,  olasilik30: 44, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'İzmir Körfezi Fayı' },
  'İzmir-Torbalı':           { riskSkoru: 62, fayMesafe: 25,  olasilik30: 42, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Gediz Grabeni' },
  'İzmir-Kemalpaşa':         { riskSkoru: 60, fayMesafe: 28,  olasilik30: 40, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Gediz Grabeni' },
  'İzmir-Aliağa':            { riskSkoru: 65, fayMesafe: 22,  olasilik30: 44, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Bakırçay Fayı' },
  'İzmir-Bergama':           { riskSkoru: 58, fayMesafe: 35,  olasilik30: 38, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'Bakırçay Fayı' },

  // ── ANTALYA ───────────────────────────────────────────────────────────────
  // Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; Akdeniz batı kolu sismisitesi
  'Antalya-Kepez':           { riskSkoru: 50, fayMesafe: 65,  olasilik30: 32, beklenenMw: 'Mw 6.0–6.5', fayAdi: 'Akdeniz Fayları' },
  'Antalya-Muratpaşa':       { riskSkoru: 48, fayMesafe: 68,  olasilik30: 30, beklenenMw: 'Mw 6.0–6.5', fayAdi: 'Akdeniz Fayları' },
  'Antalya-Konyaaltı':       { riskSkoru: 52, fayMesafe: 60,  olasilik30: 34, beklenenMw: 'Mw 6.0–6.5', fayAdi: 'Akdeniz Fayları' },
  'Antalya-Manavgat':        { riskSkoru: 55, fayMesafe: 55,  olasilik30: 36, beklenenMw: 'Mw 6.0–6.5', fayAdi: 'Manavgat Fayı' },
  'Antalya-Alanya':          { riskSkoru: 58, fayMesafe: 50,  olasilik30: 38, beklenenMw: 'Mw 6.0–6.5', fayAdi: 'Alanya Fayı' },
  'Antalya-Serik':           { riskSkoru: 45, fayMesafe: 72,  olasilik30: 28, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'Akdeniz Fayları' },
  'Antalya-Döşemealtı':      { riskSkoru: 42, fayMesafe: 78,  olasilik30: 26, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'Akdeniz Fayları' },
  'Antalya-Aksu':            { riskSkoru: 44, fayMesafe: 75,  olasilik30: 27, beklenenMw: 'Mw 5.5–6.5', fayAdi: 'Akdeniz Fayları' },

  // ── MUĞLA ─────────────────────────────────────────────────────────────────
  // Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; Ege bölgesi yoğun sismisitesi
  'Muğla-Menteşe':           { riskSkoru: 65, fayMesafe: 30,  olasilik30: 44, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Güneybatı Anadolu Fayları' },
  'Muğla-Bodrum':            { riskSkoru: 72, fayMesafe: 20,  olasilik30: 50, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Bodrum-Kos Fayı' },
  'Muğla-Fethiye':           { riskSkoru: 70, fayMesafe: 22,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Fethiye-Burdur Fayı' },
  'Muğla-Marmaris':          { riskSkoru: 68, fayMesafe: 25,  olasilik30: 46, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Güneybatı Anadolu Fayları' },
  'Muğla-Milas':             { riskSkoru: 62, fayMesafe: 32,  olasilik30: 42, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Güneybatı Anadolu Fayları' },
  'Muğla-Datça':             { riskSkoru: 75, fayMesafe: 18,  olasilik30: 52, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Datça-Bozburun Fayı' },
  'Muğla-Köyceğiz':          { riskSkoru: 60, fayMesafe: 35,  olasilik30: 40, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Fethiye-Burdur Fayı' },

  // ── DENİZLİ ───────────────────────────────────────────────────────────────
  // Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; Büyük Menderes Grabeni sismisitesi
  'Denizli-Pamukkale':       { riskSkoru: 72, fayMesafe: 15,  olasilik30: 50, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Büyük Menderes Grabeni' },
  'Denizli-Merkezefendi':    { riskSkoru: 70, fayMesafe: 18,  olasilik30: 48, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Büyük Menderes Grabeni' },
  'Denizli-Honaz':           { riskSkoru: 68, fayMesafe: 20,  olasilik30: 46, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Büyük Menderes Grabeni' },
  'Denizli-Buldan':          { riskSkoru: 62, fayMesafe: 28,  olasilik30: 42, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Gediz Grabeni' },
  'Denizli-Sarayköy':        { riskSkoru: 65, fayMesafe: 24,  olasilik30: 44, beklenenMw: 'Mw 6.5–7.0', fayAdi: 'Büyük Menderes Grabeni' },
  'Denizli-Tavas':           { riskSkoru: 58, fayMesafe: 38,  olasilik30: 38, beklenenMw: 'Mw 6.0–6.8', fayAdi: 'Güneybatı Anadolu Fayları' },

  // ── BOLU ──────────────────────────────────────────────────────────────────
  // Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; KAF'ın Bolu-Düzce segmenti
  'Bolu-Merkez':             { riskSkoru: 82, fayMesafe: 8,   olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Bolu' },
  'Bolu-Gerede':             { riskSkoru: 88, fayMesafe: 4,   olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Bolu' },
  'Bolu-Mudurnu':            { riskSkoru: 85, fayMesafe: 6,   olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Bolu' },
  'Bolu-Göynük':             { riskSkoru: 78, fayMesafe: 12,  olasilik30: 54, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Bolu' },
  'Bolu-Dörtdivan':          { riskSkoru: 80, fayMesafe: 10,  olasilik30: 56, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Bolu' },
  'Bolu-Kıbrıscık':          { riskSkoru: 75, fayMesafe: 14,  olasilik30: 52, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Bolu' },

  // ── DÜZCE ─────────────────────────────────────────────────────────────────
  // Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; 1999 Düzce depremi (Mw 7.2)
  'Düzce-Merkez':            { riskSkoru: 93, fayMesafe: 3,   olasilik30: 68, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Düzce-Akçakoca':          { riskSkoru: 88, fayMesafe: 8,   olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Düzce-Kaynaşlı':          { riskSkoru: 90, fayMesafe: 5,   olasilik30: 66, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Düzce-Gölyaka':           { riskSkoru: 85, fayMesafe: 10,  olasilik30: 60, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Düzce-Çilimli':           { riskSkoru: 82, fayMesafe: 12,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },
  'Düzce-Yığılca':           { riskSkoru: 78, fayMesafe: 16,  olasilik30: 54, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Düzce' },

  // ── YALOVA ────────────────────────────────────────────────────────────────
  // Kaynak: AFAD Türkiye Deprem Tehlike Haritası 2018; KAF Marmara güney kolu
  'Yalova-Merkez':           { riskSkoru: 90, fayMesafe: 6,   olasilik30: 66, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Marmara güney' },
  'Yalova-Çınarcık':         { riskSkoru: 92, fayMesafe: 4,   olasilik30: 68, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Marmara güney' },
  'Yalova-Altınova':         { riskSkoru: 88, fayMesafe: 8,   olasilik30: 64, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Marmara güney' },
  'Yalova-Termal':           { riskSkoru: 85, fayMesafe: 10,  olasilik30: 62, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Marmara güney' },
  'Yalova-Çiftlikköy':       { riskSkoru: 87, fayMesafe: 8,   olasilik30: 63, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Marmara güney' },
  'Yalova-Armutlu':          { riskSkoru: 82, fayMesafe: 12,  olasilik30: 58, beklenenMw: 'Mw 7.0–7.5', fayAdi: 'KAF Marmara güney' },
};

// ─── Zemin Veritabanı ────────────────────────────────────────────────────────
const ZEMIN_DB: Record<string, BolgeRisk['zemin']> = {
  'İstanbul-Avcılar':    [
    { ad: 'Alüvyon', yuzde: 78, risk: 'yuksek', aciklama: 'Yüksek sıvılaşma riski (1999 depremi hasarı)' },
    { ad: 'Killi zemin', yuzde: 18, risk: 'orta', aciklama: 'Orta risk' },
    { ad: 'Kaya', yuzde: 4, risk: 'dusuk', aciklama: 'Çok sınırlı' },
  ],
  'İstanbul-Bakırköy':   [
    { ad: 'Dolgu zemin', yuzde: 62, risk: 'yuksek', aciklama: 'Denizden kazanılmış, çok riskli' },
    { ad: 'Alüvyon', yuzde: 26, risk: 'yuksek', aciklama: 'Sıvılaşma riski yüksek' },
    { ad: 'Kaya', yuzde: 12, risk: 'dusuk', aciklama: 'Görece güvenli' },
  ],
  'İstanbul-Zeytinburnu':[
    { ad: 'Dolgu zemin', yuzde: 50, risk: 'yuksek', aciklama: 'Kıyı dolgu alanı, çok riskli' },
    { ad: 'Alüvyon', yuzde: 35, risk: 'yuksek', aciklama: 'Yüksek sıvılaşma riski' },
    { ad: 'Kaya', yuzde: 15, risk: 'dusuk', aciklama: 'Görece güvenli' },
  ],
  'Kocaeli-Gölcük': [
    { ad: 'Alüvyon', yuzde: 80, risk: 'yuksek', aciklama: '1999 depreminde zeminin sıvılaştığı bölge' },
    { ad: 'Killi zemin', yuzde: 15, risk: 'orta', aciklama: 'Orta risk' },
    { ad: 'Kaya', yuzde: 5, risk: 'dusuk', aciklama: 'Çok sınırlı' },
  ],
  'Sakarya-Adapazarı': [
    { ad: 'Alüvyon', yuzde: 85, risk: 'yuksek', aciklama: 'Sakarya nehri alüvyonu, 1999\'da büyük çökmeler yaşandı' },
    { ad: 'Killi zemin', yuzde: 12, risk: 'orta', aciklama: 'Orta risk' },
    { ad: 'Kaya', yuzde: 3, risk: 'dusuk', aciklama: 'Çok sınırlı' },
  ],
  'Kahramanmaraş-Pazarcık': [
    { ad: 'Alüvyon', yuzde: 60, risk: 'yuksek', aciklama: '6 Şubat 2023\'te yoğun sıvılaşma gözlemlendi' },
    { ad: 'Genç çökel', yuzde: 30, risk: 'yuksek', aciklama: 'Amplifikasyon riski yüksek' },
    { ad: 'Kaya', yuzde: 10, risk: 'dusuk', aciklama: 'Sınırlı alan' },
  ],
  'Kahramanmaraş-Onikişubat': [
    { ad: 'Alüvyon', yuzde: 55, risk: 'yuksek', aciklama: 'Sıvılaşma riski yüksek' },
    { ad: 'Genç çökel', yuzde: 35, risk: 'yuksek', aciklama: 'Gevşek tutturulmuş zemin' },
    { ad: 'Kaya', yuzde: 10, risk: 'dusuk', aciklama: 'Görece güvenli' },
  ],
  'Hatay-Antakya': [
    { ad: 'Alüvyon', yuzde: 70, risk: 'yuksek', aciklama: 'Asi nehri alüvyonu, 2023\'te yoğun hasar' },
    { ad: 'Gevşek çökel', yuzde: 22, risk: 'yuksek', aciklama: 'Yüksek amplifikasyon' },
    { ad: 'Kaya', yuzde: 8, risk: 'dusuk', aciklama: 'Sınırlı alan' },
  ],
  // İzmir zemin — Kaynak: AFAD Zemin Araştırması; Sözbilir vd.
  'İzmir-Bayraklı': [
    { ad: 'Alüvyon', yuzde: 82, risk: 'yuksek', aciklama: '2020 Sisam depreminde en fazla hasar bu alanda oluştu; zemin büyütmesi yüksek' },
    { ad: 'Killi zemin', yuzde: 14, risk: 'orta', aciklama: 'Orta risk' },
    { ad: 'Kaya', yuzde: 4, risk: 'dusuk', aciklama: 'Çok sınırlı alan' },
  ],
  'İzmir-Konak': [
    { ad: 'Alüvyon', yuzde: 65, risk: 'yuksek', aciklama: 'Körfez kenarı, sıvılaşma ve büyütme riski var' },
    { ad: 'Killi zemin', yuzde: 25, risk: 'orta', aciklama: 'Orta risk' },
    { ad: 'Kaya', yuzde: 10, risk: 'dusuk', aciklama: 'Görece güvenli' },
  ],
  // Düzce zemin — Kaynak: AFAD; 1999 Düzce depremi gözlemleri
  'Düzce-Merkez': [
    { ad: 'Alüvyon', yuzde: 75, risk: 'yuksek', aciklama: '1999 Mw 7.2 depreminde yoğun zemin büyütmesi yaşandı' },
    { ad: 'Killi zemin', yuzde: 18, risk: 'orta', aciklama: 'Orta risk' },
    { ad: 'Kaya', yuzde: 7, risk: 'dusuk', aciklama: 'Sınırlı alan' },
  ],
  // Yalova zemin — Kaynak: AFAD; 1999 Marmara depremi gözlemleri
  'Yalova-Merkez': [
    { ad: 'Alüvyon', yuzde: 70, risk: 'yuksek', aciklama: '1999 depreminde ciddi zemin büyütmesi yaşandı' },
    { ad: 'Killi zemin', yuzde: 20, risk: 'orta', aciklama: 'Orta risk' },
    { ad: 'Kaya', yuzde: 10, risk: 'dusuk', aciklama: 'Görece güvenli' },
  ],
};

// ─── Ana hesaplama ────────────────────────────────────────────────────────────
function hesaplaRisk(il: string, ilce: string, mahalle: string, depremler: Deprem[]): BolgeRisk {
  const key = `${il}-${ilce}`;
  const veri = RISK_DB[key];
  const skor = veri?.riskSkoru ?? 60;

  const bilimsel = bilimselKaynaklar[key] ?? bilimselKaynaklar[il];
  const zemin = bilimsel?.zemin ?? ZEMIN_DB[key] ?? ZEMIN_VARSAYILAN;

  return {
    mahalle,
    ilce,
    il,
    riskSkoru: skor,
    riskSinifi: skor >= 70 ? 'yuksek' : skor >= 40 ? 'orta' : 'dusuk',
    riskMetni:
      skor >= 90 ? 'M5.0–5.5+ deprem olasılığı çok yüksek'
      : skor >= 75 ? 'M5.0–5.5+ deprem olasılığı yüksek'
      : skor >= 50 ? 'M5.0–5.5+ deprem olasılığı orta-yüksek'
      : skor >= 35 ? 'M5.0–5.5+ deprem olasılığı orta'
      : 'M5.0–5.5+ deprem olasılığı düşük',
    aciklama: bilimsel?.genelDegerlendirme
      ?? `${ilce} ilçesi deprem risk analizi · Fay: ${veri?.fayAdi ?? 'belirsiz'} · Veri: AFAD / MTA`,
    fayMesafe: veri?.fayMesafe ?? 50,
    beklenenMax: veri?.beklenenMw ?? 'Mw 6.0–7.0',
    olasilik30Yil: olasilikEtiket(veri?.olasilik30 ?? 25),
    depremSayisi: depremler.length > 0 ? depremler.length * 35 : Math.round(skor * 3.5),
    sonDeprem: depremler[0]?.tarih ?? '—',
    maxBuyukluk: depremler.length
      ? String(Math.max(...depremler.map((d) => d.buyukluk)).toFixed(1))
      : '—',
    zemin,
    binalar: BINA_DB[key] ?? BINA_VARSAYILAN,
    depremler,
    tavsiyeler: tavsiyeUret(skor),
    toplanmaAlanlari: [`${ilce} Belediye Önü`, `${ilce} Millet Bahçesi`],
  };
}

function tavsiyeUret(skor: number): BolgeRisk['tavsiyeler'] {
  const tv = [];
  if (skor >= 85) {
    tv.push({ tur: 'acil' as const, metin: 'Binanız 1999 veya 2023 öncesi yapılmışsa DERHAL yapısal inceleme yaptırın.' });
    tv.push({ tur: 'acil' as const, metin: 'DASK sigortanızın güncel olduğundan emin olun.' });
    tv.push({ tur: 'acil' as const, metin: 'Kaçış yollarınızı ve toplanma alanınızı şimdi belirleyin.' });
  } else if (skor >= 70) {
    tv.push({ tur: 'acil' as const, metin: 'Binanızın deprem yönetmeliğine uygunluğunu kontrol ettirin.' });
    tv.push({ tur: 'acil' as const, metin: 'DASK sigortanızın güncel olduğundan emin olun.' });
  }
  tv.push({ tur: 'onemli' as const, metin: '72 saatlik deprem çantanızı hazırlayın ve erişilebilir yerde tutun.' });
  tv.push({ tur: 'onemli' as const, metin: 'Aile buluşma noktanızı belirleyin ve herkese bildirin.' });
  tv.push({ tur: 'bilgi' as const, metin: 'Bölgenizdeki AFAD toplanma alanlarını öğrenin.' });
  return tv;
}

const TARIHI_DEPREMLER: Deprem[] = [
  { buyukluk: 7.8, baslik: 'Kahramanmaraş (Pazarcık)', tarih: '6 Şubat 2023 04:17', derinlik: 8.6 },
  { buyukluk: 7.7, baslik: 'Kahramanmaraş (Elbistan)', tarih: '6 Şubat 2023 13:24', derinlik: 7.0 },
  { buyukluk: 7.0, baslik: 'Sisam Açıkları (İzmir)', tarih: '30 Ekim 2020', derinlik: 16.5 },
  { buyukluk: 7.4, baslik: 'Marmara (Gölcük)', tarih: '17 Ağustos 1999', derinlik: 17 },
  { buyukluk: 7.2, baslik: 'Düzce', tarih: '12 Kasım 1999', derinlik: 10 },
];

const ZEMIN_VARSAYILAN: BolgeRisk['zemin'] = [
  { ad: 'Alüvyon', yuzde: 45, risk: 'yuksek', aciklama: 'Sıvılaşma riski var' },
  { ad: 'Killi zemin', yuzde: 35, risk: 'orta', aciklama: 'Orta risk' },
  { ad: 'Kaya', yuzde: 20, risk: 'dusuk', aciklama: 'Görece güvenli' },
];

const BINA_VARSAYILAN: BolgeRisk['binalar'] = [
  { donem: '1999 öncesi', yuzde: 35, renk: '#E24B4A' },
  { donem: '1999–2012', yuzde: 38, renk: '#EF9F27' },
  { donem: '2012 sonrası', yuzde: 27, renk: '#639922' },
];

const BINA_DB: Record<string, BolgeRisk['binalar']> = {
  'İstanbul-Bakırköy': [
    { donem: '1980 öncesi', yuzde: 18, renk: '#E24B4A' },
    { donem: '1980–1999', yuzde: 29, renk: '#EF9F27' },
    { donem: '1999–2012', yuzde: 31, renk: '#FAC775' },
    { donem: '2012 sonrası', yuzde: 22, renk: '#639922' },
  ],
  'Sakarya-Adapazarı': [
    { donem: '1999 öncesi', yuzde: 28, renk: '#E24B4A' },
    { donem: '1999–2012', yuzde: 42, renk: '#EF9F27' },
    { donem: '2012 sonrası', yuzde: 30, renk: '#639922' },
  ],
  'Kahramanmaraş-Pazarcık': [
    { donem: '2023 öncesi', yuzde: 72, renk: '#E24B4A' },
    { donem: '2023 sonrası (yeniden yapılan)', yuzde: 28, renk: '#639922' },
  ],
  'Hatay-Antakya': [
    { donem: '2023 öncesi', yuzde: 68, renk: '#E24B4A' },
    { donem: '2023 sonrası (yeniden yapılan)', yuzde: 32, renk: '#639922' },
  ],
  // İzmir bina stoğu — Kaynak: TÜİK 2021 Bina Sayımı
  'İzmir-Bayraklı': [
    { donem: '2000 öncesi', yuzde: 48, renk: '#E24B4A' },
    { donem: '2000–2012', yuzde: 32, renk: '#EF9F27' },
    { donem: '2012 sonrası', yuzde: 20, renk: '#639922' },
  ],
  // Düzce bina stoğu — Kaynak: TÜİK 2021 Bina Sayımı
  'Düzce-Merkez': [
    { donem: '1999 öncesi', yuzde: 22, renk: '#E24B4A' },
    { donem: '1999–2012', yuzde: 45, renk: '#EF9F27' },
    { donem: '2012 sonrası', yuzde: 33, renk: '#639922' },
  ],
};
