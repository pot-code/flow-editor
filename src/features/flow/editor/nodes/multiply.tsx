import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ReactShapeConfig } from "@antv/x6-react-shape"
import { Trash, X } from "@phosphor-icons/react"
import { ActionButton, NodeActions, NodeContainer, NodeContent, NodeHeader } from "./layout"
import { NodeProps } from "./typings"

// eslint-disable-next-line react-refresh/only-export-components
function Multiply({ node }: NodeProps) {
  function onDelete() {
    node.remove()
  }

  return (
    <NodeContainer>
      <NodeActions>
        <ActionButton className="bg-destructive" onClick={onDelete}>
          <Trash size={14} className="text-destructive-foreground" />
        </ActionButton>
      </NodeActions>
      <NodeHeader>
        <div className="flex items-center gap-2">
          <X />
          <span>乘法</span>
        </div>
      </NodeHeader>
      <Separator />
      <NodeContent className="flex flex-col gap-2">
        <div className="relative">
          <div className="px-4">
            <Badge variant="default">Input: 空数据</Badge>
          </div>
        </div>
        <div className="relative">
          <div className="px-4">
            <Badge variant="default">Input: 空数据</Badge>
          </div>
        </div>
      </NodeContent>
    </NodeContainer>
  )
}

export default {
  shape: "multiply",
  effect: ["data"],
  width: 150,
  component: Multiply,
} as ReactShapeConfig
