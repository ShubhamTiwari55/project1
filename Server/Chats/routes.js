const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const chatController = require('./controller');

router.get('/threads', authMiddleware, chatController.getThreads);
router.get('/threads/:threadId', authMiddleware, chatController.getThreadMessages);
router.post('/threads/:threadId/messages', authMiddleware, chatController.sendMessage);
router.post('/threads', authMiddleware, chatController.startThread);

module.exports = router;
