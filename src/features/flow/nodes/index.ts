import { ComponentType } from "react"
import { NodeProps } from "reactflow"

export function getNodeTypes() {
  const nodes = import.meta.glob("./*.node.tsx", { eager: true })

  return Object.fromEntries(
    Object.entries(nodes).map(([path, mod]) => {
      const { default: component } = mod as { default: ComponentType<NodeProps> }
      return [path.substring(2).split(".")[0], component]
    }),
  )
}
