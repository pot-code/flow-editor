import React from "react"
import { createRoot } from "react-dom/client"
import { LogtoProvider } from "@logto/react"

import App from "./app"
import setup from "./setup"

import "reactflow/dist/style.css"
import { Toaster } from "./components/ui/toaster"
import "./styles/main.scss"
import { QueryClientProvider } from "@tanstack/react-query"
import client from "./lib/query/client"

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <React.StrictMode>
      <LogtoProvider
        config={{
          endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
          appId: import.meta.env.VITE_LOGTO_APP_ID,
          resources: ["http://flow.app.io"],
        }}
      >
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </LogtoProvider>
      <Toaster />
    </React.StrictMode>,
  ),
)
