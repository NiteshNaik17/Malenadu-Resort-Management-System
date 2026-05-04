const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// @route POST /api/payments
router.post('/', async (req, res) => {
    const { bookingId, amount, paymentMethod } = req.body;
    try {
        const payment = new Payment({ bookingId, amount, paymentMethod });
        const savedPayment = await payment.save();
        res.status(201).json(savedPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route GET /api/payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate('bookingId');
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
