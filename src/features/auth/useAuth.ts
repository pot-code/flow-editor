import { useLogto } from "@logto/react"
import { useQuery } from "@tanstack/react-query"
import { setAccessToken, setIsAuthenticated } from "./useAuthStore"

export function useAuth() {
  const [isLoadingToken, setIsLoadingToken] = useState(true)
  const { isAuthenticated, getIdTokenClaims, getAccessToken, isLoading: isChecking, signIn } = useLogto()
  const { data, isSuccess } = useQuery({
    queryKey: ["auth"],
    enabled: isAuthenticated,
    queryFn: () => getIdTokenClaims(),
  })

  function login() {
    signIn(new URL("/callback", window.location.origin).toString())
  }

  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      getAccessToken("http://flow-editor-server.com")
        .then((t) => {
          if (!t) return
          setAccessToken(t)
        })
        .finally(() => setIsLoadingToken(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isSuccess])

  useEffect(() => {
    setIsAuthenticated(isAuthenticated)
  }, [isAuthenticated])

  return { isChecking, isLoadingToken, isAuthenticated, account: data, login }
}
