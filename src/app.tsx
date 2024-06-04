import { RouterProvider } from "@tanstack/react-router"
import { useAuth } from "./features/auth/useAuth"
import router from "./router"
import { useToast } from "./components/ui/use-toast"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function App() {
  const { isLoading } = useAuth()
  const { toast } = useToast()
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
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

  if (isLoading) return null

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
