import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './configs/db.js';
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/uploads', express.static('D:\\Cybersoft\\Luna Academy\\backend\\uploads'));

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