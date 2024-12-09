import { useEffect, useState } from 'react'

function useHeightObserver(
  targetRef: React.RefObject<HTMLElement | null>,
  cb: (height: number) => void,
): number {
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    function handleResize(entries: ResizeObserverEntry[]) {
      for (const entry of entries) {
        setHeight(entry.contentRect.height)
        cb(entry.contentRect.height)
      }
    }

    const observer = new ResizeObserver(handleResize)
    const targetElement = targetRef.current

    if (targetElement) {
      observer.observe(targetElement)
      setHeight(targetElement.clientHeight) // 初始化高度
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
      observer.disconnect()
    }
  }, [cb, targetRef])

  return height
}

export default useHeightObserver
