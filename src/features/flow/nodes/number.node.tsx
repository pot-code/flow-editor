import { NodeHeader, NodeContent, Node } from "../editor/node"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { NodeProps, Position } from "reactflow"
import OutputHandle from "../editor/output-handle"
import { Hash } from "@phosphor-icons/react"

const NumberInput = memo<NodeProps>(({ isConnectable, data }) => {
  const [value, setValue] = useState(data.o || 0)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }, [])

  return (
    <Node>
      <NodeHeader>
        <div className="flex items-center gap-2">
          <Hash />
          <span>数值</span>
        </div>
      </NodeHeader>
      <Separator />
      <NodeContent className="px-2">
        <Input className="nodrag" type="number" placeholder="请输入数字" value={value} onChange={onChange} />
      </NodeContent>
      <OutputHandle id="o" value={value} position={Position.Right} isConnectable={isConnectable} />
    </Node>
  )
})

export default NumberInput
