import { produce } from "immer"
import { Connection, Node, addEdge, useEdgesState, useNodesState } from "reactflow"

export default function useGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [])

  // TODO: use DnD
  function onAddNode(nodeType: string) {
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

  return { nodes, edges, setEdges, setNodes, onNodesChange, onEdgesChange, onConnect, onAddNode }
}
