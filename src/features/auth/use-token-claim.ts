import { useLogto } from "@logto/react"
import { useQuery } from "@tanstack/react-query"

export default function useTokenClaim() {
  const { isAuthenticated, getIdTokenClaims } = useLogto()

  return useQuery({
    queryKey: ["claim"],
    enabled: isAuthenticated,
    queryFn: () => getIdTokenClaims(),
  })
}
