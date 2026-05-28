import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  savedPins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  isPrivate: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);
export default Board;
