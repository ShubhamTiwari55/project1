const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const chatController = require('./controller');

router.get('/chat/threads', authMiddleware, chatController.getThreads);
router.get('/chat/threads/:threadId', authMiddleware, chatController.getThreadMessages);
router.post('/chat/threads/:threadId/messages', authMiddleware, chatController.sendMessage);
router.post('/chat/threads', authMiddleware, chatController.startThread);

module.exports = router;
