import zitadel from "@/lib/auth/zitadel"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
  onEnter: () => {
    zitadel.authorize()
  },
  component: () => null,
})
