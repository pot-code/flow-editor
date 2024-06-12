import AuthContextProvider from "@/features/auth/auth-context"
import { AXIOS_INSTANCE } from "@/lib/http"
import { useLogto } from "@logto/react"
import { QueryClient, useQueries } from "@tanstack/react-query"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"

interface RouterContext {
  isAuthenticated: boolean
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
})

function Root() {
  const { isAuthenticated, getIdTokenClaims, getAccessToken } = useLogto()
  const results = useQueries({
    queries: [
      {
        queryKey: ["claim"],
        enabled: isAuthenticated,
        queryFn: () => getIdTokenClaims(),
      },
      {
        queryKey: ["access_token"],
        enabled: isAuthenticated,
        queryFn: () => getAccessToken("http://flow.app.io"),
      },
    ],
  })
  const [claim, accessToken] = results

  useEffect(() => {
    const { data, isSuccess } = accessToken
    if (isSuccess && data) {
      AXIOS_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${data}`
    }
  }, [accessToken])

  if (isAuthenticated && results.some((result) => result.isLoading)) {
    return null
  }

  return (
    <AuthContextProvider data={{ claim: claim.data }}>
      <Outlet />
    </AuthContextProvider>
  )
}
