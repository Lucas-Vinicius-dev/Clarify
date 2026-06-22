import { create } from 'zustand'

interface UIState {
  drawerOpen: boolean
  toggleDrawer: () => void
  setDrawer: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  drawerOpen: false,
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  setDrawer: (open: boolean) => set({ drawerOpen: open }),
}))