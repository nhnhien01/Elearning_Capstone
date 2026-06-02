import Consultation from '../models/consultationModel.js';
import User from '../models/userModel.js';

export const guiYeuCauTuVan = async (req, res) => {
    try {
        const { hoTen, soDT, maKhoaHoc } = req.body;
        const newConsultation = new Consultation({ hoTen, soDT, maKhoaHoc, trangThai: "Moi" });
        await newConsultation.save();
        res.status(201).json({ message: 'Thành công' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachTuVan = async (req, res) => {
    try {
        const list = await Consultation.find().sort({ createdAt: -1 });
        res.status(200).json(list);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const capNhatTrangThaiTuVan = async (req, res) => {
    try {
        const { id, trangThai } = req.body;
        const updated = await Consultation.findByIdAndUpdate(
            id, 
            { trangThai }, 
            { returnDocument: 'after' }
        );
        if (!updated) return res.status(404).json({ message: "Không tìm thấy" });
        res.status(200).json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const phanCongNhanVien = async (req, res) => {
    try {
        const { id, idNhanVien } = req.body;
        const updated = await Consultation.findByIdAndUpdate(
            id, 
            { idNhanVien: idNhanVien, trangThai: "DangTuVan" }, 
            { returnDocument: 'after' }
        );
        if (!updated) return res.status(404).json({ message: "Không tìm thấy" });
        res.status(200).json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const layDanhSachNhanVien = async (req, res) => {
    try {
        const staffs = await User.find({ maLoaiNguoiDung: "NV" }).select("hoTen _id");
        res.status(200).json(staffs);
    } catch (err) { res.status(500).json({ error: err.message }); }
};