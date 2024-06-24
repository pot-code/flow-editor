import { Graph } from "@antv/x6"

export default function useDiagram() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const graphRef = useRef<Graph>(null!)

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

    graphRef.current = graph

    return () => {
      graph.dispose()
    }
  }, [])

  function render(data: string) {
    const graph = graphRef.current
    graph.fromJSON(JSON.parse(data))
  }

  function centerView() {
    const graph = graphRef.current
    graph.centerContent()
  }

  function exportGraph() {
    return graphRef.current.toJSON()
  }

  return { containerRef, render, centerView, exportGraph }
}
