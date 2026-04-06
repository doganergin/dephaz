import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  AileUyesi,
  BulusmaNokta,
  KacisRotasi,
  CantaUrun,
  BolgeRisk,
  Il,
  Ilce,
  Mahalle,
} from '../types';

interface AppState {
  secilenIl: Il | null;
  secilenIlce: Ilce | null;
  secilenMahalle: Mahalle | null;
  bolgeRisk: BolgeRisk | null;

  aileUyeleri: AileUyesi[];
  bulusmaNoktalari: BulusmaNokta[];
  kacisRotalari: KacisRotasi[];

  cantaUrunleri: CantaUrun[];

  setIl: (il: Il | null) => void;
  setIlce: (ilce: Ilce | null) => void;
  setMahalle: (mahalle: Mahalle | null) => void;
  setBolgeRisk: (risk: BolgeRisk | null) => void;

  aileUyesiEkle: (uye: AileUyesi) => void;
  aileUyesiSil: (id: string) => void;
  bulusmaNok_taEkle: (nokta: BulusmaNokta) => void;
  bulusmaNok_taSil: (id: string) => void;
  rotaEkle: (rota: KacisRotasi) => void;
  rotaSil: (id: string) => void;

  urunTamamla: (id: string) => void;
  urunEkle: (urun: CantaUrun) => void;
  urunSil: (id: string) => void;
  cantaYukle: (urunler: CantaUrun[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      secilenIl: null,
      secilenIlce: null,
      secilenMahalle: null,
      bolgeRisk: null,
      aileUyeleri: [],
      bulusmaNoktalari: [],
      kacisRotalari: [],
      cantaUrunleri: [],

      setIl: (il) => set({ secilenIl: il, secilenIlce: null, secilenMahalle: null, bolgeRisk: null }),
      setIlce: (ilce) => set({ secilenIlce: ilce, secilenMahalle: null, bolgeRisk: null }),
      setMahalle: (mahalle) => set({ secilenMahalle: mahalle }),
      setBolgeRisk: (risk) => set({ bolgeRisk: risk }),

      aileUyesiEkle: (uye) => set((s) => ({ aileUyeleri: [...s.aileUyeleri, uye] })),
      aileUyesiSil: (id) => set((s) => ({ aileUyeleri: s.aileUyeleri.filter((u) => u.id !== id) })),
      bulusmaNok_taEkle: (nokta) => set((s) => ({ bulusmaNoktalari: [...s.bulusmaNoktalari, nokta] })),
      bulusmaNok_taSil: (id) => set((s) => ({ bulusmaNoktalari: s.bulusmaNoktalari.filter((n) => n.id !== id) })),
      rotaEkle: (rota) => set((s) => ({ kacisRotalari: [...s.kacisRotalari, rota] })),
      rotaSil: (id) => set((s) => ({ kacisRotalari: s.kacisRotalari.filter((r) => r.id !== id) })),

      urunTamamla: (id) =>
        set((s) => ({
          cantaUrunleri: s.cantaUrunleri.map((u) =>
            u.id === id ? { ...u, tamamlandi: !u.tamamlandi } : u
          ),
        })),
      urunEkle: (urun) => set((s) => ({ cantaUrunleri: [...s.cantaUrunleri, urun] })),
      urunSil: (id) => set((s) => ({ cantaUrunleri: s.cantaUrunleri.filter((u) => u.id !== id) })),
      cantaYukle: (urunler) => set({ cantaUrunleri: urunler }),
    }),
    {
      name: 'deprem-app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
