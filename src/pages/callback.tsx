import { setIsAuthenticated, setUser } from "@/features/auth/useAuthStore"
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
      setUser(user)
      navigate({ to: "/", replace: true })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
