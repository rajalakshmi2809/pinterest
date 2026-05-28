import express from 'express';
import { createBoard, getMyBoards, savePinToBoard } from '../controllers/boardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getMyBoards);
router.post('/', createBoard);
router.put('/:id/save', savePinToBoard);

export default router;
