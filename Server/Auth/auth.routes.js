const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const parser = require('../middlewares/upload');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/me', authMiddleware, controller.getProfile);
router.put('/me', authMiddleware, parser.single('profilePic'), controller.updateProfile);
router.get('/verify-email', controller.verifyEmail);

module.exports = router;
