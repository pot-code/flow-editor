import { getConnectedEdges, useReactFlow } from "reactflow"

export default function useHandle() {
  const instance = useReactFlow()

  const getEdges = useCallback(
    (nodeId: string) => {
      const node = instance.getNode(nodeId)
      const edges = instance.getEdges()
      return node ? getConnectedEdges([node], edges) : []
    },
    [instance],
  )

  const getOutgoingEdges = useCallback(
    (nodeId: string, handleId: string) => {
      const edges = getEdges(nodeId)
      return edges.filter((e) => e.source === nodeId && e.sourceHandle === handleId)
    },
    [getEdges],
  )

  const getIncomingEdges = useCallback(
    (nodeId: string, handleId: string) => {
      const edges = getEdges(nodeId)
      return edges.filter((e) => e.target === nodeId && e.targetHandle === handleId)
    },
    [getEdges],
  )

  const isHandleConnected = useCallback(
    (nodeId: string, handleId: string) =>
      getIncomingEdges(nodeId, handleId).length > 0 || getOutgoingEdges(nodeId, handleId).length > 0,
    [getIncomingEdges, getOutgoingEdges],
  )

  return {
    isHandleConnected,
    getIncomingEdges,
    getOutgoingEdges,
  }
}
