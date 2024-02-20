const express = require('express');
const router = express.Router();
const { houseTasks } = require('../models/housesTasksModel')(); // Import houseTasks model

// Create a new houseTasks (POST)
router.post('/', validateToken, async (req, res) => {
    try {
        const houseTasks = await houseTasks.create(req.body);
        res.status(201).json(houseTasks);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all houseTaskss (GET)
router.get('/', validateToken, async (req, res) => {
    try {
        const houseTaskss = await houseTasks.findAll();
        res.json(houseTaskss);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single houseTasks by ID (GET)
router.get('/:id', validateToken, async (req, res) => {
    try {
        const houseTasks = await houseTasks.findByPk(req.params.id);
        if (houseTasks) {
            res.json(houseTasks);
        } else {
            res.status(404).json({ message: 'houseTasks not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a houseTasks by ID (PUT)
router.put('/:id', validateToken, async (req, res) => {
    try {
        const houseTasks = await houseTasks.findByPk(req.params.id);
        if (houseTasks) {
            await houseTasks.update(req.body);
            res.json(houseTasks);
        } else {
            res.status(404).json({ message: 'houseTasks not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a houseTasks by ID (DELETE)
router.delete('/:id', validateToken, async (req, res) => {
    try {
        const houseTasks = await houseTasks.findByPk(req.params.id);
        if (houseTasks) {
            await houseTasks.destroy();
            res.json({ message: 'houseTasks deleted' });
        } else {
            res.status(404).json({ message: 'houseTasks not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;