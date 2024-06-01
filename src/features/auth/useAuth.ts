import { isNil } from "lodash-es"
import { setAccessToken, setIsAuthenticated, setUser } from "./useAuthStore"
import zitadel from "./zitadel"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    zitadel.userManager
      .getUser()
      .then((user) => {
        setIsAuthenticated(!isNil(user))
        if (!isNil(user)) {
          setAccessToken(user.access_token)
          setUser({
            name: user.profile.name,
            avatar: user.profile.picture,
          })
        }
      })
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isLoading,
  }
}
