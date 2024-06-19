const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  description: String,
  imageUrl: String,
  likes: { type: Number, default: 0 },
  comments: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
