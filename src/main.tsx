import { LogtoProvider } from "@logto/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import React from "react"
import { createRoot } from "react-dom/client"

import { Toaster } from "./components/ui/sonner"
import RefreshToken from "./features/auth/refresh-token"
import router from "./router"
import setup from "./setup"

import "reactflow/dist/style.css"
import App from "./app"
import client from "./lib/query/client"
import "./styles/main.scss"

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <React.StrictMode>
      <LogtoProvider
        config={{
          endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
          appId: import.meta.env.VITE_LOGTO_APP_ID,
          resources: [import.meta.env.VITE_LOGTO_API_RESOURCE],
        }}
      >
        <QueryClientProvider client={client}>
          <App />
          <RefreshToken />
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools router={router} />
        </QueryClientProvider>
      </LogtoProvider>
      <Toaster />
    </React.StrictMode>,
  ),
)
