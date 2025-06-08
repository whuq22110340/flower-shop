import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { OrdersProvider } from "@/lib/orders-context"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FlowerGrad   - Gây Quỹ Mùa Hè Xanh 2025 | Hoa Tốt Nghiệp HCMUTE",
  description:
    "Hoa tốt nghiệp ý nghĩa cho Lễ tốt nghiệp HCMUTE. 100% doanh thu đóng góp cho chương trình Mùa Hè Xanh 2025 của khoa Công nghệ Thông tin. Chỉ bán 14-15/6/2025.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <OrdersProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
          </CartProvider>
        </OrdersProvider>
      </body>
    </html>
  )
}
