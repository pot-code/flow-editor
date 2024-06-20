import * as React from "react"

import { cn } from "@/utils/shad"

const Node = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border rounded bg-card text-card-foreground shadow", className)} {...props} />
))
Node.displayName = "Node"

const NodeHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col text-sm space-y-1.5 p-2 font-bold", className)} {...props} />
  ),
)
NodeHeader.displayName = "NodeHeader"

const NodeTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
NodeTitle.displayName = "NodeTitle"

const NodeDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
NodeDescription.displayName = "NodeDescription"

const NodeContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("py-2", className)} {...props} />,
)
NodeContent.displayName = "NodeContent"

const NodeFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-0", className)} {...props} />,
)
NodeFooter.displayName = "NodeFooter"

export { Node, NodeHeader, NodeFooter, NodeTitle, NodeDescription, NodeContent }
