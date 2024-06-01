import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/logout")({
  component: () => (
    <div>
      <p>You have been logged out</p>
      <Link to={"/"}>Go Home</Link>
    </div>
  ),
})
