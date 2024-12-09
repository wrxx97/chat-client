import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window'
import { useRef } from 'react'

import useHeightObserver from './useHeightObserver'

function useWindowResize() {
  const appWindow = getCurrentWindow()
  const targetRef = useRef<HTMLElement>(null)

  useHeightObserver(targetRef, (height: number) => {
    appWindow.setSize(new LogicalSize(600, height))
  })

  return targetRef
}

export default useWindowResize
