import { User } from "oidc-client-ts"
import { create } from "zustand"

type State = {
  isAuthenticated: boolean
  user: User | null
}

const useAuthStore = create<State>(() => ({
  isAuthenticated: false,
  user: null,
}))

export const setIsAuthenticated = (isAuthenticated: boolean) => useAuthStore.setState(() => ({ isAuthenticated }))
export const setUser = (user: User | null) => useAuthStore.setState({ user })
export default useAuthStore
