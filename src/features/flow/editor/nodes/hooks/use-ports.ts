import { Node } from "@antv/x6"
import { useDataFlowContext } from "../../use-data-flow-context"

export default function usePorts(node: Node) {
  const { getChannel } = useDataFlowContext()
  const inputs = useMemo(() => node.getPortsByGroup("input").map((port) => getChannel(port.id!)), [getChannel, node])
  const outputs = useMemo(() => node.getPortsByGroup("output").map((port) => getChannel(port.id!)), [getChannel, node])

  return { inputs, outputs }
}
