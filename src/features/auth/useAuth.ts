import { isNil } from "lodash-es"
import { setAccessToken, setIsAuthenticated, setUser } from "./useAuthStore"
import { getAccount } from "@/api/account"
import zitadel from "@/lib/auth/zitadel"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    zitadel.userManager
      .getUser()
      .then(async (user) => {
        setIsAuthenticated(!isNil(user))

        if (!isNil(user)) {
          setAccessToken(user.access_token)
          const account = await getAccount()
          setUser({
            name: user.profile.name,
            avatar: user.profile.picture,
            ...account,
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
