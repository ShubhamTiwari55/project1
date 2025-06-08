const express = require('express');
const router = express.Router();
const paymentController = require('./controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/payments/initiate', authMiddleware, paymentController.initiatePayment);
router.get('/payments/history', authMiddleware, paymentController.getPaymentHistory);
router.post('/payments/webhook', paymentController.handleWebhook);

module.exports = router;
