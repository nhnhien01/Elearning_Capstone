import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileCheck, Users, Briefcase, Zap, Target, ShieldCheck } from "lucide-react";

const CareerSupport = () => (
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
      <h1 className="text-6xl font-black uppercase text-black tracking-tighter leading-none">Hỗ trợ <span className="text-amber-500">Nghề nghiệp</span></h1>
      <p className="text-gray-600 font-bold text-base uppercase tracking-wider">
        Tại Luna Cyber Academy, việc tốt nghiệp chỉ là khởi đầu. Chúng tôi cam kết đồng hành cùng bạn chinh phục nhà tuyển dụng.
      </p>
    </div>

    <div className="grid gap-10">
      <section className="bg-black text-white p-10 rounded-xl space-y-8">
        <div className="flex items-center gap-4">
          <ShieldCheck className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter">Cam kết đầu ra</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <FileCheck className="text-amber-500 mb-4" size={24} />
            <h4 className="font-black text-sm uppercase mb-2">Review CV chuyên sâu</h4>
            <p className="text-sm text-gray-400">Đội ngũ chuyên gia sẽ trực tiếp chỉnh sửa, tối ưu hóa từ khóa và trình bày CV của bạn để lọt vào "mắt xanh" của nhà tuyển dụng.</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg bg-gray-900">
            <Users className="text-amber-500 mb-4" size={24} />
            <h4 className="font-black text-sm uppercase mb-2">Mock Interview 1:1</h4>
            <p className="text-sm text-gray-400">Tham gia các buổi phỏng vấn thử nghiệm để rèn luyện kỹ năng trả lời và xử lý các câu hỏi kỹ thuật khó từ doanh nghiệp.</p>
          </div>
        </div>
      </section>

      <section className="border-2 border-black p-10 rounded-xl space-y-8">
        <div className="flex items-center gap-4">
          <Target className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter text-black">Quy trình đồng hành</h3>
        </div>
        <div className="grid gap-4">
          {[
            { step: "01", title: "Tối ưu hồ sơ năng lực", detail: "Chỉnh sửa CV, Portfolio và tài khoản Github cá nhân." },
            { step: "02", title: "Luyện phỏng vấn thực tế", detail: "Giả lập phỏng vấn cùng chuyên gia công nghệ từ các đối tác." },
            { step: "03", title: "Kết nối doanh nghiệp", detail: "Ứng tuyển trực tiếp vào mạng lưới đối tác tuyển dụng của học viện." }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 p-6 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
              <span className="text-4xl font-black text-amber-500 shrink-0">{item.step}</span>
              <div>
                <h4 className="font-black text-black text-sm uppercase mb-1">{item.title}</h4>
                <p className="text-xs font-bold text-gray-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 p-8 rounded-xl border border-gray-200 space-y-4">
        <div className="flex items-center gap-4">
          <Briefcase className="text-amber-500" size={28} />
          <h3 className="text-xl font-black uppercase tracking-tighter text-black">Sẵn sàng khởi đầu</h3>
        </div>
        <p className="text-sm font-medium text-gray-700">
          Đừng để hành trình tìm việc của bạn trở nên đơn độc. Hãy gửi yêu cầu review CV và đăng ký lịch phỏng vấn thử qua email: <a href="mailto:career@lunacyberacademy.edu.vn" className="font-bold underline text-amber-600">career@lunacyberacademy.edu.vn</a>.
        </p>
      </section>
    </div>
  </div>
);

export default CareerSupport;