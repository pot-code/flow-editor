import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ReactShapeConfig } from "@antv/x6-react-shape"
import { Equals } from "@phosphor-icons/react"
import { NodeContainer, NodeContent, NodeHeader } from "./layout"

// eslint-disable-next-line react-refresh/only-export-components
function Result() {
  return (
    <NodeContainer>
      <NodeHeader>
        <div className="flex items-center gap-2">
          <Equals />
          <span>结果</span>
        </div>
      </NodeHeader>
      <Separator />
      <NodeContent className="px-2">
        <Input disabled type="number" value={0} />
      </NodeContent>
    </NodeContainer>
  )
}

export default {
  shape: "result",
  width: 200,
  effect: ["data"],
  component: Result,
} as ReactShapeConfig
