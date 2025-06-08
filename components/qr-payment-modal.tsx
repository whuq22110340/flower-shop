"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Copy, CheckCircle, Clock, CreditCard } from "lucide-react"
import { useToastContext } from "./toast-provider"

interface QRPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentConfirmed: () => void
  orderTotal: number
  orderId: string
}

export function QRPaymentModal({ isOpen, onClose, onPaymentConfirmed, orderTotal, orderId }: QRPaymentModalProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes
  const [isConfirming, setIsConfirming] = useState(false)
  const { addToast } = useToastContext()

  // Bank info - bạn có thể thay đổi thông tin này
  const bankInfo = {
    bankName: "Vietcombank",
    accountNumber: "1050241146",
    accountName: "PHAN TUAN THANH",
    transferContent: `FlowerGrad ${orderId}`,
  }

  // Generate QR code URL - sử dụng VietQR API
  const qrCodeUrl = `https://img.vietqr.io/image/970436-${bankInfo.accountNumber}-compact2.png?amount=${orderTotal}&addInfo=${encodeURIComponent(
    bankInfo.transferContent,
  )}&accountName=${encodeURIComponent(bankInfo.accountName)}`

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onClose()
          addToast({
            type: "warning",
            title: "Hết thời gian thanh toán",
            description: "Vui lòng thử lại",
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, onClose, addToast])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    addToast({
      type: "success",
      title: "Đã sao chép",
      description: `${label} đã được sao chép`,
    })
  }

  const handleConfirmPayment = async () => {
    setIsConfirming(true)
    // Simulate API call to verify payment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConfirming(false)
    onPaymentConfirmed()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Thanh toán QR</h2>
              <p className="text-sm text-gray-600">Quét mã QR để thanh toán</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Timer */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* QR Code */}
          <Card className="border-green-200">
            <CardContent className="p-6 text-center">
              <div className="bg-white p-4 rounded-xl border-2 border-dashed border-green-300 inline-block">
                <Image
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="QR Code thanh toán"
                  width={200}
                  height={200}
                  className="mx-auto"
                  onError={(e) => {
                    // Fallback to placeholder if QR generation fails
                    e.currentTarget.src = "https://res.cloudinary.com/dp5xqgbsj/image/upload/v1749402201/z6685589341382_caee1dc09349e23584b1d57f57212cb9_iukuk5.jpg"
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-4">Sử dụng app ngân hàng để quét mã QR</p>
            </CardContent>
          </Card>

          {/* Bank Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                Thông tin chuyển khoản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ngân hàng:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{bankInfo.bankName}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Số tài khoản:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-semibold">{bankInfo.accountNumber}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankInfo.accountNumber, "Số tài khoản")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chủ tài khoản:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{bankInfo.accountName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankInfo.accountName, "Tên chủ tài khoản")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Số tiền:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-green-600 text-lg">{orderTotal.toLocaleString("vi-VN")}đ</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(orderTotal.toString(), "Số tiền")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600">Nội dung:</span>
                <div className="flex items-center space-x-2 max-w-[200px]">
                  <span className="font-mono text-sm text-right">{bankInfo.transferContent}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bankInfo.transferContent, "Nội dung chuyển khoản")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Lưu ý quan trọng:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  • Chuyển khoản đúng số tiền: <strong>{orderTotal.toLocaleString("vi-VN")}đ</strong>
                </li>
                <li>
                  • Ghi đúng nội dung: <strong>{bankInfo.transferContent}</strong>
                </li>
                <li>• Thanh toán trong vòng {formatTime(timeLeft)}</li>
                <li>• Sau khi chuyển khoản, ấn "Đã thanh toán" bên dưới</li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleConfirmPayment}
              disabled={isConfirming}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="lg"
            >
              {isConfirming ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang xác nhận...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Tôi đã thanh toán
                </>
              )}
            </Button>

            <Button variant="outline" onClick={onClose} className="w-full">
              Hủy thanh toán
            </Button>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Cần hỗ trợ? Liên hệ: <strong>0777498201</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
