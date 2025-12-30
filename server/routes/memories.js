import express from 'express';
import uploadMemory from '../middleware/uploadMemory.js';
import {
  createMemory,
  getAllMemories,
  getMemoryById,
  updateMemory,
  deleteMemory
} from '../controllers/memoryController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/',
  protect,
  adminOnly,
  uploadMemory.single('image'),
  createMemory
);

router.get('/', protect, getAllMemories);
router.get('/:id', protect, getMemoryById);
router.put('/:id', protect, adminOnly, updateMemory);
router.delete('/:id', protect, adminOnly, deleteMemory);

export default router;
