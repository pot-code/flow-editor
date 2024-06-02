import { getFlowId, putFlowId } from "@/api/flow"
import { Button } from "@/components/ui/button"
import Loading from "@/components/ui/loading"
import { useToast } from "@/components/ui/use-toast"
import { DEFAULT_FLOW_NAME } from "@/features/flow/config"
import DataFlowProvider from "@/features/flow/editor/context"
import FlowGraph, { GraphRef } from "@/features/flow/editor/graph"
import NameInput from "@/features/flow/editor/name-input"
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

  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [graphName, setGraphName] = useState("")

  const flowId = Route.useParams().flowId
  const graphRef = useRef<GraphRef>(null)
  const flowQuery = useQuery({
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(0.5 * time.Second, getFlowId)(flowId).then((res) => res.data),
    enabled: Boolean(flowId),
  })
  const updateFlow = useMutation({
    mutationFn: delayedPromise(0.5 * time.Second, ({ id, data }) => putFlowId(id, data)),
    onSuccess: () => {
      toast({ title: "保存成功" })
      queryClient.invalidateQueries({
        queryKey: ["flow", flowId],
      })
    },
    onError: (err) => {
      toast({
        title: "保存失败",
        description: err.message,
      })
    },
  })

  function onSave() {
    const nds = graphRef.current?.getNodes()
    const eds = graphRef.current?.getEdges()
    if (nds && eds) {
      updateFlow.mutate({
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
    if (flowQuery.data) {
      if (flowQuery.data.nodes) setNodes(JSON.parse(flowQuery.data.nodes))
      if (flowQuery.data.edges) setEdges(JSON.parse(flowQuery.data.edges))
      setGraphName(flowQuery.data.title)
    }
  }, [flowQuery.data])

  useEffect(() => {
    if (flowQuery.isError) {
      toast({ title: "加载失败" })
    }
  }, [flowQuery.isError, toast])

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
            <FlowGraph ref={graphRef} isRefreshing={flowQuery.isFetching} initialNodes={nodes} initialEdges={edges} />
          </ReactFlowProvider>
        </DataFlowProvider>
      </div>
      <Loading title="保存中" loading={updateFlow.isPending} />
      <Loading title="载入中" loading={flowQuery.isLoading} />
    </div>
  )
}
