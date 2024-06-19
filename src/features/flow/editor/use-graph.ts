import { produce } from "immer"
import {
  Connection,
  EdgeSelectionChange,
  Node,
  OnEdgesChange,
  ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow"

export default function useGraph() {
  const instanceRef = useRef<ReactFlowInstance>()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // eslint-disable-next-line no-underscore-dangle
  const _onEdgesChange: OnEdgesChange = (changes) => {
    const instance = instanceRef.current
    if (instance) {
      changes.forEach((c) => console.log("🚀 ~ _onEdgesChange ~ c:", instance.getEdge((c as EdgeSelectionChange).id)))
    }
    onEdgesChange(changes)
  }

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
    onEdgesChange: _onEdgesChange,
    onConnect,
    addNode,
    setInstance,
  }
}
