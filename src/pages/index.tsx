import Auth from "@/features/auth/Auth"
import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: () => (
    <Auth>
      <div>Welcome home!</div>
      <Link to={"/about"}>About</Link>
    </Auth>
  ),
})
