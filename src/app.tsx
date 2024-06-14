import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { useToast } from "./components/ui/use-toast"
import RefreshToken from "./features/auth/refresh-token"
import router from "./router"

export default function App() {
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

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
      <RefreshToken />
    </QueryClientProvider>
  )
}
