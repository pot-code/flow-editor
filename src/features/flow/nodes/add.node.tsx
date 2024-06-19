import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { isNil } from "lodash-es"
import { NodeProps, Position } from "reactflow"
import InputHandle from "../editor/input-handle"
import OutputHandle from "../editor/output-handle"
import useNode from "../editor/use-node"

const Add = memo<NodeProps>(({ id, isConnectable, data }) => {
  const { isHandleConnected } = useNode(id)

  const effect = useCallback((d: typeof data) => {
    if (isNil(d.op1) || isNil(d.op2)) return undefined
    return Number(d.op1) + Number(d.op2)
  }, [])

  return (
    <Card>
      <CardHeader>加法</CardHeader>
      <Separator />
      <CardContent className="flex pt-4 flex-col gap-2">
        <Badge variant={isHandleConnected("i1") ? "default" : "secondary"}>Input: {data.i1 ?? "空数据"}</Badge>
        <Badge variant={isHandleConnected("i2") ? "default" : "secondary"}>Input: {data.i2 ?? "空数据"}</Badge>
      </CardContent>
      <InputHandle id="i1" position={Position.Left} style={{ top: "auto", bottom: 45 }} />
      <InputHandle id="i2" position={Position.Left} style={{ top: "auto", bottom: 15 }} />
      <OutputHandle
        id="o"
        value={effect(data)}
        position={Position.Right}
        style={{ top: "auto", bottom: 30 }}
        isConnectable={isConnectable}
      />
    </Card>
  )
})

export default Add
