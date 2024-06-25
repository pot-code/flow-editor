import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X } from "@phosphor-icons/react"
import { NodeContainer, NodeContent, NodeHeader } from "./layout"
import { ReactShapeConfig } from "@antv/x6-react-shape"

// eslint-disable-next-line react-refresh/only-export-components
function Multiply() {
  return (
    <NodeContainer>
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
