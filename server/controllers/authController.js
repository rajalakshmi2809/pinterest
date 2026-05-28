import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already used.' });
  }

  const user = await User.create({ username, email, password });
  if (user) {
    return res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      token: generateToken(user._id),
    });
  }

  res.status(500).json({ message: 'Unable to create user.' });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      token: generateToken(user._id),
    });
  }

  res.status(401).json({ message: 'Invalid credentials.' });
};

export const getProfile = async (req, res) => {
  const user = req.user;
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  const { username, bio, avatar } = req.body;
  if (username) user.username = username;
  if (bio) user.bio = bio;
  if (avatar) user.avatar = avatar;
  await user.save();
  res.json(user);
};
