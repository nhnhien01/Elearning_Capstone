import express from 'express';
import { layChiTietBuoiHocAdmin, capNhatBuoiHocAdmin } from '../controllers/sessionController.js';

const router = express.Router();

router.get('/chi-tiet-buoi-hoc/:maKhoaHoc', layChiTietBuoiHocAdmin);
router.post('/cap-nhat-buoi-hoc', capNhatBuoiHocAdmin);

export default router;