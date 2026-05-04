const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// @route GET /api/rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route POST /api/rooms
router.post('/', async (req, res) => {
    const { roomNumber, roomType, price } = req.body;
    try {
        const room = new Room({ roomNumber, roomType, price });
        const savedRoom = await room.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route PUT /api/rooms/:id
router.put('/:id', async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route DELETE /api/rooms/:id
router.delete('/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
