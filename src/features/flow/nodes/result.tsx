import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Handle, NodeProps, Position } from "reactflow"
import useNode from "../use-node"

const Result = memo<NodeProps>(({ id, data }) => {
  const { limitConnection } = useNode(id)
  return (
    <>
      <Card>
        <CardHeader>Result</CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Input disabled type="number" value={data.value} />
        </CardContent>
      </Card>
      <Handle id="value" type="target" position={Position.Left} isConnectable={limitConnection("target", "value", 1)} />
    </>
  )
})

export default Result
