import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";

import useHeightObserver from "./useHeightObserver";

const useWindowResize = (targetRef: React.RefObject<HTMLElement>) => {
  const appWindow = getCurrentWindow();

  useHeightObserver(targetRef, (height: number) => {
    console.log("Height:", height);

    appWindow.setSize(new LogicalSize(600, height + 40));
  });
};

export default useWindowResize;
