import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import { API_ENDPOINTS } from '../../constants/apiConfig';
import CourseCard from '../../components/CourseCard';

const CoursesByCategory = () => {
  const { maDanhMuc } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`${API_ENDPOINTS.COURSE.THEO_DANH_MUC}?maDanhMuc=${maDanhMuc}`);
        setCourses(response.data.content || response.data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    if (maDanhMuc) fetchCourses();
  }, [maDanhMuc]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <Link 
          to="/" 
          className="inline-block bg-white border-2 border-gray-950 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 hover:translate-x-[-4px] transition-all"
        >
          ← Quay lại trang chủ
        </Link>

        <div className="bg-gray-950 p-10 rounded-[2rem] shadow-2xl border-2 border-gray-950">
          <span className="text-amber-400 text-[12px] font-black uppercase tracking-[0.2em]">Danh mục đào tạo</span>
          <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tight text-white mt-2">
            {maDanhMuc}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">
            Đang truy xuất dữ liệu...
          </div>
        ) : courses.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Chưa có khóa học nào tại danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <div key={course.maKhoaHoc} className="group transition-all duration-300">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesByCategory;