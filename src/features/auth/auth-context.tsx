import { IdTokenClaims } from "@logto/react"
import { createContext } from "react"

type ContextData = {
  claim?: IdTokenClaims
}

export const AuthContext = createContext<ContextData>({})

export default function AuthContextProvider({ children, data }: { children: React.ReactNode; data: ContextData }) {
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
