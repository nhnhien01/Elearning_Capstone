import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";
import { ArrowLeft } from "lucide-react";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    maDanhMuc: "FrontEnd",
  });
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => 
      c.maKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(API_ENDPOINTS.COURSE.DANH_SACH);
      setCourses(res.data.content || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const generateNextId = (category) => {
    const prefix = category === "FrontEnd" ? "FE" : category === "BackEnd" ? "BE" : category === "Mobile" ? "MB" : category === "Khac" ? "KH" : "FS";
    const filtered = courses.filter((c) => c.maDanhMuc === category);
    const lastNumber = filtered.length > 0 
      ? Math.max(...filtered.map(c => parseInt(c.maKhoaHoc.replace(prefix, "")) || 0)) 
      : 0;
    return `${prefix}${(lastNumber + 1).toString().padStart(5, "0")}`;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("maKhoaHoc", formData.maKhoaHoc);
    data.append("tenKhoaHoc", formData.tenKhoaHoc);
    data.append("moTa", formData.moTa);
    data.append("maDanhMuc", formData.maDanhMuc);
    
    if (file) {
      data.append("hinhAnh", file);
    }

    try {
      if (editing) {
        await axiosClient.put(`${API_ENDPOINTS.COURSE.CAP_NHAT}?maKhoaHoc=${formData.maKhoaHoc}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosClient.post(API_ENDPOINTS.COURSE.THEM, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setShowModal(false);
      setFile(null); 
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Thao tác thất bại!");
    }
  };

  const handleDelete = async (maKhoaHoc) => {
    if (!window.confirm("Xác nhận xóa khóa học này?")) return;
    try {
      await axiosClient.delete(`${API_ENDPOINTS.COURSE.XOA}?maKhoaHoc=${maKhoaHoc}`);
      fetchCourses();
    } catch (err) {
      alert("Không thể xóa khóa học!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 antialiased bg-white text-gray-950">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b-2 border-gray-950 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="p-3 bg-amber-400 hover:bg-amber-200 rounded-2xl border border-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-gray-950">
              Quản Lý Khóa Học
            </h2>
            <p className="text-amber-500 text-[10px] font-extrabold uppercase tracking-[0.25em] mt-1.5">
              Hệ thống quản trị chương trình đào tạo
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <input
                type="text"
                placeholder="Tìm kiếm..."
                className="px-4 py-3 text-sm rounded-xl border-2 border-gray-950 font-bold focus:ring-4 focus:ring-amber-400 outline-none w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
            onClick={() => {
                setEditing(false);
                setFormData({
                maKhoaHoc: generateNextId("FrontEnd"),
                tenKhoaHoc: "",
                moTa: "",
                maDanhMuc: "FrontEnd",
                });
                setShowModal(true);
            }}
            className="bg-gray-950 hover:bg-amber-500 hover:text-black hover:border-amber-500 text-amber-400 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider border border-gray-950 transition-all shadow-md active:scale-[0.98] w-fit"
            >
            + THÊM KHÓA HỌC
            </button>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] border-2 border-gray-950 shadow-2xl shadow-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950 text-[11px] font-black uppercase text-amber-400 tracking-widest border-b border-gray-950">
                <th className="p-5 pl-8">Mã KH</th>
                <th className="p-5">Tên Khóa Học</th>
                <th className="p-5">Danh Mục</th>
                <th className="p-5 pr-8 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 text-sm text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-16 text-center text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                    Không tìm thấy dữ liệu.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((c) => (
                  <tr key={c.maKhoaHoc} className="hover:bg-amber-50/20 transition-colors">
                    <td className="p-5 pl-8 font-black text-gray-950 tracking-wide">{c.maKhoaHoc}</td>
                    <td className="p-5 font-bold text-gray-950">{c.tenKhoaHoc}</td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {c.maDanhMuc}
                      </span>
                    </td>
                    <td className="p-5 pr-8 text-center space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setEditing(true);
                          setFormData(c);
                          setShowModal(true);
                        }}
                        className="text-[11px] bg-amber-50 hover:bg-amber-500 border border-amber-300 hover:border-amber-500 text-amber-800 hover:text-black px-4 py-2 rounded-xl font-black uppercase tracking-wider transition-all shadow-sm"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(c.maKhoaHoc)}
                        className="text-[11px] bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 text-red-600 hover:text-white px-4 py-2 rounded-xl font-black uppercase tracking-wider transition-all shadow-sm"
                      >
                        Xóa
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
          <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full space-y-8 border-[6px] border-gray-950 shadow-[16px_16px_0px_0px_rgba(3,7,18,1)] transform transition-all relative">
            <div className="space-y-2 text-center pt-2">
              <h3 className="text-4xl font-black text-gray-950 uppercase tracking-tighter italic">
                {editing ? "Cập Nhật" : "Thêm Khóa Học Mới"}
              </h3>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Mã khóa học</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-black bg-gray-100 text-gray-950 outline-none"
                    value={formData.maKhoaHoc}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Danh mục</label>
                  <select
                    className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-black text-gray-950 bg-white focus:ring-4 focus:ring-amber-400 outline-none transition-all cursor-pointer"
                    value={formData.maDanhMuc}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      setFormData({
                        ...formData,
                        maDanhMuc: newCat,
                        maKhoaHoc: generateNextId(newCat),
                      });
                    }}
                  >
                    <option value="FrontEnd">Front End</option>
                    <option value="BackEnd">Back End</option>
                    <option value="FullStack">Full Stack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Khac">Khác</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Tên khóa học</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-bold focus:ring-4 focus:ring-amber-400 outline-none transition-all"
                  value={formData.tenKhoaHoc}
                  onChange={(e) => setFormData({ ...formData, tenKhoaHoc: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Mô tả chi tiết</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 text-sm rounded-xl border-4 border-gray-950 font-bold focus:ring-4 focus:ring-amber-400 outline-none transition-all resize-none"
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-950 pl-1 tracking-widest">Ảnh bìa</label>
                <input
                  type="file"
                  className="w-full text-sm text-gray-950 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-4 file:border-gray-950 file:text-[10px] file:font-black file:uppercase file:bg-amber-400 file:text-gray-950 cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
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
                  {editing ? "Lưu thay đổi" : "Xác nhận tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;