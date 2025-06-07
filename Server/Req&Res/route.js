const express = require('express');
const router = express.Router();
const requestController = require('./controller');
const auth = require('../middlewares/authMiddleware');

router.post('/requests', auth, requestController.createRequest);
router.get('/requests/borrower', auth, requestController.getBorrowerRequests);
router.get('/requests/lender', auth, requestController.getNearbyRequestsForLender);
router.post('/requests/:requestId/respond', auth, requestController.respondToRequest);
router.get('/requests/:requestId/offers', auth, requestController.getOffersForRequest);
router.post('/requests/:requestId/accept', auth, requestController.acceptOffer);
router.post('/requests/:requestId/cancel', auth, requestController.cancelRequest);
router.get('/requests/:requestId', auth, requestController.getRequestDetails);

module.exports = router;
