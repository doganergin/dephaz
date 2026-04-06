// Wrapper around turkey-neighbourhoods web API to match the mobile app's API shape
import {
  getCities,
  getDistrictsByCityCode,
  getNeighbourhoodsByCityCodeAndDistrict,
} from 'turkey-neighbourhoods';
import type { Il, Ilce, Mahalle } from '@/types';

// In-memory lookup: ilce id → {cityCode, districtName}
const ilceLookup = new Map<number, { cityCode: string; districtName: string }>();

export function getProvinces(): Il[] {
  return getCities().map((c: { code: string; name: string }) => ({
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
