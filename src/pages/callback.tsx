import { setIsAuthenticated, setAccessToken, setUser } from "@/features/auth/useAuthStore"
import zitadel from "@/features/auth/zitadel"
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
      setUser({
        name: user.profile.name,
        avatar: user.profile.picture,
      })
      navigate({ to: "/", replace: true })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
