import { FlowDetailData } from "@/api/model"
import { getNodeTypes } from "../nodes"
import { Graph } from "@antv/x6"

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
        // body 是选择器名称，选中的是 rect 元素
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
      label: "x6",
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

  return <div className="h-full w-full" ref={containerRef} />
})

export default FlowGraph
