import { produce } from "immer"
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

  const updateHandleData = useCallback(
    (nodeId: string, handleId: string, data: any) => {
      instance.setNodes(
        produce((draft) => {
          draft
            .filter((node) => node.id === nodeId)
            .forEach((node) => {
              node.data[handleId] = data
            })
        }),
      )
    },
    [instance],
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
    updateHandleData,
    getIncomingEdges,
    getOutgoingEdges,
  }
}
