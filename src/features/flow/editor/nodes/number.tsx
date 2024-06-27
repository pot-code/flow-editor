import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ReactShapeConfig } from "@antv/x6-react-shape"
import { Hash, Trash } from "@phosphor-icons/react"
import usePorts from "./hooks/use-ports"
import { ActionButton, NodeActions, NodeContainer, NodeContent, NodeHeader } from "./layout"
import { NodeProps } from "./typings"
import useNode from "./hooks/use-node"

// eslint-disable-next-line react-refresh/only-export-components
function NumberInput({ node }: NodeProps) {
  const [value, setValue] = useState(0)
  const { outputs } = usePorts(node)
  const { remove } = useNode(node)

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value))
    outputs.forEach((output) => output.publish(Number(e.target.value)))
  }

  return (
    <NodeContainer>
      <NodeActions>
        <ActionButton className="bg-destructive" onClick={remove}>
          <Trash size={14} className="text-destructive-foreground" />
        </ActionButton>
      </NodeActions>
      <NodeHeader>
        <div className="flex items-center gap-2">
          <Hash />
          <span>数值</span>
        </div>
      </NodeHeader>
      <Separator />
      <NodeContent className="px-2">
        <Input type="number" placeholder="请输入数字" value={value} onChange={onChange} />
      </NodeContent>
    </NodeContainer>
  )
}

export default {
  component: NumberInput,
  shape: "number",
  width: 200,
  effect: ["data"],
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
    },
    items: [
      {
        group: "output",
        args: {
          dy: 45,
        },
      },
    ],
  },
} as ReactShapeConfig
