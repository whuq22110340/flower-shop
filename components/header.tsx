"use client"

import Link from "next/link"
import { ShoppingCart, Flower2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Flower2 className="h-8 w-8  text-green-800" />
          <span className="text-2xl font-bold  text-green-800">FlowerGrad</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover: text-green-800 transition-colors">
            Trang chủ
          </Link>
          <Link href="#products" className="text-sm font-medium hover: text-green-800 transition-colors">
            Sản phẩm
          </Link>
          <Link href="#about" className="text-sm font-medium hover: text-green-800 transition-colors">
            Giới thiệu
          </Link>
          <Link href="#contact" className="text-sm font-medium hover: text-green-800 transition-colors">
            Liên hệ
          </Link>
        </nav>

        <Link href="/cart">
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-pink-600">
                {itemCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  )
}
