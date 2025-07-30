const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { createBook, getBooks, getMyBooks } = require('../controllers/bookController');

// Route to create a book with image upload
router.post("/", protect, upload.single("image"), createBook);

// Route to get all books
router.get("/", getBooks);

// Route to get books added by logged-in user
router.get("/my", protect, getMyBooks);

module.exports = router;
