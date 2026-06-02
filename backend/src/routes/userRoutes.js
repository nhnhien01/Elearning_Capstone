import express from 'express';
import multer from 'multer';
import { 
    dangKy, dangNhap, layDanhSachLoaiNguoiDung, layDanhSachNguoiDung, 
    layDanhSachNguoiDungPhanTrang, timKiemNguoiDung, thongTinTaiKhoan, 
    thongTinNguoiDung, themNguoiDung, xoaNguoiDung, 
    uploadAvatar, updateProfile, uploadCV
} from '../controllers/userController.js';
import { 
    duyetVaGhiDanhTuVan 
} from '../controllers/enrollmentController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/DangKy', dangKy);
router.post('/DangNhap', dangNhap);
router.get('/LayDanhSachLoaiNguoiDung', layDanhSachLoaiNguoiDung);
router.get('/LayDanhSachNguoiDung', protect, authorize('GV', 'NV'), layDanhSachNguoiDung);
router.get('/LayDanhSachNguoiDung_PhanTrang', protect, authorize('GV', 'NV'), layDanhSachNguoiDungPhanTrang);
router.get('/TimKiemNguoiDung', protect, authorize('GV', 'NV'), timKiemNguoiDung);
router.post('/ThemNguoiDung', themNguoiDung);
router.post('/ThongTinNguoiDung', protect, authorize('GV', 'NV'), thongTinNguoiDung);
router.delete('/XoaNguoiDung', protect, authorize('GV', 'NV'), xoaNguoiDung);
router.post('/ThongTinTaiKhoan', protect, thongTinTaiKhoan);
router.put('/CapNhatThongTinNguoiDung_Full', protect, updateProfile);
router.post('/UploadAvatar', protect, upload.single('avatar'), uploadAvatar);
router.post('/UploadCV', protect, upload.single('cv'), uploadCV);

router.post('/them-nguoi-dung-moi', themNguoiDung); 
router.post('/duyet-va-ghi-danh-tu-van', duyetVaGhiDanhTuVan);

export default router;