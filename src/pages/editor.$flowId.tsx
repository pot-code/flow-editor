import { getFlow, updateFlow } from "@/api/flow"
import { Button } from "@/components/ui/button"
import Loading from "@/components/ui/loading"
import { useToast } from "@/components/ui/use-toast"
import { DEFAULT_FLOW_NAME } from "@/features/flow/config"
import DataFlowProvider from "@/features/flow/editor/context"
import FlowGraph, { GraphRef } from "@/features/flow/editor/graph"
import NameInput from "@/features/flow/editor/name-input"
import { extractErrorMessage } from "@/lib/http"
import { delayedPromise } from "@/utils/promise"
import time from "@/utils/time"
import { ArrowLeft } from "@phosphor-icons/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { isEmpty } from "lodash-es"
import { Edge, Node, ReactFlowProvider } from "reactflow"

export const Route = createFileRoute("/editor/$flowId")({
  component: FlowEditor,
})

function FlowEditor() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const navigate = useNavigate()

  const flowId = Route.useParams().flowId
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [graphName, setGraphName] = useState("")
  const graphRef = useRef<GraphRef>(null)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(0.5 * time.Second, getFlow)(flowId),
  })

  const updateFlowMutation = useMutation({
    mutationFn: delayedPromise(0.5 * time.Second, ({ id, data }) => updateFlow(id, data)),
    onSuccess: () => {
      toast({ title: "保存成功" })
      queryClient.invalidateQueries({
        queryKey: ["flow", flowId],
      })
    },
    onError: (err) => {
      toast({
        title: "保存失败",
        description: extractErrorMessage(err),
      })
    },
  })

  function onSave() {
    const nds = graphRef.current?.getNodes()
    const eds = graphRef.current?.getEdges()
    if (nds && eds) {
      updateFlowMutation.mutate({
        id: flowId,
        data: {
          nodes: JSON.stringify(nds),
          edges: JSON.stringify(eds),
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
            <FlowGraph ref={graphRef} isRefreshing={isFetching} initialNodes={nodes} initialEdges={edges} />
          </ReactFlowProvider>
        </DataFlowProvider>
      </div>
      <Loading title="保存中" loading={updateFlowMutation.isPending} />
      <Loading title="载入中" loading={isLoading} />
    </div>
  )
}
