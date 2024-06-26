import React from "react"
import { BehaviorSubject, Unsubscribable } from "rxjs"

class DataSource {
  private sub = new BehaviorSubject<any>(undefined)
  private connections = new Map<string, Unsubscribable>()

  constructor(readonly key: string) {}

  publish(data: any) {
    this.sub.next(data)
  }

  /**
   * pipe data to target DataSource
   * @param ds target DataSource
   */
  connect(ds: DataSource) {
    if (!this.connections.has(ds.key)) {
      this.connections.set(ds.key, this.sub.subscribe(ds.publish.bind(ds)))
    }
  }

  subscribe(cb: (data: any) => void) {
    return this.sub.subscribe(cb)
  }

  disconnect(id: string) {
    this.connections.get(id)?.unsubscribe()
    this.connections.delete(id)
  }

  dispose() {
    this.connections.forEach((sub) => sub.unsubscribe())
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
