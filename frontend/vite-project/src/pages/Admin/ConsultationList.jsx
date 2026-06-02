import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Loader2 } from "lucide-react";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";

const ConsultationList = () => {
  const [list, setList] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("TatCa");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [resList, resStaffs] = await Promise.all([
        axiosClient.get(API_ENDPOINTS.CONSULTATION.LAY_DANH_SACH),
        axiosClient.get(API_ENDPOINTS.CONSULTATION.LAY_DANH_SACH_NV),
      ]);
      setList(Array.isArray(resList.data) ? resList.data : []);
      setStaffs(Array.isArray(resStaffs.data) ? resStaffs.data : []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const updateAssignment = async (id, idNhanVien) => {
    if (!idNhanVien) return;
    try {
      await axiosClient.put(API_ENDPOINTS.CONSULTATION.PHAN_CONG, { id, idNhanVien });
      setList(prev => prev.map(i => i._id === id ? { ...i, idNhanVien, trangThai: "DangTuVan" } : i));
    } catch (error) { alert("Lỗi phân công!"); }
  };

  const handleGoToAttendance = (item) => {
    navigate(`/admin/attendance?maKhoaHoc=${item.maKhoaHoc}`);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredList = useMemo(() => {
    return list.filter(item => {
      const matchStatus = filter === "TatCa" || item.trangThai === filter;
      const matchSearch = item.hoTen?.toLowerCase().includes(search.toLowerCase()) || 
                          item.soDT?.includes(search) || 
                          item.maKhoaHoc?.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [list, filter, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-gray-950 pb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-3 bg-amber-400 rounded-2xl border-2 border-gray-950"><ArrowLeft size={20} /></Link>
          <h2 className="text-3xl font-black uppercase">Tư Vấn Học Viên</h2>
        </div>
        <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-2xl border-2 border-gray-950">
          <Search size={18} className="ml-2" />
          <input className="bg-transparent outline-none text-sm font-bold w-64" onChange={(e) => setSearch(e.target.value)} />
          <select className="bg-white px-3 py-1 rounded-lg border border-gray-950 text-xs font-black uppercase" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="TatCa">Tất cả</option>
            <option value="Moi">Mới</option>
            <option value="DangTuVan">Đang tư vấn</option>
            <option value="DaChot">Chờ ghi danh</option>
            <option value="KhongChot">Không chốt</option>
            <option value="DaDuyet">Đã ghi danh</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-[1.5rem] border-2 border-gray-950 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-amber-400 text-xs uppercase">
            <tr><th className="p-5 pl-8">Học viên</th><th className="p-5">Thông tin</th><th className="p-5">Khóa</th><th className="p-5">Phân công</th><th className="p-5 text-center">Trạng thái</th></tr>
          </thead>
          <tbody className="divide-y-2">
            {loading ? <tr><td colSpan="5" className="p-16 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr> : filteredList.map(item => (
              <tr key={item._id}>
                <td className="p-5 pl-8 font-black">{item.hoTen}</td>
                <td className="p-5 text-sm">{item.soDT}</td>
                <td className="p-5 font-black text-amber-600">{item.maKhoaHoc}</td>
                <td className="p-5">
                  {item.idNhanVien ? <div className="text-xs font-black text-blue-700 bg-blue-100 px-3 py-2 rounded-xl border border-blue-200">Đã phân công</div> : 
                  <select className="border-2 border-gray-950 rounded-xl p-2 text-xs font-black w-full" onChange={(e) => updateAssignment(item._id, e.target.value)} value="">
                    <option value="" disabled>Chưa phân công</option>
                    {staffs.map(s => <option key={s._id} value={s._id}>{s.hoTen}</option>)}
                  </select>}
                </td>
                <td className="p-5 text-center font-black text-xs uppercase">
                  {item.trangThai === "DaDuyet" ? <span className="text-gray-400 bg-gray-100 px-3 py-2 rounded-lg block w-full">Đã ghi danh</span> :
                   item.trangThai === "DaChot" ? <button onClick={() => handleGoToAttendance(item)} className="bg-green-600 text-white px-3 py-2 rounded-lg w-full block">Chờ ghi danh</button> :
                   item.trangThai === "KhongChot" ? <span className="text-red-600 bg-red-100 px-3 py-2 rounded-lg block w-full">Không chốt</span> :
                   item.trangThai === "DangTuVan" ? <span className="text-blue-600 bg-blue-100 px-3 py-2 rounded-lg block w-full">Đang tư vấn</span> :
                   <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-lg block w-full">Mới</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ConsultationList;