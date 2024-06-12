import { useAuth } from "@/features/auth/useAuth"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
  component: Login,
})

function Login() {
  const { login } = useAuth()
  login()
  return null
}
