const express = require('express');
const router = express.Router();
const paymentController = require('./controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/initiate', authMiddleware, paymentController.initiatePayment);
router.get('/history', authMiddleware, paymentController.getPaymentHistory);
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
