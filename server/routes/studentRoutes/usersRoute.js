const express = require("express");
const router = express.Router();
const StudentLogic = require('../../domain/studentDomain/StudentLogic')
const { generateToken, validateToken } = require("../../utils/JsonWebToken");

// Endpoint to register a new student
router.post('/register', validateToken, async (req, res) => {
    const studentData = req.body;
    try {
        const createdStudent = await StudentLogic.registerStudent(studentData);
        res.json(createdStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to log in a student
router.post('/login', validateToken, async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedInStudent = await StudentLogic.verifyLogin(email, password);
        res.json(loggedInStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch all students
router.get('/students', validateToken, async (req, res) => {
    try {
        const students = await StudentLogic.getStudents();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch a student by email
router.get('/student/:email', validateToken, async (req, res) => {
    const email = req.params.email;
    try {
        const student = await StudentLogic.getStudentByEmail(email);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to delete a student by id
router.delete('/student/:studentId', validateToken, async (req, res) => {
    const studentId = req.params.studentId;
    try {
        await StudentLogic.deleteStudent(studentId);
        res.json({ message: 'Student deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update a student by email
router.put('/student/:email', validateToken, async (req, res) => {
    const email = req.params.email;
    const updatedData = req.body;
    try {
        const updatedStudent = await StudentLogic.updateStudent(email, updatedData);
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to initiate password reset
router.post('/password/reset', async (req, res) => {
    const { email } = req.body;
    try {
        const resetToken = await StudentLogic.resetPassword(email);
        res.json({ message: 'Password reset email sent successfully.', resetToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to handle password reset
router.post('/password/reset/confirm', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await StudentLogic.handleResetPassword(token, newPassword);
        res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
