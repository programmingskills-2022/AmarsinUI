import { create } from "zustand";
import type { BrandState } from "../types/brand";

export const useBrandStore = create<BrandState>()((set) => ({
  brands: [],
  accSystem: 0, // Provide a default value for accSystem
  page: 1, // Provide a default value for page
  lastId: 0, // Provide a default value for lastId
  usrPerm: false, // Provide a default value for usrPerm
  setField: (field: string, value: any) =>
    set((state) => ({ ...state, [field]: value })),
  setBrands: (brands) => set({ brands }),
}));
