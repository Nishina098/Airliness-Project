import express from 'express';
import { Login, Logout, Me, refreshToken, getSession } from '../controllers/AuthControllers.js';
import { verifyUser } from '../middleware/Authentikasi.js';

const router = express.Router();

router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/me', verifyUser, Me);
router.get('/token', refreshToken);
router.get('/session', verifyUser, getSession);

export default router; 