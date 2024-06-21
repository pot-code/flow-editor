import { LogtoProvider } from "@logto/react"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import React from "react"
import { createRoot } from "react-dom/client"
import { toast } from "sonner"

import { Toaster } from "./components/ui/sonner"
import RefreshToken from "./features/auth/refresh-token"
// import router from "./router"
import App from "./app"
import setup from "./setup"

import "./styles/main.scss"

const root = createRoot(document.getElementById("root") as Element)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error("请求错误", {
        description: error.message,
      })
    },
  }),
})

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
        <QueryClientProvider client={queryClient}>
          <App />
          <RefreshToken />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          {/* <TanStackRouterDevtools router={router} /> */}
        </QueryClientProvider>
      </LogtoProvider>
      <Toaster richColors toastOptions={{ closeButton: true }} />
    </React.StrictMode>,
  ),
)
