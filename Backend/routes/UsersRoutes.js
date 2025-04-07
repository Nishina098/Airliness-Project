import express from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from '../controllers/UsersControllers.js';
import { verifyUser, adminOnly, adminOrMaskapai } from '../middleware/Authentikasi.js';

const router = express.Router();

router.get("/users", verifyUser, adminOrMaskapai, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUsersById);
router.post("/users", verifyUser, adminOnly, createUsers);
router.patch("/users/:id", verifyUser, adminOnly, updateUsers);
router.delete("/users/:id", verifyUser, adminOnly, deleteUsers);

export default router;
