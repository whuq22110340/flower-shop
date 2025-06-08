"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { useOrders } from "@/lib/orders-context"
import { CreditCard, Truck } from "lucide-react"

export default function CheckoutPage() {
  const { state, dispatch: cartDispatch } = useCart()
  const { dispatch: ordersDispatch } = useOrders()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "cod">("momo")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Tạo đơn hàng mới
    const newOrder = {
      id: Date.now().toString(),
      items: state.items,
      total: state.total,
      customerInfo: formData,
      paymentMethod,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    // Lưu đơn hàng
    ordersDispatch({ type: "ADD_ORDER", payload: newOrder })

    // Xóa giỏ hàng
    cartDispatch({ type: "CLEAR_CART" })

    // Hiển thị thông báo thành công
    alert(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.id}. Chúng tôi sẽ liên hệ với bạn sớm nhất.`)

    // Chuyển về trang chủ
    router.push("/")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (state.items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin giao hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    id="note"
                    name="note"
                    placeholder="Ghi chú thêm về đơn hàng..."
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "momo" | "cod")}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex items-center space-x-2 cursor-pointer">
                      <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span>Thanh toán MoMo</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Đơn hàng của bạn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toLocaleString("vi-VN")}đ</span>
                  </div>
                ))}
                <hr />
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
                  <span className="text-pink-600">{state.total.toLocaleString("vi-VN")}đ</span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  size="lg"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đặt hàng ngay"}
                </Button>

                <div className="text-sm text-gray-600 text-center">
                  Bằng cách đặt hàng, bạn đồng ý với{" "}
                  <a href="#" className="text-pink-600 hover:underline">
                    Điều khoản dịch vụ
                  </a>{" "}
                  của chúng tôi.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
