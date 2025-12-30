import express from 'express';
import { createMessage, getAllMessages, updateMessage, deleteMessage } from '../controllers/messageController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, adminOnly, createMessage);
router.get('/', protect, getAllMessages);
router.put('/:id', protect, adminOnly, updateMessage);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;