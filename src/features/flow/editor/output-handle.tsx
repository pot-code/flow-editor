import { CSSProperties } from "react"
import { Handle, HandleProps, useNodeId } from "reactflow"
import { useDataFlowContext } from "./use-data-flow-context"

export interface OutputHandleProps extends Omit<HandleProps, "type"> {
  id: string
  value: any
  style?: CSSProperties
}

export default function OutputHandle({ id, value, ...rest }: OutputHandleProps) {
  const nodeId = useNodeId()!
  const { getSource } = useDataFlowContext()
  const dataSource = useMemo(() => getSource({ nodeId, handleId: id }), [getSource, id, nodeId])

  const onConnect = useCallback(() => {
    dataSource.publish(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dataSource.publish(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <Handle type="source" id={id} onConnect={onConnect} {...rest} />
}
