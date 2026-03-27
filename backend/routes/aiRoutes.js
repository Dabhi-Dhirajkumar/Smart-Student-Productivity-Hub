const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/chat', verifyToken, aiController.getChatResponse);
router.post('/schedule', verifyToken, aiController.generateSchedule);
router.post('/priority', verifyToken, aiController.predictPriority);

module.exports = router;
