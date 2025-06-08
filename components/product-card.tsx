"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart, type Product } from "@/lib/cart-context"
import { useToastContext } from "./toast-provider"
import { ShoppingCart, Plus } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()
  const { addToast } = useToastContext()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Thêm hiệu ứng delay nhỏ để tạo cảm giác responsive
    await new Promise((resolve) => setTimeout(resolve, 300))

    dispatch({ type: "ADD_ITEM", payload: product })

    addToast({
      type: "success",
      title: "Đã thêm vào giỏ hàng! 🛒",
      description: `${product.name} - ${product.price.toLocaleString("vi-VN")}đ`,
    })

    setIsAdding(false)
  }

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <CardContent className="p-6">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-xl mb-2 hover:text-green-600 transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-3 bg-green-50 px-3 py-1 rounded-full inline-block">{product.category}</p>
        <p className="text-2xl font-bold text-green-600">{product.price.toLocaleString("vi-VN")}đ</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg group relative overflow-hidden"
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Đang thêm...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Thêm vào giỏ
              <Plus className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
