import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { ArrowLeft, BookOpen, Clock, Lock, CheckCircle, ChevronRight } from "lucide-react";

const CourseSchedule = () => {
  const { maKhoaHoc } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
  const [isAccessible, setIsAccessible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSession, setActiveSession] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setIsAccessible(false);
      setLoading(false);
      return;
    }

    const checkAccessAndFetchData = async () => {
      try {
        let currentMaKhoaHoc = maKhoaHoc;
        const profileRes = await axiosClient.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
        const resData = profileRes.data?.content || profileRes.data;
        const registeredCourses = resData?.mangKhoaHocGhiDanh || resData?.chiTietKhoaHocGhiDanh || resData?.danhSachKhoaHocGhiDanh || [];

        if (!currentMaKhoaHoc) {
          if (registeredCourses.length > 0) {
            const firstCourse = registeredCourses[0];
            currentMaKhoaHoc = typeof firstCourse === "object" ? firstCourse.maKhoaHoc : firstCourse;
            navigate(`/course-schedule/${currentMaKhoaHoc}`, { replace: true });
          } else {
            setIsAccessible(false);
            setLoading(false);
            return;
          }
        }

        const courseRes = await axiosClient.get(`/api/QuanLyLoTrinh/chi-tiet-buoi-hoc/${currentMaKhoaHoc}`);
        const currentCourseData = courseRes.data?.content || courseRes.data;
        setCourseDetail(currentCourseData);

        const handleExtractSessions = (courseData) => {
          let extractedSessions = [];
          if (Array.isArray(courseData)) extractedSessions = courseData;
          else if (courseData?.danhSachBuoiHoc) extractedSessions = courseData.danhSachBuoiHoc;
          else if (courseData?.chiTietBuoiHoc) extractedSessions = courseData.chiTietBuoiHoc;

          const sortedSessions = [...extractedSessions].sort((a, b) => Number(a.buoi) - Number(b.buoi));
          setSessions(sortedSessions);
          if (sortedSessions.length > 0) setActiveSession(sortedSessions[0].buoi);
        };

        if (user.maLoaiNguoiDung === "GV" || user.maLoaiNguoiDung === "ADMIN" || registeredCourses.some(c => (typeof c === "object" ? c.maKhoaHoc : c) === currentMaKhoaHoc)) {
          setIsAccessible(true);
          handleExtractSessions(currentCourseData);
        } else {
          setIsAccessible(false);
        }
      } catch (err) {
        setIsAccessible(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccessAndFetchData();
  }, [maKhoaHoc, user?.maLoaiNguoiDung, navigate]);

  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-gray-950 animate-pulse">ĐANG XÁC THỰC...</div>;

  if (isAccessible === false) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border-4 border-gray-950 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl border-2 border-red-600 flex items-center justify-center mx-auto">
          <Lock size={32} />
        </div>
        <h3 className="text-xl font-black uppercase text-gray-950">Quyền truy cập hạn chế</h3>
        <Link to="/" className="block py-3 bg-amber-400 border-2 border-gray-950 rounded-xl font-black uppercase tracking-wider hover:bg-amber-300 transition">Về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white min-h-screen">
      <header className="mb-8 bg-amber-400 p-6 rounded-[2rem] border-4 border-gray-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
        <Link to="/profile" className="flex items-center gap-2 text-xs font-black text-gray-950 hover:bg-white/50 px-4 py-2 rounded-xl border-2 border-gray-950 transition">
          <ArrowLeft size={16} /> HỒ SƠ
        </Link>
        <h1 className="text-xl font-black uppercase text-gray-950 tracking-tight truncate px-4">{courseDetail?.tenKhoaHoc}</h1>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-gray-950 text-xs font-black">
          <CheckCircle size={14} className="text-green-600" /> CHÍNH THỨC
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-4">
          {sessions.map((item) => (
            <div
              key={item.buoi}
              onClick={() => setActiveSession(item.buoi)}
              className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border-4 ${
                activeSession === item.buoi 
                ? "bg-gray-950 text-amber-400 border-gray-950 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]" 
                : "bg-white border-gray-950 hover:bg-amber-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm border-2 ${activeSession === item.buoi ? "bg-amber-400 text-gray-950 border-amber-400" : "bg-gray-100 text-gray-950 border-gray-950"}`}>
                  B{item.buoi}
                </div>
                <div>
                  <h4 className="font-black text-sm">{item.tieuDe}</h4>
                  <p className="text-[10px] font-bold flex items-center gap-1 mt-0.5 opacity-70"><Clock size={10} /> {item.thoiLuong}</p>
                </div>
              </div>
              <ChevronRight size={16} />
            </div>
          ))}
        </aside>

        <main className="lg:col-span-8">
          {sessions.find(s => s.buoi === activeSession) ? (
            <div className="bg-white p-8 rounded-[2rem] border-4 border-gray-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[500px]">
              <div className="mb-6 pb-6 border-b-4 border-gray-950">
                <span className="text-[10px] font-black text-gray-950 uppercase bg-amber-400 px-3 py-1 rounded-md">Chi tiết buổi {activeSession}</span>
                <h2 className="text-3xl font-black uppercase text-gray-950 mt-3">{sessions.find(s => s.buoi === activeSession).tieuDe}</h2>
              </div>
              <div className="text-gray-800 font-medium leading-relaxed text-sm whitespace-pre-wrap">
                {sessions.find(s => s.buoi === activeSession).lyThuyet || "Nội dung đang được cập nhật..."}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border-4 border-dashed border-gray-950 rounded-[2rem] font-black text-gray-400">CHỌN BUỔI HỌC ĐỂ XEM</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseSchedule;