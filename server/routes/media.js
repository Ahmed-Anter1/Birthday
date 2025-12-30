import express from 'express';
import { uploadMedia, getAllMedia, deleteMedia, toggleVisibility } from '../controllers/mediaController.js';
import { protect, adminOnly, adminOrFriend } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', protect, adminOrFriend, upload.single('file'), uploadMedia);
router.get('/', protect, getAllMedia);
router.delete('/:id', protect, adminOnly, deleteMedia);
router.patch('/:id/visibility', protect, adminOnly, toggleVisibility);

export default router;