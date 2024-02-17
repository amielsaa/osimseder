const express = require('express');
const router = express.Router();
const { taskGearList } = require('../models')(); // Import taskGearList model

// Create a new taskGearList (POST)
router.post('/', validateToken, async (req, res) => {
    try {
        const taskGearList = await taskGearList.create(req.body);
        res.status(201).json(taskGearList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all taskGearLists (GET)
router.get('/', validateToken, async (req, res) => {
    try {
        const taskGearLists = await taskGearList.findAll();
        res.json(taskGearLists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single taskGearList by ID (GET)
router.get('/:id', validateToken, async (req, res) => {
    try {
        const taskGearList = await taskGearList.findByPk(req.params.id);
        if (taskGearList) {
            res.json(taskGearList);
        } else {
            res.status(404).json({ message: 'taskGearList not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a taskGearList by ID (PUT)
router.put('/:id', validateToken, async (req, res) => {
    try {
        const taskGearList = await taskGearList.findByPk(req.params.id);
        if (taskGearList) {
            await taskGearList.update(req.body);
            res.json(taskGearList);
        } else {
            res.status(404).json({ message: 'taskGearList not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a taskGearList by ID (DELETE)
router.delete('/:id', validateToken, async (req, res) => {
    try {
        const taskGearList = await taskGearList.findByPk(req.params.id);
        if (taskGearList) {
            await taskGearList.destroy();
            res.json({ message: 'taskGearList deleted' });
        } else {
            res.status(404).json({ message: 'taskGearList not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;