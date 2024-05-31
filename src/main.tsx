import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"

import { queryClient } from "./lib/query"
import setup from "./setup"

import App from "./app"
import "./styles/main.scss"

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>,
  ),
)
