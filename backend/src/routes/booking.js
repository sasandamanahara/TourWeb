const express = require('express');

const router = express.Router();
const BookingController = require('../controllers/booking');


router.post('/', BookingController.create)
router.get('/partner/:id', BookingController.getBookingsByPartner)
router.get('/tourist/:id', BookingController.getBookingsBytourist)


module.exports = router;