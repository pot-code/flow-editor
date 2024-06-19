import { CSSProperties } from "react"
import { Connection, Handle, HandleProps, useNodeId } from "reactflow"
import { useDataFlowContext } from "./use-data-flow-context"
import useHandle from "./use-handle"

export interface InputHandleProps extends Omit<HandleProps, "type"> {
  id: string
  style?: CSSProperties
  limit?: number
}

export default function InputHandle({ id, limit = 1, ...rest }: InputHandleProps) {
  const nodeId = useNodeId()!
  const { getIncomingEdges, updateHandleData } = useHandle()
  const { getSource } = useDataFlowContext()

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("🚀 ~ InputHandle ~ connection:", connection)
      const source = getSource(connection.source!)
      source.subscribe(connection, (data) => {
        updateHandleData(nodeId, id, data)
      })
    },
    [getSource, id, nodeId, updateHandleData],
  )

  return (
    <Handle
      type="target"
      id={id}
      isConnectable={getIncomingEdges(nodeId, id).length < limit}
      onConnect={onConnect}
      {...rest}
    />
  )
}
