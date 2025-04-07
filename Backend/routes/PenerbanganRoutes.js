import express from 'express';
import { getPenerbangan, getPenerbanganById, createPenerbangan, updatePenerbangan, deletePenerbangan } from '../controllers/PenerbanganControllers.js';
import { verifyUser, adminOrMaskapai } from '../middleware/Authentikasi.js';

const router = express.Router();

// Routes yang bisa diakses admin dan maskapai
router.get("/penerbangan", getPenerbangan);
router.get("/penerbangan/:id", getPenerbanganById);

// Routes khusus maskapai (untuk mengelola penerbangan mereka sendiri)
router.post("/penerbangan", verifyUser, adminOrMaskapai, createPenerbangan);
router.patch("/penerbangan/:id", verifyUser, adminOrMaskapai, updatePenerbangan);
router.delete("/penerbangan/:id", verifyUser, adminOrMaskapai, deletePenerbangan);

export default router;
