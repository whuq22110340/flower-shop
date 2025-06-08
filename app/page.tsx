import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Star, Truck, Shield, Phone, Calendar, MapPin, Heart, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4 mr-2" />
                Gây quỹ Mùa Hè Xanh 2025
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Hoa Tốt Nghiệp
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  {" "}
                  Ý Nghĩa
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Chúc mừng thành công của bạn với những bó hoa tươi thắm, đồng thời góp phần xây dựng một cộng đồng tốt
                đẹp hơn thông qua chương trình Mùa Hè Xanh 2025.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                >
                  Xem sản phẩm
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Tìm hiểu thêm
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-green-600" />
                  <span>14-15 Tháng 6, 2025</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  <span>Lễ tốt nghiệp HCMUTE</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <Image
                src="https://res.cloudinary.com/dp5xqgbsj/image/upload/v1749382624/494647621_685459144133406_3831076804124337804_n_j7qllt.jpg"
                alt="Hoa tốt nghiệp"
                width={500}
                height={500}
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Redesigned */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-lg font-semibold mb-6">
                <Users className="w-5 h-5 mr-2" />
                Mùa Hè Xanh 2025 - Khoa Công Nghệ Thông Tin
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Chào Mừng Bạn Đến Với{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  FlowerGrad
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🎓 Chúc Mừng Thành Công</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chúc mừng bạn đã hoàn thành một chặng đường học tập đầy gian nan và đạt được thành tựu lớn trong lễ
                    tốt nghiệp! Những bó hoa tươi thắm không chỉ là món quà chúc mừng mà còn mang ý nghĩa sâu sắc hơn.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">🌱 Mùa Hè Xanh 2025</h3>
                  <p className="text-green-700 leading-relaxed">
                    <strong>100% doanh thu</strong> từ việc bán hoa sẽ được đóng góp cho chương trình Mùa Hè Xanh 2025
                    của khoa Công nghệ Thông tin, hỗ trợ các hoạt động tình nguyện và phát triển cộng đồng.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">💝 Ý Nghĩa Kép</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Mỗi bó hoa bạn mua không chỉ thể hiện sự tri ân với thầy cô, bạn bè mà còn góp phần xây dựng một
                    cộng đồng mạnh mẽ, tích cực hơn.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">🤝 Cùng Nhau Lan Tỏa</h3>
                  <p className="text-blue-700 leading-relaxed">
                    Hãy cùng chúng tôi chia sẻ niềm vui và lan tỏa tình yêu thương, đồng thời tham gia vào hành trình ý
                    nghĩa này!
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-3xl text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-4">🎯 Mục Tiêu Gây Quỹ</h3>
                <p className="text-xl mb-6 opacity-90">Mỗi bó hoa = Một đóng góp ý nghĩa cho Mùa Hè Xanh 2025</p>
                <div className="inline-flex items-center px-8 py-4 bg-white/20 rounded-full text-lg font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  100% doanh thu cho hoạt động tình nguyện
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Notice */}
      <section className="py-12 bg-gradient-to-r from-red-50 to-pink-50 border-y border-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-red-100 text-red-800 rounded-full text-lg font-semibold mb-4">
              <Calendar className="w-5 h-5 mr-2" />
              Thời Gian Có Hạn
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Chỉ Bán Trong 2 Ngày: 14-15 Tháng 6, 2025
            </h3>
            <p className="text-lg text-gray-700">
              Đặc biệt trong Lễ Tốt Nghiệp của Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE)
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Tại Sao Chọn FlowerGrad?</h2>
            <p className="text-xl text-gray-600">Chất lượng tốt nhất, ý nghĩa sâu sắc nhất</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Giao hàng nhanh</h3>
              <p className="text-gray-600">Giao hàng trong 2-4 giờ tại khuôn viên HCMUTE</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Chất lượng đảm bảo</h3>
              <p className="text-gray-600">Hoa tươi 100%, được chọn lọc kỹ càng</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Ý nghĩa nhân văn</h3>
              <p className="text-gray-600">100% doanh thu cho Mùa Hè Xanh 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-xl text-gray-600">Những bó hoa đẹp nhất dành cho ngày tốt nghiệp của bạn</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sinh Viên Nói Gì</h2>
            <p className="text-xl text-gray-600">Những phản hồi tích cực từ cộng đồng HCMUTE</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Thị Lan",
                major: "Khoa CNTT",
                review: "Hoa rất tươi và đẹp, ý nghĩa gây quỹ rất tốt. Rất vui được đóng góp cho Mùa Hè Xanh!",
              },
              {
                name: "Trần Văn Nam",
                major: "Khoa Cơ khí",
                review: "Dịch vụ tuyệt vời, giao hàng đúng giờ. Cảm ơn vì đã tạo cơ hội để chúng em làm từ thiện.",
              },
              {
                name: "Lê Thị Hoa",
                major: "Khoa Điện tử",
                review: "Bó hoa đẹp, giá cả hợp lý và còn có ý nghĩa xã hội. Sẽ giới thiệu cho bạn bè!",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100"
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.review}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-green-600">{testimonial.major}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Updated */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-xl text-gray-600">Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Chủ đề tin nhắn"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg"
                >
                  Gửi tin nhắn
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                      <p className="text-gray-600">
                        Số 1 Võ Văn Ngân
                        <br />
                        Đại học Sư phạm Kỹ thuật TP.HCM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Điện thoại</h4>
                      <p className="text-gray-600">
                        Hotline: 0777498201
                        <br />
                        Hỗ trợ 24/7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">
                        yit@hcmute.edu.vn
                        <br />
                        Khoa Công nghệ Thông tin
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Thời gian bán</h4>
                      <p className="text-gray-600">
                        14-15 Tháng 6, 2025
                        <br />
                        Trong Lễ tốt nghiệp HCMUTE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Notice */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">🌟 Đặc Biệt</h3>
                <p className="text-lg opacity-90 mb-4">Chỉ bán trong 2 ngày duy nhất tại Lễ tốt nghiệp HCMUTE</p>
                <div className="bg-white/20 p-4 rounded-xl">
                  <p className="font-semibold">100% doanh thu → Mùa Hè Xanh 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FlowerGrad</h3>
              <p className="text-gray-400 mb-4">Hoa tốt nghiệp ý nghĩa cho Mùa Hè Xanh 2025</p>
              <div className="bg-green-600 p-3 rounded-lg">
                <p className="text-white font-semibold text-sm">100% doanh thu cho hoạt động tình nguyện</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <p className="text-gray-400">📞 0777498201</p>
              <p className="text-gray-400">📧 yit@hcmute.edu.vn</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Địa chỉ</h4>
              <p className="text-gray-400">
                Số 1 Võ Văn Ngân
                <br />
                Đại học Sư phạm Kỹ thuật TP.HCM
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Thời gian</h4>
              <p className="text-gray-400">14-15 Tháng 6, 2025</p>
              <p className="text-gray-400">Lễ tốt nghiệp HCMUTE</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 FlowerGrad - Khoa Công nghệ Thông tin, HCMUTE. Mùa Hè Xanh 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
