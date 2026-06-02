import express from 'express';
import { 
    dangKyKhoaHoc, ghiDanhKhoaHoc, huyGhiDanh,
    layDanhSachKhoaHocChuaGhiDanh, layDanhSachKhoaHocChoXetDuyet, layDanhSachKhoaHocDaXetDuyet,
    layDanhSachNguoiDungChuaGhiDanh, layDanhSachHocVienChoXetDuyet, layDanhSachHocVienKhoaHoc,
    chotDonVaGhiDanh, duyetVaGhiDanhTuVan, layTatCaDonChoDuyet 
} from '../controllers/enrollmentController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/DangKyKhoaHoc', protect, dangKyKhoaHoc);
router.post('/GhiDanhKhoaHoc', protect, authorize('GV'), ghiDanhKhoaHoc);
router.post('/HuyGhiDanh', protect, huyGhiDanh); 

router.post('/LayDanhSachKhoaHocChuaGhiDanh', protect, authorize('GV'), layDanhSachKhoaHocChuaGhiDanh);
router.post('/LayDanhSachKhoaHocChoXetDuyet', protect, authorize('GV'), layDanhSachKhoaHocChoXetDuyet);
router.post('/LayDanhSachKhoaHocDaXetDuyet', protect, authorize('GV'), layDanhSachKhoaHocDaXetDuyet);
router.post('/LayDanhSachNguoiDungChuaGhiDanh', protect, authorize('GV'), layDanhSachNguoiDungChuaGhiDanh);
router.post('/LayDanhSachHocVienChoXetDuyet', protect, authorize('GV'), layDanhSachHocVienChoXetDuyet);
router.post('/LayDanhSachHocVienKhoaHoc', protect, authorize('GV'), layDanhSachHocVienKhoaHoc);

router.post('/chotDon', protect, authorize('NV'), chotDonVaGhiDanh);

router.get('/lay-tat-ca-don-cho-duyet', protect, authorize('GV', 'NV'), layTatCaDonChoDuyet);
router.post('/duyet-va-ghi-danh', protect, authorize('GV', 'NV'), duyetVaGhiDanhTuVan);

export default router;