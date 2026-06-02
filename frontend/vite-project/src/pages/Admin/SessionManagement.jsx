import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { ArrowLeft, Search, Filter } from "lucide-react";

const SessionManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    buoi: 1,
    tieuDe: "",
    thoiLuong: "2h 30p",
    lyThuyet: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosClient.get("/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
        setCourses(Array.isArray(res.data) ? res.data : res.data.content || []);
      } catch (err) {
        console.error("Lỗi lấy danh sách khóa học:", err);
      }
    };
    fetchCourses();
  }, []);

  const fetchSessions = async (courseId) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/QuanLyLoTrinh/chi-tiet-buoi-hoc/${courseId}`);
      const data = res.data?.content || res.data;

      if (Array.isArray(data)) {
        setSessions(data);
      } else if (data && Array.isArray(data.danhSachBuoiHoc)) {
        setSessions(data.danhSachBuoiHoc);
      } else if (data && Array.isArray(data.chiTietBuoiHoc)) {
        setSessions(data.chiTietBuoiHoc);
      } else {
        setSessions([]);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách buổi học:", err);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCourse) {
      setSessions([]);
      return;
    }
    fetchSessions(selectedCourse);
  }, [selectedCourse]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return alert("Vui lòng chọn một khóa học!");

    try {
      // ĐỒNG BỘ: Chuyển đổi định dạng buổi học sang kiểu Number chuẩn xác trước khi đẩy lên DB
      await axiosClient.post("/api/QuanLyLoTrinh/cap-nhat-buoi-hoc", {
        maKhoaHoc: selectedCourse,
        ...formData,
        buoi: Number(formData.buoi)
      });
      alert(`Đã lưu dữ liệu bài học Buổi ${formData.buoi} thành công!`);
      setShowModal(false);
      fetchSessions(selectedCourse);
    } catch (err) {
      alert("Lỗi đồng bộ cấu trúc bài học lên máy chủ!");
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.tieuDe?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          `b${session.buoi}`.includes(searchTerm.toLowerCase());
    
    if (statusFilter === "hasTheory") {
      return matchesSearch && session.lyThuyet;
    }
    if (statusFilter === "noTheory") {
      return matchesSearch && !session.lyThuyet;
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 antialiased bg-white text-gray-950">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-gray-950 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-3 bg-amber-400 hover:bg-amber-300 rounded-2xl border-2 border-gray-950 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-gray-950">
              Quản Lý Lộ Trình Theo Buổi
            </h2>
            <p className="text-amber-500 text-[10px] font-extrabold uppercase tracking-[0.25em] mt-1.5">
              Thiết lập giáo trình lý thuyết và tiến độ giảng dạy
            </p>
          </div>
        </div>
        {selectedCourse && (
          <button
            onClick={() => {
              setEditing(false);
              const nextBuoi = sessions.length > 0 ? Math.max(...sessions.map((s) => Number(s.buoi))) + 1 : 1;
              setFormData({
                buoi: nextBuoi,
                tieuDe: "",
                thoiLuong: "2h 30p",
                lyThuyet: "",
              });
              setShowModal(true);
            }}
            className="bg-gray-950 hover:bg-amber-500 hover:text-black text-amber-400 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider border-2 border-gray-950 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-[0.98] w-fit"
          >
            + THÊM BUỔI HỌC MỚI
          </button>
        )}
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(3,7,18,1)] flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="space-y-1">
          <h4 className="font-black text-sm uppercase text-gray-950">Chọn khóa học điều hành</h4>
          <p className="text-xs text-gray-600 font-medium">Chọn một khóa cụ thể từ hệ thống để quản lý danh sách lộ trình</p>
        </div>
        <select
          className="w-full md:w-80 px-4 py-3 border-4 border-gray-950 rounded-xl font-black text-sm bg-white text-gray-950 outline-none cursor-pointer focus:ring-4 focus:ring-amber-400 transition-all"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Chọn Khóa Học Cần Nhập Liệu --</option>
          {courses.map((c) => (
            <option key={c.maKhoaHoc} value={c.maKhoaHoc}>
              {c.tenKhoaHoc} ({c.maKhoaHoc})
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border-2 border-gray-950">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề hoặc buổi số..."
              className="w-full pl-11 pr-4 py-3 text-xs border-2 border-gray-900 rounded-xl font-bold focus:ring-2 focus:ring-amber-400 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Filter size={16} className="text-gray-500 hidden md:block" />
            <select
              className="w-full md:w-48 px-3 py-3 border-2 border-gray-900 rounded-xl font-black text-xs bg-white text-gray-950 outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="hasTheory">Đã có lý thuyết</option>
              <option value="noTheory">Trống lý thuyết</option>
            </select>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[1.5rem] border-2 border-gray-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 text-[11px] font-black uppercase text-amber-400 tracking-widest border-b border-gray-950">
                <th className="p-5 pl-8 text-center w-24">Buổi số</th>
                <th className="p-5">Tiêu Đề Nội Dung Học Tập</th>
                <th className="p-5 w-40">Thời Lượng</th>
                <th className="p-5 w-40 text-center">Tài Liệu</th>
                <th className="p-5 pr-8 text-center w-32">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200 text-sm text-gray-700">
              {!selectedCourse ? (
                <tr>
                  <td colSpan="5" className="p-16 text-center text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                    Vui lòng chọn khóa học phía trên để hiển thị cấu trúc buổi học.
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Đang tải danh sách lộ trình...
                  </td>
                </tr>
              ) : filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-16 text-center text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                    Không tìm thấy buổi học nào khớp với điều kiện lọc!
                  </td>
                </tr>
              ) : (
                filteredSessions.map((item) => (
                  <tr key={item.buoi} className="hover:bg-amber-50/20 transition-colors">
                    <td className="p-5 pl-8 font-black text-gray-950 text-center bg-gray-50/50">B{item.buoi}</td>
                    <td className="p-5 font-bold text-gray-950">{item.tieuDe}</td>
                    <td className="p-5 font-medium text-gray-600">{item.thoiLuong}</td>
                    <td className="p-5 text-center">
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${
                        item.lyThuyet 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}>
                        {item.lyThuyet ? "Đã có lý thuyết" : "Trống lý thuyết"}
                      </span>
                    </td>
                    <td className="p-5 pr-8 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          setEditing(true);
                          setFormData(item);
                          setShowModal(true);
                        }}
                        className="text-[11px] bg-amber-50 hover:bg-amber-500 border border-amber-300 hover:border-amber-500 text-amber-800 hover:text-black px-5 py-2 rounded-xl font-black uppercase tracking-wider transition-all shadow-sm"
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] p-10 max-w-2xl w-full space-y-8 border-[6px] border-gray-950 shadow-[16px_16px_0px_0px_rgba(3,7,18,1)] transform transition-all relative">
            <div className="space-y-2 text-center pt-2">
              <h3 className="text-4xl font-black text-gray-950 uppercase tracking-tighter italic">
                {editing ? "Cập Nhật Buổi Học" : "Biên Soạn Buổi Học"}
              </h3>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Buổi số</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-black bg-gray-100 text-gray-950 outline-none"
                    value={formData.buoi}
                    onChange={(e) => setFormData({ ...formData, buoi: e.target.value })}
                    readOnly={editing}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Thời lượng lớp học</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-bold focus:ring-4 focus:ring-amber-400 outline-none transition-all"
                    value={formData.thoiLuong}
                    onChange={(e) => setFormData({ ...formData, thoiLuong: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Tiêu đề buổi học</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-bold focus:ring-4 focus:ring-amber-400 outline-none transition-all"
                  value={formData.tieuDe}
                  onChange={(e) => setFormData({ ...formData, tieuDe: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Tóm tắt bài học & Lý thuyết nền tảng</label>
                <textarea
                  rows="8"
                  className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-medium focus:ring-4 focus:ring-amber-400 outline-none transition-all resize-none font-mono leading-relaxed"
                  value={formData.lyThuyet}
                  onChange={(e) => setFormData({ ...formData, lyThuyet: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 border-4 border-gray-950 rounded-2xl text-xs font-black uppercase hover:bg-gray-100 transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-4 bg-gray-950 text-amber-400 rounded-2xl text-xs font-black uppercase border-4 border-gray-950 hover:bg-amber-400 hover:text-gray-950 transition-all shadow-[6px_6px_0px_0px_rgba(251,191,36,0.6)]"
                >
                  Xác nhận lưu dữ liệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManagement;