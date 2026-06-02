import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";
import { ArrowLeft, Search } from "lucide-react";

const UserManagement = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const adminAccount = currentUser?.taiKhoan;

  const [formData, setFormData] = useState({
    taiKhoan: "", matKhau: "", hoTen: "", soDT: "", email: "", maLoaiNguoiDung: "HV",
  });

  useEffect(() => {
    const name = searchParams.get("name");
    const phone = searchParams.get("phone");
    if (name || phone) {
      setFormData({
        taiKhoan: phone || "",
        matKhau: "123456", 
        hoTen: name || "",
        soDT: phone || "",
        email: phone ? `${phone}@gmail.com` : "",
        maLoaiNguoiDung: "HV"
      });
      setShowModal(true);
    }
  }, [searchParams]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(API_ENDPOINTS.USER.DANH_SACH);
      setUsers(res.data);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchUsers(); }, []);

// ... giữ nguyên phần state và useEffect ...

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post(API_ENDPOINTS.USER.THEM, formData);
      setShowModal(false);
      alert("Tạo tài khoản thành công!");
      
      const courseCode = searchParams.get("maKhoaHoc");
      if (courseCode) {
        navigate(`/admin/attendance?maKhoaHoc=${courseCode}`);
      } else {
        fetchUsers();
      }
    } catch (err) { 
      alert(err.response?.data?.message || "Lỗi khi tạo tài khoản."); 
    }
  };

// ... giữ nguyên phần render ...

  const handleDeleteUser = async (taiKhoan) => {
    if (!window.confirm(`Xác nhận xóa @${taiKhoan}?`)) return;
    try {
      await axiosClient.delete(`${API_ENDPOINTS.USER.XOA}?taiKhoan=${taiKhoan}`);
      fetchUsers();
    } catch (err) { alert("Lỗi khi xóa!"); }
  };

  const filteredUsers = [...users].reverse().filter((user) =>
    user.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.taiKhoan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleStyle = (role) => {
    switch (role) {
      case "GV": return "bg-amber-50 text-amber-950 border-amber-300";
      case "NV": return "bg-blue-50 text-blue-950 border-blue-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "GV": return "Giáo vụ";
      case "NV": return "Nhân viên";
      default: return "Học viên";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-4 border-slate-900 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-3 bg-amber-400 hover:bg-amber-200 rounded-2xl border border-gray-200 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-950 tracking-tighter">Quản Lý Người Dùng</h2>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-gray-950 hover:bg-amber-500 text-amber-400 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all">
          + CẤP TÀI KHOẢN MỚI
        </button>
      </div>

      <div className="relative">
        <input 
          type="text" placeholder="Tìm kiếm..." className="w-full px-4 py-3 pl-12 rounded-2xl border-2 border-gray-950 font-bold outline-none"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
      </div>

      <div className="bg-white rounded-[1.5rem] border-2 border-gray-950 shadow-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-950 text-[11px] font-black uppercase text-amber-400 tracking-widest">
              <th className="p-5">Tài khoản</th>
              <th className="p-5">Họ và Tên</th>
              <th className="p-5">Vai Trò</th>
              <th className="p-5 pr-8 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-100 text-sm">
            {loading ? <tr><td colSpan="4" className="p-12 text-center">Đang đồng bộ...</td></tr> : 
            filteredUsers.map((u) => (
              <tr key={u.taiKhoan}>
                <td className="p-5 font-black">{u.taiKhoan}</td>
                <td className="p-5 font-bold">{u.hoTen}</td>
                <td className="p-5"><span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${getRoleStyle(u.maLoaiNguoiDung)}`}>{getRoleLabel(u.maLoaiNguoiDung)}</span></td>
                <td className="p-5 pr-8 text-center">
                  {u.taiKhoan !== adminAccount && <button onClick={() => handleDeleteUser(u.taiKhoan)} className="text-[11px] bg-red-50 text-red-600 px-4 py-2 rounded-xl font-black">Gỡ tài khoản</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full border-2 border-gray-950">
            <h3 className="text-2xl font-black uppercase mb-4">Cấp Tài Khoản</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input type="text" placeholder="Tài khoản" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" value={formData.taiKhoan} onChange={(e) => setFormData({ ...formData, taiKhoan: e.target.value })} required />
              <input type="password" placeholder="Mật khẩu" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" value={formData.matKhau} onChange={(e) => setFormData({ ...formData, matKhau: e.target.value })} required />
              <input type="text" placeholder="Họ và tên" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" value={formData.hoTen} onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })} required />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <input type="text" placeholder="Số điện thoại" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" value={formData.soDT} onChange={(e) => setFormData({ ...formData, soDT: e.target.value })} required />
              <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200" value={formData.maLoaiNguoiDung} onChange={(e) => setFormData({ ...formData, maLoaiNguoiDung: e.target.value })}>
                <option value="HV">Học viên</option><option value="GV">Giáo vụ</option><option value="NV">Nhân viên</option>
              </select>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl font-black">Hủy</button>
                <button type="submit" className="px-5 py-2.5 bg-gray-950 text-amber-400 rounded-xl font-black">Cấp tài khoản</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;