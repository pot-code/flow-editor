import { produce } from "immer"
import { Connection, Edge, Node, ReactFlowInstance, addEdge, useEdgesState, useNodesState } from "reactflow"
import { DataConnection } from "./data-flow-context"
import { useDataFlowContext } from "./use-data-flow-context"

export default function useGraph() {
  const instanceRef = useRef<ReactFlowInstance>()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { getSource, removeSource } = useDataFlowContext()

  const removeConnection = useCallback(
    (c: DataConnection) => {
      setNodes(
        produce((draft) => {
          draft
            .filter((node) => node.id === c.source)
            .forEach((node) => {
              delete node.data[c.sourceHandle!]
            })
          draft
            .filter((node) => node.id === c.target)
            .forEach((node) => {
              delete node.data[c.targetHandle!]
            })
        }),
      )
      const source = getSource(c.source!)
      source.unsubscribe(c)
    },
    [getSource, setNodes],
  )

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges],
  )

  const onNodesDelete = useCallback(
    (nodes: Node[]) => {
      nodes.forEach((node) => {
        removeSource(node.id)
      })
    },
    [removeSource],
  )

  const onEdgesDelete = useCallback(
    (edges: Edge[]) => {
      edges.forEach((edge) => {
        removeConnection(edge)
      })
    },
    [removeConnection],
  )

  // TODO: use DnD
  function addNode(nodeType: string) {
    const node: Node = {
      type: nodeType,
      id: Date.now().toString(),
      position: { x: 0, y: 0 },
      data: {},
    }
    setNodes(
      produce((draft) => {
        draft.push(node)
      }),
    )
  }

  function setInstance(instance: ReactFlowInstance) {
    instanceRef.current = instance
  }

  return {
    instanceRef,
    nodes,
    edges,
    setEdges,
    setNodes,
    onNodesChange,
    onNodesDelete,
    onEdgesChange,
    onEdgesDelete,
    onConnect,
    addNode,
    removeConnection,
    setInstance,
  }
}
