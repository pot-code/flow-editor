import React from "react"
import { createRoot } from "react-dom/client"

import App from "./app"
import setup from "./setup"

import "reactflow/dist/style.css"
import { Toaster } from "./components/ui/toaster"
import "./styles/main.scss"

const root = createRoot(document.getElementById("root") as Element)

setup().then(() =>
  root.render(
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>,
  ),
)
