import { Edge, Graph, Node } from "@antv/x6"
import { useDataFlowContext } from "./use-data-flow-context"

export default function useDiagram() {
  const { getChannel, removeChannel } = useDataFlowContext()
  const graphContainerRef = useRef<HTMLDivElement>(null!)
  const graphRef = useRef<Graph>(null!)

  const connectPort = useCallback(
    (edge: Edge) => {
      const sp = edge.getSourcePortId()
      const tp = edge.getTargetPortId()

      if (!sp || !tp) return

      const sc = getChannel(sp)
      const tc = getChannel(tp)
      sc.connect(tc)
    },
    [getChannel],
  )

  useEffect(() => {
    const graph = new Graph({
      container: graphContainerRef.current,
      autoResize: true,
      panning: true,
      mousewheel: true,
      highlighting: {
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              stroke: "#9BEC00",
              "stroke-width": 4,
            },
          },
        },
      },
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
        createEdge() {
          return this.createEdge({
            attrs: {
              line: {
                targetMarker: "block",
                stroke: "#ADADAD",
                strokeWidth: 1,
              },
            },
          })
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
      const sp = edge.getSourcePortId()
      const tp = edge.getTargetPortId()

      if (!sp || !tp) return

      const sc = getChannel(sp)
      sc.disconnect(tp)
    })

    graph.on("node:removed", ({ node }) => {
      node.getPorts().forEach((port) => removeChannel(port.id!))
    })

    graph.on("edge:dblclick", ({ edge }) => {
      graph.removeEdge(edge)
    })

    graphRef.current = graph

    return () => {
      graph.dispose()
    }
  }, [getChannel, connectPort, removeChannel])

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

  function zoomIn() {
    const graph = graphRef.current
    graph.zoom(0.1, {
      maxScale: 2,
    })
  }

  function zoomOut() {
    const graph = graphRef.current
    graph.zoom(-0.1, {
      minScale: 0.5,
    })
  }

  return { graphContainerRef, graphRef, render, centerView, exportGraph, addNode, zoomIn, zoomOut }
}
