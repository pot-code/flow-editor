import axios from "axios"
import { isNil } from "lodash-es"
import { create } from "zustand"

type User = {
  name?: string
  avatar?: string
}

type State = {
  isAuthenticated: boolean
  accessToken: string | null
  user: User
}

const useAuthStore = create<State>(() => ({
  isAuthenticated: false,
  accessToken: null,
  user: {},
}))

export const setIsAuthenticated = (isAuthenticated: boolean) => useAuthStore.setState(() => ({ isAuthenticated }))
export const setAccessToken = (accessToken: string | null) => {
  useAuthStore.setState({ accessToken })
  if (!isNil(accessToken)) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  }
}
export const setUser = (user: User) => {
  useAuthStore.setState({ user })
}
export default useAuthStore
