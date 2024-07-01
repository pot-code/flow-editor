import { FlowDetailData } from "@/api/model"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Portal, register } from "@antv/x6-react-shape"
import { ArrowsInSimple, Minus, Plus } from "@phosphor-icons/react"
import { isEqual } from "lodash-es"
import GraphContextProvider from "./graph-context"
import { getShapes } from "./shape"
import useDiagram from "./use-diagram"
import { Separator } from "@/components/ui/separator"

getShapes().forEach(register)

const PortalProvider = Portal.getProvider()

export type FlowGraphProps = {
  data?: FlowDetailData
}

export type FlowGraphRef = {
  getFlowData: () => string
}

const FlowGraph = memo(
  forwardRef<FlowGraphRef, FlowGraphProps>(({ data }, ref) => {
    const { graphContainerRef, graphRef, render, centerView, addNode, zoomIn, zoomOut, exportGraph } = useDiagram()

    const getFlowData = useCallback(() => {
      return JSON.stringify(exportGraph())
    }, [exportGraph])

    useEffect(() => {
      if (data && data.data) {
        render(data.data)
        centerView()
      }
    }, [centerView, data, render])

    useImperativeHandle(ref, () => ({ getFlowData }), [getFlowData])

    return (
      <div className="h-full w-full relative">
        <GraphContextProvider graph={graphRef.current}>
          <PortalProvider />
        </GraphContextProvider>
        <div className="h-full w-full" ref={graphContainerRef} />
        <div className="absolute top-4 left-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" color="primary">
                <Plus weight="bold" />
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
        <div className="absolute left-4 bottom-4 bg-white shadow border border-neutral-100">
          <div className="flex flex-col">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 hover:bg-neutral-100" onClick={centerView}>
                  <ArrowsInSimple />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">画布居中</TooltipContent>
            </Tooltip>
            <Separator />
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 hover:bg-neutral-100" onClick={zoomIn}>
                  <Plus />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">画布放大</TooltipContent>
            </Tooltip>
            <Separator />
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 hover:bg-neutral-100" onClick={zoomOut}>
                  <Minus />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">画布缩小</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }),
  isEqual,
)

export default FlowGraph
