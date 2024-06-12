import React from "react"
import { Subject, Unsubscribable } from "rxjs"

interface DataFlowContextState {
  getDataSource: (id: string) => DataSource
  removeDataSource: (id: string) => void
  subscribe: (sourceId: string, targetId: string, targetHandle: string, fn: (data: any) => void) => void
  unsubscribe: (sourceId: string, targetId: string, targetHandle: string) => void
}

interface Subscription {
  targetId: string
  targetHandle: string
  stub: Unsubscribable
}

export const DataFlowContext = React.createContext<DataFlowContextState | null>(null)

class DataSource {
  private sub = new Subject()

  private subscriptions: Subscription[] = []

  publish(data: any) {
    this.sub.next(data)
  }

  subscribe(targetId: string, targetHandle: string, fn: (data: any) => void) {
    if (this.subscriptions.some((sub) => sub.targetId === targetId && sub.targetHandle === targetHandle)) return
    this.subscriptions.push({ targetId, targetHandle, stub: this.sub.subscribe(fn) })
  }

  unsubscribe(targetId: string, targetHandle: string) {
    const index = this.subscriptions.findIndex((sub) => sub.targetId === targetId && sub.targetHandle === targetHandle)
    if (index > -1) this.subscriptions.splice(index, 1)[0].stub.unsubscribe()
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.stub.unsubscribe())
  }
}

export default function DataFlowProvider({ children }: { children: React.ReactNode }) {
  const dataSourceMap = useMemo(() => new Map<string, DataSource>(), [])

  const removeDataSource = useCallback(
    (id: string) => {
      dataSourceMap.get(id)?.dispose()
      dataSourceMap.delete(id)
    },
    [dataSourceMap],
  )

  const getDataSource = useCallback(
    (id: string) => {
      let dataSource = dataSourceMap.get(id)
      if (!dataSource) {
        dataSource = new DataSource()
        dataSourceMap.set(id, dataSource)
      }
      return dataSource
    },
    [dataSourceMap],
  )

  const subscribe = useCallback(
    (sourceId: string, targetId: string, targetHandle: string, fn: (data: any) => void) => {
      getDataSource(sourceId).subscribe(targetId, targetHandle, fn)
    },
    [getDataSource],
  )

  const unsubscribe = useCallback(
    (sourceId: string, targetId: string, targetHandle: string) => {
      dataSourceMap.get(sourceId)?.unsubscribe(targetId, targetHandle)
    },
    [dataSourceMap],
  )

  const value = useMemo(
    () => ({ getDataSource, removeDataSource, subscribe, unsubscribe }),
    [getDataSource, removeDataSource, subscribe, unsubscribe],
  )
  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}
