import express from 'express';
import {
  createFutureMessage,
  getAllFutureMessages,
  getFutureMessageById,
  updateFutureMessage,
  deleteFutureMessage,
  markAsOpened
} from '../controllers/futureMessageController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, adminOnly, createFutureMessage);
router.get('/', protect, getAllFutureMessages);
router.get('/:id', protect, getFutureMessageById);
router.put('/:id', protect, adminOnly, updateFutureMessage);
router.delete('/:id', protect, adminOnly, deleteFutureMessage);
router.patch('/:id/open', protect, markAsOpened);

export default router;