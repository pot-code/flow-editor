import { useLogto } from "@logto/react"
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
})

function Authenticated() {
  const { isAuthenticated, isLoading } = useLogto()
  if (isLoading) return null
  if (!isAuthenticated) return <Navigate to={"/login"} />

  return <Outlet />
}
