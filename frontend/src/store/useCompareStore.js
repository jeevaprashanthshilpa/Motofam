import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCompareStore = create(
  persist(
    (set, get) => ({
      comparedBikes: [],

      // Add a bike to comparison (Max 4 bikes)
      addToCompare: (bike) => {
        const current = get().comparedBikes;
        const exists = current.some((b) => (b.id || b._id) === (bike.id || bike._id));

        if (!exists && current.length < 4) {
          set({ comparedBikes: [...current, bike] });
          return true;
        }
        return false; // Already exists or max limit (4) reached
      },

      // Remove a bike from comparison
      removeFromCompare: (id) => {
        set({
          comparedBikes: get().comparedBikes.filter((b) => (b.id || b._id) !== id),
        });
      },

      // Clear all compared bikes
      clearCompare: () => set({ comparedBikes: [] }),

      // Check if a bike is currently in comparison list
      isInCompare: (id) => {
        return get().comparedBikes.some((b) => (b.id || b._id) === id);
      },
    }),
    {
      name: "motofam-compare-storage", // local storage key
    }
  )
);