import React, { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";

const Attendance = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [createUser, setCreateUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    email: "",
  });

  const currentMaKhoaHoc = searchParams.get("maKhoaHoc") || "";

  const fetchPendingUsers = useCallback(async (courseCode) => {
    setLoading(true);
    try {
      const res = await axiosClient.post(
        API_ENDPOINTS.ENROLLMENT.HV_CHO_DUYET,
        courseCode ? { maKhoaHoc: courseCode } : {},
      );
      setPendingUsers(
        Array.isArray(res.data)
          ? res.data.filter((item) => item.trangThai === "DaChot")
          : [],
      );
    } catch (err) {
      setPendingUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingUsers(currentMaKhoaHoc);
  }, [currentMaKhoaHoc, fetchPendingUsers]);

  const openCreateModal = (u) => {
    setSelectedUser(u);
    setCreateUser({
      taiKhoan: u.soDT,
      matKhau: "",
      hoTen: u.hoTen,
      soDT: u.soDT,
      email: "",
      maKhoaHoc: u.maKhoaHoc,
    });
    setShowModal(true);
  };

 const handleConfirmCreate = async () => {
    
    if (!createUser.email || !createUser.matKhau || !createUser.hoTen || !createUser.soDT) {
        alert("Vui lòng điền đầy đủ các trường thông tin!");
        return;
    }

    try {
      const payload = {
        id: selectedUser._id,
        maKhoaHoc: currentMaKhoaHoc || createUser.maKhoaHoc, 
        hoTen: createUser.hoTen,
        soDT: createUser.soDT,
        matKhau: createUser.matKhau,
        email: createUser.email
      };

      console.log("Payload gửi đi:", payload); 

      await axiosClient.post("/api/QuanLyNguoiDung/duyet-va-ghi-danh-tu-van", payload);
      
      alert("Thao tác thành công!");
      setShowModal(false);
      fetchPendingUsers(currentMaKhoaHoc);
    } catch (err) {
      console.error("Lỗi từ server:", err.response?.data);
      alert("Lỗi: " + (err.response?.data?.message || "Dữ liệu không hợp lệ"));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 bg-white">
      <div className="flex flex-col gap-6 border-b-2 border-gray-950 pb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="p-3 bg-amber-400 rounded-2xl border-2 border-gray-950"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-3xl font-black uppercase">Xét Duyệt Ghi Danh</h2>
        </div>
        
      </div>

      <div className="bg-white rounded-[1.5rem] border-2 border-gray-950 shadow-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-950 text-[11px] font-black uppercase text-amber-400 tracking-widest">
              <th className="p-5">Học viên</th>
              <th className="p-5">Số ĐT</th>
              <th className="p-5">Khóa học</th>
              <th className="p-5 pr-8 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-gray-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-12 text-center">
                  Đang tải...
                </td>
              </tr>
            ) : (
              pendingUsers.map((u) => (
                <tr key={u._id}>
                  <td className="p-5 font-black">{u.hoTen}</td>
                  <td className="p-5 font-bold">{u.soDT}</td>

                  <td className="p-5 font-black text-amber-600">
                    {u.maKhoaHoc}
                  </td>
                  <td className="p-5 pr-8 flex justify-center">
                    <button
                      onClick={() => openCreateModal(u)}
                      className="text-[11px] bg-green-600 text-white px-6 py-2 rounded-xl font-black hover:bg-green-700"
                    >
                      TẠO & DUYỆT
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-950 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-xl uppercase">Cấp Tài Khoản</h3>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmCreate();
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-[10px] font-black uppercase text-gray-500">
                  Mã khóa học đăng ký
                </label>
                <input
                  className="w-full p-4 border-2 border-gray-950 rounded-xl font-bold bg-gray-100"
                  value={createUser.maKhoaHoc || currentMaKhoaHoc}
                  disabled
                />
              </div>
              <input
                placeholder="Tài khoản"
                className="w-full p-4 border-2 border-gray-950 rounded-xl font-bold"
                value={createUser.taiKhoan}
                disabled
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full p-4 border-2 border-gray-950 rounded-xl"
                value={createUser.matKhau}
                onChange={(e) =>
                  setCreateUser({ ...createUser, matKhau: e.target.value })
                }
                required
              />
              <input
                placeholder="Họ và tên"
                className="w-full p-4 border-2 border-gray-950 rounded-xl"
                value={createUser.hoTen}
                onChange={(e) =>
                  setCreateUser({ ...createUser, hoTen: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 border-2 border-gray-950 rounded-xl"
                value={createUser.email}
                onChange={(e) =>
                  setCreateUser({ ...createUser, email: e.target.value })
                }
                required
              />
              <input
                placeholder="Số điện thoại"
                className="w-full p-4 border-2 border-gray-950 rounded-xl"
                value={createUser.soDT}
                onChange={(e) =>
                  setCreateUser({ ...createUser, soDT: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-950 text-amber-400 p-4 rounded-xl font-black uppercase hover:bg-amber-500"
              >
                XÁC NHẬN TẠO
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Attendance;
