import useAuthStore from "@/features/auth/useAuthStore"
import zitadel from "@/lib/auth/zitadel"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { isNil } from "lodash-es"

export const Route = createFileRoute("/callback")({
  component: Callback,
})

function Callback() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      zitadel.userManager.signinRedirectCallback().then((user) => {
        setIsAuthenticated(true)
        setUser(user)
        redirect({ to: "/" })
      })
    } else {
      zitadel.userManager.getUser().then((user) => {
        if (isNil(user)) {
          setIsAuthenticated(false)
        }
        setUser(user)
        redirect({ to: "/" })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return null
}
