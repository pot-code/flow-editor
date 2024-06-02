import clsx from "clsx"
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion"

export interface ResizableWidthProps {
  children: React.ReactNode
  defaultWidth: number
  className?: string
  minWidth?: number
  maxWidth?: number
}

export function ResizeWidth({
  children,
  defaultWidth,
  className,
  minWidth = 0,
  maxWidth = Infinity,
}: ResizableWidthProps) {
  const dragWidth = 4
  const deltaX = useMotionValue(0)
  const target = useRef<HTMLDivElement>(null)

  useMotionValueEvent(deltaX, "change", (x) => {
    if (target.current) target.current.style.width = `${x + defaultWidth}px`
  })

  return (
    <div ref={target} className={clsx(className, "relative")} style={{ width: defaultWidth }}>
      {children}
      <motion.div
        style={{ left: defaultWidth - dragWidth / 2, x: deltaX, width: dragWidth }}
        className="absolute top-0 h-full transition-colors duration-0
        hover:bg-blue-200 hover:cursor-col-resize hover:delay-300
        active:bg-blue-400 active:delay-0"
        drag="x"
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          document.body.style.cursor = "col-resize"
        }}
        onDragEnd={() => {
          document.body.style.cursor = ""
        }}
        dragConstraints={{ left: minWidth - defaultWidth, right: maxWidth - defaultWidth }}
      />
    </div>
  )
}
