import { FlowDetailData } from "@/api/model"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Portal, register } from "@antv/x6-react-shape"
import { ArrowsInSimple, Equals, Hash, Minus, Plus, X } from "@phosphor-icons/react"
import { isEqual } from "lodash-es"
import GraphContextProvider from "./graph-context"
import { getShapes } from "./shape"
import useDiagram from "./use-diagram"

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
    const rootRef = useRef<HTMLDivElement>(null!)
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
      <div className="h-full w-full relative" ref={rootRef}>
        <GraphContextProvider graph={graphRef.current}>
          <PortalProvider />
        </GraphContextProvider>
        <div className="h-full w-full" ref={graphContainerRef} />
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <div className="flex gap-1 p-1 rounded-full shadow bg-black text-white">
            <Button className="rounded-full" variant="ghost" size="icon" onClick={() => addNode({ shape: "add" })}>
              <Plus />
            </Button>
            <Button className="rounded-full" variant="ghost" size="icon" onClick={() => addNode({ shape: "multiply" })}>
              <X />
            </Button>
            <Button className="rounded-full" variant="ghost" size="icon" onClick={() => addNode({ shape: "number" })}>
              <Hash />
            </Button>
            <Button className="rounded-full" variant="ghost" size="icon" onClick={() => addNode({ shape: "result" })}>
              <Equals />
            </Button>
          </div>
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
