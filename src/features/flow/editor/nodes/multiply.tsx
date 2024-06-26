import { ReactShapeConfig } from "@antv/x6-react-shape"
import { Trash, X } from "@phosphor-icons/react"
import { defaultTo, multiply, reduce } from "lodash-es"
import { combineLatest, map } from "rxjs"
import { useDataFlowContext } from "../use-data-flow-context"
import { ActionButton, NodeActions, NodeContainer, NodeHeader } from "./layout"
import { NodeProps } from "./typings"

// eslint-disable-next-line react-refresh/only-export-components
function Multiply({ node }: NodeProps) {
  const { getChannel } = useDataFlowContext()
  const inputs = useMemo(() => node.getPortsByGroup("input").map((port) => getChannel(port.id!)), [getChannel, node])
  const outputs = useMemo(() => node.getPortsByGroup("output").map((port) => getChannel(port.id!)), [getChannel, node])

  function onDelete() {
    node.remove()
  }

  useEffect(() => {
    const sub = combineLatest(inputs.map((s) => s.source))
      .pipe(
        map((v) =>
          reduce(
            v.map((i) => defaultTo(i, 0)),
            (a, b) => multiply(a, b),
          ),
        ),
      )
      .subscribe((v: number) => {
        outputs.forEach((s) => {
          s.publish(v)
        })
      })
    return () => sub.unsubscribe()
  }, [inputs, outputs])

  return (
    <NodeContainer>
      <NodeActions>
        <ActionButton className="bg-destructive" onClick={onDelete}>
          <Trash size={14} className="text-destructive-foreground" />
        </ActionButton>
      </NodeActions>
      <NodeHeader>
        <div className="flex items-center gap-2">
          <X />
          <span>乘法</span>
        </div>
      </NodeHeader>
    </NodeContainer>
  )
}

export default {
  component: Multiply,
  shape: "multiply",
  effect: ["data"],
  width: 150,
  ports: {
    groups: {
      output: {
        position: "right",
        attrs: {
          circle: {
            magnet: true,
            fill: "#000",
            stroke: "none",
            r: 5,
          },
        },
      },
      input: {
        position: "left",
        attrs: {
          circle: {
            magnet: true,
            fill: "#000",
            stroke: "none",
            r: 5,
          },
        },
      },
    },
    items: [
      {
        group: "output",
        args: {
          dy: 18,
        },
      },
      {
        group: "input",
      },
      {
        group: "input",
        args: {
          dy: 36,
        },
      },
    ],
  },
} as ReactShapeConfig
