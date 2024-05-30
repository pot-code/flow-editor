import { setupWorker } from "msw/browser"

export async function createWorker() {
  const exportHandlers: any[] = []
  const modules = import.meta.glob("./handlers/**/*.ts", { eager: true })

  Object.values(modules).forEach((mod) => {
    const { handlers } = mod as { handlers: any[] }
    exportHandlers.push(...handlers)
  })

  return setupWorker(...exportHandlers)
}
