import { copyFlow, deleteFlow, getFlowList } from "@/api/flow"
import { Card, CardHeader } from "@/components/ui/card"
import Loading from "@/components/ui/loading"
import { Skeleton } from "@/components/ui/skeleton"
import { extractErrorMessage } from "@/lib/http"
import { delayedPromise } from "@/utils/promise"
import time from "@/utils/time"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { isEmpty } from "lodash-es"
import FlowCard from "./flow-card"
import { toast } from "sonner"

function GridLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-5 monitor-2k:grid-cols-6 monitor-4k:grid-cols-8 gap-4">{children}</div>
}

function LoadingState({ count = 3 }: { count?: number }) {
  return (
    <GridLayout>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-5 w-[128px] rounded-lg" />
            </CardHeader>
          </Card>
        ))}
    </GridLayout>
  )
}

function EmptyData() {
  return <p className="text-center text-foreground-500">No Data</p>
}

export default function FlowList() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { isLoading, data } = useQuery({
    queryKey: ["flow", "list"],
    queryFn: delayedPromise(0.3 * time.Second, getFlowList),
  })
  const deleteFlowMutation = useMutation({
    mutationFn: delayedPromise(0.5 * time.Second, deleteFlow),
    onSuccess: () => {
      toast.success("删除成功")
      qc.invalidateQueries({
        queryKey: ["flow", "list"],
      })
    },
    onError: (err) => {
      toast.error("删除失败", {
        description: extractErrorMessage(err),
      })
    },
  })
  const copyFlowMutation = useMutation({
    mutationFn: delayedPromise(0.5 * time.Second, copyFlow),
    onSuccess: () => {
      toast("复制成功")
      qc.invalidateQueries({
        queryKey: ["flow", "list"],
      })
    },
    onError: (err: Error) => {
      toast("复制失败", {
        description: extractErrorMessage(err),
      })
    },
  })

  function onEditFlow(id: number) {
    navigate({
      to: `/editor/${id}`,
    })
  }

  function onDeleteFlow(id: number) {
    deleteFlowMutation.mutate(id.toString())
  }

  function onCopyFlow(id: number) {
    copyFlowMutation.mutate(id.toString())
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (isEmpty(data)) {
    return <EmptyData />
  }

  return (
    <>
      <GridLayout>
        {data?.map((item) => (
          <FlowCard
            key={item.id}
            id={item.id}
            name={item.title}
            createdAt={item.created_at}
            onDelete={onDeleteFlow}
            onEdit={onEditFlow}
            onCopy={onCopyFlow}
          />
        ))}
      </GridLayout>
      <Loading title="删除中..." loading={deleteFlowMutation.isPending} />
      <Loading title="复制中..." loading={copyFlowMutation.isPending} />
    </>
  )
}
