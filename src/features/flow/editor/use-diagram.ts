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
      connecting: {
        allowBlank: false,
        allowLoop: false,
        allowNode: false,
        allowEdge: false,
        highlight: true,
        snap: {
          radius: 20,
        },
        validateConnection: ({ targetMagnet }) => {
          return targetMagnet?.getAttribute("port-group") !== "output"
        },
      },
    })

    graphRef.current = graph

    graph.on("edge:dblclick", ({ edge }) => {
      graph.removeEdge(edge)
    })

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

  function addNode(node: any) {
    const graph = graphRef.current
    graph.addNode(node)
  }

  return { containerRef, render, centerView, exportGraph, addNode }
}
