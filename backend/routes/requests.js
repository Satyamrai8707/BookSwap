const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createRequest, getMyRequests, getRequestsOnMyBooks, updateStatus
} = require('../controllers/requestController');

router.post("/", protect, createRequest);
router.get("/my", protect, getMyRequests);
router.get("/incoming", protect, getRequestsOnMyBooks);
router.put("/:id/status", protect, updateStatus);

module.exports = router;
