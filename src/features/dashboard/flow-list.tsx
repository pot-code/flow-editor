import { Card, CardFooter, CardHeader } from "@nextui-org/card"
import { Skeleton } from "@nextui-org/skeleton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { isEmpty } from "lodash-es"
import LoadingModal from "@/components/loading-modal"
import { useToast } from "@/components/toast"
import FlowCard from "./flow-card"
import { useNavigate } from "@tanstack/react-router"
import { delayedPromise } from "@/utils/promise"
import time from "@/utils/time"
import { deleteFlowId, getFlow } from "@/api/flow"

function GridLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-4 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-4">{children}</div>
}

function LoadingState({ count = 3 }: { count?: number }) {
  return (
    <GridLayout>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 my-1 w-full rounded-lg" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-5 w-[128px] rounded-lg" />
            </CardFooter>
          </Card>
        ))}
    </GridLayout>
  )
}

function EmptyData() {
  return <p className="text-center text-foreground-500">No Data</p>
}

export default function FlowList() {
  const toast = useToast()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["flow", "list"],
    queryFn: () => delayedPromise(0.3 * time.Second, getFlow)().then((res) => res.data),
  })
  const deleteFlow = useMutation({
    mutationFn: delayedPromise(0.5 * time.Second, deleteFlowId),
    onSuccess: () => {
      toast.success("删除成功")
      qc.invalidateQueries({
        queryKey: ["flow", "list"],
      })
    },
    onError: (err) => {
      toast.error("删除失败", {
        description: err.message,
      })
    },
  })

  function onEditFlow(id: number) {
    navigate({
      to: `/editor/${id}`,
    })
  }

  function onDeleteFlow(id: number) {
    deleteFlow.mutate(id.toString())
  }

  useEffect(() => {
    if (isError) {
      toast.error("获取流程列表失败", {
        description: error.message,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  if (isLoading) {
    return <LoadingState />
  }

  if (isEmpty(data)) {
    return <EmptyData />
  }

  return (
    <>
      <GridLayout>
        {data!.map((item) => (
          <FlowCard
            key={item.id}
            id={item.id}
            name={item.title}
            createdAt={item.created_at}
            onDelete={onDeleteFlow}
            onEdit={onEditFlow}
          />
        ))}
      </GridLayout>
      <LoadingModal title="删除中" loading={deleteFlow.isPending} />
    </>
  )
}
