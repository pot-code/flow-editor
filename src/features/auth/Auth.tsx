import { useQuery } from "@tanstack/react-query"
import { Navigate } from "@tanstack/react-router"
import useAuthStore from "./useAuthStore"
import zitadel from "./zitadel"
import { isNil } from "lodash-es"

export type AuthProps = {
  children?: React.ReactNode
}

export default function Auth({ children }: AuthProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthStore()
  const { isSuccess, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return zitadel.userManager.getUser()
    },
  })

  useEffect(() => {
    if (!isNil(data)) {
      setIsAuthenticated(true)
      setUser(data)
    }
    if (isSuccess) {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess])

  if (isLoading) return <h1>loading...</h1>

  if (isAuthenticated) return <>{children}</>

  return <Navigate to={"/login"} />
}
