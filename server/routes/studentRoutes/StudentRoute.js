// routes/StudentRoute.js
const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/authMiddleware');
const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('../domains/studentLogic');

// Create a new student (POST)
router.post('/add_student', validateToken, async (req, res) => {
    try {
        const student = await createStudent(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all students (GET)
router.get('/getStudents', validateToken, async (req, res) => {
    try {
        const students = await getStudents();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single student by ID (GET)
router.get('/getStudent/:id', validateToken, async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a student by ID (PUT)
router.put('/updateStudent/:id', validateToken, async (req, res) => {
    try {
        const student = await updateStudent(req.params.id, req.body);
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a student by ID (DELETE)
router.delete('/deleteStudent/:id', validateToken, async (req, res) => {
    try {
        const result = await deleteStudent(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;