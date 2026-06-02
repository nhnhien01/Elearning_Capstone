import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Course from '../models/courseModel.js';

export const dangKy = async (req, res) => {
    try {
        const { taiKhoan, matKhau, hoTen, soDT, email, maLoaiNguoiDung } = req.body;
        const userExist = await User.findOne({ $or: [{ taiKhoan }, { email }] });
        if (userExist) return res.status(400).json({ message: 'Tài khoản hoặc Email đã tồn tại!' });
        const hashedPassword = await bcrypt.hash(matKhau, 10);
        await User.create({
            taiKhoan, matKhau: hashedPassword, hoTen, soDT, email,
            maLoaiNguoiDung: maLoaiNguoiDung || 'HV'
        });
        res.status(201).json({ message: 'Đăng ký tài khoản thành công!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const dangNhap = async (req, res) => {
    try {
        const { taiKhoan, matKhau } = req.body;
        const user = await User.findOne({ taiKhoan });
        if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
        const isMatch = await bcrypt.compare(matKhau, user.matKhau);
        if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
        const token = jwt.sign({ id: user._id, role: user.maLoaiNguoiDung }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.status(200).json({ taiKhoan: user.taiKhoan, hoTen: user.hoTen, maLoaiNguoiDung: user.maLoaiNguoiDung, accessToken: token });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachLoaiNguoiDung = (req, res) => {
    res.status(200).json([
        { maLoaiNguoiDung: 'HV', tenLoaiNguoiDung: 'Học viên' },
        { maLoaiNguoiDung: 'GV', tenLoaiNguoiDung: 'Giáo vụ' },
        { maLoaiNguoiDung: 'NV', tenLoaiNguoiDung: 'Nhân viên' }
    ]);
};

export const layDanhSachNguoiDung = async (req, res) => {
    try {
        const users = await User.find().select('-matKhau');
        res.status(200).json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachNguoiDungPhanTrang = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, tuKhoa = '' } = req.query;
        const query = tuKhoa ? { hoTen: { $regex: tuKhoa, $options: 'i' } } : {};
        const totalCount = await User.countDocuments(query);
        const items = await User.find(query).select('-matKhau').skip((page - 1) * pageSize).limit(Number(pageSize));
        res.status(200).json({ currentPage: Number(page), totalCount, items });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const timKiemNguoiDung = async (req, res) => {
    try {
        const { tuKhoa } = req.query;
        const users = await User.find({ hoTen: { $regex: tuKhoa || '', $options: 'i' } }).select('-matKhau');
        res.status(200).json(users);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const thongTinTaiKhoan = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-matKhau');
        if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại!' });
        const danhSachMa = (user.mangKhoaHocGhiDanh || []).filter(ma => ma && ma.trim() !== "");
        const chiTietGhiDanh = danhSachMa.length > 0 ? await Course.find({ maKhoaHoc: { $in: danhSachMa } }) : [];
        const userObject = user.toObject();
        userObject.mangKhoaHocGhiDanh = chiTietGhiDanh;
        res.status(200).json(userObject);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const thongTinNguoiDung = async (req, res) => {
    try {
        const { taiKhoan } = req.body;
        const user = await User.findOne({ taiKhoan }).select('-matKhau');
        if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });
        res.status(200).json(user);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const themNguoiDung = async (req, res) => {
    try {
        const { taiKhoan, matKhau, hoTen, soDT, email, maLoaiNguoiDung, ngaySinh } = req.body;
        const userExist = await User.findOne({ $or: [{ taiKhoan }, { email }] });
        if (userExist) return res.status(400).json({ message: 'Tài khoản/Email đã tồn tại' });
        const hashedPassword = await bcrypt.hash(matKhau, 10);
        const newUser = await User.create({
            taiKhoan, matKhau: hashedPassword, hoTen, soDT, email, maLoaiNguoiDung,
            ngaySinh: ngaySinh ? new Date(ngaySinh) : null
        });
        res.status(201).json(newUser);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const capNhatThongTinNguoiDung = async (req, res) => {
    try {
        const { hoTen, soDT, email, matKhau } = req.body;
        const updateData = { hoTen, soDT, email };
        if (matKhau) updateData.matKhau = await bcrypt.hash(matKhau, 10);
        const updated = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-matKhau');
        res.status(200).json({ message: 'Cập nhật thành công', updated });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const xoaNguoiDung = async (req, res) => {
    try {
        const { taiKhoan } = req.query;
        await User.findOneAndDelete({ taiKhoan });
        res.status(200).json({ message: 'Xóa tài khoản thành công!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { hoTen, soDT, ngaySinh, truongHoc, viTriThucTap, chungChi, gioiThieuBanThan, matKhau } = req.body;
        const updateFields = {};
        if (hoTen) updateFields.hoTen = hoTen;
        if (soDT) updateFields.soDT = soDT;
        if (truongHoc) updateFields.truongHoc = truongHoc;
        if (viTriThucTap) updateFields.viTriThucTap = viTriThucTap;
        if (chungChi) updateFields.chungChi = chungChi;
        if (gioiThieuBanThan) updateFields.gioiThieuBanThan = gioiThieuBanThan;
        if (ngaySinh) updateFields.ngaySinh = new Date(ngaySinh);
        if (matKhau) updateFields.matKhau = await bcrypt.hash(matKhau, 10);
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true }).select('-matKhau');
        if (!updatedUser) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.status(200).json(updatedUser);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Không tìm thấy tệp tin!' });
        const imageUrl = `/uploads/${req.file.filename}`;
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { hinhAnh: imageUrl }, { new: true }).select('-matKhau');
        res.status(200).json({ message: 'Upload thành công!', user: updatedUser });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const uploadCV = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Không có file" });
        const linkCV = `/uploads/${req.file.filename}`;
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { linkCV }, { new: true }).select('-matKhau');
        res.status(200).json({ path: linkCV, user: updatedUser });
    } catch (err) { res.status(500).json({ error: err.message }); }
};