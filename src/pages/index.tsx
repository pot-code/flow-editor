import useAuthStore from "@/features/auth/useAuthStore"
import { Link, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) throw redirect({ to: "/login" })
  },
  component: () => (
    <div>
      <h1>Welcome home!</h1>
      <Link to={"/about"}>About</Link>
    </div>
  ),
})
