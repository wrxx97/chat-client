// context/ErrorContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { registerGlobalErrorHandler } from "../utils/errorHandler";

interface ErrorContextValue {
  error: string | null;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 注册全局错误处理函数
    registerGlobalErrorHandler(setError);

    // 清理全局错误处理函数
    return () => registerGlobalErrorHandler(null);
  }, []);

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextValue => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
