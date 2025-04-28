import express from 'express';
import { getMaskapai, getMaskapaiById, createMaskapai, updateMaskapai, deleteMaskapai } from '../controllers/MaskapaiControllers.js';
import { verifyUser, adminOrMaskapai } from '../middleware/Authentikasi.js';

const router = express.Router();

router.get("/maskapai", verifyUser, adminOrMaskapai, getMaskapai);
router.get("/maskapai/:id", verifyUser, adminOrMaskapai, getMaskapaiById);
router.post("/maskapai", verifyUser, adminOrMaskapai, createMaskapai);
router.patch("/maskapai/:id", verifyUser, adminOrMaskapai, updateMaskapai);
router.delete("/maskapai/:id", verifyUser, adminOrMaskapai, deleteMaskapai);

export default router;