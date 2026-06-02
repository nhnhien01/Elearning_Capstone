import mongoose from 'mongoose';

const buoiHocSchema = new mongoose.Schema({
    buoi: { type: Number, required: true },
    tieuDe: { type: String, required: true },
    thoiLuong: { type: String, default: "2h 30p" },
    lyThuyet: { type: String, default: "" } 
});


const courseSchema = new mongoose.Schema({
    maKhoaHoc: { type: String, required: true, unique: true },
    tenKhoaHoc: { type: String, required: true },
    moTa: { type: String },
    luotXem: { type: Number, default: 0 },
    hinhAnh: { type: String },
    maDanhMuc: { type: String },
    nguoiTao: {
        taiKhoan: String,
        hoTen: String
    },
  
    danhSachBuoiHoc: [buoiHocSchema]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;