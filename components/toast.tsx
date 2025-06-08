"use client"

import { useEffect } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Toast } from "@/hooks/use-toast"

interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
}

export function ToastComponent({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div className={`flex items-start p-4 border rounded-lg shadow-lg ${getStyles()} animate-in slide-in-from-right`}>
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="ml-3 flex-1">
        <p className="font-medium">{toast.title}</p>
        {toast.description && <p className="text-sm opacity-90 mt-1">{toast.description}</p>}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(toast.id)}
        className="ml-2 h-6 w-6 p-0 hover:bg-black/10"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}
