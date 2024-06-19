import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Handle, NodeProps, Position } from "reactflow"
import { useDataFlowContext } from "../editor/use-data-flow-context"
import { NodeData } from "./types"

const NumberInput = memo<NodeProps<NodeData<number>>>(({ id, isConnectable, data }) => {
  const [value, setValue] = useState(data.value || 0)
  const { createSource } = useDataFlowContext()
  const channel = useMemo(() => createSource(id), [createSource, id])

  const onConnect = useCallback(() => {
    channel.publish(data.value)
  }, [data.value, channel])

  const onBlur = useCallback(() => {
    channel.publish(value)
  }, [channel, value])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }, [])

  useEffect(() => {
    channel.publish(data.value)
  }, [data.value, channel])

  return (
    <>
      <Card>
        <CardHeader>数值</CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Input
            className="nodrag"
            type="number"
            placeholder="请输入数字"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        </CardContent>
      </Card>
      <Handle id="value" type="source" position={Position.Right} isConnectable={isConnectable} onConnect={onConnect} />
    </>
  )
})

export default NumberInput
