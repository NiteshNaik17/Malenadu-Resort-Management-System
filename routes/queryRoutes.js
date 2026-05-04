const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

// Submit a new query
router.post('/', async (req, res) => {
    const { userId, subject, message } = req.body;
    try {
        if (!userId) throw new Error('User ID is required');
        const query = new Query({ userId, subject, message });
        await query.save();
        res.status(201).json(query);
    } catch (err) {
        console.error('Query Error:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Get all queries (for admin)
router.get('/', async (req, res) => {
    try {
        const queries = await Query.find().populate('userId', 'name email');
        res.json(queries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
