import React from "react"
import { Subject, Unsubscribable } from "rxjs"
import { NodeData } from "../nodes/types"

interface DataFlowContextState {
  createChannel: (id: string) => DataChannel
  removeChannel: (id: string) => void
  subscribe: (channelId: string, fn: (data: NodeData) => void) => Subscription | undefined
}

interface Subscription {
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
  const channelMap = useMemo(() => new Map<string, DataChannel>(), [])

  const removeChannel = useCallback(
    (id: string) => {
      channelMap.get(id)?.dispose()
      channelMap.delete(id)
    },
    [channelMap],
  )

  const createChannel = useCallback(
    (id: string) => {
      let dataSource = channelMap.get(id)
      if (!dataSource) {
        dataSource = new DataChannel()
        channelMap.set(id, dataSource)
      }
      return dataSource
    },
    [channelMap],
  )

  const subscribe = useCallback(
    (channelId: string, fn: (data: NodeData) => void) => {
      const channel = channelMap.get(channelId)
      if (!channel) return
      return channel.subscribe(fn)
    },
    [channelMap],
  )

  const value = useMemo(() => ({ createChannel, removeChannel, subscribe }), [createChannel, removeChannel, subscribe])

  useEffect(() => {
    return () => {
      channelMap.forEach((channel) => channel.dispose())
    }
  })
  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}
