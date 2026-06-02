import axiosClient from '../config/axiosClient';
import { API_ENDPOINTS } from '../constants/apiConfig';

class UserService {
  async getProfile() {
    
    const res = await axiosClient.post(API_ENDPOINTS.USER.THONG_TIN);
    return res.data;
  }

  async updateProfile(profileData) {
    const res = await axiosClient.put(API_ENDPOINTS.USER.CAP_NHAT, profileData);
    return res.data;
  }

  async uploadAvatar(formData) {
    
    const res = await axiosClient.post(API_ENDPOINTS.USER.UPLOAD_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }

  async uploadCV(formData) {
    const res = await axiosClient.post(API_ENDPOINTS.USER.UPLOAD_CV, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
}

export default new UserService();