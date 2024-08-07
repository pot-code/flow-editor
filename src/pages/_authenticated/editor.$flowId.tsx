import { getFlow, updateFlow } from "@/api/flow"
import { Button } from "@/components/ui/button"
import Loading from "@/components/ui/loading"
import { DEFAULT_FLOW_NAME } from "@/features/flow/constants"
import DataFlowProvider from "@/features/flow/editor/data-flow-context"
import FlowGraph, { FlowGraphRef } from "@/features/flow/editor/flow-graph"
import NameInput from "@/features/flow/editor/name-input"
import { extractErrorMessage } from "@/lib/http"
import { delayedPromise } from "@/utils/promise"
import time from "@/utils/time"
import { ArrowLeft } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { isEmpty } from "lodash-es"
import { toast } from "sonner"

export const Route = createFileRoute("/_authenticated/editor/$flowId")({
  component: FlowEditor,
  onLeave: ({ context: { queryClient } }) => queryClient.invalidateQueries({ queryKey: ["flow"] }),
})

function FlowEditor() {
  const navigate = useNavigate()
  const graphRef = useRef<FlowGraphRef>(null!)

  const flowId = Route.useParams().flowId
  const [title, setTitle] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["flow", flowId],
    queryFn: () => delayedPromise(0.5 * time.Second, getFlow)(flowId),
  })

  const updateFlowMutation = useMutation({
    mutationFn: delayedPromise(0.5 * time.Second, (data) => updateFlow(flowId, data)),
    onSuccess: () => {
      toast.success("保存成功")
    },
    onError: (err) => {
      toast.error("保存失败", {
        description: extractErrorMessage(err),
      })
    },
  })

  function onSave() {
    updateFlowMutation.mutate({
      data: graphRef.current.getFlowData(),
      title,
    })
  }

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }

  function onTitleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    const value = e.target.value
    if (isEmpty(value)) setTitle(DEFAULT_FLOW_NAME)
  }

  useEffect(() => {
    if (data) {
      setTitle(data.title)
    }
  }, [data])

  return (
    <div className="h-screen w-screen flex flex-col">
      <nav className="flex justify-between items-center px-12 h-12 border-b-1 bg-background border-divider">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/" })}>
          <ArrowLeft />
        </Button>
        <NameInput value={title} onChange={onChangeTitle} onBlur={onTitleInputBlur} />
        <div>
          <Button size="sm" variant="ghost" onClick={onSave}>
            保存
          </Button>
        </div>
      </nav>
      <div className="flex-grow flex min-h-0">
        <DataFlowProvider>
          <FlowGraph ref={graphRef} data={data} />
        </DataFlowProvider>
      </div>
      <Loading title="保存中" loading={updateFlowMutation.isPending} />
      <Loading title="载入中" loading={isLoading} />
    </div>
  )
}
