const multer = require('multer');
const path = require('path');

// Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter (optional: restrict file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg','image/webp'];
  cb(null, allowedTypes.includes(file.mimetype));
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
