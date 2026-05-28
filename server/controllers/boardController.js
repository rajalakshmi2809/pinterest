import Board from '../models/Board.js';

export const createBoard = async (req, res) => {
  const { name, isPrivate } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Board name is required.' });
  }

  const board = await Board.create({
    name,
    user: req.user._id,
    isPrivate: !!isPrivate,
  });

  res.status(201).json(board);
};

export const getMyBoards = async (req, res) => {
  const boards = await Board.find({ user: req.user._id }).populate('savedPins');
  res.json(boards);
};

export const savePinToBoard = async (req, res) => {
  const { postId } = req.body;
  const board = await Board.findById(req.params.id);
  if (!board) {
    return res.status(404).json({ message: 'Board not found.' });
  }
  if (board.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to modify this board.' });
  }
  if (!board.savedPins.includes(postId)) {
    board.savedPins.push(postId);
    await board.save();
  }
  res.json(board);
};
