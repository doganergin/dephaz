import {
  getCities,
  getDistrictsByCityCode,
  getNeighbourhoodsByCityCodeAndDistrict,
} from 'turkey-neighbourhoods';
import type { Il, Ilce, Mahalle } from '@/types';

// Sadece bu şehirler gösterilecek
// Marmara: İstanbul, Kocaeli, Sakarya, Bursa, Balıkesir, Samsun
// 6 Şubat 2023: Kahramanmaraş, Hatay, Adıyaman, Malatya, Gaziantep,
//               Şanlıurfa, Diyarbakır, Kilis, Osmaniye, Adana
const IZINLI_KODLAR = new Set([
  '34', // İstanbul
  '41', // Kocaeli
  '54', // Sakarya
  '16', // Bursa
  '10', // Balıkesir
  '55', // Samsun
  '46', // Kahramanmaraş
  '31', // Hatay
  '02', // Adıyaman
  '44', // Malatya
  '27', // Gaziantep
  '63', // Şanlıurfa
  '21', // Diyarbakır
  '79', // Kilis
  '80', // Osmaniye
  '01', // Adana
]);

const ilceLookup = new Map<number, { cityCode: string; districtName: string }>();

export function getProvinces(): Il[] {
  return getCities()
    .filter((c: { code: string; name: string }) => IZINLI_KODLAR.has(c.code))
    .map((c: { code: string; name: string }) => ({
      id: parseInt(c.code, 10),
      name: c.name,
    }));
}

export function getDistricts(ilId: number): Ilce[] {
  const cityCode = String(ilId).padStart(2, '0');
  const districts = getDistrictsByCityCode(cityCode) as string[];
  return districts.map((name: string, idx: number) => {
    const id = ilId * 1000 + idx;
    ilceLookup.set(id, { cityCode, districtName: name });
    return { id, name, provinceId: ilId };
  });
}

export function getNeighbourhoods(ilceId: number): Mahalle[] {
  const lookup = ilceLookup.get(ilceId);
  if (!lookup) return [];
  const hoods = getNeighbourhoodsByCityCodeAndDistrict(
    lookup.cityCode,
    lookup.districtName
  ) as string[];
  return hoods.map((name: string, idx: number) => ({
    id: ilceId * 10000 + idx,
    name,
    districtId: ilceId,
  }));
}
