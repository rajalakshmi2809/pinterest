import cloudinary from '../config/cloudinary.js';
import Post from '../models/Post.js';

const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'visionboard/posts', resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const createPost = async (req, res) => {
  const { title, description, tags, category } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'Image file is required.' });
  }

  const imageUrl = await uploadImageToCloudinary(file.buffer);
  const tagArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];

  const post = await Post.create({
    imageUrl,
    title,
    description,
    tags: tagArray,
    category,
    createdBy: req.user._id,
  });

  res.status(201).json(post);
};

export const getFeed = async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate('createdBy', 'username avatar bio');
  res.json(posts);
};

export const getTrending = async (req, res) => {
  const posts = await Post.find({})
    .sort({ likes: -1, createdAt: -1 })
    .limit(20)
    .populate('createdBy', 'username avatar');
  res.json(posts);
};

export const searchPosts = async (req, res) => {
  const { q, category, tag } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }
  if (tag) {
    filter.tags = tag;
  }
  if (q) {
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') },
      { tags: new RegExp(q, 'i') },
    ];
  }

  const posts = await Post.find(filter).populate('createdBy', 'username avatar');
  res.json(posts);
};

export const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  const userId = req.user._id;
  const hasLiked = post.likes.includes(userId);
  if (hasLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  await post.save();
  res.json(post);
};

export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  post.comments.push({ user: req.user._id, text: req.body.text });
  await post.save();
  res.json(post);
};
