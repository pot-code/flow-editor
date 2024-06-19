import React from "react"
import { Subject, Unsubscribable } from "rxjs"

interface DataFlowContextState {
  createChannel: (id: string) => DataChannel
  removeChannel: (id: string) => void
  getChannel: (channelId: string) => DataChannel | undefined
}

type Subscription = {
  stub: Unsubscribable
}

export const DataFlowContext = React.createContext<DataFlowContextState>(null!)

class DataChannel {
  private sub = new Subject()

  private subscriptions: Subscription[] = []

  publish(data: any) {
    this.sub.next(data)
  }

  subscribe(fn: (data: any) => void) {
    const sub = { stub: this.sub.subscribe(fn) }
    this.subscriptions.push(sub)
    return sub
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.stub.unsubscribe())
  }
}

export default function DataFlowProvider({ children }: { children: React.ReactNode }) {
  const channelMap = useRef(new Map<string, DataChannel>())

  const removeChannel = useCallback(
    (id: string) => {
      channelMap.current.get(id)?.dispose()
      channelMap.current.delete(id)
    },
    [channelMap],
  )

  const createChannel = useCallback(
    (id: string) => {
      let dataSource = channelMap.current.get(id)
      if (!dataSource) {
        dataSource = new DataChannel()
        channelMap.current.set(id, dataSource)
      }
      return dataSource
    },
    [channelMap],
  )

  const getChannel = useCallback((channelId: string) => channelMap.current.get(channelId), [channelMap])

  const value = useMemo(
    () => ({ createChannel, removeChannel, getChannel }),
    [createChannel, removeChannel, getChannel],
  )

  useEffect(() => {
    const c = channelMap.current
    return () => {
      c.forEach((channel) => channel.dispose())
    }
  })
  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}
