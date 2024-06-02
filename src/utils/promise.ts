import time from "./time"

/**
 *
 * @param delay unit ms
 * @param fn promise to delay
 * @returns
 */
export function delayedPromise<R, T extends (...args: any[]) => Promise<R>>(delay: number, fn: T): T {
  return <T>async function (...args: any[]) {
    const [v] = await Promise.all([fn(...args).catch((e) => e), time.sleep(delay)])
    if (v instanceof Error) throw v
    return v
  }
}
