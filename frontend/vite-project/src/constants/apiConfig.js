export const BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  CONSULTATION: {
    GUI_TU_VAN: '/api/consultation/GuiTuVan',
    LAY_DANH_SACH: '/api/consultation/LayDanhSach',
    CAP_NHAT: '/api/consultation/CapNhat',
    LAY_DANH_SACH_NV: '/api/consultation/LayDanhSachNV',
    PHAN_CONG: '/api/consultation/PhanCong'
  },
  AUTH: {
    DANG_KY: '/api/QuanLyNguoiDung/DangKy',
    DANG_NHAP: '/api/QuanLyNguoiDung/DangNhap',
  },
  USER: {
    DANH_SACH: '/api/QuanLyNguoiDung/LayDanhSachNguoiDung',
    DANH_SACH_PHAN_TRANG: '/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang',
    TIM_KIEM: '/api/QuanLyNguoiDung/TimKiemNguoiDung',
    THEM: '/api/QuanLyNguoiDung/ThemNguoiDung',
    THONG_TIN: '/api/QuanLyNguoiDung/ThongTinTaiKhoan',
    CAP_NHAT: '/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung_Full',
    XOA: '/api/QuanLyNguoiDung/XoaNguoiDung',
    UPLOAD_AVATAR: '/api/QuanLyNguoiDung/UploadAvatar',
    UPLOAD_CV: '/api/QuanLyNguoiDung/UploadCV', 
  },
  COURSE: {
    DANH_SACH: '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc',
    DANH_MUC: '/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
    THEO_DANH_MUC: '/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc',
    PHAN_TRANG: '/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang',
    CHI_TIET: '/api/QuanLyKhoaHoc/LayThongTinKhoaHoc',
    THEM: '/api/QuanLyKhoaHoc/ThemKhoaHoc',
    CAP_NHAT: '/api/QuanLyKhoaHoc/CapNhatKhoaHoc',
    XOA: '/api/QuanLyKhoaHoc/XoaKhoaHoc',
  },
  ENROLLMENT: {
    DANG_KY: '/api/QuanLyGhiDanh/DangKyKhoaHoc',
    GHI_DANH: '/api/QuanLyGhiDanh/GhiDanhKhoaHoc',
    HUY_GHI_DANH: '/api/QuanLyGhiDanh/HuyGhiDanh',
    KHOA_HOC_CHUA_GHI_DANH: '/api/QuanLyGhiDanh/LayDanhSachKhoaHocChuaGhiDanh',
    KHOA_HOC_CHO_DUYET: '/api/QuanLyGhiDanh/LayDanhSachKhoaHocChoXetDuyet',
    KHOA_HOC_DA_DUYET: '/api/QuanLyGhiDanh/LayDanhSachKhoaHocDaXetDuyet',
    HV_CHUA_GHI_DANH: '/api/QuanLyGhiDanh/LayDanhSachNguoiDungChuaGhiDanh',
    HV_CHO_DUYET: '/api/QuanLyGhiDanh/LayDanhSachHocVienChoXetDuyet',
    HV_KHOA_HOC: '/api/QuanLyGhiDanh/LayDanhSachHocVienKhoaHoc',
    CHOT_DON: '/api/QuanLyGhiDanh/chotDon'
  }
};