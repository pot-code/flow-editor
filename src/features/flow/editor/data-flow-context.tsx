import React from "react"
import { BehaviorSubject, Unsubscribable } from "rxjs"

class DataSource {
  private sub = new BehaviorSubject<any>(undefined)
  private subscriptions = new Map<string, Unsubscribable>()

  constructor(readonly key: string) {}

  publish(data: any) {
    this.sub.next(data)
  }

  /**
   * pipe data to target DataSource
   * @param ds target DataSource
   */
  connect(ds: DataSource) {
    this.subscribe(ds.key, ds.publish.bind(ds))
  }

  subscribe(key: string, cb: (data: any) => void) {
    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, this.sub.subscribe(cb))
    }
  }

  unsubscribe(key: string) {
    this.subscriptions.get(key)?.unsubscribe()
    this.subscriptions.delete(key)
  }

  dispose() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

  get source() {
    return this.sub
  }
}

interface DataFlowContextState {
  removeChannel: (id: string) => void
  getChannel: (id: string) => DataSource
}

export const DataFlowContext = React.createContext<DataFlowContextState>(null!)

export default function DataFlowProvider({ children }: { children: React.ReactNode }) {
  const channels = useRef(new Map<string, DataSource>())

  const removeChannel = useCallback(
    (id: string) => {
      channels.current.get(id)?.dispose()
      channels.current.delete(id)
    },
    [channels],
  )

  const getChannel = useCallback((id: string) => {
    let dataSource = channels.current.get(id)
    if (!dataSource) {
      dataSource = new DataSource(id)
      channels.current.set(id, dataSource)
    }
    return dataSource
  }, [])

  const value = useMemo(() => ({ removeChannel, getChannel }), [removeChannel, getChannel])

  return <DataFlowContext.Provider value={value}>{children}</DataFlowContext.Provider>
}
