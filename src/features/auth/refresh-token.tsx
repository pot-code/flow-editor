import { AXIOS_INSTANCE, errorEvent } from "@/lib/http"
import { useLogto } from "@logto/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { debounce } from "lodash-es"

export default function RefreshToken() {
  const { isAuthenticated, getAccessToken } = useLogto()
  const { data, refetch } = useQuery({
    queryKey: ["access_token"],
    enabled: isAuthenticated,
    queryFn: () => getAccessToken(import.meta.env.VITE_LOGTO_API_RESOURCE),
  })
  const debouncedRefetch = useCallback(() => debounce(refetch, 200), [refetch])

  useEffect(() => {
    const sub = (e: Error) => {
      if (axios.isAxiosError(e) && e.status === 401) {
        debouncedRefetch()
      }
    }
    errorEvent.on("error", sub)
    return () => errorEvent.off("error", sub)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (data) {
    AXIOS_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${data}`
  }
  return null
}
