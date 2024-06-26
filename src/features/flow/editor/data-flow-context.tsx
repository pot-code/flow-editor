import React from "react"
import { Subject, Unsubscribable } from "rxjs"

export type NodeHandle = {
  nodeId?: string | null
  handleId?: string | null
}

class DataSource {
  private sub = new Subject()
  private subscriptions = new Map<string, Unsubscribable>()

  constructor(private readonly key: string) {}

  publish(data: any) {
    this.sub.next(data)
  }

  subscribe(c: NodeHandle, cb: (data: any) => void) {
    const key = this.getConnectionKey(c)
    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, this.sub.subscribe(cb))
    }
  }

  unsubscribe(c: NodeHandle) {
    const key = this.getConnectionKey(c)
    this.subscriptions.get(key)?.unsubscribe()
    this.subscriptions.delete(key)
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

  private getConnectionKey(c: NodeHandle) {
    return `${this.key}->${c.nodeId}:${c.handleId}`
  }
}

interface DataFlowContextState {
  removeSource: (h: NodeHandle) => void
  getSource: (h: NodeHandle) => DataSource
}

export const DataFlowContext = React.createContext<DataFlowContextState>(null!)

export default function DataFlowProvider({ children }: { children: React.ReactNode }) {
  const channelMap = useRef(new Map<string, DataSource>())

  function getDataSourceKey(handle: NodeHandle) {
    return `${handle.nodeId}:${handle.handleId}`
  }

  const removeSource = useCallback(
    (h: NodeHandle) => {
      const key = getDataSourceKey(h)
      channelMap.current.get(key)?.dispose()
      channelMap.current.delete(key)
    },
    [channelMap],
  )

  const getSource = useCallback((h: NodeHandle) => {
    const key = getDataSourceKey(h)
    let dataSource = channelMap.current.get(key)
    if (!dataSource) {
      dataSource = new DataSource(key)
      channelMap.current.set(key, dataSource)
    }
    return dataSource
  }, [])

  const value = useMemo(() => ({ removeSource, getSource }), [removeSource, getSource])

  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}
