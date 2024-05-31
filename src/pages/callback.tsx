import useAuthStore from "@/features/auth/useAuthStore"
import zitadel from "@/features/auth/zitadel"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/callback")({
  component: Callback,
})

function Callback() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser } = useAuthStore()

  useEffect(() => {
    zitadel.userManager.signinRedirectCallback().then((user) => {
      setIsAuthenticated(true)
      setUser(user)
      navigate({ to: "/" })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
