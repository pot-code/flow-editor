import { CSSProperties } from "react"
import { Handle, HandleProps, useNodeId } from "reactflow"
import { useDataFlowContext } from "./use-data-flow-context"
import useHandle from "./use-handle"

export interface OutputHandleProps extends Omit<HandleProps, "type"> {
  id: string
  value: any
  style?: CSSProperties
}

export default function OutputHandle({ id, value, ...rest }: OutputHandleProps) {
  const nodeId = useNodeId()!
  const { updateHandleData } = useHandle()
  const { getSource } = useDataFlowContext()
  const dataSource = useMemo(() => getSource(nodeId), [getSource, nodeId])

  const onConnect = useCallback(() => {
    dataSource.publish(value)
  }, [dataSource, value])

  useEffect(() => {
    dataSource.publish(value)
    updateHandleData(nodeId, id, value)
  }, [dataSource, id, nodeId, updateHandleData, value])

  return <Handle type="source" id={id} onConnect={onConnect} {...rest} />
}
