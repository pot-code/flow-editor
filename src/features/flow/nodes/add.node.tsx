// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Plus } from "@phosphor-icons/react"
// import { isNil } from "lodash-es"
// import { NodeProps, Position } from "reactflow"
// import InputHandle from "../editor/input-handle"
// import { Node, NodeContent, NodeHeader } from "../editor/node"
// import OutputHandle from "../editor/output-handle"
// import useHandle from "../editor/use-handle"

// const Add = memo<NodeProps<{ i1?: number; i2?: number; o?: number }>>(({ id, isConnectable, data }) => {
//   const { isHandleConnected } = useHandle()

//   const effect = useCallback((d: typeof data) => {
//     if (isNil(d.i1) || isNil(d.i2)) return undefined
//     return Number(d.i1) + Number(d.i2)
//   }, [])

//   return (
//     <Node>
//       <NodeHeader>
//         <div className="flex items-center gap-2">
//           <Plus />
//           <span>加法</span>
//         </div>
//       </NodeHeader>
//       <Separator />
//       <NodeContent className="flex flex-col gap-2">
//         <div className="relative">
//           <div className="px-4">
//             <Badge variant={isHandleConnected(id, "i1") ? "default" : "secondary"}>Input: {data.i1 ?? "空数据"}</Badge>
//           </div>
//           <InputHandle id="i1" position={Position.Left} />
//         </div>
//         <div className="relative">
//           <div className="px-4">
//             <Badge variant={isHandleConnected(id, "i2") ? "default" : "secondary"}>Input: {data.i2 ?? "空数据"}</Badge>
//           </div>
//           <InputHandle id="i2" position={Position.Left} />
//         </div>
//       </NodeContent>
//       <OutputHandle id="o" value={effect(data)} position={Position.Right} isConnectable={isConnectable} />
//     </Node>
//   )
// })

// export default Add
