import express from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers, registerUser } from '../controllers/UsersControllers.js';
import { verifyUser, adminOnly, adminOrMaskapai } from '../middleware/Authentikasi.js';

const router = express.Router();

// Route publik untuk pendaftaran
router.post("/register", registerUser);

// Route yang memerlukan autentikasi
router.get("/", verifyUser, adminOrMaskapai, getUsers);
router.get("/:id", verifyUser, adminOnly, getUsersById);
router.post("/", verifyUser, adminOnly, createUsers);
router.patch("/:uuid", verifyUser, adminOnly, updateUsers);
router.delete("/:uuid", verifyUser, adminOnly, deleteUsers);

export default router;
