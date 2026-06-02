import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle, Target, AlertTriangle, Scale, Mail, Info } from "lucide-react";

const SecurityPolicy = () => (
  <div className="max-w-4xl mx-auto px-6 py-20 space-y-16 antialiased text-gray-950 bg-white">
    <div className="border-b border-gray-200 pb-6">
      <Link 
        to="/" 
        className="group inline-flex items-center gap-3 text-amber-600 hover:text-black transition-all duration-300 bg-amber-50 px-6 py-3 rounded-xl border-2 border-amber-500 font-black uppercase text-sm tracking-widest"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        Về trang chủ
      </Link>
    </div>

    <div className="space-y-4 border-b-4 border-black pb-10">
      <h1 className="text-6xl font-black uppercase text-black tracking-tighter leading-none">Chính sách <span className="text-amber-500">An ninh</span> hệ thống</h1>
      <p className="text-gray-600 font-bold text-base uppercase tracking-wider">
        Phiên bản 3.0 - Có hiệu lực từ 01/01/2026. Luna Cyber Academy cam kết bảo mật tuyệt đối.
      </p>
    </div>

    <div className="space-y-16 text-gray-800 leading-relaxed text-base">
      <section className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-4 text-black uppercase tracking-tighter">
          <ShieldCheck className="text-amber-500" size={28} /> 1. Cam kết an toàn dữ liệu
        </h3>
        <p className="text-gray-700 bg-gray-100 p-8 rounded-xl border-l-4 border-amber-500 font-medium">
          Học viện cam kết tuyệt đối bảo mật thông tin cá nhân và dữ liệu học tập của học viên. Chúng tôi hiểu rằng sự tin tưởng của bạn là tài sản quý giá nhất. Vì vậy, mọi quy trình thu thập, xử lý và lưu trữ dữ liệu đều tuân thủ nghiêm ngặt các tiêu chuẩn bảo mật quốc tế và quy định pháp luật hiện hành về bảo vệ dữ liệu cá nhân.
        </p>
      </section>

      <section className="space-y-8 bg-black p-10 rounded-xl text-white">
        <div className="flex items-center gap-4">
          <Lock className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter">2. Các biện pháp bảo mật cốt lõi</h3>
        </div>
        <p className="text-gray-300">Chúng tôi triển khai một hệ thống bảo mật đa tầng, kết hợp giữa công nghệ tiên tiến và quy trình quản lý nghiêm ngặt:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm">Mã hóa dữ liệu</strong>
            <p className="text-sm">Mọi thông tin nhạy cảm đều được mã hóa bằng thuật toán mạnh (AES-256) khi lưu trữ và truyền tải.</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm">Quản lý quyền truy cập</strong>
            <p className="text-sm">Áp dụng nguyên tắc quyền truy cập tối thiểu, chỉ nhân viên ủy quyền mới được tiếp cận dữ liệu.</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm">Giám sát & Quét lỗ hổng</strong>
            <p className="text-sm">Hệ thống giám sát 24/7, thường xuyên thực hiện quét lỗ hổng và kiểm tra xâm nhập định kỳ.</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <strong className="block text-amber-500 mb-2 uppercase text-sm">Bảo mật hạ tầng</strong>
            <p className="text-sm">Máy chủ đặt tại trung tâm dữ liệu chuẩn Tier 3, bảo vệ vật lý và chống tấn công mạng mạnh mẽ.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-4 text-black uppercase tracking-tighter">
          <AlertTriangle className="text-amber-500" size={28} /> 3. Các hành vi nghiêm cấm
        </h3>
        <p className="font-medium">Học viện nghiêm cấm mọi hành vi xâm phạm đến an ninh hệ thống và dữ liệu:</p>
        <ul className="space-y-3 font-semibold pl-6 list-none">
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">01.</span> Truy cập trái phép vào hệ thống, mạng lưới hoặc dữ liệu của Học viện.</li>
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">02.</span> Sử dụng công cụ kỹ thuật gây gián đoạn hoặc làm chậm hoạt động hệ thống.</li>
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">03.</span> Thực hiện tấn công mạng (DDoS, phishing, injection) vào Học viện.</li>
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">04.</span> Chia sẻ tài khoản học tập, mã nguồn hoặc tài liệu nội bộ trái phép.</li>
          <li className="flex items-start gap-3"><span className="text-amber-500 font-black">05.</span> Thu thập dữ liệu cá nhân của học viên khác mà không có sự đồng ý.</li>
        </ul>
      </section>

      <section className="space-y-6 border-2 border-black p-10 rounded-xl">
        <div className="flex items-center gap-4">
          <Scale className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter text-black">4. Quyền lợi và Trách nhiệm</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8 pt-4">
          <div>
            <h4 className="font-black text-sm uppercase text-amber-600 mb-4 tracking-widest">Quyền lợi:</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Bảo mật tuyệt đối thông tin cá nhân.</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Thông báo sự cố an ninh kịp thời.</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Hỗ trợ bảo mật tài khoản 24/7.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase text-amber-600 mb-4 tracking-widest">Trách nhiệm:</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li className="flex items-center gap-2"><Target size={16} className="text-red-600" /> Bảo vệ mật khẩu cá nhân an toàn.</li>
              <li className="flex items-center gap-2"><Target size={16} className="text-red-600" /> Thông báo hành vi đáng ngờ ngay lập tức.</li>
              <li className="flex items-center gap-2"><Target size={16} className="text-red-600" /> Tuân thủ quy định an ninh Học viện.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 p-8 rounded-xl border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <Mail className="text-amber-500" size={28} />
          <h3 className="text-xl font-black uppercase tracking-tighter text-black">5. Thông tin Liên hệ</h3>
        </div>
        <p className="text-sm font-medium mb-4">Nếu bạn có câu hỏi hoặc yêu cầu liên quan đến chính sách an ninh, vui lòng liên hệ:</p>
        <div className="bg-white p-4 inline-block border border-gray-300 font-bold text-sm">
          EMAIL: <a href="mailto:security@lunacyberacademy.edu.vn" className="text-amber-600 underline">security@lunacyberacademy.edu.vn</a>
        </div>
      </section>
    </div>
  </div>
);

export default SecurityPolicy;