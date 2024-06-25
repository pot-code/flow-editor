import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { ReactShapeConfig } from "@antv/x6-react-shape"
import { Plus } from "@phosphor-icons/react"
import { NodeActions, NodeContainer, NodeContent, NodeHeader } from "./layout"

// eslint-disable-next-line react-refresh/only-export-components
function Add() {
  return (
    <NodeContainer>
      <NodeActions />
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
  shape: "add",
  width: 150,
  effect: ["data"],
  component: Add,
} as ReactShapeConfig
