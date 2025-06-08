"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToastContext } from "@/components/toast-provider"
import { products } from "@/lib/products"
import { ShoppingCart, Minus, Plus, Star, Heart, Share2 } from "lucide-react"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { dispatch } = useCart()
  const { addToast } = useToastContext()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Thêm hiệu ứng delay nhỏ
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Thêm từng sản phẩm theo số lượng
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product })
    }

    addToast({
      type: "success",
      title: `Đã thêm ${quantity} sản phẩm vào giỏ hàng! 🎉`,
      description: `${product.name} - Tổng: ${(product.price * quantity).toLocaleString("vi-VN")}đ`,
    })

    setIsAdding(false)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Xem sản phẩm ${product.name} - ${product.price.toLocaleString("vi-VN")}đ`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      addToast({
        type: "success",
        title: "Đã sao chép link",
        description: "Link sản phẩm đã được sao chép",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative group">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
            />
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleShare}
                className="bg-white/90 hover:bg-white shadow-lg"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white shadow-lg">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">{product.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-gray-600">(24 đánh giá)</span>
            </div>
            <p className="text-4xl font-bold text-green-600 mb-6">{product.price.toLocaleString("vi-VN")}đ</p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
            <h3 className="text-lg font-semibold mb-3 text-green-800">🌱 Đóng góp ý nghĩa</h3>
            <p className="text-green-700">
              100% doanh thu từ sản phẩm này sẽ được đóng góp cho chương trình Mùa Hè Xanh 2025 của khoa Công nghệ Thông
              tin
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Số lượng:</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 rounded-full border-green-300 hover:bg-green-50"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-16 text-center text-xl font-semibold bg-green-50 py-2 rounded-lg">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 rounded-full border-green-300 hover:bg-green-50"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xl font-semibold bg-gray-50 p-4 rounded-xl">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600 text-2xl">{(product.price * quantity).toLocaleString("vi-VN")}đ</span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                  size="lg"
                >
                  {isAdding ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang thêm vào giỏ...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Thêm {quantity} sản phẩm vào giỏ hàng
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✓ Cam kết chất lượng</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Hoa tươi 100%</li>
                <li>• Giao hàng trong 2-4 giờ</li>
                <li>• Hoàn tiền nếu không hài lòng</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📞 Hỗ trợ khách hàng</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Hotline: 0777498201</li>
                <li>• Email: yit@hcmute.edu.vn</li>
                <li>• Tư vấn miễn phí 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
