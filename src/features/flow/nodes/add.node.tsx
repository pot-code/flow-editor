import { Handle, NodeProps, Position } from "reactflow"
import { isNil } from "lodash-es"
import useNode from "../use-node"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useDataFlowContext } from "../editor/use-data-flow-context"

const Add = memo<NodeProps>(({ id, isConnectable, data }) => {
  const { createChannel } = useDataFlowContext()
  const { getIncomingEdges, isHandleConnected } = useNode(id)
  const channel = useMemo(() => createChannel(id), [createChannel, id])

  const effect = useCallback((d: typeof data) => {
    if (isNil(d.op1) || isNil(d.op2)) return undefined
    return Number(d.op1) + Number(d.op2)
  }, [])

  const onConnect = useCallback(() => {
    channel.publish(effect(data))
  }, [data, channel, effect])

  useEffect(() => {
    channel.publish(effect(data))
  }, [data, channel, effect])

  return (
    <Card>
      <CardHeader>加法</CardHeader>
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
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </Card>
  )
})

export default Add