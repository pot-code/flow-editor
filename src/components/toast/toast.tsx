import { CheckCircle, Info, WarningCircle, XCircle } from "@phosphor-icons/react"
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { MessageType } from "./types"

export interface ToastProps {
  title: string
  description?: string
  type?: MessageType
  duration?: number
  onClose: () => void
}

export default memo<ToastProps>(({ title, description, type = "info", duration = 3000, onClose }) => {
  const animationRef = useRef(new Animation())
  const domRef = useRef<HTMLDivElement>(null!)

  const onMouseEnter = useCallback(() => {
    if (animationRef.current) animationRef.current.pause()
  }, [])

  const onMouseLeave = useCallback(() => {
    if (animationRef.current) animationRef.current.play()
  }, [])

  useEffect(() => {
    const animation = domRef.current.animate(null, { duration })
    animationRef.current = animation
    animation.onfinish = onClose
    animation.play()
    return () => {
      animationRef.current.cancel()
    }
    // add deps will cause a lot of troubles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card ref={domRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <CardHeader className="gap-2">
        {(() => {
          switch (type) {
            case "success":
              return <CheckCircle className="text-success-400" weight="fill" />
            case "error":
              return <XCircle className="text-danger-400" weight="fill" />
            case "warning":
              return <WarningCircle className="text-warning-400" weight="fill" />
            default:
              return <Info className="text-primary-400" weight="fill" />
          }
        })()}
        <span className="text-foreground-600">{title}</span>
      </CardHeader>
      {description && <CardBody className="text-foreground-500 text-sm">{description}</CardBody>}
    </Card>
  )
})
