import { DataFlowContext } from "./context"

export function useDataFlowContext() {
  const context = useContext(DataFlowContext)
  if (!context) {
    throw new Error("useDataFlowContext must be used within a SubscriptionProvider")
  }
  return context
}
