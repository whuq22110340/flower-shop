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
import { useToastContext } from "@/components/toast-provider"
import { QRPaymentModal } from "@/components/qr-payment-modal"
import { Truck, QrCode } from "lucide-react"

export default function CheckoutPage() {
  const { state, dispatch: cartDispatch } = useCart()
  const { dispatch: ordersDispatch } = useOrders()
  const { addToast } = useToastContext()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "cod">("qr")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState("")
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

    try {
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

      setCurrentOrderId(newOrder.id)

      if (paymentMethod === "qr") {
        // Hiển thị modal QR payment
        setShowQRModal(true)
        setIsSubmitting(false)
      } else {
        // COD - xử lý như cũ
        await processOrder(newOrder)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      addToast({
        type: "error",
        title: "Đặt hàng thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau",
      })
      setIsSubmitting(false)
    }
  }

  const processOrder = async (order: any) => {
    try {
      // Lưu đơn hàng
      ordersDispatch({ type: "ADD_ORDER", payload: order })

      // Gửi dữ liệu về Formspree (nếu có)
      try {
        const response = await fetch("https://formspree.io/f/mdkzekek", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            note: formData.note,
            items: state.items.map(
              (item) => `${item.name} x ${item.quantity} (${(item.price * item.quantity).toLocaleString("vi-VN")}đ)`,
            ),
            total: state.total.toLocaleString("vi-VN") + "đ",
            paymentMethod: order.paymentMethod,
            orderId: order.id,
          }),
        })

        if (!response.ok) {
          console.warn("Formspree submission failed, but order was saved locally")
        }
      } catch (formspreeError) {
        console.warn("Formspree error:", formspreeError)
      }

      // Xóa giỏ hàng
      cartDispatch({ type: "CLEAR_CART" })

      // Chuyển đến trang thành công
      router.push(`/checkout/success?orderId=${order.id}`)
    } catch (error) {
      console.error("Process order error:", error)
      addToast({
        type: "error",
        title: "Xử lý đơn hàng thất bại",
        description: "Đã có lỗi xảy ra, vui lòng thử lại sau",
      })
    }
  }

  const handleQRPaymentConfirmed = async () => {
    const order = {
      id: currentOrderId,
      items: state.items,
      total: state.total,
      customerInfo: formData,
      paymentMethod: "qr" as const,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    setShowQRModal(false)
    await processOrder(order)
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
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Thông tin giao hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-green-500 focus:border-green-500"
                    />
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
                      className="focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-green-500 focus:border-green-500"
                      placeholder="Ví dụ: Phòng 101, Tòa A, HCMUTE"
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
                      className="focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Phương thức thanh toán</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "qr" | "cod")}>
                    <div className="flex items-center space-x-2 p-4 border border-green-200 rounded-lg hover:bg-green-50">
                      <RadioGroupItem value="qr" id="qr" />
                      <Label htmlFor="qr" className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                          <QrCode className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="font-medium">Chuyển khoản QR</span>
                          <p className="text-sm text-gray-600">Quét mã QR để thanh toán nhanh</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-green-200 rounded-lg hover:bg-green-50">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                          <Truck className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                          <p className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hoa</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Đơn hàng của bạn</CardTitle>
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
                    <span className="text-green-600">{state.total.toLocaleString("vi-VN")}đ</span>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      💚 100% doanh thu sẽ được đóng góp cho Mùa Hè Xanh 2025
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Đang xử lý..."
                    ) : paymentMethod === "qr" ? (
                      <>
                        <QrCode className="w-5 h-5 mr-2" />
                        Thanh toán QR
                      </>
                    ) : (
                      <>
                        <Truck className="w-5 h-5 mr-2" />
                        Đặt hàng COD
                      </>
                    )}
                  </Button>

                  <div className="text-sm text-gray-600 text-center">
                    Bằng cách đặt hàng, bạn đồng ý với{" "}
                    <a href="#" className="text-green-600 hover:underline">
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

      {/* QR Payment Modal */}
      <QRPaymentModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        onPaymentConfirmed={handleQRPaymentConfirmed}
        orderTotal={state.total}
        orderId={currentOrderId}
      />
    </>
  )
}
