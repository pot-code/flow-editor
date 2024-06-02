import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"

import App from "./app"
import { queryClient } from "./lib/query"
import setup from "./setup"

import "reactflow/dist/style.css"
import "./styles/main.scss"
import { Toaster } from "./components/ui/toaster"

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    </QueryClientProvider>,
  ),
)
