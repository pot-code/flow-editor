import { FlowDetailData } from "@/api/model"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowsInSimple, Plus } from "@phosphor-icons/react"
import useDiagram from "./use-diagram"
import { getShapes } from "./nodes"
import { Portal, register } from "@antv/x6-react-shape"

export type FlowGraphProps = {
  data?: FlowDetailData
}

export type FlowGraphRef = {
  getFlowData: () => string
}

getShapes().forEach(register)

const PortalProvider = Portal.getProvider()

const FlowGraph = forwardRef<FlowGraphRef, FlowGraphProps>(({ data }, ref) => {
  const { containerRef, exportGraph, render, centerView, addNode } = useDiagram()

  const getFlowData = useCallback(() => {
    return JSON.stringify(exportGraph())
  }, [exportGraph])

  useImperativeHandle(ref, () => ({ getFlowData }), [getFlowData])

  useEffect(() => {
    if (data && data.data) {
      render(data.data)
    }
  }, [data, render])

  return (
    <div className="h-full w-full relative">
      <PortalProvider />
      <div className="h-full w-full" ref={containerRef} />
      <div className="absolute top-4 left-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" color="primary">
              <Plus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem onSelect={() => addNode({ shape: "number" })}>数值</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => addNode({ shape: "add" })}>加法</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => addNode({ shape: "multiply" })}>乘法</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => addNode({ shape: "result" })}>结果</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="absolute left-4 bottom-4 bg-white shadow-md border rounded-lg">
        <div className="flex flex-col">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1" onClick={centerView}>
                  <ArrowsInSimple weight="fill" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">画布居中</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
})

export default FlowGraph
