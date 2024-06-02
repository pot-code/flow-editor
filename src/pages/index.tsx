import { postFlow } from "@/api/flow"
import LoadingModal from "@/components/loading-modal"
import { ResizeWidth } from "@/components/resizable"
import { useToast } from "@/components/toast"
import useAuthStore from "@/features/auth/useAuthStore"
import FlowList from "@/features/dashboard/flow-list"
import { DEFAULT_FLOW_NAME } from "@/features/flow/config"
import zitadel from "@/lib/auth/zitadel"
import { delayedPromise } from "@/utils/promise"
import time from "@/utils/time"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { Input } from "@nextui-org/input"
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar"
import { Tab, Tabs } from "@nextui-org/tabs"
import { User } from "@nextui-org/user"
import { GridFour, List, MagnifyingGlass, Plus } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) throw redirect({ to: "/login" })
  },
  component: Home,
})

export default function Home() {
  const toast = useToast()
  const { avatar, name } = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const createFlowMutation = useMutation({
    mutationFn: delayedPromise(1 * time.Second, postFlow),
    onSuccess: ({ data }) => {
      navigate({
        to: `/editor/${data.id}`,
      })
    },
    onError: (err) => {
      toast.error("创建失败", {
        description: err.message,
      })
    },
  })

  function onCreateFlow() {
    createFlowMutation.mutate({
      title: DEFAULT_FLOW_NAME,
    })
  }

  function onLogout() {
    zitadel.signout()
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar isBordered position="static" maxWidth="full">
        <NavbarBrand>流程设计器</NavbarBrand>
        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <User className="cursor-pointer" name={name} description="Frontend Dev" avatarProps={{ src: avatar }} />
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              <DropdownItem key="settings">设置</DropdownItem>
              <DropdownItem key="logout" className="text-danger" color="danger" onClick={onLogout}>
                注销
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <main className="flex flex-1 min-h-0 relative">
        <ResizeWidth defaultWidth={284} minWidth={284} maxWidth={364}>
          <div className="h-full border-r-1 border-divider" />
        </ResizeWidth>
        <div className="flex-1 p-4 min-h-0">
          <section className="flex mb-8 justify-between">
            <Button color="primary" startContent={<Plus />} onClick={onCreateFlow}>
              新建流程
            </Button>
            <div className="flex gap-2">
              <Input variant="bordered" startContent={<MagnifyingGlass />} />
              <Tabs defaultSelectedKey="grid" color="default" variant="light">
                <Tab key="grid" title={<GridFour />} />
                <Tab key="list" title={<List />} />
              </Tabs>
            </div>
          </section>
          <FlowList />
        </div>
      </main>
      <LoadingModal title="创建中" loading={createFlowMutation.isPending} />
    </div>
  )
}
