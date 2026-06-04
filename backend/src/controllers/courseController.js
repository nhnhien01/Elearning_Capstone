import { courseService } from '../services/courseService.js';
import responseHandler from '../utils/responseHandler.js';
import cloudinary from '../configs/cloudinary.js';



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
    let imageUrl = '';
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, { folder: "luna-academy" });
      imageUrl = result.secure_url;
    }
    const newCourse = await courseService.create({
      ...req.body,
      hinhAnh: imageUrl,
      nguoiTao: { taiKhoan: req.user.taiKhoan, hoTen: req.user.hoTen }
    });
    return responseHandler.success(res, newCourse, 'Thêm khóa học thành công!', 201);
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};

export const capNhatKhoaHoc = async (req, res) => {
  try {
    
    const maKhoaHoc = req.body.maKhoaHoc || req.query.maKhoaHoc;
    const updateData = { ...req.body };
    delete updateData.maKhoaHoc;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, { folder: "luna-academy" });
      updateData.hinhAnh = result.secure_url;
    }

    const updatedCourse = await courseService.update(maKhoaHoc, updateData);
    if (!updatedCourse) return responseHandler.error(res, 'Không tìm thấy khóa học', 404);
    
    return responseHandler.success(res, updatedCourse, 'Cập nhật thành công!');
  } catch (err) {
    console.error("LỖI:", err.message);
    return responseHandler.error(res, err.message, 500);
  }
};

export const xoaKhoaHoc = async (req, res) => {
  try {
    const { maKhoaHoc } = req.query; 
    const deleted = await courseService.delete(maKhoaHoc);
    if (!deleted) {
      return responseHandler.error(res, 'Không tìm thấy khóa học cần xóa!', 404);
    }
    return responseHandler.success(res, null, 'Xóa khóa học thành công!');
  } catch (err) {
    return responseHandler.error(res, err.message, 500);
  }
};