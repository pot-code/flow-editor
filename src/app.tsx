import { useLogto } from "@logto/react"
import { RouterProvider } from "@tanstack/react-router"
import router from "./router"

export default function App() {
  const { isAuthenticated, isLoading } = useLogto()

  if (isLoading && !isAuthenticated) return null

  return <RouterProvider router={router} context={{ isAuthenticated }} />
}
