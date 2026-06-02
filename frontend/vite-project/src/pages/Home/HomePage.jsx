import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";
import CourseCard from "../../components/CourseCard";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, courseRes] = await Promise.all([
          axiosClient.get(API_ENDPOINTS.COURSE.DANH_MUC),
          axiosClient.get(API_ENDPOINTS.COURSE.DANH_SACH),
        ]);

        const fetchedCategories = catRes.data.content || [];
        setCategories([
          ...fetchedCategories,
          { maDanhMuc: "Khac", tenDanhMuc: "Khác" },
        ]);
        setCourses(courseRes.data.content || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-grow">
        <div className="bg-gray-950 rounded-[2rem] p-10 md:p-16 border-2 border-gray-950 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] relative overflow-hidden">
          <div className="max-w-2xl space-y-6 z-10 relative">
            <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase bg-amber-400 text-gray-950 px-4 py-1.5 rounded-lg">
              Luna Cyber Academy
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white uppercase">
              Lập Trình <span className="text-amber-400">Thực Chiến</span>
              <br />
              Kiến Tạo Tương Lai
            </h1>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed max-w-lg">
              Hệ thống đào tạo lập trình chuyên sâu. Học từ dự án thực tế, làm
              việc cùng chuyên gia và bứt phá sự nghiệp công nghệ.
            </p>
            <div className="pt-4">
              <Link
                to="/courses"
                className="bg-amber-400 hover:bg-white text-gray-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider transition-all border-2 border-amber-400 hover:border-white shadow-lg"
              >
                Khám phá ngay
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="text-2xl font-black text-gray-950 uppercase tracking-tight">
            Các danh mục đào tạo
          </h2>

          <div className="flex flex-row gap-2 md:gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link
                key={cat.maDanhMuc}
                to={`/category/${cat.maDanhMuc}`}
                className="flex-1 min-w-[20%] bg-white border-2 border-gray-950 hover:bg-amber-400 rounded-xl p-3 md:p-6 text-center font-black text-[10px] md:text-sm text-gray-950 transition-all shadow-[2px_2px_0px_0px_rgba(3,7,18,1)] whitespace-nowrap"
              >
                {cat.tenDanhMuc}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-8 pb-12">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-black text-gray-950 uppercase tracking-tight">
              Khóa học tiêu biểu
            </h2>
            <Link
              to="/courses"
              className="text-xs font-black uppercase tracking-widest text-amber-500 hover:text-gray-950 underline underline-offset-4 transition-all"
            >
              Xem tất cả
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-64 bg-gray-100 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.length > 0 ? (
                [...courses]
                  .reverse()
                  .slice(0, 3)
                  .map((course) => (
                    <CourseCard key={course.maKhoaHoc} course={course} />
                  ))
              ) : (
                <div className="col-span-3 text-center py-10 font-bold uppercase text-xs text-gray-400">
                  Hiện chưa có khóa học nào.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
