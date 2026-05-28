import express from 'express';
import multer from 'multer';
import { createPost, getFeed, getTrending, searchPosts, toggleLike, addComment } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 7 * 1024 * 1024 } });

router.get('/', getFeed);
router.get('/trending', getTrending);
router.get('/search', searchPosts);
router.post('/', protect, upload.single('image'), createPost);
router.put('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);

export default router;
