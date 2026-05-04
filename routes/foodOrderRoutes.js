const express = require('express');
const router = express.Router();
const FoodOrder = require('../models/FoodOrder');

// @route POST /api/food-orders
// @desc Create a new food order
// @access Logged In Users
router.post('/', async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;
        const orderId = Math.floor(100000 + Math.random() * 900000).toString();
        const newOrder = new FoodOrder({ orderId, userId, items, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create order', error: err.message });
    }
});

// @route GET /api/food-orders/user/:userId
// @desc Get orders for a specific user
// @access Logged In Users
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await FoodOrder.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route GET /api/food-orders
// @desc Get all orders
// @access Admin
router.get('/', async (req, res) => {
    try {
        const orders = await FoodOrder.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route PUT /api/food-orders/:id/status
// @desc Update order status
// @access Admin
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await FoodOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update status' });
    }
});

module.exports = router;
