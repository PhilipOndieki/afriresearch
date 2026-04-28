import { create } from 'zustand';

type UiStore = {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  toggleNav: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  navOpen: false,
  setNavOpen: (open) => set({ navOpen: open }),
  toggleNav: () => set((state) => ({ navOpen: !state.navOpen })),
}));
