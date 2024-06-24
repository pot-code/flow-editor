import { QueryCache, QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

function retry(failureCount: number, error: Error) {
  if (axios.isAxiosError(error) && error.status === 401) {
    return false
  }
  return failureCount < 3
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry,
    },
    mutations: {
      retry,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error("请求错误", {
        description: error.message,
      })
    },
  }),
})

export default queryClient
