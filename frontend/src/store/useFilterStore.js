import { create } from "zustand";

export const useFilterStore = create((set) => ({
  searchQuery: "",
  selectedBrand: "",
  maxPrice: 300000,
  minYear: 2018,
  verifiedOnly: false,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedBrand: (selectedBrand) => set({ selectedBrand }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setMinYear: (minYear) => set({ minYear }),
  setVerifiedOnly: (verifiedOnly) => set({ verifiedOnly }),

  resetFilters: () =>
    set({
      searchQuery: "",
      selectedBrand: "",
      maxPrice: 300000,
      minYear: 2018,
      verifiedOnly: false,
    }),
}));