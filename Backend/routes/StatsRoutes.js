import express from 'express';
import { getStats } from '../controllers/StatsController.js';
import { verifyUser, adminOnly } from '../middleware/Authentikasi.js';

const router = express.Router();

// Route untuk mendapatkan statistik (hanya admin yang bisa mengakses)
router.get('/', verifyUser, adminOnly, getStats);

export default router; 