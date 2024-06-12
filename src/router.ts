import { createRouter } from "@tanstack/react-router"
import client from "./lib/query/client"
import { routeTree } from "./routes.gen"

export default createRouter({
  routeTree,
  context: {
    isAuthenticated: false,
    queryClient: client,
  },
})
