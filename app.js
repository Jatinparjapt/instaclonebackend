const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const postRoutes = require('./routes/posts');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error', error);
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/posts', postRoutes);

module.exports = app;
