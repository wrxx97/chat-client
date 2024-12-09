import { useRef } from 'react'

function useScrollToBottom(): [
  React.RefObject<HTMLElement | null>,
  (behavior?: ScrollBehavior) => void,
] {
  const ref = useRef<HTMLElement>(null)
  const scrollToBottom = (behavior?: ScrollBehavior) => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: behavior || 'smooth',
    })
  }

  return [ref, scrollToBottom]
}

export default useScrollToBottom
