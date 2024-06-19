import { produce } from "immer"
import { Connection, Node, ReactFlowInstance, addEdge, useEdgesState, useNodesState } from "reactflow"

export default function useGraph() {
  const instanceRef = useRef<ReactFlowInstance>()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // function addConnection(c: Connection) {
  //   const source = createSource(c.source!)

  //   source.subscribe(c.id, (data) => {
  //     setNodes(
  //       produce((draft) => {
  //         draft
  //           .filter((n) => n.id === edge.target)
  //           .forEach((n) => {
  //             n.data[edge.targetHandle!] = data
  //           })
  //         draft
  //           .filter((n) => n.id === edge.source)
  //           .forEach((n) => {
  //             n.data[edge.sourceHandle!] = data
  //           })
  //       }),
  //     )
  //   })
  // }

  // function removeConnection(id: string) {
  //   const edge = instanceRef.current?.getEdge(id)
  //   if (!edge) return

  //   const source = getSource(edge.source)
  //   if (!source) return

  //   source.unsubscribe(edge.id)
  //   setNodes(
  //     produce((draft) =>
  //       draft
  //         .filter((n) => n.id === edge.target)
  //         .forEach((n) => {
  //           n.data[edge.targetHandle!] = undefined
  //         }),
  //     ),
  //   )
  // }

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
    onEdgesChange,
    onConnect,
    addNode,
    setInstance,
  }
}
