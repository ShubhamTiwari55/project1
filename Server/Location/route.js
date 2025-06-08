const express = require('express');
const router = express.Router();
const locationController = require('../Location/controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/nearby-requests', authMiddleware, locationController.getNearbyRequests);

module.exports = router;
