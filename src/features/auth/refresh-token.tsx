import { AXIOS_INSTANCE, httpErrorStream } from "@/lib/http"
import { useLogto } from "@logto/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { debounceTime } from "rxjs"

export default function RefreshToken() {
  const { isAuthenticated, getAccessToken } = useLogto()
  const { data, refetch } = useQuery({
    queryKey: ["access_token"],
    enabled: isAuthenticated,
    queryFn: () => getAccessToken(import.meta.env.VITE_LOGTO_API_RESOURCE),
  })

  useEffect(() => {
    const sub = httpErrorStream.pipe(debounceTime(200)).subscribe((error) => {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        refetch()
      }
    })
    return () => sub.unsubscribe()
  }, [data, refetch])

  if (data) {
    AXIOS_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${data}`
  }
  return null
}
