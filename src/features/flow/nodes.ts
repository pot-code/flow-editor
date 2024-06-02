import { ComponentType } from "react"
import { NodeProps } from "reactflow"

export function getNodeTypes() {
  const nodes = import.meta.glob("./nodes/*.tsx", { eager: true })

  return Object.fromEntries(
    Object.entries(nodes).map(([path, mod]) => {
      const { default: component } = mod as { default: ComponentType<NodeProps> }
      return [path.slice(8).replace(".tsx", ""), component]
    }),
  )
}
