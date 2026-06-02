import axiosClient from '../config/axiosClient';
import { API_ENDPOINTS } from '../constants/apiConfig';

class CourseService {
  async getAllCourses() {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.COURSE.DANH_SACH);
      return res.data.content || res.data || [];
    } catch (error) {
      throw error;
    }
  }

  async getCourseDetail(maKhoaHoc) {
    try {
      const res = await axiosClient.get(`${API_ENDPOINTS.COURSE.CHI_TIET}?maKhoaHoc=${maKhoaHoc}`);
      return res.data.content || res.data;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesByCategory(maDanhMuc) {
    try {
      const res = await axiosClient.get(`${API_ENDPOINTS.COURSE.THEO_DANH_MUC}?maDanhMuc=${maDanhMuc}`);
      return res.data.content || res.data || [];
    } catch (error) {
      throw error;
    }
  }

  async getCoursesPerPage(page, pageSize, tenKhoaHoc = '') {
    try {
      const res = await axiosClient.get(
        `${API_ENDPOINTS.COURSE.PHAN_TRANG}?page=${page}&pageSize=${pageSize}&tenKhoaHoc=${tenKhoaHoc}`
      );
      return res.data.content || res.data;
    } catch (error) {
      throw error;
    }
  }

  async createCourse(formData) {
    try {
      
      const res = await axiosClient.post(API_ENDPOINTS.COURSE.THEM, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCourse(maKhoaHoc, formData) {
    try {
      const res = await axiosClient.put(`${API_ENDPOINTS.COURSE.CAP_NHAT}?maKhoaHoc=${maKhoaHoc}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCourse(maKhoaHoc) {
    try {
      const res = await axiosClient.delete(`${API_ENDPOINTS.COURSE.XOA}?maKhoaHoc=${maKhoaHoc}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new CourseService();