import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ReactShapeConfig } from "@antv/x6-react-shape"
import { Equals, Trash } from "@phosphor-icons/react"
import { ActionButton, NodeActions, NodeContainer, NodeContent, NodeHeader } from "./layout"
import { NodeProps } from "./typings"

// eslint-disable-next-line react-refresh/only-export-components
function Result({ node }: NodeProps) {
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
  component: Result,
  shape: "result",
  width: 200,
  effect: ["data"],
  ports: {
    groups: {
      input: {
        position: "left",
        attrs: {
          circle: {
            magnet: true,
            fill: "#000",
            stroke: "none",
            r: 5,
          },
        },
      },
    },
    items: [
      {
        group: "input",
        args: {
          dy: 45,
        },
      },
    ],
  },
} as ReactShapeConfig
