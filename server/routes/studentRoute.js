const express = require('express');
const router = express.Router();
const { studentModel } = require('../models/studentModel'); // Import Student model

// Create a new student (POST)
router.post('/stundets/addStudent', validateToken, async (req, res) => {
    try {
        const student = await studentModel.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all students (GET)
router.get('/students/getStudents', validateToken, async (req, res) => {
    try {
        const students = await studentModel.findAll();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single student by ID (GET)
router.get('/student/getStudent/:id', validateToken, async (req, res) => {
    try {
        const student = await studentModel.findByPk(req.params.id);
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
router.put('/:id', validateToken, async (req, res) => {
    try {
        const student = await studentModel.findByPk(req.params.id);
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
router.delete('/:id', validateToken, async (req, res) => {
    try {
        const student = await studentModel.findByPk(req.params.id);
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