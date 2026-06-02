import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ClipboardCheck, MessageSquare, ArrowLeft, Calendar } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 antialiased">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-4 border-slate-900 pb-6 gap-6">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="p-3 bg-amber-400 hover:bg-amber-500 rounded-2xl border border-slate-900 transition-all hover:scale-105"
          >
            <ArrowLeft size={20} className="text-slate-950" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Quản lý hệ thống</h1>
            <p className="text-amber-500 font-bold text-[10px] uppercase tracking-widest">Luna Cyber Academy • Control Center</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        <DashboardCard 
          to="/admin/courses" 
          icon={<BookOpen size={24} />} 
          title="Quản lý khóa học" 
          desc="Course Modules" 
          detail="Thêm mới, sửa đổi cấu trúc chương trình, phân tách danh mục và cập nhật nội dung giảng dạy toàn diện."
        />

        <DashboardCard 
          to="/admin/quan-ly-lo-trinh" 
          icon={<Calendar size={24} />} 
          title="Quản lý lộ trình" 
          desc="Session Curriculum" 
          detail="Biên soạn tiến độ học tập chi tiết, nhập nội dung giáo trình và lý thuyết tóm tắt cho từng buổi học."
        />
        
        <DashboardCard 
          to="/admin/users" 
          icon={<Users size={24} />} 
          title="Quản lý người dùng" 
          desc="User Accounts" 
          detail="Phân cấp đặc quyền tài khoản, tra cứu hồ sơ học viên và quản trị nhân sự giáo vụ nội bộ chuyên nghiệp."
        />
        
        <DashboardCard 
          to="/admin/attendance" 
          icon={<ClipboardCheck size={24} />} 
          title="Xét duyệt ghi danh" 
          desc="Enrollment Desk" 
          detail="Phê duyệt học viên chờ vào lớp, kiểm soát sĩ số an toàn và quản lý quyền truy cập lớp học chặt chẽ."
        />

        <DashboardCard 
          to="/admin/consultation" 
          icon={<MessageSquare size={24} />} 
          title="Tư vấn học viên" 
          desc="Consultation Desk" 
          detail="Quản lý danh sách học viên đăng ký tư vấn, theo dõi trạng thái gọi điện và chốt khách hàng tiềm năng."
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ to, icon, title, desc, detail }) => (
  <Link 
    to={to} 
    className="group bg-white p-8 rounded-[2rem] border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 flex flex-col justify-between space-y-6"
  >
    <div className="space-y-4">
      <div className="w-16 h-16 bg-slate-950 text-amber-400 rounded-3xl flex items-center justify-center border-2 border-slate-900 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">{title}</h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{desc}</p>
      </div>
      <p className="text-slate-600 text-xs font-bold leading-relaxed">
        {detail}
      </p>
    </div>
    <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 border-t-2 border-slate-900 pt-5">
      Truy cập hệ thống <span className="ml-auto text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </Link>
);

export default Dashboard;