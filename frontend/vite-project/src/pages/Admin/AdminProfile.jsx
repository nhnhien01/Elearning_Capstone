import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Settings, Mail, Phone, Lock, Save, Home } from "lucide-react"; 
import { userService } from "../../services";

const AdminProfile = () => {
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ hoTen: "", soDT: "", email: "", matKhau: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });

  const fetchAdminProfile = async () => {
    try {
      const data = await userService.getProfile();
      setProfile(data);
      setFormData({ hoTen: data.hoTen, soDT: data.soDT, email: data.email, matKhau: "" });
    } catch {
      setMsg({ type: "error", text: "Lỗi tải dữ liệu!" });
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      await userService.uploadAvatar(fd);
      window.dispatchEvent(new Event("userUpdated"));
      fetchAdminProfile();
    } catch {
      setMsg({ type: "error", text: "Lỗi upload ảnh!" });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!formData.matKhau) delete payload.matKhau;

      const updatedUser = await userService.updateProfile(payload);
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedUser }));

      window.dispatchEvent(new Event("userUpdated"));
      setMsg({ type: "success", text: "Thông tin đã được cập nhật!" });
      setTimeout(() => setMsg({ type: "", text: "" }), 3000);
    } catch (err) {
      setMsg({ type: "error", text: "Cập nhật thất bại!" });
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  if (!profile) return <div className="p-8 text-center text-slate-500 font-black">Đang tải cấu hình Admin...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 mt-8">
      <div className="flex justify-start">
        <Link to="/" className="flex items-center gap-2 bg-gray-950 text-amber-400 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider border border-gray-950 hover:bg-gray-800 transition-all">
          <Home size={16} /> Trang Chủ
        </Link>
      </div>

      <div className="flex items-center gap-4 border-b-4 border-slate-900 pb-6">
        <div className="bg-slate-950 p-3 rounded-2xl shadow-lg border-2 border-slate-900">
          <Settings className="text-amber-400" size={28} />
        </div>
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Thông tin cá nhân</h1>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Administrator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
          <div className="relative group cursor-pointer mt-4" onClick={() => fileInputRef.current.click()}>
            <img
              src={profile.hinhAnh ? `http://localhost:5000${profile.hinhAnh}?t=${new Date().getTime()}` : `https://ui-avatars.com/api/?name=${profile.hoTen}`}
              className="w-32 h-32 rounded-3xl border-[3px] border-slate-900 shadow-xl object-cover group-hover:scale-105 transition-transform"
              alt="Avatar"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-3xl text-white font-black text-[10px] uppercase">Thay đổi</div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleAvatarChange} />
          
          <h2 className="font-black text-lg mt-6">{profile.hoTen}</h2>
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl mt-3 border-2 border-slate-900">
            <span className="text-[10px] font-black uppercase text-slate-400">ID:</span>
            <span className="font-black text-xs text-slate-900 tracking-wider">@{profile.taiKhoan}</span>
          </div>
          <span className="bg-amber-400 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase mt-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Administrator</span>
        </div>

        <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {msg.text && (
            <div className={`p-3 mb-6 rounded-2xl font-black text-center text-[11px] uppercase tracking-wider border-2 border-slate-900 ${msg.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
              {msg.text}
            </div>
          )}
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Họ tên" icon={<User size={14} />} value={formData.hoTen} onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })} />
              <InputGroup label="Số điện thoại" icon={<Phone size={14} />} value={formData.soDT} onChange={(e) => setFormData({ ...formData, soDT: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-2">
                <Mail size={12} /> Email
              </label>
              <input disabled className="w-full p-3.5 border-2 border-slate-900 rounded-2xl font-bold bg-slate-200 text-slate-500 cursor-not-allowed" value={formData.email} />
            </div>
            <div className="relative">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-2">
                <Lock size={12} /> Mật khẩu mới
              </label>
              <input type={showPassword ? "text" : "password"} className="w-full p-3.5 border-2 border-slate-900 rounded-2xl font-bold bg-white focus:bg-slate-50 transition-all outline-none" placeholder="••••••••" onChange={(e) => setFormData({ ...formData, matKhau: e.target.value })} />
              <button type="button" className="absolute right-4 top-10 text-slate-900" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            <button type="submit" className="w-full py-4 bg-slate-950 text-amber-400 font-black rounded-2xl border-2 border-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
              <Save size={18} /> CẬP NHẬT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, icon, value, onChange }) => (
  <div>
    <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-2">{icon} {label}</label>
    <input className="w-full p-3.5 border-2 border-slate-900 rounded-2xl font-bold bg-white focus:bg-slate-50 transition-all outline-none" value={value} onChange={onChange} />
  </div>
);

export default AdminProfile;