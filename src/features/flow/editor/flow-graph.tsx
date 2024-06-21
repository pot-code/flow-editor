import { FlowDetailData } from "@/api/model"
import { getNodeTypes } from "../nodes"
import { Graph } from "@antv/x6"
import { Button } from "@/components/ui/button"
import { Plus } from "@phosphor-icons/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type FlowGraphProps = {
  data?: FlowDetailData
}

export type FlowGraphRef = {
  getFlowData: () => string
}

const nodeTypes = getNodeTypes()

const FlowGraph = forwardRef<FlowGraphRef, FlowGraphProps>(({ data }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [nodes, setNodes] = useState([
    {
      id: "node1",
      shape: "rect",
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: "hello",
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: "node2",
      shape: "rect",
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: "world",
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
  ])
  const [edges, setEdges] = useState([
    {
      shape: "edge",
      source: "node1",
      target: "node2",
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
        },
      },
    },
  ])

  const getFlowData = useCallback(() => {
    return ""
  }, [])

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current,
      panning: true,
      mousewheel: true,
      background: {
        color: "#fff",
      },
      grid: {
        visible: true,
        size: 20,
      },
    })
    graph.fromJSON({
      nodes,
      edges,
    })
    graph.centerContent()

    return () => {
      graph.dispose()
    }
  }, [edges, nodes])

  useImperativeHandle(ref, () => ({ getFlowData }), [getFlowData])

  return (
    <div className="h-full w-full relative">
      <div className="h-full w-full" ref={containerRef} />
      <div className="absolute top-8 left-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" color="primary">
              <Plus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem>数值</DropdownMenuItem>
            <DropdownMenuItem>加法</DropdownMenuItem>
            <DropdownMenuItem>乘法</DropdownMenuItem>
            <DropdownMenuItem>结果</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
})

export default FlowGraph
