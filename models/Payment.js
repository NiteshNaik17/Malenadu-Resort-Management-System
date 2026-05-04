const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
