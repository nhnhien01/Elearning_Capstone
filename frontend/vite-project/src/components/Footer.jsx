import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8 mt-auto text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-900">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter bg-gradient-to-r from-white via-gray-200 to-amber-400 bg-clip-text text-transparent">
                  LUNA CYBER ACADEMY
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Luna Cyber Academy - Hệ thống đào tạo lập trình viên thực chiến
              chất lượng cao. Chúng tôi cam kết mang lại giá trị tri thức thực
              tế vững chắc nhất cho học viên.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1 h-3 bg-amber-500 rounded-full"></span>
              <span>Lộ Trình Học</span>
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  to="/category/FrontEnd"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-amber-500">›</span>{" "}
                  <span>Lập trình Front-End Chuyên Sâu</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/BackEnd"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-amber-500">›</span>{" "}
                  <span>Lập trình Back-End Node.js/Java</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/FullStack"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-amber-500">›</span>{" "}
                  <span>Lập trình Full-Stack Web Chuyên Nghiệp</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Mobile"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-amber-500">›</span>{" "}
                  <span>Tư duy Lập trình & Thuật toán cơ bản</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1 h-3 bg-amber-500 rounded-full"></span>
              <span>Chính Sách & Hỗ Trợ</span>
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-gray-700 font-bold">•</span>{" "}
                  <span>Chính sách bảo mật thông tin</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-gray-700 font-bold">•</span>{" "}
                  <span>Điều khoản sử dụng dịch vụ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/payment-policy"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-gray-700 font-bold">•</span>{" "}
                  <span>Quy chế thanh toán & Hoàn học phí</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-amber-400 text-gray-400 transition-colors flex items-center space-x-1"
                >
                  <span className="text-gray-700 font-bold">•</span>{" "}
                  <span>Cơ hội việc làm & Đối tác doanh nghiệp</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center space-x-2">
              <span className="w-1 h-3 bg-amber-500 rounded-full"></span>
              <span>Thông Tin Liên Hệ</span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span className="text-gray-400">
                  Cơ sở chính: Tầng 5, Toà nhà Astan, quận 1 TP. Hồ Chí Minh.
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-amber-500 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.645-5.194-4.015-6.84-6.84l1.293-.97c.363-.271.527-.834.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span className="font-bold text-gray-350">
                  Hotline: 1800 9696 (Miễn phí)
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-amber-500 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span className="text-gray-400">
                  Email: tuyensinh@lunacyber.edu.vn
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex justify-center items-center text-xs text-gray-600">
          <div className="space-y-1 text-center">
            <p className="font-bold text-amber-400/80 tracking-wider">
              LUNA CYBER ACADEMY — HỆ THỐNG ĐÀO TẠO CÁC KHÓA HỌC LẬP TRÌNH
            </p>
            <p className="text-gray-500">
              © {new Date().getFullYear()} Luna Cyber Academy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
