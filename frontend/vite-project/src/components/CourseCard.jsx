import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
 
  const imageUrl = course.hinhAnh 
    ? (course.hinhAnh.startsWith('http') 
        ? course.hinhAnh 
        : `${import.meta.env.VITE_API_URL}/${course.hinhAnh.replace(/^\//, '')}`)
    : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500';

  return (
    <Link 
      to={`/course/${course.maKhoaHoc}`}
      className="group block bg-white rounded-[24px] overflow-hidden border-2 border-gray-950 shadow-[8px_8px_0px_0px_rgba(3,7,18,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 h-full flex flex-col"
    >
      {/* Container ảnh cố định tỉ lệ */}
      <div className="relative pt-[60%] overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={course.tenKhoaHoc} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { 
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500'; 
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-amber-100 text-gray-950 font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest border-2 border-gray-950">
            {course.maDanhMuc}
          </span>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-grow">
        <h3 className="font-black text-gray-950 text-xl leading-snug group-hover:text-amber-600 transition-colors mb-4">
          {course.tenKhoaHoc}
        </h3>

        <div className="mt-auto pt-4 border-t-2 border-gray-100">
          <span className="inline-block w-full text-center py-3 bg-gray-950 text-white font-black text-xs uppercase tracking-widest rounded-xl group-hover:bg-amber-500 group-hover:text-gray-950 transition-colors">
            Xem Chi Tiết
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;