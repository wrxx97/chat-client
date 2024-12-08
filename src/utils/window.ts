import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";

export function resizeChatWindow() {
  const appWindow = getCurrentWindow();
  appWindow.setSize(new LogicalSize(800, 600));
}
