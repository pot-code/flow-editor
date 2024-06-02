import { create } from "zustand"

interface SidebarState {
  isOpen: boolean
  toggleOn: () => void
  toggleOff: () => void
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggleOn: () => set(() => ({ isOpen: true })),
  toggleOff: () => set(() => ({ isOpen: false })),
}))

export default useSidebarStore
