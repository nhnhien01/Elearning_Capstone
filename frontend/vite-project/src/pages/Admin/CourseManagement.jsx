import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";
import { ArrowLeft, UploadCloud, X } from "lucide-react";

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
    hinhAnh: "",
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

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
      setPreviewUrl(null);
      fetchCourses();
    } catch (err) {
      alert("Thao tác thất bại!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 antialiased bg-white text-gray-950">
      {/* ... (Phần Header giữ nguyên) ... */}
      
      {/* Modal chỉnh sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full border-[6px] border-gray-950 shadow-[16px_16px_0px_0px_rgba(3,7,18,1)]">
            <form onSubmit={handleSave} className="space-y-6">
              {/* ... (Các input mã khóa, danh mục, tên... giữ nguyên) ... */}

              {/* Vùng Upload ảnh cải tiến */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest">Ảnh Bìa Khóa Học</label>
                <div className="relative border-4 border-dashed border-gray-300 rounded-xl p-4 hover:border-amber-500 transition-colors">
                  {previewUrl || formData.hinhAnh ? (
                    <div className="relative">
                      <img 
                        src={previewUrl || formData.hinhAnh} 
                        alt="Preview" 
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button 
                        type="button"
                        onClick={() => { setFile(null); setPreviewUrl(null); setFormData({...formData, hinhAnh: ''}) }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X size={16}/>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
                      <UploadCloud className="text-gray-400 mb-2" />
                      <span className="text-xs font-bold text-gray-500">Chọn ảnh từ máy tính</span>
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  )}
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-gray-950 text-amber-400 rounded-2xl font-black uppercase">
                {editing ? "Lưu Thay Đổi" : "Xác Nhận Tạo Mới"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};