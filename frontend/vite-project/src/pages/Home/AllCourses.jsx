import React, { useEffect, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../constants/apiConfig";
import CourseCard from "../../components/CourseCard";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axiosClient.get(API_ENDPOINTS.COURSE.DANH_SACH);
        setCourses(res.data.content || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCourses();
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const filteredCourses = courses.filter((course) =>
    course.tenKhoaHoc?.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <div className="flex items-center gap-4 border-b-2 border-gray-950 pb-6">
        <Link 
          to="/" 
          className="p-3 bg-amber-400 hover:bg-amber-200 rounded-2xl border border-gray-950 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Tất cả khóa học</h1>
        </div>
      </div>

      <div className="relative mt-6 w-full md:w-96">
        <button 
          onClick={handleSearch}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
        >
          <Search size={20} />
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khóa học..."
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-950 rounded-xl font-bold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      {loading ? (
        <div className="text-center py-20 font-black uppercase text-gray-400 tracking-widest">Đang đồng bộ dữ liệu...</div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.maKhoaHoc} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <p className="text-gray-500 font-bold uppercase tracking-widest">Không tìm thấy khóa học có tên "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default AllCourses;