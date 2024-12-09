import { ErrorContext, type ErrorContextValue } from '@/components/ErrorProvider'
import { useContext } from 'react'

export function useError(): ErrorContextValue {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}
