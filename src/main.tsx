import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"

import { routeTree } from "./routes.gen"
import setup from "./setup"

import { RouterProvider, createRouter } from "@tanstack/react-router"
import "./styles/main.scss"

// Import the generated route tree

// Create a new router instance

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
})

const router = createRouter({ routeTree })
const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>,
  ),
)
