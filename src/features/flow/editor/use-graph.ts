import { produce } from "immer"
import { Connection, Edge, Node, addEdge, useEdgesState, useNodesState } from "reactflow"
import { DataControllerRef } from "./data-controller"

export default function useGraph() {
  const controllerRef = useRef<DataControllerRef>(null!)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (c: Connection) => {
      controllerRef.current.addConnection(c)
      setEdges((eds) => addEdge(c, eds))
    },
    [setEdges],
  )

  const onEdgesDelete = useCallback((edges: Edge[]) => {
    edges.forEach((edge) => {
      controllerRef.current.removeConnection(edge as Connection)
    })
  }, [])

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

  return {
    controllerRef,
    nodes,
    edges,
    setEdges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onEdgesDelete,
    onConnect,
    addNode,
  }
}
