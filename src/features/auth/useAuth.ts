import { isNil } from "lodash-es"
import zitadel from "./zitadel"
import { setIsAuthenticated, setUser } from "./useAuthStore"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    zitadel.userManager
      .getUser()
      .then((user) => {
        setUser(user)
        setIsAuthenticated(!isNil(user))
      })
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isLoading,
  }
}
