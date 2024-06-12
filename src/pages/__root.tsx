import AuthContextProvider from "@/features/auth/auth-context"
import { AXIOS_INSTANCE } from "@/lib/http"
import time from "@/utils/time"
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
        refetchInterval: 10 * time.Second,
        queryFn: () => getAccessToken("http://flow.app.io"),
      },
    ],
  })
  const [claim, accessToken] = results

  if (isAuthenticated && results.some((result) => result.isLoading)) {
    return null
  }

  AXIOS_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${accessToken.data}`

  return (
    <AuthContextProvider data={{ claim: claim.data }}>
      <Outlet />
    </AuthContextProvider>
  )
}
