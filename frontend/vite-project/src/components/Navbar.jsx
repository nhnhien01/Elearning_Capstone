import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const syncUser = () => {
    const userData = localStorage.getItem("user");
    setUser(userData ? JSON.parse(userData) : null);
  };

  useEffect(() => {
    syncUser();
    window.addEventListener("userUpdated", syncUser);
    return () => window.removeEventListener("userUpdated", syncUser);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.maLoaiNguoiDung === "HV") {
        try {
          const res = await axiosClient.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
          if (res.data && res.data.chiTietKhoaHocGhiDanh) {
            const updatedUser = { ...user, chiTietKhoaHocGhiDanh: res.data.chiTietKhoaHocGhiDanh };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    if (user && user.maLoaiNguoiDung === "HV" && (!user.chiTietKhoaHocGhiDanh || user.chiTietKhoaHocGhiDanh.length === 0)) {
      fetchUserData();
    }
  }, [user?.taiKhoan, user?.chiTietKhoaHocGhiDanh?.length]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/login");
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `http://localhost:5000${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const firstCourseId = user?.chiTietKhoaHocGhiDanh?.[0]?.maKhoaHoc;

  
  const handleCourseNavigation = (e) => {
    e.preventDefault();
    if (firstCourseId) {
      navigate(`/course-schedule/${firstCourseId}`);
    } else {
     
      navigate("/course-schedule");
    }
  };

  return (
    <nav className="bg-gray-950 border-b-2 border-gray-900 sticky top-0 z-50 antialiased text-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-lg font-black tracking-tighter text-amber-400 group-hover:text-white transition-colors">
              LUNA CYBER ACADEMY
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.maLoaiNguoiDung === "GV" && (
                  <Link to="/admin" className="bg-amber-400 hover:bg-amber-500 text-gray-950 px-4 py-2 border-2 border-amber-500 rounded-xl font-black text-xs tracking-widest transition-colors">Trang Admin</Link>
                )}
                {user.maLoaiNguoiDung === "NV" && (
                  <Link to="/staff-tasks" className="text-amber-400 hover:text-white font-black text-xs uppercase tracking-wider transition-colors">Việc của tôi</Link>
                )}
              
                <Link to="/profile" className="flex items-center space-x-2 border-l-2 pl-4 border-gray-800">
                  <img
                    src={`${getImageUrl(user.hinhAnh)}?t=${Date.now()}`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-lg object-cover border border-amber-400"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.hoTen || "U")}`; }}
                  />
                  <span className="text-amber-400 font-black hidden md:inline text-xs tracking-wide">{user.hoTen || user.taiKhoan}</span>
                </Link>
                <button onClick={handleLogout} className="border-2 border-gray-800 text-gray-400 hover:bg-red-950/40 hover:text-red-400 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">Đăng Xuất</button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-400 hover:text-amber-400 font-black text-xs uppercase tracking-wider">Đăng Nhập</Link>
                <Link to="/register" className="bg-amber-400 text-gray-950 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider">Đăng Ký</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;