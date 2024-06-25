import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { ReactShapeConfig } from "@antv/x6-react-shape"
import { Plus, Trash } from "@phosphor-icons/react"
import { ActionButton, NodeActions, NodeContainer, NodeContent, NodeHeader } from "./layout"
import { NodeProps } from "./typings"

// eslint-disable-next-line react-refresh/only-export-components
function Add({ node }: NodeProps) {
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
          <Plus />
          <span>加法</span>
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
  component: Add,
  shape: "add",
  width: 150,
  effect: ["data"],
  ports: {
    groups: {
      output: {
        position: "right",
        attrs: {
          circle: {
            magnet: true,
            fill: "#000",
            stroke: "none",
            r: 5,
          },
        },
      },
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
        group: "output",
        args: {
          dy: 45,
        },
      },
      {
        group: "input",
        args: {
          dy: 60,
        },
      },
      {
        group: "input",
        args: {
          dy: 90,
        },
      },
    ],
  },
} as ReactShapeConfig
