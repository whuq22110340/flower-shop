"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"
import { ShoppingCart, Minus, Plus, Star } from "lucide-react"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-gray-600">(24 đánh giá)</span>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-6">{product.price.toLocaleString("vi-VN")}đ</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Số lượng:</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">{(product.price * quantity).toLocaleString("vi-VN")}đ</span>
                </div>

                <Button onClick={handleAddToCart} className="w-full bg-green-600 hover:bg-green-800" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Cam kết chất lượng</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>✓ Hoa tươi 100%</li>
              <li>✓ Giao hàng trong 2-4 giờ</li>
              <li>✓ Hoàn tiền nếu không hài lòng</li>
              <li>✓ Tư vấn miễn phí</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
