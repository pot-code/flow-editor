import Loading from "@/components/ui/loading"
import { useHandleSignInCallback } from "@logto/react"
import { Navigate, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/callback")({
  component: Callback,
})

function Callback() {
  const { isLoading, isAuthenticated } = useHandleSignInCallback()

  if (isLoading) return <Loading loading title="正在跳转..." />

  if (isAuthenticated) return <Navigate to={"/"} />

  return null
}
