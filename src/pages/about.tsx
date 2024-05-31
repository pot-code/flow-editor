import useAuthStore from "@/features/auth/useAuthStore"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/about")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) throw redirect({ to: "/login" })
  },
  component: () => <div>Hello /about!</div>,
})
