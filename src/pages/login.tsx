import { useLogto } from "@logto/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
  component: Login,
})

function Login() {
  const { signIn } = useLogto()
  signIn("http://localhost:5173/callback")
  return null
}
