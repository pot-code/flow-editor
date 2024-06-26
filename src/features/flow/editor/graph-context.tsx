import { Graph } from "@antv/x6"
import { createContext } from "react"

export const GraphContext = createContext<Graph>(null!)

type GraphContextProps = {
  graph: Graph
  children: React.ReactNode
}

export default function GraphContextProvider({ graph, children }: GraphContextProps) {
  return <GraphContext.Provider value={graph}>{children}</GraphContext.Provider>
}
