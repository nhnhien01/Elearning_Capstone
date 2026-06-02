import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, AlertCircle, Award, Scale, BookOpen, ShieldCheck } from "lucide-react";

const TermsOfService = () => (
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
      <h1 className="text-6xl font-black uppercase text-black tracking-tighter leading-none">Điều khoản <span className="text-amber-500">Sử dụng</span></h1>
      <p className="text-gray-600 font-bold text-base uppercase tracking-wider">
        Phiên bản 2.0 - Quy định pháp lý và trách nhiệm giữa Luna Cyber Academy và học viên.
      </p>
    </div>

    <div className="grid gap-8">
      {[
        { icon: <FileText />, title: "Chấp nhận hợp đồng điện tử", desc: "Khi thực hiện đăng ký và hoàn tất học phí, bạn chính thức xác nhận ký kết hợp đồng đào tạo điện tử với Luna Cyber Academy theo quy định hiện hành." },
        { icon: <BookOpen />, title: "Quy tắc học tập", desc: "Học viên có nghĩa vụ tuân thủ lộ trình học tập, hoàn thành đầy đủ bài tập và dự án thực tế. Mọi hình thức gian lận trong kiểm tra sẽ dẫn đến việc đình chỉ khóa học ngay lập tức." },
        { icon: <Award />, title: "Quyền sở hữu tài nguyên", desc: "Toàn bộ bài giảng, mã nguồn, video hướng dẫn là tài sản trí tuệ độc quyền của Học viện. Mọi hành vi chia sẻ trái phép hoặc kinh doanh tài liệu sẽ bị xử lý theo luật sở hữu trí tuệ." },
        { icon: <Scale />, title: "Trách nhiệm người dùng", desc: "Bạn chịu trách nhiệm hoàn toàn về nội dung và mã nguồn do mình đăng tải. Cam kết không phát tán virus, phần mềm độc hại hoặc các nội dung gây hại cho hệ thống chung." },
        { icon: <AlertCircle />, title: "Giới hạn trách nhiệm", desc: "Học viện được miễn trừ trách nhiệm đối với các gián đoạn dịch vụ ngoài tầm kiểm soát như sự cố mạng quốc gia, thiên tai hoặc hạ tầng kỹ thuật từ phía nhà cung cấp thứ ba." },
        { icon: <ShieldCheck />, title: "Sửa đổi điều khoản", desc: "Chúng tôi có quyền cập nhật các điều khoản này theo thời gian. Việc tiếp tục sử dụng dịch vụ sau khi các cập nhật có hiệu lực đồng nghĩa với việc bạn đồng ý với các thay đổi đó." }
      ].map((item, index) => (
        <div key={index} className="flex gap-6 p-8 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-black transition-colors">
          <div className="mt-1 text-amber-600">{item.icon}</div>
          <div>
            <h4 className="font-black text-lg text-black uppercase tracking-tighter">{item.title}</h4>
            <p className="mt-2 text-gray-700 leading-relaxed text-sm font-medium">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TermsOfService;