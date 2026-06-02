import React, { useEffect, useState } from "react";
import { User, Phone, BookOpen, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";

const StaffManagement = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(window.atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      return JSON.parse(jsonPayload);
    } catch (e) { return null; }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tokenData = user.accessToken ? parseJwt(user.accessToken) : null;
  const currentUserId = String(tokenData?.id || "").trim();

  const fetchMyTasks = async () => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.CONSULTATION.LAY_DANH_SACH);
      const finishedStatuses = ["DaChot", "DaGhiDanh", "DaDuyet", "KhongChot"];
      const filtered = res.data.filter(t => String(t.idNhanVien || "").trim() === currentUserId && !finishedStatuses.includes(t.trangThai));
      setTasks(filtered);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!user || (user.maLoaiNguoiDung !== "NV" && user.role !== "NV")) { navigate("/"); return; }
    fetchMyTasks();
    const interval = setInterval(fetchMyTasks, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (task, actionType) => {
    try {
      const newStatus = actionType === "CHOT" ? "DaChot" : actionType === "KHONG_CHOT" ? "KhongChot" : "DangTuVan";
      await axiosClient.put(API_ENDPOINTS.CONSULTATION.CAP_NHAT, { id: task._id, trangThai: newStatus });
      fetchMyTasks();
    } catch (err) { alert("Lỗi cập nhật!"); }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <div className="flex items-center justify-between border-b-2 border-gray-950 pb-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-3 bg-amber-400 rounded-2xl border border-gray-950"><ArrowLeft size={20} /></Link>
          <h2 className="text-3xl font-black uppercase">Việc Của Tôi</h2>
        </div>
      </div>
      <div className="bg-white rounded-[1.5rem] border-2 border-gray-950 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-amber-400 text-xs uppercase">
            <tr><th className="p-5 pl-8">Học viên</th><th className="p-5">Thông tin</th><th className="p-5">Trạng thái</th><th className="p-5 text-center">Hành động</th></tr>
          </thead>
          <tbody className="divide-y-2">
            {loading ? <tr><td colSpan="4" className="p-16 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr> : tasks.map(task => (
              <tr key={task._id}>
                <td className="p-5 pl-8 font-black">{task.hoTen}</td>
                <td className="p-5 text-sm"><p className="flex items-center gap-2">{task.soDT}</p></td>
                <td className="p-5"><span className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase bg-blue-100">{task.trangThai}</span></td>
                <td className="p-5 text-center flex gap-2 justify-center">
                  {task.trangThai === "Moi" && <button onClick={() => handleUpdateStatus(task, "TIEP_NHAN")} className="bg-gray-950 text-white px-4 py-2 rounded-xl text-xs font-black">Tiếp nhận</button>}
                  {task.trangThai === "DangTuVan" && (
                    <>
                      <button onClick={() => handleUpdateStatus(task, "CHOT")} className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-black">Chốt</button>
                      <button onClick={() => handleUpdateStatus(task, "KHONG_CHOT")} className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black">Không chốt</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StaffManagement;