import useHandle from "./use-handle"

export default function useNode(id: string) {
  const { getIncomingEdges, getOutgoingEdges } = useHandle()

  const isHandleConnected = useCallback(
    (handleId: string) => getIncomingEdges(id, handleId).length > 0 || getOutgoingEdges(id, handleId).length > 0,
    [getIncomingEdges, getOutgoingEdges, id],
  )

  return {
    isHandleConnected,
  }
}
