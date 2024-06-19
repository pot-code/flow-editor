import { FlowDetailData } from "@/api/model"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus } from "@phosphor-icons/react"
import ReactFlow, { Background, BackgroundVariant, Controls, MarkerType, Panel, ReactFlowJsonObject } from "reactflow"
import { getNodeTypes } from "../nodes"
import useGraph from "./use-graph"

export type FlowGraphProps = {
  data?: FlowDetailData
}

export type FlowGraphHandle = {
  getFlowData: () => ReactFlowJsonObject<any, any> | undefined
}

const nodeTypes = getNodeTypes()

const FlowGraph = forwardRef<FlowGraphHandle, FlowGraphProps>(({ data }, ref) => {
  const {
    nodes,
    edges,
    instanceRef,
    addNode,
    setInstance,
    setEdges,
    setNodes,
    onNodesChange,
    onNodesDelete,
    onEdgesChange,
    onEdgesDelete,
    onConnect,
  } = useGraph()

  const getFlowData = useCallback(() => {
    return instanceRef.current?.toObject()
  }, [instanceRef])

  useEffect(() => {
    if (data && data.data) {
      const flow = JSON.parse(data.data)
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
    }
  }, [data, instanceRef, setEdges, setNodes])

  useImperativeHandle(ref, () => ({ getFlowData }), [getFlowData])

  return (
    <ReactFlow
      fitView
      onInit={setInstance}
      className="bg-gray-50"
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onEdgesDelete={onEdgesDelete}
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
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem onSelect={() => addNode("number")}>数值</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => addNode("add")}>加法</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => addNode("multiply")}>乘法</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => addNode("result")}>结果</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Panel>
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
})

export default FlowGraph
