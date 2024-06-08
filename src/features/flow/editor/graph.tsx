import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus } from "@phosphor-icons/react"
import ReactFlow, { Background, BackgroundVariant, Controls, Edge, MarkerType, Node, Panel } from "reactflow"
import { getNodeTypes } from "../nodes"
import useGraph from "./use-graph"

const nodeTypes = getNodeTypes()

export interface GraphRef {
  getNodes(): Node[]
  getEdges(): Edge[]
}

interface GraphProps {
  isRefreshing?: boolean
  initialNodes?: Node[]
  initialEdges?: Edge[]
}

const Graph = forwardRef<GraphRef, GraphProps>(({ initialNodes = [], initialEdges = [] }, ref) => {
  const { graphRef, nodes, edges, setEdges, setNodes, onNodesChange, onEdgesChange, onConnect, onAddNode, onAddEdge } =
    useGraph()

  useImperativeHandle(ref, () => ({
    getNodes() {
      return nodes
    },
    getEdges() {
      return edges
    },
  }))

  useEffect(() => {
    setNodes(initialNodes)
  }, [initialNodes, setNodes])

  useEffect(() => {
    setEdges(initialEdges)
    initialEdges.forEach(onAddEdge)
  }, [initialEdges, onAddEdge, setEdges])

  return (
    <ReactFlow
      fitView
      className="bg-gray-50"
      ref={graphRef}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={{
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }}
      fitViewOptions={{
        minZoom: 1,
        maxZoom: 1,
      }}
    >
      <Panel position="top-left">
        <div className="flex flex-col gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" color="primary">
                <Plus />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => onAddNode("number")}>Number</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onAddNode("add")}>Addition</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onAddNode("multiply")}>Multiply</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onAddNode("result")}>Result</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Panel>
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
})

export default Graph
