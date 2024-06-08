import { AXIOS_INSTANCE } from "@/lib/http/instance"
import { isNil } from "lodash-es"
import { create } from "zustand"

type User = {
  name?: string
  avatar?: string
  membership: number
  activated: boolean
}

type State = {
  isAuthenticated: boolean
  accessToken: string | null
  user: User
}

const useAuthStore = create<State>(() => ({
  isAuthenticated: false,
  accessToken: null,
  user: {
    membership: 0,
    activated: false,
  },
}))

export const setIsAuthenticated = (isAuthenticated: boolean) => useAuthStore.setState(() => ({ isAuthenticated }))
export const setAccessToken = (accessToken: string | null) => {
  useAuthStore.setState({ accessToken })
  if (accessToken) {
    AXIOS_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  }
}
export const setUser = (user: User) => {
  useAuthStore.setState({ user })
}
export default useAuthStore
