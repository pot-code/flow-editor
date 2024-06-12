import { getFlow, updateFlow } from "@/api/flow"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Loading from "@/components/ui/loading"
import { useToast } from "@/components/ui/use-toast"
import { DEFAULT_FLOW_NAME } from "@/features/flow/config"
import DataFlowProvider from "@/features/flow/editor/context"
import NameInput from "@/features/flow/editor/name-input"
import useGraph from "@/features/flow/editor/use-graph"
import { getNodeTypes } from "@/features/flow/nodes"
import { extractErrorMessage } from "@/lib/http"
import { delayedPromise } from "@/utils/promise"
import time from "@/utils/time"
import { ArrowLeft, Plus } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { isEmpty } from "lodash-es"
import ReactFlow, { Background, BackgroundVariant, Controls, MarkerType, Panel, ReactFlowProvider } from "reactflow"

const nodeTypes = getNodeTypes()

export const Route = createFileRoute("/editor/$flowId")({
  component: FlowEditor,
})

function FlowEditor() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { nodes, edges, setEdges, setNodes, onNodesChange, onEdgesChange, onConnect, onAddNode } = useGraph()

  const flowId = Route.useParams().flowId
  const [graphName, setGraphName] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(0.5 * time.Second, getFlow)(flowId),
  })

  const updateFlowMutation = useMutation({
    mutationFn: delayedPromise(0.5 * time.Second, ({ id, data }) => updateFlow(id, data)),
    onSuccess: () => {
      toast({ title: "保存成功" })
    },
    onError: (err) => {
      toast({
        title: "保存失败",
        description: extractErrorMessage(err),
      })
    },
  })

  function onSave() {
    if (nodes && edges) {
      updateFlowMutation.mutate({
        id: flowId,
        data: {
          nodes: JSON.stringify(nodes),
          edges: JSON.stringify(edges),
          title: graphName,
        },
      })
    }
  }

  function onChangeGraphName(name: string) {
    if (isEmpty(name)) setGraphName(DEFAULT_FLOW_NAME)
    else setGraphName(name)
  }

  useEffect(() => {
    if (data) {
      if (data.nodes) setNodes(JSON.parse(data.nodes))
      if (data.edges) setEdges(JSON.parse(data.edges))
      setGraphName(data.title)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="h-screen w-screen flex flex-col">
      <nav className="flex justify-between items-center px-12 h-12 border-b-1 bg-background border-divider">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/" })}>
          <ArrowLeft />
        </Button>
        <NameInput value={graphName} onChange={onChangeGraphName} />
        <div>
          <Button size="sm" variant="ghost" onClick={onSave}>
            保存
          </Button>
        </div>
      </nav>
      <div className="flex-grow flex">
        <DataFlowProvider>
          <ReactFlowProvider>
            <ReactFlow
              fitView
              className="bg-gray-50"
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
          </ReactFlowProvider>
        </DataFlowProvider>
      </div>
      <Loading title="保存中" loading={updateFlowMutation.isPending} />
      <Loading title="载入中" loading={isLoading} />
    </div>
  )
}
