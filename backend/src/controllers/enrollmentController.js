import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import Consultation from '../models/consultationModel.js';
import bcrypt from 'bcryptjs';

export const dangKyKhoaHoc = async (req, res) => {
    try {
        const { maKhoaHoc } = req.body;
        const course = await Course.findOne({ maKhoaHoc });
        if (!course) return res.status(404).json({ message: 'Khóa học không tồn tại!' });
        await User.findByIdAndUpdate(req.user.id, { $addToSet: { mangKhoaHocChoXetDuyet: maKhoaHoc } });
        res.status(200).json({ message: 'Đăng ký thành công, vui lòng chờ duyệt!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const huyGhiDanh = async (req, res) => {
    try {
        const { maKhoaHoc, taiKhoan } = req.body;
        const userAccount = req.user.role === 'ADMIN' ? taiKhoan : req.user.taiKhoan;
        const user = await User.findOneAndUpdate({ taiKhoan: userAccount }, {
            $pull: { mangKhoaHocGhiDanh: maKhoaHoc, mangKhoaHocChoXetDuyet: maKhoaHoc }
        });
        if (user) {
            await Consultation.findOneAndDelete({ soDT: user.soDT, maKhoaHoc });
        }
        res.status(200).json({ message: 'Hủy ghi danh thành công!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachKhoaHocChuaGhiDanh = async (req, res) => {
    try {
        const { taiKhoan } = req.body;
        const user = await User.findOne({ taiKhoan });
        const excluded = [...(user.mangKhoaHocGhiDanh || []), ...(user.mangKhoaHocChoXetDuyet || [])];
        const courses = await Course.find({ maKhoaHoc: { $nin: excluded } });
        res.status(200).json(courses);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachKhoaHocChoXetDuyet = async (req, res) => {
    try {
        const { taiKhoan } = req.body;
        const user = await User.findOne({ taiKhoan });
        const courses = await Course.find({ maKhoaHoc: { $in: user?.mangKhoaHocChoXetDuyet || [] } });
        res.status(200).json(courses);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachKhoaHocDaXetDuyet = async (req, res) => {
    try {
        const { taiKhoan } = req.body;
        const user = await User.findOne({ taiKhoan });
        const courses = await Course.find({ maKhoaHoc: { $in: user?.mangKhoaHocGhiDanh || [] } });
        res.status(200).json(courses);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachNguoiDungChuaGhiDanh = async (req, res) => {
    try {
        const { maKhoaHoc } = req.body;
        const users = await User.find({
            maLoaiNguoiDung: 'HV',
            mangKhoaHocGhiDanh: { $ne: maKhoaHoc },
            mangKhoaHocChoXetDuyet: { $ne: maKhoaHoc }
        }).select('-matKhau');
        res.status(200).json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachHocVienChoXetDuyet = async (req, res) => {
    try {
        const { maKhoaHoc } = req.body;
        let filter = { trangThai: { $in: ["DaGhiDanh", "Moi", "DaChot", "DangTuVan"] } }; 
        if (maKhoaHoc) {
            filter.maKhoaHoc = maKhoaHoc;
        }
        const list = await Consultation.find(filter).sort({ updatedAt: -1 });
        res.status(200).json(list);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};

export const duyetVaGhiDanhTuVan = async (req, res) => {
    try {
        const { id, maKhoaHoc, hoTen, soDT, matKhau, email } = req.body;
        console.log("Dữ liệu nhận được:", req.body);

    
        if (!maKhoaHoc || !soDT || !hoTen || !email || !matKhau) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc!' });
        }

        let user = await User.findOne({ taiKhoan: soDT });
        
        if (!user) {
            const hashedPassword = await bcrypt.hash(matKhau, 10);
            user = await User.create({
                taiKhoan: soDT,
                matKhau: hashedPassword,
                hoTen,
                soDT,
                email,
                maLoaiNguoiDung: "HV",
                mangKhoaHocGhiDanh: [maKhoaHoc] 
            });
        } else {
           
            await User.findByIdAndUpdate(user._id, { 
                $addToSet: { mangKhoaHocGhiDanh: maKhoaHoc } 
            });
        }

       
        await Consultation.findByIdAndUpdate(id, { trangThai: "DaDuyet" });

        res.status(200).json({ message: 'Ghi danh thành công!', user });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
};

export const ghiDanhKhoaHoc = async (req, res) => {
    try {
        const { id, maKhoaHoc, taiKhoan } = req.body; 
        if (!maKhoaHoc) return res.status(400).json({ message: 'Mã khóa học không hợp lệ!' });
        const user = await User.findOne({ taiKhoan });
        if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại!' });
        await User.findOneAndUpdate({ taiKhoan }, {
            $pull: { mangKhoaHocChoXetDuyet: maKhoaHoc },
            $addToSet: { mangKhoaHocGhiDanh: maKhoaHoc }
        });
        await Consultation.findByIdAndUpdate(id, { trangThai: "DaDuyet" });
        res.status(200).json({ message: 'Ghi danh thành công!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachHocVienKhoaHoc = async (req, res) => {
    try {
        const { maKhoaHoc } = req.body;
        const users = await User.find({ mangKhoaHocGhiDanh: maKhoaHoc }).select('-matKhau');
        res.status(200).json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const chotDonVaGhiDanh = async (req, res) => {
    try {
        const { id, maKhoaHoc, taiKhoan } = req.body;
        await Consultation.findByIdAndUpdate(id, { trangThai: "DaChot" });
        await User.findOneAndUpdate({ taiKhoan }, { $addToSet: { mangKhoaHocChoXetDuyet: maKhoaHoc } });
        res.status(200).json({ message: 'Chốt đơn thành công!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layTatCaDonChoDuyet = async (req, res) => {
    try {
        const pending = await Consultation.find({ trangThai: "DaChot" });
        res.status(200).json(pending);
    } catch (err) { res.status(500).json({ error: err.message }); }
};