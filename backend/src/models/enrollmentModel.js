import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    maKhoaHoc: { type: String, required: true, ref: 'Course' },
    taiKhoan: { type: String, required: true, ref: 'User' },
    ngayGhiDanh: { type: Date, default: Date.now },
}, { timestamps: true });

enrollmentSchema.index({ maKhoaHoc: 1, taiKhoan: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;