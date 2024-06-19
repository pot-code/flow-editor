import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { NodeProps, Position } from "reactflow"
import InputHandle from "../editor/input-handle"

const Result = memo<NodeProps>(({ data }) => {
  return (
    <Card>
      <CardHeader>结果</CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <Input disabled type="number" value={data.value} />
      </CardContent>
      <InputHandle id="value" position={Position.Left} />
    </Card>
  )
})

export default Result
