import express from 'express';
import { getAdmin, getAdminById, createAdmin, updateAdmin, deleteAdmin } from '../controllers/AdminControllers.js';
import { verifyUser, adminOnly } from '../middleware/Authentikasi.js';

const router = express.Router();

router.get("/admin", verifyUser, adminOnly, getAdmin);
router.get("/admin/:id", verifyUser, adminOnly, getAdminById);
router.post("/admin", verifyUser, adminOnly, createAdmin);
router.patch("/admin/:id", verifyUser, adminOnly, updateAdmin);
router.delete("/admin/:id", verifyUser, adminOnly, deleteAdmin);

export default router;
