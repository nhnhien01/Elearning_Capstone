import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import { API_ENDPOINTS } from '../../constants/apiConfig';
import { Eye, EyeOff, ArrowLeft, Home } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ taiKhoan: '', matKhau: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosClient.post(API_ENDPOINTS.AUTH.DANG_NHAP, formData);
      const userData = res.data;
      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event("userUpdated"));
      
      if (userData.maLoaiNguoiDung === 'GV') {
        navigate('/admin');
      } else if (userData.maLoaiNguoiDung === 'NV') {
        navigate('/staff-tasks');
      } else {
        navigate('/');
      }
    } catch {
      setError('Tài khoản hoặc mật khẩu không chính xác!');
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
          <h2 className="text-2xl font-black uppercase tracking-tighter">Đăng Nhập</h2>
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1">Luna Cyber Academy</p>
        </div>
        {error && <div className="p-3 text-[11px] font-black text-center text-red-700 bg-red-50 rounded-2xl border-2 border-slate-900">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-4 rounded-2xl border-2 border-slate-900 font-bold text-sm" placeholder="Tài khoản" value={formData.taiKhoan} onChange={e => setFormData({...formData, taiKhoan: e.target.value})} />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} className="w-full p-4 rounded-2xl border-2 border-slate-900 font-bold text-sm" placeholder="Mật khẩu" value={formData.matKhau} onChange={e => setFormData({...formData, matKhau: e.target.value})} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <button type="submit" className="w-full py-4 bg-slate-950 text-amber-400 font-black rounded-2xl border-2 border-slate-900 hover:bg-slate-800 transition-all uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
          </button>
        </form>
        <p className="text-center text-xs font-bold text-slate-500">Chưa có tài khoản? <Link to="/register" className="text-slate-950 font-black underline">Đăng ký ngay</Link></p>
      </div>
    </div>
  );
};

export default Login;