const Book = require('../models/Book');
const path = require('path');

exports.createBook = async (req, res) => {
  try {
    const { title, author, condition } = req.body;

    if (!title || !author || !condition) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const book = await Book.create({
      title,
      author,
      condition,
      owner: req.user._id,
      image: imageUrl
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Book creation error:", err);
    res.status(500).json({ message: "Error creating book" });
  }
};

exports.getBooks = async (req, res) => {
  const books = await Book.find().populate("owner", "name");
  res.json(books);
};

exports.getMyBooks = async (req, res) => {
  const books = await Book.find({ owner: req.user._id });
  res.json(books);
};
