const express = require("express");
const router = express.Router();
const studentRegistrationLogic = require('../../domain/StudentRegistrationLogic');
const loginLogic = require('../../domain/LoginLogic');
const { generateToken, validateToken } = require("../../utils/JsonWebToken");

// Endpoint to register a new student
router.post('/v0/register_student', async (req, res) => {
    const studentData = req.body;
    try {
        const createdStudent = await studentRegistrationLogic.registerStudent(studentData);
        res.json(createdStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to log in a student
router.post('/v0/login_student', async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedInStudent = await loginLogic.verifyLoginStudent(email, password);
        res.json(loggedInStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Endpoint to initiate password reset
router.post('/v0/password/reset', async (req, res) => {
    const { email } = req.body;
    try {
        const resetToken = await StudentLogic.resetPassword(email);
        res.json({ message: 'Password reset email sent successfully.', resetToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to handle password reset
router.post('/v0/password/reset/confirm', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await StudentLogic.handleResetPassword(token, newPassword);
        res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;