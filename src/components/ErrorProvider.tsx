import React, { createContext, useEffect, useMemo, useState } from 'react'
import { registerGlobalErrorHandler } from '../utils/errorHandler'

export interface ErrorContextValue {
  error: string | null
  clearError: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const ErrorContext = createContext<ErrorContextValue | undefined>(undefined)

interface ErrorProviderProps {
  children: React.ReactNode
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 注册全局错误处理函数
    registerGlobalErrorHandler(setError)

    // 清理全局错误处理函数
    return () => registerGlobalErrorHandler(null)
  }, [])

  const clearError = () => setError(null)

  const value = useMemo(() => ({ error, clearError }), [error])

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  )
}
