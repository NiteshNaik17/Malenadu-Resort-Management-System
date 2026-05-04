const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// @route GET /api/foods
// @desc Get all food items
// @access Public
router.get('/', async (req, res) => {
    try {
        const foods = await FoodItem.find({});
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route POST /api/foods
// @desc Create a food item
// @access Admin
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, foodType } = req.body;
        const newFood = new FoodItem({ name, description, price, category, imageUrl, foodType });
        await newFood.save();
        res.status(201).json(newFood);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create food item', error: err.message });
    }
});

// @route PUT /api/foods/:id
// @desc Update a food item
// @access Admin
router.put('/:id', async (req, res) => {
    try {
        const updatedFood = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFood);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update food item' });
    }
});

// @route DELETE /api/foods/:id
// @desc Delete a food item
// @access Admin
router.delete('/:id', async (req, res) => {
    try {
        await FoodItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Food item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete food item' });
    }
});

module.exports = router;
