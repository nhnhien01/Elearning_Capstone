import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/db.js'; 
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/QuanLyKhoaHoc', courseRoutes);
app.use('/api/QuanLyNguoiDung', userRoutes);
app.use('/api/QuanLyGhiDanh', enrollmentRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/QuanLyLoTrinh', sessionRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Kết nối thành công cổng: ${PORT}`);
});