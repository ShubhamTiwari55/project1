const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ratingController = require('./controller');

router.post('/', authMiddleware, ratingController.submitRating);
router.get('/:userId', authMiddleware, ratingController.getUserRatings);
router.put('/:ratingId', authMiddleware, ratingController.editRating);
router.get('/mySubmitted', authMiddleware, ratingController.getMySubmittedRatings);

module.exports = router;
