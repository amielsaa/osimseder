// routes/students.js
const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const authMiddleware = require('../middleware/auth'); // Authentication middleware
const authorize = require('../middleware/authorize'); // Authorization middleware

// Create a new student (POST)
router.post('/', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all students (GET)
router.get('/', authMiddleware, authorize(['admin', 'teacher']), async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single student by ID (GET)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a student by ID (PUT)
router.put('/:id', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            await student.update(req.body);
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a student by ID (DELETE)
router.delete('/:id', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            await student.destroy();
            res.json({ message: 'Student deleted' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;