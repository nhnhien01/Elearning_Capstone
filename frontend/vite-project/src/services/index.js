import courseService from './CourseService';
import userService from './UserService';
import axiosClient from '../config/axiosClient';

const enrollmentService = {
  getApprovedCourses: async (taiKhoan) => {
    try {
      const res = await axiosClient.post('/QuanLyNguoiDung/LayThongTinKhoaHoc', { taiKhoan });
      return res.data.content || res.data || [];
    } catch (error) {
      throw error;
    }
  }
};

export {
  courseService,
  userService,
  enrollmentService
};