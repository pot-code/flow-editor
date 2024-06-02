import { getConnectedEdges, useReactFlow, useStore } from "reactflow"

export default function useNode(id: string) {
  const instance = useReactFlow()
  const edges = useStore((state) => state.edges)

  const limitConnection = useCallback(
    (handleType: "source" | "target", handleId: string, count: number) => {
      const node = instance.getNode(id)
      if (node) {
        const connectedEdges = getConnectedEdges([node], edges)
        const connections = connectedEdges.filter(
          (e) => e[handleType] === id && e[`${handleType}Handle`] === handleId,
        ).length
        if (connections >= count) {
          return false
        }
      }
      return true
    },
    [edges, id, instance],
  )

  const isConnected = useCallback(
    (handleType: "source" | "target", handleId: string) => {
      const node = instance.getNode(id)
      if (node) {
        const connectedEdges = getConnectedEdges([node], edges)
        return connectedEdges.some((e) => e[handleType] === id && e[`${handleType}Handle`] === handleId)
      }
      return false
    },
    [edges, id, instance],
  )

  const setNodeData = useCallback(
    (data: any) => {
      instance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return { ...node, data }
          }
          return node
        }),
      )
    },
    [id, instance],
  )

  return {
    setNodeData,
    isConnected,
    limitConnection,
  }
}
