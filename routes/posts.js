const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const newPost = new Post({ description, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { comment } = req.body;
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
