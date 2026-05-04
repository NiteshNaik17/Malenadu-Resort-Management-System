const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['Breakfast', 'Lunch', 'Dinner', 'Beverages', 'Desserts', 'Other'] },
    isAvailable: { type: Boolean, default: true },
    foodType: { type: String, enum: ['Veg', 'Non-Veg'], default: 'Veg' },
    imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
