"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { CartItem } from "./cart-context"

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
    note: string
  }
  paymentMethod: "momo" | "cod"
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"
  createdAt: string
}

interface OrdersState {
  orders: Order[]
}

type OrdersAction =
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: Order["status"] } }
  | { type: "LOAD_ORDERS"; payload: Order[] }

const OrdersContext = createContext<{
  state: OrdersState
  dispatch: React.Dispatch<OrdersAction>
} | null>(null)

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case "ADD_ORDER":
      const newOrders = [action.payload, ...state.orders]
      if (typeof window !== "undefined") {
        localStorage.setItem("orders", JSON.stringify(newOrders))
      }
      return { orders: newOrders }
    case "UPDATE_ORDER_STATUS":
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id ? { ...order, status: action.payload.status } : order,
      )
      if (typeof window !== "undefined") {
        localStorage.setItem("orders", JSON.stringify(updatedOrders))
      }
      return { orders: updatedOrders }
    case "LOAD_ORDERS":
      return { orders: action.payload }
    default:
      return state
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, { orders: [] })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOrders = localStorage.getItem("orders")
      if (savedOrders) {
        dispatch({ type: "LOAD_ORDERS", payload: JSON.parse(savedOrders) })
      }
    }
  }, [])

  return <OrdersContext.Provider value={{ state, dispatch }}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
