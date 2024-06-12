import { createRouter } from "@tanstack/react-router"
import { routeTree } from "./routes.gen"

export default createRouter({
  routeTree,
  context: {
    isAuthenticated: false,
    queryClient: null!,
  },
})
