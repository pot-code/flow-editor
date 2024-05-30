import { User } from "oidc-client-ts"
import { create } from "zustand"

type State = {
  isAuthenticated: boolean
  user: User | null
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User | null) => void
}

export default create<State>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))
