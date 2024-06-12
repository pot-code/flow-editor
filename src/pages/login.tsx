import { useLogto } from "@logto/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
  component: Login,
})

function Login() {
  const { signIn } = useLogto()

  useEffect(() => {
    signIn(new URL("/callback", window.origin).toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
