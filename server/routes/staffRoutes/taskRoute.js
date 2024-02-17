const express = require('express');
const router = express.Router();
const { taskModel } = require('../models/taskModel'); // Import task model

// Create a new task (POST)
router.post('/', validateToken, async (req, res) => {
    try {
        const task = await taskModel.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all tasks (GET)
router.get('/', validateToken, async (req, res) => {
    try {
        const tasks = await taskModel.findAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single task by ID (GET)
router.get('/:id', validateToken, async (req, res) => {
    try {
        const task = await taskModel.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a task by ID (PUT)
router.put('/:id', validateToken, async (req, res) => {
    try {
        const task = await taskModel.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.json(task);
        } else {
            res.status(404).json({ message: 'task not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task by ID (DELETE)
router.delete('/:id', validateToken, async (req, res) => {
    try {
        const task = await taskModel.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.json({ message: 'task deleted' });
        } else {
            res.status(404).json({ message: 'task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;