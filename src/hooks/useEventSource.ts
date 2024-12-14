import { useEffect, useState } from 'react'

export interface EventSourceOptions {
  onError?: (error: Error | Event) => void
  autoReconnect?: boolean
}
export interface EventSourceReturn<T extends string[]> {
  status: string
  error: Error | Event | null
  event: T[number] | null | unknown
  data: unknown | null
}

export function useEventSource<Events extends string[]>(
  url: URL | string,
  events: Events = [] as unknown as Events,
  // FIX: 未传入options,每次都会是一个新的对象
  options: EventSourceOptions = {},
): EventSourceReturn<Events> {
  const [status, setStatus] = useState('connecting')
  const [error, setError] = useState<Error | Event | null>(null)
  const [event, setEvent] = useState<unknown | null>(null)
  const [data, setData] = useState<unknown | null>(null)

  useEffect(() => {
    const eventSource = new EventSource(url)
    let retried = 0

    const eventCallbacks = events.map((type) => {
      return {
        type,
        callback: (e: Event) => {
          const { type, ...data } = JSON.parse((e as MessageEvent).data)
          setEvent(type)
          setData(data)
        },
      }
    })

    const _init = () => {
      const { onError, autoReconnect } = options

      eventCallbacks.forEach((e) => {
        eventSource.addEventListener(e.type, e.callback)
      })

      // eventSource.onmessage = (e) => {
      // }

      eventSource.onopen = () => {
        setStatus('OPEN')
        setError(null)
        retried = 0
      }

      eventSource.onerror = (e) => {
        setStatus('CLOSED')
        setError(e)
        console.error(e)
        if (autoReconnect) {
          eventSource.close()
          if (retried > 3) {
            onError?.(e)
            return
          }
          retried++
          setTimeout(() => {
            // _init();
          }, 1000)
        }
      }
    }

    _init()

    return () => {
      eventSource.close()
      eventCallbacks.forEach((e) => {
        eventSource.removeEventListener(e.type, e.callback)
      })
    }
  }, [url, events])

  return {
    status,
    error,
    event,
    data,
  }
}
