import express from 'express';
import { getTransaksi, getTransaksiById, createTransaksi, updateTransaksi, deleteTransaksi, uploadBuktiPembayaran, getRiwayatTransaksi, getRiwayatTransaksiMaskapai } from '../controllers/TransaksiControllers.js';
import { verifyUser, adminOnly, maskapaiOnly } from '../middleware/Authentikasi.js';

const router = express.Router();

// Route untuk transaksi user
router.get("/transaksi", verifyUser, getTransaksi);
router.get("/transaksi/:id", verifyUser, getTransaksiById);
router.post("/transaksi", verifyUser, createTransaksi);
router.patch("/transaksi/:id", verifyUser, updateTransaksi);
router.delete("/transaksi/:id", verifyUser, deleteTransaksi);
router.post("/transaksi/upload-bukti/:id", verifyUser, uploadBuktiPembayaran);

// // Route untuk admin
// router.get("/admin/transaksi", verifyUser, adminOnly, getTransaksiAdmin);
router.get("/transaksi/riwayat", verifyUser, adminOnly, getRiwayatTransaksi);

// Route untuk maskapai
router.get("/transaksi/maskapai/riwayat", verifyUser, maskapaiOnly, getRiwayatTransaksiMaskapai);

export default router;
