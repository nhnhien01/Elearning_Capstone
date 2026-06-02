import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { responseHandler } from '../utils/responseHandler.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-matKhau');
      
      if (!req.user) return res.status(401).json({ message: 'User không tồn tại' });
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }
  } else {
    res.status(401).json({ message: 'Không có token' });
  }
};