import React from "react"
import { Subject, Unsubscribable } from "rxjs"

interface DataFlowContextState {
  createSource: (id: string) => DataSource
  removeSource: (id: string) => void
  getSource: (channelId: string) => DataSource | undefined
}

export const DataFlowContext = React.createContext<DataFlowContextState>(null!)

class DataSource {
  private sub = new Subject()

  private subscriptions = new Map<string, Unsubscribable>()

  publish(data: any) {
    this.sub.next(data)
  }

  subscribe(id: string, fn: (data: any) => void) {
    this.subscriptions.set(id, this.sub.subscribe(fn))
  }

  unsubscribe(id: string) {
    this.subscriptions.get(id)?.unsubscribe()
    this.subscriptions.delete(id)
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
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

  const createSource = useCallback(
    (id: string) => {
      let dataSource = channelMap.current.get(id)
      if (!dataSource) {
        dataSource = new DataSource()
        channelMap.current.set(id, dataSource)
      }
      return dataSource
    },
    [channelMap],
  )

  const getSource = useCallback((channelId: string) => channelMap.current.get(channelId), [channelMap])

  const value = useMemo(() => ({ createSource, removeSource, getSource }), [createSource, removeSource, getSource])

  useEffect(() => {
    const c = channelMap.current
    return () => {
      c.forEach((channel) => channel.dispose())
    }
  })
  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}
