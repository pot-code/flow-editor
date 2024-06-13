import { useLogto } from "@logto/react"
import { RouterProvider } from "@tanstack/react-router"
import router from "./router"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useToast } from "./components/ui/use-toast"
import RefreshToken from "./features/auth/refresh-token"

export default function App() {
  const { isAuthenticated, isLoading } = useLogto()
  const { toast } = useToast()
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            })
          },
        }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  if (isLoading && !isAuthenticated) return null

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ isAuthenticated, queryClient }} />
      <RefreshToken />
    </QueryClientProvider>
  )
}
