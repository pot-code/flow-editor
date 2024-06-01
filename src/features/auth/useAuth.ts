import { isNil } from "lodash-es"
import { setAccessToken, setIsAuthenticated, setUser } from "./useAuthStore"
import zitadel from "./zitadel"
import { getAccount } from "@/api/account"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    zitadel.userManager
      .getUser()
      .then(async (user) => {
        setIsAuthenticated(!isNil(user))

        if (!isNil(user)) {
          setAccessToken(user.access_token)
          const { data } = await getAccount()
          setUser({
            name: user.profile.name,
            avatar: user.profile.picture,
            ...data,
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
