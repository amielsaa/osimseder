const express = require('express');
const router = express.Router();
const { StaffModel } = require('../models/HouseModel'); // Import house model

// Create a new house (POST)
router.post('/', validateToken, async (req, res) => {
    try {
        const house = await houseModel.create(req.body);
        res.status(201).json(house);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all houses (GET)
router.get('/', validateToken, async (req, res) => {
    try {
        const houses = await houseModel.findAll();
        res.json(houses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single house by ID (GET)
router.get('/:id', validateToken, async (req, res) => {
    try {
        const house = await houseModel.findByPk(req.params.id);
        if (house) {
            res.json(house);
        } else {
            res.status(404).json({ message: 'house not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a house by ID (PUT)
router.put('/:id', validateToken, async (req, res) => {
    try {
        const house = await houseModel.findByPk(req.params.id);
        if (house) {
            await house.update(req.body);
            res.json(house);
        } else {
            res.status(404).json({ message: 'house not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a house by ID (DELETE)
router.delete('/:id', validateToken, async (req, res) => {
    try {
        const house = await houseModel.findByPk(req.params.id);
        if (house) {
            await house.destroy();
            res.json({ message: 'house deleted' });
        } else {
            res.status(404).json({ message: 'house not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;