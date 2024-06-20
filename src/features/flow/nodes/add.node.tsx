import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { isNil } from "lodash-es"
import { NodeProps, Position } from "reactflow"
import InputHandle from "../editor/input-handle"
import OutputHandle from "../editor/output-handle"
import useHandle from "../editor/use-handle"

const Add = memo<NodeProps<{ i1?: number; i2?: number; o?: number }>>(({ id, isConnectable, data }) => {
  const { isHandleConnected } = useHandle()

  const effect = useCallback((d: typeof data) => {
    if (isNil(d.i1) || isNil(d.i2)) return undefined
    return Number(d.i1) + Number(d.i2)
  }, [])

  return (
    <Card>
      <CardHeader>加法</CardHeader>
      <Separator />
      <CardContent className="flex pt-4 flex-col gap-2">
        <Badge variant={isHandleConnected(id, "i1") ? "default" : "secondary"}>Input: {data.i1 ?? "空数据"}</Badge>
        <Badge variant={isHandleConnected(id, "i2") ? "default" : "secondary"}>Input: {data.i2 ?? "空数据"}</Badge>
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
