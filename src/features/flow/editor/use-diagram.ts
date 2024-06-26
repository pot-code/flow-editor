import { Edge, Graph, Node } from "@antv/x6"
import { useDataFlowContext } from "./use-data-flow-context"

export default function useDiagram() {
  const { getChannel } = useDataFlowContext()
  const containerRef = useRef<HTMLDivElement>(null!)
  const graphRef = useRef<Graph>(null!)

  const connectPort = useCallback(
    (edge: Edge) => {
      const source = edge.source as Edge.TerminalCellLooseData
      const target = edge.target as Edge.TerminalCellLooseData

      if (!source || !target || !source.port || !target.port) return

      const sc = getChannel(source.port)
      const tc = getChannel(target.port)
      sc.connect(tc)
    },
    [getChannel],
  )

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
        allowMulti: false,
        highlight: true,
        snap: {
          radius: 20,
        },
        validateMagnet({ magnet }) {
          return magnet.getAttribute("port-group") === "output"
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

    graph.on("edge:connected", ({ edge }) => {
      connectPort(edge)
    })

    graph.on("edge:removed", ({ edge }) => {
      const source = edge.source as Edge.TerminalCellLooseData
      const target = edge.target as Edge.TerminalCellLooseData

      if (!source || !target || !source.port || !target.port) return

      const sc = getChannel(source.port)
      sc.disconnect(target.port!)
    })

    graph.on("edge:dblclick", ({ edge }) => {
      graph.removeEdge(edge)
    })

    graphRef.current = graph

    return () => {
      graph.dispose()
    }
  }, [getChannel, connectPort])

  function render(data: string) {
    const graph = graphRef.current
    graph.fromJSON(JSON.parse(data))
    graph.getEdges().forEach(connectPort)
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

  return { containerRef, graphRef, render, centerView, exportGraph, addNode }
}
