"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Flower2, LogOut } from "lucide-react"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin/login")
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Flower2 className="h-8 w-8  text-green-800" />
            <span className="text-2xl font-bold  text-green-800">FlowerGrad Admin</span>
          </div>

          <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
