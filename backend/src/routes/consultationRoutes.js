import express from 'express';
import { 
    guiYeuCauTuVan, 
    layDanhSachTuVan, 
    capNhatTrangThaiTuVan, 
    phanCongNhanVien, 
    layDanhSachNhanVien 
} from '../controllers/consultationController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/GuiTuVan', guiYeuCauTuVan);

router.get('/LayDanhSach', protect, authorize('GV', 'NV'), layDanhSachTuVan);

router.put('/CapNhat', protect, authorize('GV', 'NV'), capNhatTrangThaiTuVan);

router.put('/PhanCong', protect, authorize('GV'), phanCongNhanVien);

router.get('/LayDanhSachNV', protect, authorize('GV'), layDanhSachNhanVien);

export default router;