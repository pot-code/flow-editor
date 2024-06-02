import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { createRoot } from "react-dom/client"

import { queryClient } from "./lib/query"
import setup from "./setup"
import App from "./app"

import "reactflow/dist/style.css"
import "./styles/main.scss"
import { ToastProvider } from "./components/toast"
import { NextUIProvider } from "@nextui-org/system"

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <ToastProvider>
          <NextUIProvider locale="zh-CN">
            <App />
          </NextUIProvider>
        </ToastProvider>
      </React.StrictMode>
    </QueryClientProvider>,
  ),
)
