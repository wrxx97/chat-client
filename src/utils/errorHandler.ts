// utils/errorHandler.ts
type ErrorHandler = (message: string) => void

let globalErrorHandler: ErrorHandler | null = null

// 注册全局错误处理方法
export function registerGlobalErrorHandler(handler: ErrorHandler | null): void {
  globalErrorHandler = handler
}

// 显示全局错误
export function showGlobalError(message: string): void {
  if (globalErrorHandler) {
    globalErrorHandler(message)
  }
  else {
    console.error('doesn\'t register global error handler', message)
  }
}
