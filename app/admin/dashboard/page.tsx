"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useOrders, type Order } from "@/lib/orders-context"
import { Package, Clock, CheckCircle, Truck, XCircle, Eye } from "lucide-react"

export default function AdminDashboard() {
  const { state, dispatch } = useOrders()
  const router = useRouter()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Kiểm tra đăng nhập
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    if (!isLoggedIn) {
      router.push("/admin/login")
    }
  }, [router])

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id: orderId, status } })
  }

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
      confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
      shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-800" },
      delivered: { label: "Đã giao", color: "bg-green-100 text-green-800" },
      cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "shipping":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <Package className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
    }
  }

  const stats = {
    total: state.orders.length,
    pending: state.orders.filter((o) => o.status === "pending").length,
    confirmed: state.orders.filter((o) => o.status === "confirmed").length,
    shipping: state.orders.filter((o) => o.status === "shipping").length,
    delivered: state.orders.filter((o) => o.status === "delivered").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Quản lý</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-gray-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chờ xác nhận</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đã xác nhận</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Truck className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đang giao</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.shipping}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đã giao</p>
                  <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            {state.orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có đơn hàng nào</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-semibold">Đơn hàng #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.name}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-pink-600">{order.total.toLocaleString("vi-VN")}đ</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Xem</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Chi tiết đơn hàng #{selectedOrder.id}</h2>
                  <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                    Đóng
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Thông tin khách hàng</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p>
                        <strong>Tên:</strong> {selectedOrder.customerInfo.name}
                      </p>
                      <p>
                        <strong>Điện thoại:</strong> {selectedOrder.customerInfo.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedOrder.customerInfo.email || "Không có"}
                      </p>
                      <p>
                        <strong>Địa chỉ:</strong> {selectedOrder.customerInfo.address}
                      </p>
                      {selectedOrder.customerInfo.note && (
                        <p>
                          <strong>Ghi chú:</strong> {selectedOrder.customerInfo.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Sản phẩm</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 text-lg font-bold">
                        <span>Tổng cộng:</span>
                        <span className="text-pink-600">{selectedOrder.total.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Thanh toán</h3>
                    <p>{selectedOrder.paymentMethod === "momo" ? "MoMo" : "Thanh toán khi nhận hàng"}</p>
                  </div>

                  {/* Status Update */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Cập nhật trạng thái</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedOrder.status === "pending" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, "pending")}
                      >
                        Chờ xác nhận
                      </Button>
                      <Button
                        variant={selectedOrder.status === "confirmed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, "confirmed")}
                      >
                        Xác nhận
                      </Button>
                      <Button
                        variant={selectedOrder.status === "shipping" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, "shipping")}
                      >
                        Đang giao
                      </Button>
                      <Button
                        variant={selectedOrder.status === "delivered" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                      >
                        Đã giao
                      </Button>
                      <Button
                        variant={selectedOrder.status === "cancelled" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
                      >
                        Hủy đơn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
