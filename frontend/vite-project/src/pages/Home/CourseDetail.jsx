import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS, BASE_URL } from "../../constants/apiConfig";

const CourseDetail = () => {
  const { maKhoaHoc } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

  // State mới để điều khiển việc hiện/ẩn form
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ hoTen: "", soDT: "" });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosClient.get(
          `${API_ENDPOINTS.COURSE.CHI_TIET}?maKhoaHoc=${maKhoaHoc}`,
        );
        setCourse(res.data.content || res.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (maKhoaHoc) fetchDetail();
  }, [maKhoaHoc]);

  const handleConsultation = async () => {
    if (!formData.hoTen || !formData.soDT) {
      return setActionMessage({
        type: "error",
        text: "Vui lòng nhập đầy đủ thông tin!",
      });
    }
    try {
      await axiosClient.post(API_ENDPOINTS.CONSULTATION.GUI_TU_VAN, {
        ...formData,
        maKhoaHoc,
      });
      setActionMessage({
        type: "success",
        text: "Gửi thành công! Chúng tôi sẽ liên hệ sớm.",
      });
      setFormData({ hoTen: "", soDT: "" });
      setShowForm(false); // Ẩn form sau khi gửi thành công
    } catch (err) {
      setActionMessage({
        type: "error",
        text: "Gửi thất bại, vui lòng thử lại!",
      });
    }
  };

  if (loading)
    return (
      <div className="py-32 text-center text-amber-500 font-black uppercase tracking-widest animate-pulse">
        Đang tải...
      </div>
    );

  const anhBia = course.hinhAnh?.startsWith("http")
    ? course.hinhAnh
    : `${BASE_URL}${course.hinhAnh}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link
        to="/"
        className="inline-block bg-white border-2 border-gray-950 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all"
      >
        ← Quay lại trang chủ
      </Link>

      <div className="bg-white rounded-[2rem] border-2 border-gray-950 shadow-[8px_8px_0px_0px_rgba(3,7,18,1)] overflow-hidden grid grid-cols-1 md:grid-cols-5 gap-0">
        <div className="md:col-span-2 relative bg-gray-950 min-h-[350px] flex items-center justify-center">
          <img
            src={
              anhBia ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700"
            }
            alt={course.tenKhoaHoc}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-3 p-10 flex flex-col justify-center space-y-6">
          <span className="bg-amber-400 self-start px-4 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-gray-950 rounded-full">
            {course.maDanhMuc}
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tighter leading-none">
            {course.tenKhoaHoc}
          </h1>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-5 bg-gray-950 text-amber-400 font-black uppercase tracking-widest hover:bg-amber-500 hover:text-gray-950 border-2 border-gray-950 transition-all rounded-xl"
            >
              Đăng ký tư vấn ngay
            </button>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-500">
              <input
                placeholder="Họ và tên của bạn"
                className="w-full p-4 border-2 border-gray-950 rounded-xl font-bold text-sm"
                value={formData.hoTen}
                onChange={(e) =>
                  setFormData({ ...formData, hoTen: e.target.value })
                }
              />
              <input
                placeholder="Số điện thoại"
                className="w-full p-4 border-2 border-gray-950 rounded-xl font-bold text-sm"
                value={formData.soDT}
                onChange={(e) =>
                  setFormData({ ...formData, soDT: e.target.value })
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border-2 border-gray-950 rounded-xl font-black uppercase text-xs"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConsultation}
                  className="flex-1 py-3 bg-gray-950 text-amber-400 font-black uppercase rounded-xl text-xs"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          )}

          {actionMessage.text && (
            <div
              className={`text-center p-3 text-[10px] font-black uppercase border-2 rounded-lg ${actionMessage.type === "success" ? "bg-amber-400 border-amber-500 text-gray-950" : "bg-red-500 border-red-600 text-white"}`}
            >
              {actionMessage.text}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white text-black p-10 rounded-[2rem] border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black text-black mb-6 border-b-2 border-gray-200 pb-4 uppercase">
          Thông tin chi tiết
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm font-medium whitespace-pre-line">
          {course.moTa}
        </p>
      </div>
    </div>
  );
};

export default CourseDetail;
