"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart, Package, Phone, Mail } from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    const id = searchParams.get("orderId")
    if (!id) {
      router.push("/")
      return
    }
    setOrderId(id)
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-20 mx-auto"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Đặt hàng thành công! 🎉</h1>
            <p className="text-xl text-gray-600">Cảm ơn bạn đã đóng góp cho Mùa Hè Xanh 2025</p>
          </div>

          {/* Order Info */}
          <Card className="mb-8 border-green-200 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  <Package className="w-4 h-4 mr-2" />
                  Mã đơn hàng: #{orderId}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Đơn hàng của bạn đã được tiếp nhận</h2>
                <p className="text-gray-600">
                  Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Đóng góp ý nghĩa</h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    100% doanh thu từ đơn hàng này sẽ được đóng góp cho chương trình Mùa Hè Xanh 2025 của khoa Công nghệ
                    Thông tin
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-3">
                    <Package className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">Giao hàng</h3>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Hoa sẽ được giao tại khuôn viên HCMUTE theo thông tin bạn đã cung cấp
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mb-8 border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Hotline</p>
                    <p className="text-gray-600">0777498201</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">yit@hcmute.edu.vn</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="text-center space-y-4">
            <Link href="/">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3">
                Về trang chủ
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Bạn có thể theo dõi trạng thái đơn hàng qua số điện thoại đã đăng ký
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
