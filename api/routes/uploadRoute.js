const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post'); // Adjust the path as needed

// Configure multer for file upload
const upload = multer({
  dest: 'uploads/', // Temporary upload directory
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
});

// PDF upload route
router.post('/api/upload/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is authorized to upload (assuming req.user contains the logged-in user's info)
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to upload to this post' });
    }

    // Generate a unique filename
    const fileName = `${postId}-${Date.now()}${path.extname(req.file.originalname)}`;
    const filePath = path.join(__dirname, '../uploads', fileName);

    // Move the file from temp upload location to permanent location
    fs.renameSync(req.file.path, filePath);

    // Update the post with the PDF file information
    post.pdfFile = fileName;
    await post.save();

    res.status(200).json({ message: 'PDF uploaded successfully', fileName });
  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({ message: 'Error uploading PDF', error: error.message });
  }
});

module.exports = router;