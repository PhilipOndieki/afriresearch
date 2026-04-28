import { create } from 'zustand';

type FilterStore = {
  activeCategory: string | null;
  activeYear: number | null;
  setCategory: (category: string | null) => void;
  setYear: (year: number | null) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  activeCategory: null,
  activeYear: null,
  setCategory: (category) => set({ activeCategory: category }),
  setYear: (year) => set({ activeYear: year }),
  reset: () => set({ activeCategory: null, activeYear: null }),
}));
