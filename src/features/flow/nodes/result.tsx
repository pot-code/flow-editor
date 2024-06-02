import { Handle, NodeProps, Position } from "reactflow"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Divider } from "@nextui-org/divider"
import useNode from "../use-node"

const Result = memo<NodeProps>(({ id, data }) => {
  const { limitConnection, isConnected } = useNode(id)
  return (
    <>
      <Card>
        <CardHeader>Result</CardHeader>
        <Divider />
        <CardBody>
          <Input
            isReadOnly
            className="nodrag"
            color={isConnected("target", "value") ? "success" : "default"}
            size="sm"
            type="number"
            value={data.value}
          />
        </CardBody>
      </Card>
      <Handle id="value" type="target" position={Position.Left} isConnectable={limitConnection("target", "value", 1)} />
    </>
  )
})

export default Result
