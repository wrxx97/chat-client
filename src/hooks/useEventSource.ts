import { useEffect, useState } from "react";

export type EventSourceOptions = {
  onError?: (error: Error | Event) => void;
  autoReconnect?: boolean;
};
export type EventSourceReturn<T extends string[]> = {
  status: string;
  error: Error | Event | null;
  event: T[number] | null | unknown;
  data: unknown | null;
};

export function useEventSource<Events extends string[]>(
  url: URL | string,
  events: Events = [] as unknown as Events,
  options: EventSourceOptions = {}
): EventSourceReturn<Events> {
  const [status, setStatus] = useState("connecting");
  const [error, setError] = useState<Error | Event | null>(null);
  const [event, setEvent] = useState<unknown | null>(null);
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(url.toString());
    let retried = 0;

    let eventCallbacks = events.map((type) => {
      return {
        type,
        callback: (e: Event) => {
          const { type, ...data } = JSON.parse((e as MessageEvent).data);
          setEvent(type);
          setData(data);
        },
      };
    });

    const _init = () => {
      const { onError, autoReconnect } = options;

      eventCallbacks.forEach((e) => {
        eventSource.addEventListener(e.type, e.callback);
      });

      eventSource.onmessage = (e) => {
        console.log("onmessage", e);
      };

      eventSource.onopen = () => {
        setStatus("OPEN");
        console.log("open");
        setError(null);
        retried = 0;
      };

      eventSource.onerror = (e) => {
        setStatus("CLOSED");
        setError(e);
        console.error(e);
        if (autoReconnect) {
          eventSource.close();
          if (retried > 3) {
            onError?.(e);
            return;
          }
          retried++;
          setTimeout(() => {
            _init();
          }, 1000);
        }
      };
    };

    _init();

    return () => {
      eventSource.close();
      eventCallbacks.forEach((e) => {
        eventSource.removeEventListener(e.type, e.callback);
      });
    };
  }, [url, events, options]);

  return {
    status,
    error,
    event,
    data,
  };
}
