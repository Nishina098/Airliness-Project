import express from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers, registerUser } from '../controllers/UsersControllers.js';
import { verifyUser, adminOnly, adminOrMaskapai } from '../middleware/Authentikasi.js';

const router = express.Router();

// Route publik untuk pendaftaran
router.post("/register", registerUser);

// Route yang memerlukan autentikasi
router.get("/users", verifyUser, adminOrMaskapai, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUsersById);
router.post("/users", verifyUser, adminOnly, createUsers);
router.patch("/users/:uuid", verifyUser, adminOnly, updateUsers);
router.delete("/users/:uuid", verifyUser, adminOnly, deleteUsers);

export default router;
