import { useEffect, useState } from "react";

const useHeightObserver = (
  targetRef: React.RefObject<HTMLElement | null>,
  cb: Function
): number => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
        cb(entry.contentRect.height);
      }
    };

    const observer = new ResizeObserver(handleResize);
    const targetElement = targetRef.current;

    if (targetElement) {
      observer.observe(targetElement);
      setHeight(targetElement.clientHeight); // 初始化高度
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
      observer.disconnect();
    };
  }, [targetRef]);

  return height;
};

export default useHeightObserver;
