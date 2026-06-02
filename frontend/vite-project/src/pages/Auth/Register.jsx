// Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import { Eye, EyeOff, ArrowLeft, Home } from 'lucide-react';

const DANG_KY_ENDPOINT = '/api/QuanLyNguoiDung/DangKy';

const Register = () => {
  const [formData, setFormData] = useState({
    taiKhoan: '', matKhau: '', hoTen: '', email: '', soDT: '', maNhom: 'GP01'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await axiosClient.post(DANG_KY_ENDPOINT, formData);
      setSuccess('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-slate-900 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
            <ArrowLeft size={14} /> Quay lại
          </button>
          <Link to="/" className="text-slate-900"><Home size={20} /></Link>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Đăng Ký</h2>
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1">Luna Cyber Academy</p>
        </div>
        {error && <div className="p-3 text-[11px] font-black text-center text-red-700 bg-red-50 rounded-2xl border-2 border-slate-900">{error}</div>}
        {success && <div className="p-3 text-[11px] font-black text-center text-emerald-700 bg-emerald-50 rounded-2xl border-2 border-slate-900">{success}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input className="w-full p-4 rounded-2xl border-2 border-slate-900 font-bold text-sm" placeholder="Tài khoản" value={formData.taiKhoan} onChange={e => setFormData({...formData, taiKhoan: e.target.value})} />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} className="w-full p-4 rounded-2xl border-2 border-slate-900 font-bold text-sm" placeholder="Mật khẩu" value={formData.matKhau} onChange={e => setFormData({...formData, matKhau: e.target.value})} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <input className="w-full p-4 rounded-2xl border-2 border-slate-900 font-bold text-sm" placeholder="Họ tên" value={formData.hoTen} onChange={e => setFormData({...formData, hoTen: e.target.value})} />
          <input className="w-full p-4 rounded-2xl border-2 border-slate-900 font-bold text-sm" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input className="w-full p-4 rounded-2xl border-2 border-slate-900 font-bold text-sm" placeholder="Số điện thoại" value={formData.soDT} onChange={e => setFormData({...formData, soDT: e.target.value})} />
          <button type="submit" className="w-full py-4 bg-slate-950 text-amber-400 font-black rounded-2xl border-2 border-slate-900 hover:bg-slate-800 transition-all uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {loading ? 'Đang xử lý...' : 'Đăng Ký'}
          </button>
        </form>
        <p className="text-center text-xs font-bold text-slate-500">Đã có tài khoản? <Link to="/login" className="text-slate-950 font-black underline">Đăng nhập ngay</Link></p>
      </div>
    </div>
  );
};

export default Register;