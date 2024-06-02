import { Plus } from "@phosphor-icons/react"
import ReactFlow, { Background, BackgroundVariant, Controls, Edge, MarkerType, Node, Panel } from "reactflow"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/spinner"
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

const Graph = forwardRef<GraphRef, GraphProps>(({ isRefreshing, initialNodes = [], initialEdges = [] }, ref) => {
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
        <div className="flex flex-col gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly color="primary" variant="shadow">
                <Plus />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="flat" onAction={onAddNode}>
              <DropdownItem key="number">Number</DropdownItem>
              <DropdownItem key="add">Addition</DropdownItem>
              <DropdownItem key="multiple">Multiply</DropdownItem>
              <DropdownItem key="result">Result</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {isRefreshing && <Spinner size="sm" color="default" />}
        </div>
      </Panel>
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
})

export default Graph
