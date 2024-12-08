import { useRef } from "react";

const useScrollToBottom = (): [
  React.RefObject<HTMLElement | null>,
  (behavior?: ScrollBehavior) => void
] => {
  const ref = useRef<HTMLElement>(null);
  const scrollToBottom = (behavior?: ScrollBehavior) => {
    console.log(ref.current?.scrollHeight);
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: behavior || "smooth",
    });
  };

  return [ref, scrollToBottom];
};

export default useScrollToBottom;
