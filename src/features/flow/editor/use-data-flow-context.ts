import { DataFlowContext } from "./data-flow-context"

export function useDataFlowContext() {
  const context = useContext(DataFlowContext)
  if (!context) {
    throw new Error("useDataFlowContext must be used within a DataFlowProvider")
  }
  return context
}
