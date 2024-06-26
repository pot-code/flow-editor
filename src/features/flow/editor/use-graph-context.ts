import { GraphContext } from "./graph-context"
import { useContext } from "react"

export function useGraphContext() {
  const context = useContext(GraphContext)
  if (!context) {
    throw new Error("useGraphContext must be used within a GraphContextProvider")
  }
  return context
}
