const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// @route GET /api/packages
// @desc Get all packages
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find({ isAvailable: true });
        res.json(packages);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route POST /api/packages
// @desc Create a package
router.post('/', async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create package', error: err.message });
    }
});

// @route DELETE /api/packages/:id
router.delete('/:id', async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ message: 'Package deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete package' });
    }
});

module.exports = router;
