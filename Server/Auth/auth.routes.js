const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/me', authMiddleware, controller.getProfile);
router.put('/me', authMiddleware, controller.updateProfile);

module.exports = router;
