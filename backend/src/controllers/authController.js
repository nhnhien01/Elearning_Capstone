import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const dangKy = async (req, res) => {
    try {
        const { taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung } = req.body;

       
        const userExists = await User.findOne({ $or: [{ taiKhoan }, { email }] });
        if (userExists) return res.status(400).json({ message: "Tài khoản hoặc Email đã tồn tại!" });

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(matKhau, salt);

       
        const newUser = await User.create({
            taiKhoan, hoTen, email, soDT, maLoaiNguoiDung,
            matKhau: hashedPassword
        });

        res.status(201).json({ message: "Đăng ký thành công!", data: newUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
};