import useAuthStore from "@/features/auth/useAuthStore"
import zitadel from "@/lib/auth/zitadel"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/callback")({
  component: Callback,
})

function Callback() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      zitadel.userManager.signinRedirectCallback().then((user) => {
        console.log("🚀 ~ zitadel.userManager.signinRedirectCallback ~ user:", user)
        setIsAuthenticated(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return null
}
