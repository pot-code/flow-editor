import { useLogto } from "@logto/react"
import { useQuery } from "@tanstack/react-query"
import { setAccessToken, setIsAuthenticated } from "./useAuthStore"

export function useAuth() {
  const { isAuthenticated, getIdTokenClaims, getAccessToken, isLoading: isChecking, signIn, signOut } = useLogto()
  const claimQuery = useQuery({
    queryKey: ["claim"],
    enabled: isAuthenticated,
    queryFn: () => getIdTokenClaims(),
  })
  const accessTokenQuery = useQuery({
    queryKey: ["access_token"],
    enabled: isAuthenticated,
    queryFn: () => getAccessToken("http://flow-editor-server.com"),
  })

  function login() {
    signIn(new URL("/callback", window.location.origin).toString())
  }

  function logout() {
    signOut(new URL("/login", window.location.origin).toString())
  }

  useEffect(() => {
    const { isSuccess, data } = accessTokenQuery
    if (isSuccess && data) {
      setAccessToken(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessTokenQuery])

  useEffect(() => {
    setIsAuthenticated(isAuthenticated)
  }, [isAuthenticated])

  return {
    isChecking,
    isAuthenticated,
    isLoadingClaim: claimQuery.isLoading,
    isLoadingToken: accessTokenQuery.isLoading,
    account: claimQuery.data,
    login,
    logout,
  }
}
