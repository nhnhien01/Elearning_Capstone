import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Camera, Briefcase, User, Home, BookOpen } from "lucide-react";
import { userService } from "../../services";
import axiosClient from "../../config/axiosClient";

const UserProfile = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [isCustomSchool, setIsCustomSchool] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [formData, setFormData] = useState({
    hoTen: "",
    soDT: "",
    email: "",
    matKhau: "",
    ngaySinh: "",
    truongHoc: "",
    viTriThucTap: "",
    gioiThieuBanThan: "",
    chungChi: "",
  });

  const getAssetUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `https://elearning-capstone.onrender.com${path}`;
  };

  const PREDEFINED_SCHOOLS = [
    "Đại học Bách Khoa Hà Nội",
    "Đại học Quốc gia Hà Nội",
    "Đại học Kinh tế Quốc dân",
    "Đại học Bách Khoa - ĐH Đà Nẵng",
    "Đại học Huế",
    "Đại học Bách Khoa TP.HCM",
    "Đại học Quốc gia TP.HCM",
    "Đại học Khoa học Tự nhiên TP.HCM",
  ];

  const fetchData = async () => {
    try {
      const data = await userService.getProfile();
      setProfile(data);
      const dateVal = data.ngaySinh ? data.ngaySinh.split("T")[0] : "";
      if (data.truongHoc && !PREDEFINED_SCHOOLS.includes(data.truongHoc)) {
        setIsCustomSchool(true);
      }
      setFormData({
        hoTen: data.hoTen || "",
        soDT: data.soDT || "",
        email: data.email || "",
        matKhau: "",
        ngaySinh: dateVal,
        truongHoc: data.truongHoc || "",
        viTriThucTap: data.viTriThucTap || "",
        gioiThieuBanThan: data.gioiThieuBanThan || "",
        chungChi: data.chungChi || "",
      });

      const profileRes = await axiosClient.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
      const resData = profileRes.data?.content || profileRes.data;
      const registeredCourses = resData?.mangKhoaHocGhiDanh || [];
      setMyCourses(registeredCourses);
    } catch (err) {
      setMyCourses([]);
    }
  };

  const handleGoToSchedule = () => {
    if (myCourses.length > 0) {
      const firstCourseCode = typeof myCourses[0] === "object" ? myCourses[0].maKhoaHoc : myCourses[0];
      navigate(`/course-schedule/${firstCourseCode}`);
    } else {
      alert("Bạn chưa đăng ký khóa học nào! Vui lòng đăng ký khóa học trước.");
      navigate("/");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      const res = await userService.uploadAvatar(fd);
      const oldUser = JSON.parse(localStorage.getItem("user"));
      const newUser = { ...oldUser, hinhAnh: res.hinhAnh };
      localStorage.setItem("user", JSON.stringify(newUser));
      setProfile(prev => ({ ...prev, hinhAnh: res.hinhAnh }));
      window.dispatchEvent(new Event("userUpdated"));
    } catch (err) {}
  };

  const handleCVChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("cv", file);
    try {
      const res = await userService.uploadCV(fd);
      setProfile((prev) => ({ ...prev, linkCV: res.path }));
      setMsg({ type: "success", text: "Cập nhật CV thành công!" });
    } catch {
      setMsg({ type: "error", text: "Lỗi upload CV!" });
    }
  };

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    try {
      const updatedUser = await userService.updateProfile(formData);
      setProfile(updatedUser);
      setFormData(prev => ({
        ...prev,
        ...updatedUser,
        ngaySinh: updatedUser.ngaySinh ? updatedUser.ngaySinh.split("T")[0] : "",
        matKhau: ""
      }));
      const userStorage = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...userStorage, hoTen: updatedUser.hoTen }));
      window.dispatchEvent(new Event("userUpdated"));
      setMsg({ type: "success", text: "Cập nhật thành công!" });
    } catch (err) {
      setMsg({ type: "error", text: "Lỗi cập nhật!" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!profile) return <div className="p-8 text-center font-black">Đang tải...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50 font-sans">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="flex items-center gap-2 bg-white text-slate-900 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-slate-900 hover:bg-slate-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Home size={16} /> Trang Chủ
        </Link>
        <button 
          onClick={handleGoToSchedule}
          className="flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-slate-900 hover:bg-amber-500 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <BookOpen size={16} /> Khóa Học Của Tôi ({myCourses.length})
        </button>
      </div>

      <div className="flex items-center gap-4 border-b-4 border-slate-900 pb-6 mb-8">
        <div className="bg-slate-950 p-3 rounded-2xl shadow-lg border-2 border-slate-900">
          <User className="text-amber-400" size={28} />
        </div>
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Hồ sơ học viên</h1>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Student Profile</p>
        </div>
      </div>

      {msg.text && (
        <div className={`p-4 mb-6 rounded-lg text-center font-black ${msg.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-white rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
            <div className="relative group cursor-pointer mb-6" onClick={() => fileInputRef.current.click()}>
              <img
                src={profile.hinhAnh ? getAssetUrl(profile.hinhAnh) : `https://ui-avatars.com/api/?name=${profile.hoTen}`}
                className="w-40 h-40 rounded-3xl object-cover border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                alt="Avatar"
              />
              <div className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Camera className="text-white" /></div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>
            <h2 className="font-black text-xl uppercase text-center">{profile.hoTen}</h2>
            <div className="flex items-center gap-2 mt-2 px-4 py-1 bg-slate-100 rounded-full text-slate-600 font-bold text-xs border border-slate-200"><Mail size={14} /> {profile.email}</div>
          </div>
          
          <form onSubmit={handleUpdate} className="p-8 bg-white rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="font-black text-xs uppercase bg-yellow-400 inline-block px-3 py-1 border-2 border-slate-900 mb-6">Chỉnh sửa thông tin</h3>
            <input className="w-full p-3 border-2 border-slate-900 rounded-xl font-bold" value={formData.hoTen} onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })} placeholder="Họ và tên" />
            <input className="w-full p-3 border-2 border-slate-900 rounded-xl font-bold" value={formData.soDT} onChange={(e) => setFormData({ ...formData, soDT: e.target.value })} placeholder="Số điện thoại" />
            <input type="date" className="w-full p-3 border-2 border-slate-900 rounded-xl font-bold text-slate-500" value={formData.ngaySinh} onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value })} />
            <input type="password" className="w-full p-3 border-2 border-slate-900 rounded-xl font-bold" placeholder="Mật khẩu mới" onChange={(e) => setFormData({ ...formData, matKhau: e.target.value })} />
            <button type="submit" className="w-full py-4 bg-slate-900 text-yellow-400 font-black rounded-xl border-2 border-slate-900 hover:bg-slate-800 transition-all">Lưu cập nhật</button>
          </form>
        </div>

        <div className="lg:col-span-8 space-y-10">
          {profile.maLoaiNguoiDung === "HV" && (
            <section className="p-8 bg-white rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                <BookOpen size={24} /> Khóa học đã tham gia
              </h2>
              
              {myCourses.length === 0 ? (
                <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center font-bold text-sm text-slate-400 uppercase">
                  Bạn chưa ghi danh vào khóa học nào.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {myCourses.map((course, index) => {
                    const currentMa = course.maKhoaHoc;
                    const currentTen = course.tenKhoaHoc || `Khóa học ${currentMa}`;
                    const currentHinhAnh = course.hinhAnh;
                    return (
                      <div key={currentMa + index} className="p-4 border-2 border-slate-900 bg-white rounded-2xl flex flex-col justify-between items-start gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 transition-all">
                        <div className="w-full">
                          {currentHinhAnh && (
                            <img 
                              src={getAssetUrl(currentHinhAnh)} 
                              alt={currentTen}
                              className="w-full h-36 object-cover rounded-xl border-2 border-slate-900 mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            />
                          )}
                          <span className="text-[10px] font-black bg-slate-900 text-amber-400 px-2 py-0.5 rounded border border-slate-900 uppercase">
                            {currentMa}
                          </span>
                          <h4 className="font-black text-sm text-slate-900 mt-2 line-clamp-2">
                            {currentTen}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                            {course.moTa}
                          </p>
                        </div>
                        <Link
                          to={`/course-schedule/${currentMa}`}
                          className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase rounded-xl border-2 border-slate-900 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          Vào Lớp Học Ngay
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          <section className="p-8 bg-white rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3"><Briefcase size={28} /> Hồ sơ tuyển dụng</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Trường học</label>
                  <select className="w-full p-3 border-2 border-slate-900 rounded-xl font-bold bg-white" value={isCustomSchool ? "Khác" : formData.truongHoc} onChange={(e) => {
                    const val = e.target.value;
                    if (val === "Khác") { setIsCustomSchool(true); setFormData({ ...formData, truongHoc: "" }); }
                    else { setIsCustomSchool(false); setFormData({ ...formData, truongHoc: val }); }
                  }}>
                    <option value="">-- Chọn trường --</option>
                    <optgroup label="Miền Bắc"><option value="Đại học Bách Khoa Hà Nội">Đại học Bách Khoa Hà Nội</option><option value="Đại học Quốc gia Hà Nội">Đại học Quốc gia Hà Nội</option><option value="Đại học Kinh tế Quốc dân">Đại học Kinh tế Quốc dân</option></optgroup>
                    <optgroup label="Miền Trung"><option value="Đại học Bách Khoa - ĐH Đà Nẵng">Đại học Bách Khoa - ĐH Đà Nẵng</option><option value="Đại học Huế">Đại học Huế</option></optgroup>
                    <optgroup label="Miền Nam"><option value="Đại học Bách Khoa TP.HCM">Đại học Bách Khoa TP.HCM</option><option value="Đại học Quốc gia TP.HCM">Đại học Quốc gia TP.HCM</option><option value="Đại học Khoa học Tự nhiên TP.HCM">Đại học Khoa học Tự nhiên TP.HCM</option></optgroup>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                {isCustomSchool && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Nhập tên trường</label>
                    <input className="w-full p-3 border-2 border-slate-900 rounded-xl font-bold" placeholder="Nhập tên trường..." value={formData.truongHoc} onChange={(e) => setFormData({ ...formData, truongHoc: e.target.value })} />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Vị trí thực tập</label>
                <input className="w-full p-3 border-2 border-slate-900 rounded-xl font-bold" placeholder="VD: Frontend..." value={formData.viTriThucTap} onChange={(e) => setFormData({ ...formData, viTriThucTap: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Tải lên CV</label>
                {profile.linkCV && (
                  <div className="mb-4 p-4 bg-emerald-50 border-2 border-emerald-500 rounded-xl flex items-center justify-between">
                    <span className="font-bold text-emerald-800 text-sm truncate">{profile.linkCV.split("/").pop()}</span>
                    <a href={getAssetUrl(profile.linkCV)} target="_blank" rel="noopener noreferrer" className="text-xs font-black bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-600">XEM CV</a>
                  </div>
                )}
                <div className="border-2 border-dashed border-slate-400 rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                  <input type="file" className="hidden" id="cvUpload" accept=".pdf,.doc,.docx" onChange={handleCVChange} />
                  <label htmlFor="cvUpload" className="cursor-pointer font-bold text-slate-600">{profile.linkCV ? "Nhấp để thay đổi CV (PDF, DOC)" : "Nhấp để tải lên CV (PDF, DOC)"}</label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Chứng chỉ</label>
                <input className="w-full p-4 border-2 border-slate-900 rounded-xl font-bold text-sm" placeholder="VD: TOEIC 800..." value={formData.chungChi} onChange={(e) => setFormData({ ...formData, chungChi: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Giới thiệu bản thân</label>
                <textarea className="w-full p-4 border-2 border-slate-900 rounded-xl font-bold h-24" value={formData.gioiThieuBanThan} onChange={(e) => setFormData({ ...formData, gioiThieuBanThan: e.target.value })} placeholder="Mô tả ngắn..."></textarea>
              </div>
              <button onClick={handleUpdate} className="w-full py-4 bg-yellow-400 border-2 border-slate-900 rounded-xl font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-500 transition-all">Cập nhật hồ sơ tuyển dụng</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;