import { QueryCache, QueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export default new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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
