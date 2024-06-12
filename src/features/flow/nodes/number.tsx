import { Handle, NodeProps, Position } from "reactflow"
import useNode from "../use-node"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useDataFlowContext } from "../editor/user-data-flow-context"

const Number = memo<NodeProps>(({ id, isConnectable, data }) => {
  const [value, setValue] = useState(data.value)
  const { getDataSource } = useDataFlowContext()
  const dataSource = useMemo(() => getDataSource(id), [getDataSource, id])
  const { setNodeData } = useNode(id)

  const onConnect = useCallback(() => {
    dataSource.publish(data.value)
  }, [data.value, dataSource])

  const onBlur = useCallback(() => {
    setNodeData({ value })
  }, [setNodeData, value])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value || 0)
  }, [])

  useEffect(() => {
    dataSource.publish(data.value)
  }, [data.value, dataSource])

  return (
    <>
      <Card>
        <CardHeader>Number</CardHeader>
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

export default Number
