import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"

import { cn } from "@/utils/shad"
import { Copy, Trash } from "@phosphor-icons/react"

const NodeContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border rounded relative bg-card text-card-foreground shadow", className)}
      {...props}
    />
  ),
)
NodeContainer.displayName = "NodeContainer"

type ActionButtonProps = React.HTMLAttributes<HTMLButtonElement>

function ActionButton({ className, ...props }: ActionButtonProps) {
  return <button className={cn("aspect-square rounded-full p-1", className)} {...props} />
}

type NodeActionsProps = {
  visible?: boolean
  onDelete?: () => void
  onCopy?: () => void
}

function NodeActions({ visible, onDelete, onCopy }: NodeActionsProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute top-0 right-0 pb-2 -translate-y-full flex gap-2 items-center cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ActionButton className="bg-primary" onClick={onCopy}>
            <Copy size={14} className="text-primary-foreground" />
          </ActionButton>
          <ActionButton className="bg-destructive" onClick={onDelete}>
            <Trash size={14} className="text-destructive-foreground" />
          </ActionButton>
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

export { NodeActions, NodeContainer, NodeContent, NodeFooter, NodeHeader }
