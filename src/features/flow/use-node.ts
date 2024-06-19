import { getConnectedEdges, useReactFlow } from "reactflow"

export default function useNode(id: string) {
  const instance = useReactFlow()

  const getEdges = useCallback(() => {
    const node = instance.getNode(id)
    const edges = instance.getEdges()
    return node ? getConnectedEdges([node], edges) : []
  }, [id, instance])

  const getOutgoingEdges = useCallback(
    (handleId: string) => {
      const edges = getEdges()
      return edges.filter((e) => e.source === id && e.sourceHandle === handleId)
    },
    [getEdges, id],
  )

  const getIncomingEdges = useCallback(
    (handleId: string) => {
      const edges = getEdges()
      return edges.filter((e) => e.target === id && e.targetHandle === handleId)
    },
    [getEdges, id],
  )

  const isHandleConnected = useCallback(
    (handleId: string) => getIncomingEdges(handleId).length > 0 || getOutgoingEdges(handleId).length > 0,
    [getIncomingEdges, getOutgoingEdges],
  )

  return {
    isHandleConnected,
    getIncomingEdges,
    getOutgoingEdges,
  }
}
