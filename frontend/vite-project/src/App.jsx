import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home/HomePage";
import CourseDetail from "./pages/Home/CourseDetail";
import CoursesByCategory from "./pages/Home/CoursesByCategory";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";
import CourseManagement from "./pages/Admin/CourseManagement";
import SessionManagement from "./pages/Admin/SessionManagement";
import UserManagement from "./pages/Admin/UserManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/Client/UserProfile";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminConsultation from "./pages/Admin/ConsultationList";
import AllCourses from "./pages/Home/AllCourses";
import SecurityPolicy from "./pages/Legal/SecurityPolicy";
import TermsOfService from "./pages/Legal/TermsOfService";
import PaymentPolicy from "./pages/Legal/PaymentPolicy";
import Careers from "./pages/Legal/Careers";
import StaffManagement from "./pages/Staff/StaffManagement";
import StaffProfile from "./pages/Staff/StaffProfile";
import CourseSchedule from "./pages/Client/CourseSchedule";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";

const Attendance = lazy(() => import("./pages/Admin/Attendance.jsx"));

const ProfileDispatcher = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.maLoaiNguoiDung === "GV") return <AdminProfile />;
  if (user.maLoaiNguoiDung === "NV") return <StaffProfile />;
  return <UserProfile />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-gray-950 selection:bg-amber-400 selection:text-black">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:maKhoaHoc" element={<CourseDetail />} />
            <Route
              path="/category/:maDanhMuc"
              element={<CoursesByCategory />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileDispatcher />
                </ProtectedRoute>
              }
            />

            <Route
              path="/course-schedule/:maKhoaHoc"
              element={
                <ProtectedRoute>
                  <CourseSchedule />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["GV"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute allowedRoles={["GV"]}>
                  <CourseManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/quan-ly-lo-trinh"
              element={
                <ProtectedRoute allowedRoles={["GV"]}>
                  <SessionManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["GV"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/consultation"
              element={
                <ProtectedRoute allowedRoles={["GV"]}>
                  <AdminConsultation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/attendance"
              element={
                <ProtectedRoute allowedRoles={["GV"]}>
                  <Suspense
                    fallback={
                      <div className="max-w-7xl mx-auto px-6 py-32 text-center antialiased bg-white text-gray-950">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-400 animate-pulse">
                          Đang tải phân hệ xét duyệt hệ thống...
                        </div>
                      </div>
                    }
                  >
                    <Attendance />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff-tasks"
              element={
                <ProtectedRoute allowedRoles={["NV"]}>
                  <StaffManagement />
                </ProtectedRoute>
              }
            />

            <Route path="/courses" element={<AllCourses />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/payment-policy" element={<PaymentPolicy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/security-policy" element={<SecurityPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" replace element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;