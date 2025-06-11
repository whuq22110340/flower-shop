"use client"

import Link from "next/link"
import { ShoppingCart, Flower2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useEffect, useState } from "react"
import Image from 'next/image';


export function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const [prevItemCount, setPrevItemCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (itemCount > prevItemCount) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }
    setPrevItemCount(itemCount)
  }, [itemCount, prevItemCount])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Flower2 className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-green-600">FlowerGrad</span>
          <Image
            src="https://res.cloudinary.com/dp5xqgbsj/image/upload/v1749624524/CNTTxCTL_4x_cgsq0v.png"
            alt="lOGO"
            width={250}
            height={250}
            className="relative rounded-3xl shadow-2xl"
          />
        </Link>


        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
            Trang chủ
          </Link>
          <Link href="#products" className="text-sm font-medium hover:text-green-600 transition-colors">
            Sản phẩm
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-green-600 transition-colors">
            Giới thiệu
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-green-600 transition-colors">
            Liên hệ
          </Link>
        </nav>

        <Link href="/cart">
          <Button
            variant="outline"
            size="sm"
            className={`relative transition-all duration-300 ${
              isAnimating ? "scale-110 bg-green-50 border-green-300" : ""
            }`}
          >
            <ShoppingCart className={`h-4 w-4 ${isAnimating ? "animate-bounce" : ""}`} />
            {itemCount > 0 && (
              <Badge
                className={`absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-green-600 transition-all duration-300 ${
                  isAnimating ? "scale-125 bg-green-500" : ""
                }`}
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  )
}
