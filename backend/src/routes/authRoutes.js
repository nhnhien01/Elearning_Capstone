import express from 'express';
import { dangKy } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/DangKy', dangKy);

export default authRouter;