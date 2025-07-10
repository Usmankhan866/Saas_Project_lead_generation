"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

export interface Toast {
  id: string
  type: "success" | "error" | "info"
  title: string
  message: string
  duration?: number
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id)
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[toast.type]

  return (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg max-w-sm min-w-[300px]`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{toast.title}</h4>
          <p className="text-sm opacity-90 mt-1">{toast.message}</p>
        </div>
        <button onClick={() => onRemove(toast.id)} className="ml-2 text-white hover:text-gray-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return { toasts, addToast, removeToast }
}
