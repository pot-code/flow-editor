import Auth from "@/features/auth/Auth"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/about")({
  component: () => (
    <Auth>
      <div>Hello /about!</div>
    </Auth>
  ),
})
