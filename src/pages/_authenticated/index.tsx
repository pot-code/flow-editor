import { createFlow } from "@/api/flow"
import { ResizeWidth } from "@/components/resizable"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import Loading from "@/components/ui/loading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import useTokenClaim from "@/features/auth/use-token-claim"
import FlowList from "@/features/dashboard/flow-list"
import { DEFAULT_FLOW_NAME } from "@/features/flow/config"
import { extractErrorMessage } from "@/lib/http"
import { delayedPromise } from "@/utils/promise"
import time from "@/utils/time"
import { useLogto } from "@logto/react"
import { MagnifyingGlass, Plus, User } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/")({
  component: Home,
})

export default function Home() {
  const { toast } = useToast()
  const { data: claim } = useTokenClaim()
  const { signOut } = useLogto()
  const navigate = useNavigate()
  const createFlowMutation = useMutation({
    mutationFn: delayedPromise(1 * time.Second, createFlow),
    onSuccess: (data) => {
      navigate({
        to: `/editor/${data.id}`,
      })
    },
    onError: (err) => {
      toast({
        title: "创建失败",
        description: extractErrorMessage(err),
      })
    },
  })

  function onCreateFlow() {
    createFlowMutation.mutate({
      title: DEFAULT_FLOW_NAME,
    })
  }

  function onSignOut() {
    signOut(new URL("/logout", window.origin).toString())
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="px-8">
        <nav className="flex items-center justify-between py-2 border-b">
          <h1>流程设计器</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage className="object-cover" src={claim?.picture || ""} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-neutral-500">{claim?.username}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>设置</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={onSignOut}>
                注销
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
      <main className="flex flex-1 min-h-0 relative">
        <ResizeWidth defaultWidth={284} minWidth={284} maxWidth={364}>
          <div className="h-full border-r" />
        </ResizeWidth>
        <div className="flex-1 p-4 min-h-0">
          <section className="flex mb-6 justify-between">
            <Button color="primary" onClick={onCreateFlow}>
              <Plus className="mr-2" />
              新建流程
            </Button>
            <div className="flex gap-2">
              <Tabs defaultValue="grid">
                <TabsList>
                  <TabsTrigger value="grid">宫格</TabsTrigger>
                  <TabsTrigger value="list">列表</TabsTrigger>
                </TabsList>
              </Tabs>
              <Input />
              <Button className="flex-shrink-0" variant="secondary" size="icon">
                <MagnifyingGlass />
              </Button>
            </div>
          </section>
          <FlowList />
        </div>
      </main>
      <Loading title="创建中" loading={createFlowMutation.isPending} />
    </div>
  )
}
