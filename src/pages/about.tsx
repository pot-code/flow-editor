import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/about")({
  beforeLoad: ({ context: { isAuthenticated } }) => {
    if (!isAuthenticated) throw redirect({ to: "/login" })
  },
  component: () => <div>Hello /about!</div>,
})
