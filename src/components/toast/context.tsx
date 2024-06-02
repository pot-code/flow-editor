import { AnimatePresence, motion } from "framer-motion"
import { createContext, useContext, useMemo } from "react"
import Toast from "./toast"
import { MessageType } from "./types"
import Viewport from "./viewport"

interface MessageConfig {
  description?: string
  duration?: number
}

interface Message extends MessageConfig {
  id: string
  title: string
  type?: MessageType
}

interface ToastContextState {
  info: (title: string, config?: MessageConfig) => void
  success: (title: string, config?: MessageConfig) => void
  warning: (title: string, config?: MessageConfig) => void
  error: (title: string, config?: MessageConfig) => void
}

const Context = createContext<ToastContextState | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])

  const onMessageClose = useCallback((id: string) => {
    setMessages((msg) => msg.filter((m) => m.id !== id))
  }, [])

  const appendMessage = useCallback((type: MessageType, title: string, config?: MessageConfig) => {
    setMessages((msg) => [...msg, { ...config, type, title, id: Date.now().toString() }])
  }, [])

  const value = useMemo(
    () => ({
      info: (title: string, config?: MessageConfig) => {
        appendMessage("info", title, config)
      },
      success: (title: string, config?: MessageConfig) => {
        appendMessage("success", title, config)
      },
      warning: (title: string, config?: MessageConfig) => {
        appendMessage("warning", title, config)
      },
      error: (title: string, config?: MessageConfig) => {
        appendMessage("error", title, config)
      },
    }),
    [appendMessage],
  )

  return (
    <Context.Provider value={value}>
      {children}
      <Viewport>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.li
              layout
              className="list-none"
              key={message.id}
              style={{
                x: "100%",
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                stiffness: 300,
                damping: 30,
              }}
            >
              <Toast
                title={message.title}
                description={message.description}
                type={message.type}
                duration={message.duration}
                onClose={() => onMessageClose(message.id)}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </Viewport>
    </Context.Provider>
  )
}

export function useToast() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
