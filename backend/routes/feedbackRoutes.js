const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Anyone logged in can submit feedback
router.post('/', verifyToken, feedbackController.submitFeedback);
// Only Admin can view all feedback
router.get('/', verifyToken, isAdmin, feedbackController.getAllFeedback);

module.exports = router;
