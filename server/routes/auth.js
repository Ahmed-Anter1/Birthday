import express from 'express';
import { login, updateCredentials, toggleFriendMode, getMe } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/credentials', protect, adminOnly, updateCredentials);
router.post('/toggle-friend-mode', protect, adminOnly, toggleFriendMode);

export default router;