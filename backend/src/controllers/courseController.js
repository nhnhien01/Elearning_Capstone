import { courseService } from '../services/courseService.js';
import responseHandler from '../utils/responseHandler.js';

export const getListCourse = async (req, res) => {
  try {
    const courses = await courseService.getAll();
    return responseHandler.success(res, courses, 'Lấy danh sách khóa học thành công!');
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};

export const layDanhMucKhoaHoc = async (req, res) => {
  const danhMuc = [
    { maDanhMuc: 'FrontEnd', tenDanhMuc: 'Lập trình Front End' },
    { maDanhMuc: 'BackEnd', tenDanhMuc: 'Lập trình Back End' },
    { maDanhMuc: 'FullStack', tenDanhMuc: 'Lập trình Full Stack' },
    { maDanhMuc: 'Mobile', tenDanhMuc: 'Lập trình Di Động' }

  ];
  return responseHandler.success(res, danhMuc, 'Lấy danh mục khóa học thành công!');
};

export const layKhoaHocTheoDanhMuc = async (req, res) => {
  try {
    const { maDanhMuc } = req.query;
    const courses = await courseService.getByCategory(maDanhMuc);
    return responseHandler.success(res, courses, `Lấy khóa học thuộc danh mục ${maDanhMuc} thành công!`);
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};

export const layDanhSachKhoaHocPhanTrang = async (req, res) => {
  try {
    const { page = 1, pageSize = 8, tenKhoaHoc = '' } = req.query;
    const result = await courseService.getPerPage(Number(page), Number(pageSize), tenKhoaHoc);
    return responseHandler.success(res, result, 'Lấy danh sách khóa học phân trang thành công!');
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};

export const layThongTinKhoaHoc = async (req, res) => {
  try {
    const { maKhoaHoc } = req.query;
    const course = await courseService.getDetailAndIncrementView(maKhoaHoc);
    
    if (!course) {
      return responseHandler.error(res, 'Không tìm thấy thông tin khóa học yêu cầu!', 404);
    }
    return responseHandler.success(res, course, 'Lấy thông tin chi tiết khóa học thành công!');
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};

export const themKhoaHoc = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    const newCourse = await courseService.create({
      ...req.body,
      hinhAnh: imagePath,
      nguoiTao: { taiKhoan: req.user.taiKhoan, hoTen: req.user.hoTen }
    });

    return responseHandler.success(res, newCourse, 'Thêm khóa học mới vào hệ thống thành công!', 201);
  } catch (err) {
    const statusCode = err.message.includes('tồn tại') ? 400 : 500;
    return responseHandler.error(res, err.message, statusCode);
  }
};

export const capNhatKhoaHoc = async (req, res) => {
  try {
    const { maKhoaHoc } = req.body;
    const updateData = { ...req.body };
    
    if (req.file) {
      updateData.hinhAnh = `/uploads/${req.file.filename}`;
    }

    const updatedCourse = await courseService.update(maKhoaHoc, updateData);
    
    if (!updatedCourse) {
      return responseHandler.error(res, 'Không tìm thấy khóa học nào phù hợp để cập nhật!', 404);
    }

    return responseHandler.success(res, updatedCourse, 'Cập nhật khóa học thành công!');
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};

export const xoaKhoaHoc = async (req, res) => {
  try {
    const { maKhoaHoc } = req.query; 
    const deleted = await courseService.delete(maKhoaHoc);
    
    if (!deleted) {
      return responseHandler.error(res, 'Không tìm thấy khóa học cần xóa hoặc mã sai!', 404);
    }
    return responseHandler.success(res, null, 'Xóa khóa học khỏi hệ thống thành công!');
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};