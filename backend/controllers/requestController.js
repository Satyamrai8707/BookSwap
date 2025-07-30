const Request = require('../models/Request');
const Book = require('../models/Book');

exports.createRequest = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot request your own book." });
    }

    const existingRequest = await Request.findOne({
      book: bookId,
      requester: req.user._id
    });

    if (existingRequest) {
      return res.status(400).json({ message: "You have already requested this book." });
    }

    const request = await Request.create({
      book: bookId,
      requester: req.user._id,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("Request creation error:", err);
    res.status(500).json({ message: "Error creating request" });
  }
};


exports.getMyRequests = async (req, res) => {
  const requests = await Request.find({ requester: req.user._id }).populate("book");
  res.json(requests);
};

exports.getRequestsOnMyBooks = async (req, res) => {
  const requests = await Request.find().populate({
    path: 'book',
    match: { owner: req.user._id },
    populate: { path: 'owner', select: 'name' }
  });
  res.json(requests.filter(r => r.book));
};

exports.updateStatus = async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(request);
};
