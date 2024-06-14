import { RouterProvider } from "@tanstack/react-router"
import client from "./lib/query/client"
import router from "./router"

export default function App() {
  return <RouterProvider router={router} context={{ queryClient: client }} />
}
