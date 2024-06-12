import { Button } from "@/components/ui/button"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/logout")({
  component: Logout,
})

function Logout() {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl">你已登出</h1>
      <Button variant="link" onClick={() => navigate({ to: "/login" })}>
        重新登录
      </Button>
    </div>
  )
}
