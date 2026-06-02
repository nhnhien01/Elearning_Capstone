import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  taiKhoan: { type: String, required: true, unique: true },
  matKhau: { type: String, required: true },
  hoTen: { type: String, required: true },
  soDT: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hinhAnh: { type: String, default: '' },
  // Đã thêm 'NV' vào enum để phân loại nhân viên
  maLoaiNguoiDung: { type: String, enum: ['HV', 'GV', 'NV'], default: 'HV' },
  maNhom: { type: String, default: 'GP01' },
  mangKhoaHocGhiDanh: [{ type: String }],
  mangKhoaHocChoXetDuyet: [{ type: String }],
  ngaySinh: { type: Date },
  truongHoc: { type: String, default: '' },
  viTriThucTap: { type: String, default: '' },
  chungChi: { type: String, default: '' },
  linkCV: { type: String, default: '' },
  gioiThieuBanThan: { type: String, default: '' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;