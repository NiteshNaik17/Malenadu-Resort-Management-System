const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomType: { type: String, required: true }, // e.g., Single, Double, Suite
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'booked', 'maintenance'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
