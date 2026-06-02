import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, UserCheck, FileText, Database, Share2, Info, Eye, Lock, Globe, Clock, MessageSquare } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto px-6 py-20 space-y-16 antialiased text-gray-950 bg-white">
    {/* Navigation */}
    <div className="border-b border-gray-200 pb-6">
      <Link 
        to="/" 
        className="group inline-flex items-center gap-3 text-amber-600 hover:text-black transition-all duration-300 bg-amber-50 px-6 py-3 rounded-xl border-2 border-amber-500 font-black uppercase text-sm tracking-widest"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        Về trang chủ
      </Link>
    </div>

    {/* Header */}
    <div className="space-y-4 border-b-4 border-black pb-10">
      <h1 className="text-6xl font-black uppercase text-black tracking-tighter leading-none">Chính sách <span className="text-amber-500">Bảo mật</span> thông tin</h1>
      <p className="text-gray-600 font-bold text-base uppercase tracking-wider">
        Phiên bản 3.0 - Có hiệu lực từ 01/01/2026. Luna Cyber Academy tuân thủ nghiêm ngặt các quy định bảo vệ dữ liệu cá nhân.
      </p>
    </div>

    {/* Main Content */}
    <div className="space-y-16 text-gray-800 leading-relaxed text-base">
      
      {/* Section 1 */}
      <section className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-4 text-black uppercase tracking-tighter">
          <ShieldCheck className="text-amber-500" size={28} /> 1. Cam kết của Học viện
        </h3>
        <p className="text-gray-700 bg-gray-100 p-8 rounded-xl border-l-4 border-amber-500 font-medium">
          Tại Luna Cyber Academy, chúng tôi hiểu rằng quyền riêng tư không chỉ là yêu cầu pháp lý mà là nền tảng của sự tin tưởng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng nền tảng của chúng tôi. Chúng tôi cam kết minh bạch trong mọi hoạt động xử lý dữ liệu và chỉ thu thập những thông tin cần thiết nhất để phục vụ lộ trình học tập của bạn.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-8 bg-black p-10 rounded-xl text-white">
        <div className="flex items-center gap-4">
          <Database className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter">2. Dữ liệu được thu thập</h3>
        </div>
        <p className="text-gray-300">Chúng tôi phân loại dữ liệu thu thập thành các nhóm chính để tối ưu hóa quản lý:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm underline">Thông tin Định danh</strong>
            <p className="text-sm">Họ và tên, địa chỉ email, số điện thoại, thông tin liên hệ khẩn cấp và các giấy tờ xác thực cần thiết khi đăng ký khóa học.</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm underline">Dữ liệu Hành vi</strong>
            <p className="text-sm">Lịch sử tương tác với bài giảng, thời gian hoàn thành khóa học, các câu hỏi thảo luận và tiến trình làm bài kiểm tra.</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm underline">Dữ liệu Kỹ thuật</strong>
            <p className="text-sm">Địa chỉ IP, loại trình duyệt, phiên bản hệ điều hành, thời điểm truy cập và cookie để duy trì phiên đăng nhập.</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm underline">Dữ liệu Thanh toán</strong>
            <p className="text-sm">Thông tin hóa đơn, lịch sử giao dịch. Lưu ý: Chúng tôi KHÔNG lưu trữ trực tiếp số thẻ tín dụng trên hệ thống của mình.</p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-4 text-black uppercase tracking-tighter">
          <Share2 className="text-amber-500" size={28} /> 3. Chia sẻ & Tiết lộ thông tin
        </h3>
        <p className="font-medium">Luna Cyber Academy tuân thủ nguyên tắc tuyệt đối không thương mại hóa dữ liệu học viên. Thông tin chỉ được tiết lộ khi:</p>
        <ul className="space-y-3 font-semibold pl-6">
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">01.</span> Cần thiết để vận hành khóa học (ví dụ: chia sẻ thông tin cho giảng viên phụ trách).</li>
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">02.</span> Hợp tác với các bên cung cấp dịch vụ hạ tầng (như Vercel, MongoDB, v.v.) với các giao kèo bảo mật nghiêm ngặt.</li>
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">03.</span> Theo yêu cầu của cơ quan pháp luật, tòa án hoặc cơ quan nhà nước có thẩm quyền trong các vụ việc điều tra vi phạm.</li>
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">04.</span> Khi có sự đồng ý bằng văn bản hoặc yêu cầu trực tiếp từ chính học viên.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="border-2 border-black p-10 rounded-xl space-y-6">
        <div className="flex items-center gap-4">
          <Eye className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter text-black">4. Quyền của người dùng</h3>
        </div>
        <p className="text-sm font-bold uppercase text-gray-500">Bạn sở hữu dữ liệu của chính mình. Chúng tôi hỗ trợ bạn thực hiện các quyền sau:</p>
        <div className="grid md:grid-cols-2 gap-8">
          <ul className="space-y-3 font-bold text-sm">
            <li className="flex items-center gap-2">✓ <span className="underline">Quyền truy cập:</span> Xem mọi dữ liệu chúng tôi đang lưu trữ về bạn.</li>
            <li className="flex items-center gap-2">✓ <span className="underline">Quyền chỉnh sửa:</span> Cập nhật thông tin không chính xác hoặc lỗi thời.</li>
          </ul>
          <ul className="space-y-3 font-bold text-sm">
            <li className="flex items-center gap-2">✓ <span className="underline">Quyền xóa (Right to be forgotten):</span> Yêu cầu xóa tài khoản và mọi dữ liệu liên quan.</li>
            <li className="flex items-center gap-2">✓ <span className="underline">Quyền từ chối:</span> Từ chối nhận các email quảng cáo hoặc thông báo không cần thiết.</li>
          </ul>
        </div>
      </section>

      {/* Section 5 */}
      <section className="bg-amber-50 p-8 rounded-xl border border-amber-200">
        <div className="flex items-center gap-4 mb-4">
          <Clock className="text-amber-500" size={28} />
          <h3 className="text-xl font-black uppercase tracking-tighter text-black">5. Cập nhật chính sách</h3>
        </div>
        <p className="text-sm font-medium">
          Chính sách này có thể được sửa đổi để phản ánh các thay đổi trong công nghệ, luật pháp hoặc quy trình nội bộ. Chúng tôi sẽ đăng tải phiên bản mới nhất tại trang này và gửi thông báo cho bạn nếu có các thay đổi trọng yếu ảnh hưởng đến quyền lợi của bạn.
        </p>
      </section>

      {/* Section 6 */}
      <section className="p-8 border-t border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <MessageSquare className="text-amber-500" size={28} />
          <h3 className="text-xl font-black uppercase tracking-tighter text-black">6. Liên hệ bộ phận bảo mật</h3>
        </div>
        <p className="text-sm font-medium mb-4">Mọi thắc mắc hoặc yêu cầu thực thi quyền dữ liệu, vui lòng gửi về:</p>
        <div className="bg-gray-900 p-4 inline-block font-bold text-sm text-white">
          EMAIL BẢO MẬT: <a href="mailto:privacy@lunacyberacademy.edu.vn" className="text-amber-400 underline">privacy@lunacyberacademy.edu.vn</a>
        </div>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;