import { CSSProperties } from "react"
import { Handle, HandleProps, useNodeId } from "reactflow"
import useHandle from "./use-handle"

export interface InputHandleProps extends Omit<HandleProps, "type"> {
  id: string
  style?: CSSProperties
  limit?: number
}

export default function InputHandle({ id, limit = 1, ...rest }: InputHandleProps) {
  const nodeId = useNodeId()!
  const { getIncomingEdges } = useHandle()

  return <Handle type="target" id={id} isConnectable={getIncomingEdges(nodeId, id).length < limit} {...rest} />
}
