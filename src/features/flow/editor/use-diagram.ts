import { Edge, Graph, Node } from "@antv/x6"

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
        validateConnection({ targetPort, targetCell }) {
          if (!targetCell || !targetPort) return false
          if (!targetCell.isNode()) return false

          const targetNode = targetCell as Node
          const tp = targetNode.getPort(targetPort)

          if (!tp) return false
          if (tp.group === "output") return false

          const edges = this.getConnectedEdges(targetCell.id)
          return !edges.some((e) => (e.target as Edge.TerminalCellLooseData).port === targetPort)
        },
      },
    })

    graph.on("edge:dblclick", ({ edge }) => {
      graph.removeEdge(edge)
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

  function addNode(node: any) {
    const graph = graphRef.current
    graph.addNode(node)
  }

  return { containerRef, render, centerView, exportGraph, addNode }
}
