import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
    hoTen: { type: String, required: true },
    soDT: { type: String, required: true },
    maKhoaHoc: { type: String, required: true, ref: 'Course' },
    trangThai: { 
        type: String, 
        enum: ['Moi', 'DangTuVan', 'DaChot'], 
        default: 'Moi' 
    },
    idNhanVien: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Consultation = mongoose.model('Consultation', consultationSchema);
export default Consultation;