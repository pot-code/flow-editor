import { produce } from "immer"
import {
  Connection,
  Edge,
  EdgeChange,
  EdgeRemoveChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "reactflow"
import { useDataFlowContext } from "./context"
import useViewportCoordinate from "./use-viewport-coordinate"

export default function useGraph() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const instance = useReactFlow()
  const { graphRef, offsetToOrigin, getViewportWidth, getViewportHeight } = useViewportCoordinate()
  const { subscribe, unsubscribe, removeDataSource } = useDataFlowContext()

  function appendNode(type: string) {
    const [x, y] = offsetToOrigin(getViewportWidth() / 4, getViewportHeight() / 4)
    const node: Node = {
      type,
      id: Date.now().toString(),
      position: { x, y },
      data: {},
    }
    setNodes(
      produce((draft) => {
        draft.push(node)
      }),
    )
  }

  const onAddEdge = useCallback(
    (edge: Edge | Connection) => {
      const { source, target, targetHandle } = edge
      subscribe(source as string, target as string, targetHandle as string, (data) => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === target) {
              return { ...node, data: { ...node.data, [targetHandle as string]: data } }
            }
            return node
          }),
        )
      })
    },
    [subscribe],
  )

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (change.type === "remove") {
          removeDataSource(change.id)
        }
      })
      setNodes((nds) => applyNodeChanges(changes, nds))
    },
    [removeDataSource],
  )

  const onDeleteEdge = useCallback(
    (edge: Edge) => {
      unsubscribe(edge.source, edge.target, edge.targetHandle as string)
    },
    [unsubscribe],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      changes
        .filter((change) => change.type === "remove")
        .forEach((change) => {
          const edge = instance.getEdge((change as EdgeRemoveChange).id)
          if (edge) onDeleteEdge(edge)
        })

      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [instance, onDeleteEdge],
  )

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      onAddEdge(params)
      setEdges((eds) => addEdge(params, eds))
    },
    [onAddEdge],
  )

  function onAddNode(nodeType: string) {
    appendNode(nodeType)
  }

  return { graphRef, nodes, edges, setEdges, setNodes, onNodesChange, onEdgesChange, onConnect, onAddNode, onAddEdge }
}
