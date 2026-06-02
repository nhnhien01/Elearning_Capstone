import Course from '../models/courseModel.js';

export const layChiTietBuoiHocAdmin = async (req, res) => {
    try {
        const { maKhoaHoc } = req.params;
        const course = await Course.findOne({ maKhoaHoc });
        if (!course) {
            return res.status(404).json({ message: "Không tìm thấy khóa học này trên hệ thống!" });
        }
        res.status(200).json(course.danhSachBuoiHoc || []);
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ khi lấy chi tiết buổi học!", error: err.message });
    }
};

export const capNhatBuoiHocAdmin = async (req, res) => {
    try {
        const { maKhoaHoc, buoi, tieuDe, thoiLuong, lyThuyet } = req.body;
        if (!maKhoaHoc || !buoi || !tieuDe) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ các trường bắt buộc (Mã khóa học, Số buổi, Tiêu đề)!" });
        }
        const course = await Course.findOne({ maKhoaHoc });
        if (!course) {
            return res.status(404).json({ message: "Không tìm thấy khóa học tương ứng!" });
        }
        const soBuoi = Number(buoi);
        const buoiIndex = course.danhSachBuoiHoc.findIndex(item => item.buoi === soBuoi);
        if (buoiIndex > -1) {
            course.danhSachBuoiHoc[buoiIndex] = {
                buoi: soBuoi,
                tieuDe: tieuDe,
                thoiLuong: thoiLuong || "2h 30p",
                lyThuyet: lyThuyet || ""
            };
        } else {
            course.danhSachBuoiHoc.push({
                buoi: soBuoi,
                tieuDe,
                thoiLuong: thoiLuong || "2h 30p",
                lyThuyet: lyThuyet || ""
            });
        }
        course.danhSachBuoiHoc.sort((a, b) => a.buoi - b.buoi);
        course.markModified('danhSachBuoiHoc');
        await course.save();
        res.status(200).json({
            message: `Cập nhật lộ trình Buổi ${soBuoi} thành công!`,
            data: course.danhSachBuoiHoc
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi máy chủ khi cập nhật buổi học!", error: err.message });
    }
};