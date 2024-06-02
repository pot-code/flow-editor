import { getAccount } from "@/api/account"
import { setAccessToken, setIsAuthenticated, setUser } from "@/features/auth/useAuthStore"
import zitadel from "@/lib/auth/zitadel"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/callback")({
  component: Callback,
})

function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    zitadel.userManager.signinRedirectCallback().then(async (user) => {
      setIsAuthenticated(true)
      setAccessToken(user.access_token)
      const { data } = await getAccount()
      setUser({
        name: user.profile.name,
        avatar: user.profile.picture,
        ...data,
      })
      navigate({ to: "/", replace: true })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
