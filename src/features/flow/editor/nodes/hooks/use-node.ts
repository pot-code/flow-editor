import { Node } from "@antv/x6"

export default function useNode(node: Node) {
  function remove() {
    node.remove()
  }

  return { remove }
}
