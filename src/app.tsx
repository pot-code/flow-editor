import { RouterProvider } from "@tanstack/react-router"
import { useAuth } from "./features/auth/useAuth"
import router from "./router"

export default function App() {
  const { isLoading } = useAuth()

  if (isLoading) return null

  return <RouterProvider router={router} />
}
