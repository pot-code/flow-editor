import { ReactShapeConfig } from "@antv/x6-react-shape"

export function getShapes() {
  const nodes = import.meta.glob("./nodes/*.tsx", { eager: true })

  return Object.values(nodes).map((mod) => {
    const { default: config } = mod as { default: ReactShapeConfig }
    return config
  })
}
