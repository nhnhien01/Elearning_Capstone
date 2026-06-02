import express from 'express';
import { 
    getListCourse, 
    themKhoaHoc, 
    xoaKhoaHoc, 
    layDanhMucKhoaHoc, 
    layKhoaHocTheoDanhMuc, 
    layDanhSachKhoaHocPhanTrang, 
    layThongTinKhoaHoc, 
    capNhatKhoaHoc 
} from '../controllers/courseController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { uploadImage } from '../middlewares/uploadMiddleware.js'; 

const router = express.Router();

router.get('/LayDanhSachKhoaHoc', getListCourse);
router.get('/LayDanhMucKhoaHoc', layDanhMucKhoaHoc);
router.get('/LayKhoaHocTheoDanhMuc', layKhoaHocTheoDanhMuc);
router.get('/LayDanhSachKhoaHoc_PhanTrang', layDanhSachKhoaHocPhanTrang);
router.get('/LayThongTinKhoaHoc', layThongTinKhoaHoc);

router.post('/ThemKhoaHoc', protect, authorize('GV'), uploadImage.single('hinhAnh'), themKhoaHoc);
router.put('/CapNhatKhoaHoc', protect, authorize('GV'), uploadImage.single('hinhAnh'), capNhatKhoaHoc);
router.delete('/XoaKhoaHoc', protect, authorize('GV'), xoaKhoaHoc);

export default router;