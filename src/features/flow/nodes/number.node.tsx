import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { NodeProps, Position } from "reactflow"
import OutputHandle from "../editor/output-handle"

const NumberInput = memo<NodeProps>(({ isConnectable, data }) => {
  const [value, setValue] = useState(data.o)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }, [])

  return (
    <Card>
      <CardHeader>数值</CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <Input className="nodrag" type="number" placeholder="请输入数字" value={value} onChange={onChange} />
      </CardContent>
      <OutputHandle id="o" value={value} position={Position.Right} isConnectable={isConnectable} />
    </Card>
  )
})

export default NumberInput
