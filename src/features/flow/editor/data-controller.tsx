import { produce } from "immer"
import { Connection, ReactFlowJsonObject, useReactFlow } from "reactflow"
import { useDataFlowContext } from "./use-data-flow-context"

// eslint-disable-next-line @typescript-eslint/ban-types
export type DataControllerProps = {}

export interface DataControllerRef {
  addConnection: (c: Connection) => void
  removeConnection: (c: Connection) => void
  exportData: () => ReactFlowJsonObject<any, any>
}

// eslint-disable-next-line no-empty-pattern
const DataController = forwardRef<DataControllerRef, DataControllerProps>(({}, ref) => {
  const { getSource } = useDataFlowContext()
  const { setNodes, toObject } = useReactFlow()

  const addConnection = useCallback(
    (c: Connection) => {
      const source = getSource({ nodeId: c.source, handleId: c.sourceHandle })
      source.subscribe({ nodeId: c.target, handleId: c.targetHandle }, (data) => {
        setNodes(
          produce((draft) => {
            // FIXME: 批量修改节点数据导致有节点数据不更新
            draft
              .filter((node) => node.id === c.target)
              .forEach((node) => {
                node.data[c.targetHandle!] = data
              })
            draft
              .filter((node) => node.id === c.source)
              .forEach((node) => {
                node.data[c.sourceHandle!] = data
              })
          }),
        )
      })
    },
    [getSource, setNodes],
  )

  const removeConnection = useCallback(
    (c: Connection) => {
      const source = getSource({ nodeId: c.source, handleId: c.sourceHandle })
      source.unsubscribe({ nodeId: c.target, handleId: c.targetHandle })
      setNodes(
        produce((draft) => {
          draft
            .filter((node) => node.id === c.target)
            .forEach((node) => {
              node.data[c.targetHandle!] = undefined
            })
        }),
      )
    },
    [getSource, setNodes],
  )

  const exportData = useCallback(() => {
    return toObject()
  }, [toObject])

  useImperativeHandle(ref, () => ({ addConnection, removeConnection, exportData }))
  return null
})

export default DataController
