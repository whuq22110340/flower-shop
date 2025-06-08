"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Flower2 } from "lucide-react"

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Đăng nhập đơn giản (trong thực tế sẽ dùng API)
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Flower2 className="mx-auto h-12 w-12 text-pink-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Đăng nhập Admin</h2>
          <p className="mt-2 text-sm text-gray-600">Quản lý đơn hàng FlowerGrad</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Đăng nhập</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
              )}

              <div>
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>

              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                Đăng nhập
              </Button>
            </form>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>Tài khoản demo:</p>
              <p>
                Username: <code className="bg-gray-100 px-1 rounded">admin</code>
              </p>
              <p>
                Password: <code className="bg-gray-100 px-1 rounded">admin123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
