import { getFlow } from "@/api/flow"
import useAuthStore from "@/features/auth/useAuthStore"
import zitadel from "@/features/auth/zitadel"
import { Link, createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) throw redirect({ to: "/login" })
  },
  loader: () => getFlow(),
  component: Home,
})

function Home() {
  const { data } = Route.useLoaderData()
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <p>Welcome home! {user.name}</p>
      <img className="object-cover rounded-full aspect-square object-bottom" height={64} width={64} src={user.avatar} />
      <li>{data?.map((flow) => <p key={flow.id}>{flow.title}</p>)}</li>
      <div className="flex gap-4">
        <Link to={"/about"}>About</Link>
        <button onClick={() => zitadel.signout()}>Logout</button>
      </div>
    </div>
  )
}
