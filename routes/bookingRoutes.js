const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @route POST /api/bookings
router.post('/', async (req, res) => {
    const { userId, roomId, checkIn, checkOut, totalPrice } = req.body;
    try {
        const bookingId = Math.floor(100000 + Math.random() * 900000).toString();
        const booking = new Booking({ bookingId, userId, roomId, checkIn, checkOut, totalPrice });
        const savedBooking = await booking.save();
        
        // Update room status
        await Room.findByIdAndUpdate(roomId, { status: 'booked' });
        
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route GET /api/bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId', 'name email').populate('roomId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route DELETE /api/bookings/:id
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            await Room.findByIdAndUpdate(booking.roomId, { status: 'available' });
            await Booking.findByIdAndDelete(req.params.id);
            res.json({ message: 'Booking deleted' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
