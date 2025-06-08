"use client"
import { createContext, useContext, type ReactNode } from "react"
import { useToast, type Toast } from "@/hooks/use-toast"
import { ToastContainer } from "./toast"

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => string
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast, removeToast } = useToast()

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}
