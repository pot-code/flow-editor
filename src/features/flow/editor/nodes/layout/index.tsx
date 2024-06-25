import { useClickAway } from "@uidotdev/usehooks"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"

import { cn } from "@/utils/shad"

const NodeContainerProvider = React.createContext(false)

type NodeContainerProps = React.ComponentPropsWithoutRef<"div">

function NodeContainer({ className, onMouseDown, ...props }: NodeContainerProps) {
  const [focus, setFocus] = React.useState(false)
  const ref = useClickAway<HTMLDivElement>(() => {
    setFocus(false)
  })

  function onFocus(e: React.MouseEvent<HTMLDivElement>) {
    setFocus(true)
    onMouseDown?.(e)
  }

  return (
    <NodeContainerProvider.Provider value={focus}>
      <div
        ref={ref}
        className={cn(
          "border rounded relative bg-card text-card-foreground shadow",
          {
            "ring-1 ring-primary": focus,
          },
          className,
        )}
        onMouseDown={onFocus}
        {...props}
      />
    </NodeContainerProvider.Provider>
  )
}

type ActionButtonProps = React.HTMLAttributes<HTMLButtonElement>

function ActionButton({ className, ...props }: ActionButtonProps) {
  return <button className={cn("aspect-square rounded-full p-1", className)} {...props} />
}

type NodeActionsProps = {
  children?: React.ReactNode
}

function NodeActions({ children }: NodeActionsProps) {
  const visible = useContext(NodeContainerProvider)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute top-0 right-0 pb-2 -translate-y-full flex gap-2 items-center cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const NodeHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col text-sm space-y-1.5 p-2 font-bold", className)} {...props} />
  ),
)
NodeHeader.displayName = "NodeHeader"

const NodeContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("py-2", className)} {...props} />,
)
NodeContent.displayName = "NodeContent"

const NodeFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-0", className)} {...props} />,
)
NodeFooter.displayName = "NodeFooter"

export { ActionButton, NodeActions, NodeContainer, NodeContent, NodeFooter, NodeHeader }
