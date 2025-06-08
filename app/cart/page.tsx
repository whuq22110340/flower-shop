"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h1>
        <p className="text-gray-600 mb-8">Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <Link href="/">
          <Button className="bg-green-600 hover:bg-green-700">Tiếp tục mua sắm</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.category}</p>
                    <p className="text-green-600 font-bold">{item.price.toLocaleString("vi-VN")}đ</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{state.total.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span>Miễn phí</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng:</span>
                <span className="text-green-600">{state.total.toLocaleString("vi-VN")}đ</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Tiến hành thanh toán
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
