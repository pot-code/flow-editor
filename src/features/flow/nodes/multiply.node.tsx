import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { isNil } from "lodash-es"
import { Handle, NodeProps, Position } from "reactflow"
import { useDataFlowContext } from "../editor/use-data-flow-context"
import useNode from "../editor/use-node"

const Multiply = memo<NodeProps>(({ id, isConnectable, data }) => {
  const { getSource } = useDataFlowContext()
  const { getIncomingEdges, isHandleConnected } = useNode(id)
  const dataSource = useMemo(() => getSource(id), [getSource, id])

  const effect = useCallback((d: typeof data) => {
    if (isNil(d.op1) || isNil(d.op2)) return undefined
    return Number(d.op1) * Number(d.op2)
  }, [])

  useEffect(() => {
    dataSource.publish(effect(data))
  }, [data, dataSource, effect])

  return (
    <Card>
      <CardHeader>乘法</CardHeader>
      <Separator />
      <CardContent className="flex pt-4 flex-col gap-2">
        <Badge variant={isHandleConnected("op1") ? "default" : "secondary"}>Input: {data.op1 ?? "空数据"}</Badge>
        <Badge variant={isHandleConnected("op2") ? "default" : "secondary"}>Input: {data.op2 ?? "空数据"}</Badge>
      </CardContent>
      <Handle
        id="op1"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 65 }}
        isConnectable={getIncomingEdges("op1").length < 1}
      />
      <Handle
        id="op2"
        type="target"
        position={Position.Left}
        style={{ top: "auto", bottom: 25 }}
        isConnectable={getIncomingEdges("op2").length < 1}
      />
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} />
    </Card>
  )
})

export default Multiply
