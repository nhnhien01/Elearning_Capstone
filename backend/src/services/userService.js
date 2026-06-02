import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userService = {
  register: async (userData) => {
    const { taiKhoan, email, matKhau, maLoaiNguoiDung } = userData;
    
    const userExist = await User.findOne({ $or: [{ taiKhoan }, { email }] });
    if (userExist) throw new Error('Tài khoản hoặc Email này đã tồn tại!');

    const hashedPassword = await bcrypt.hash(matKhau, 10);
    return await User.create({
      ...userData,
      matKhau: hashedPassword,
      maLoaiNguoiDung: maLoaiNguoiDung || 'HV'
    });
  },

  login: async (taiKhoan, matKhau) => {
    const user = await User.findOne({ taiKhoan });
    if (!user) throw new Error('Tài khoản không tồn tại!');

    const isMatch = await bcrypt.compare(matKhau, user.matKhau);
    if (!isMatch) throw new Error('Mật khẩu nhập vào không chính xác!');

    const token = jwt.sign(
      { id: user._id, role: user.maLoaiNguoiDung },
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    return {
      _id: user._id,
      taiKhoan: user.taiKhoan,
      hoTen: user.hoTen,
      email: user.email,
      soDT: user.soDT,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      accessToken: token
    };
  },

  getAllUsers: async () => {
    return await User.find().select('-matKhau');
  },

  getUsersPerPage: async (page, pageSize, tuKhoa) => {
    const query = tuKhoa ? { hoTen: { $regex: tuKhoa, $options: 'i' } } : {};
    const totalCount = await User.countDocuments(query);
    
    const items = await User.find(query)
      .select('-matKhau')
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return { currentPage: page, totalCount, items };
  },

  searchUsers: async (tuKhoa) => {
    return await User.find({
      $or: [
        { hoTen: { $regex: tuKhoa || '', $options: 'i' } },
        { taiKhoan: { $regex: tuKhoa || '', $options: 'i' } }
      ]
    }).select('-matKhau');
  },

  adminCreateUser: async (userData) => {
    const { taiKhoan, email, matKhau, maLoaiNguoiDung } = userData;
    const userExist = await User.findOne({ $or: [{ taiKhoan }, { email }] });
    if (userExist) throw new Error('Tài khoản hoặc Email đã tồn tại!');

    const hashedPassword = await bcrypt.hash(matKhau, 10);
    return await User.create({ 
      ...userData, 
      matKhau: hashedPassword,
      maLoaiNguoiDung: maLoaiNguoiDung 
    });
  },

  updateProfile: async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tồn tại!');

    if (user.maLoaiNguoiDung !== 'HV' && user.maLoaiNguoiDung !== 'NV') {
      delete updateData.ngaySinh;
      delete updateData.truongHoc;
      delete updateData.viTriThucTap;
      delete updateData.chungChiNgoaiNgu;
      delete updateData.linkCV;
      delete updateData.gioiThieuBanThan;
    }

    if (updateData.matKhau) {
      updateData.matKhau = await bcrypt.hash(updateData.matKhau, 10);
    }
    
    return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-matKhau');
  },

  deleteUser: async (taiKhoan) => {
    return await User.findOneAndDelete({ taiKhoan });
  }
};