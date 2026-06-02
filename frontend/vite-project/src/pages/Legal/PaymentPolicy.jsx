import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, RefreshCcw, Landmark, Receipt, Banknote, AlertTriangle, FileText, Info } from "lucide-react";

const PaymentPolicy = () => (
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
      <h1 className="text-6xl font-black uppercase text-black tracking-tighter leading-none">Quy chế <span className="text-amber-500">Thanh toán</span></h1>
      <p className="text-gray-600 font-bold text-base uppercase tracking-wider">
        Quy định về học phí, phương thức thanh toán và chính sách hoàn trả tại Luna Cyber Academy.
      </p>
    </div>

    <div className="grid gap-10">
      <section className="bg-black text-white p-10 rounded-xl space-y-6">
        <div className="flex items-center gap-4">
          <Landmark className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter">Phương thức thanh toán</h3>
        </div>
        <p className="text-gray-300 leading-relaxed font-medium">
          Học viện hỗ trợ đa dạng các hình thức thanh toán hiện đại để đảm bảo trải nghiệm thuận tiện nhất cho học viên. Tất cả giao dịch đều được mã hóa chuẩn bảo mật SSL.
        </p>
        <div className="grid md:grid-cols-2 gap-4 pt-4">
          <div className="p-4 border border-gray-800 rounded-lg bg-gray-900 text-sm font-bold flex items-center gap-3">
            <CreditCard className="text-amber-500" size={20} /> Thẻ tín dụng/Ghi nợ (Visa/Master/JCB)
          </div>
          <div className="p-4 border border-gray-800 rounded-lg bg-gray-900 text-sm font-bold flex items-center gap-3">
            <Banknote className="text-amber-500" size={20} /> Chuyển khoản ngân hàng trực tiếp
          </div>
          <div className="p-4 border border-gray-800 rounded-lg bg-gray-900 text-sm font-bold flex items-center gap-3">
            <Landmark className="text-amber-500" size={20} /> Ví điện tử (Momo/ZaloPay/VNPay)
          </div>
          <div className="p-4 border border-gray-800 rounded-lg bg-gray-900 text-sm font-bold flex items-center gap-3">
            <Info className="text-amber-500" size={20} /> Hỗ trợ trả góp qua đối tác
          </div>
        </div>
      </section>

      <section className="border-2 border-black p-10 rounded-xl space-y-8">
        <div className="flex items-center gap-4">
          <RefreshCcw className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter text-black">Chính sách hoàn học phí</h3>
        </div>
        <p className="text-gray-700 font-medium">Quy định hoàn phí dựa trên tiến độ khóa học đã diễn ra:</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Trước 7 ngày", detail: "Hoàn 100% học phí (trừ 5% phí hành chính)." },
            { title: "Trước 30% khóa", detail: "Hoàn 50% học phí dựa trên yêu cầu văn bản." },
            { title: "Sau 30% khóa", detail: "Không giải quyết hoàn phí vì tài khoản đã kích hoạt." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
              <h4 className="font-black text-black text-sm uppercase mb-2">{item.title}</h4>
              <p className="text-xs font-bold text-gray-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-2 border-gray-200 p-10 rounded-xl space-y-4">
        <div className="flex items-center gap-4">
          <FileText className="text-amber-500" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tighter text-black">Xuất hóa đơn VAT</h3>
        </div>
        <p className="text-gray-700 font-medium leading-relaxed">
          Học viện chỉ xuất hóa đơn giá trị gia tăng (VAT) trong vòng 15 ngày kể từ ngày thanh toán thành công. Học viên vui lòng cung cấp thông tin xuất hóa đơn (Tên công ty, Mã số thuế, Địa chỉ) tại trang thanh toán hoặc liên hệ bộ phận hỗ trợ trước khi khóa học bắt đầu.
        </p>
      </section>

      <section className="bg-gray-100 p-8 rounded-xl border border-gray-200 space-y-4">
        <div className="flex items-center gap-4">
          <AlertTriangle className="text-amber-500" size={28} />
          <h3 className="text-xl font-black uppercase tracking-tighter text-black">Xử lý thanh toán lỗi</h3>
        </div>
        <p className="text-sm font-medium text-gray-700">
          Trong trường hợp tài khoản đã bị trừ tiền nhưng hệ thống chưa ghi nhận thanh toán (lỗi gateway), vui lòng chụp lại biên lai giao dịch và gửi về email: <a href="mailto:billing@lunacyberacademy.edu.vn" className="font-bold underline text-amber-600">billing@lunacyberacademy.edu.vn</a>. Bộ phận kế toán sẽ đối soát và cập nhật trạng thái khóa học cho bạn trong vòng 48 giờ làm việc.
        </p>
      </section>
    </div>
  </div>
);

export default PaymentPolicy;