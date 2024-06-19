import React from "react"
import { Subject, Unsubscribable } from "rxjs"

interface DataFlowContextState {
  removeSource: (id: string) => void
  getSource: (channelId: string) => DataSource
}

export const DataFlowContext = React.createContext<DataFlowContextState>(null!)

export type DataConnection = {
  source?: string | null
  target?: string | null
  sourceHandle?: string | null
  targetHandle?: string | null
}

class DataSource {
  private sub = new Subject()

  private subscriptions = new Map<string, Unsubscribable>()

  publish(data: any) {
    this.sub.next(data)
  }

  subscribe(c: DataConnection, cb: (data: any) => void) {
    const key = this.getConnectionKey(c)
    this.subscriptions.set(key, this.sub.subscribe(cb))
  }

  unsubscribe(c: DataConnection) {
    const key = this.getConnectionKey(c)
    this.subscriptions.get(key)?.unsubscribe()
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

  private getConnectionKey(c: DataConnection) {
    return `${c.source}:${c.sourceHandle}->${c.target}:${c.targetHandle}`
  }
}

export default function DataFlowProvider({ children }: { children: React.ReactNode }) {
  const channelMap = useRef(new Map<string, DataSource>())

  const removeSource = useCallback(
    (id: string) => {
      channelMap.current.get(id)?.dispose()
      channelMap.current.delete(id)
    },
    [channelMap],
  )

  const getSource = useCallback((source: string) => {
    let dataSource = channelMap.current.get(source)
    if (!dataSource) {
      dataSource = new DataSource()
      channelMap.current.set(source, dataSource)
    }
    return dataSource
  }, [])

  const value = useMemo(() => ({ removeSource, getSource }), [removeSource, getSource])

  useEffect(() => {
    const c = channelMap.current
    return () => {
      c.forEach((channel) => channel.dispose())
    }
  })
  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}
