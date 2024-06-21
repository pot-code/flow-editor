import { RouterProvider } from "@tanstack/react-router"
import router from "./router"
import { useQueryClient } from "@tanstack/react-query"

export default function App() {
  const client = useQueryClient()
  return <RouterProvider router={router} context={{ queryClient: client }} />
}
