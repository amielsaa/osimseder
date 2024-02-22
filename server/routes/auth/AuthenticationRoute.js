const express = require("express");
const router = express.Router();
const studentRegistrationLogic = require('../../domain/RegistrationLogic');
const loginLogic = require('../../domain/LoginLogic');
const { generateToken, validateToken } = require("../../utils/JsonWebToken");
const {accessGroup, validateAccess} = require('../../utils/Accesses');
// Endpoint to register a new student
router.post('/register_student', async (req, res) => {
    console.log("bla");
    const studentData = req.body;
    try {
        const createdStudent = await studentRegistrationLogic.registerStudent(studentData);
        res.json(createdStudent);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Endpoint to log in a student
router.post('/login_student', async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedInStudent = await loginLogic.verifyLoginStudent(email, password);
        res.json(loggedInStudent);
    } catch (error) {
        
        res.json({ error: error.message });
    }
});
// Endpoint to update user session
router.get('/update_user_session', validateToken, async (req, res) => {
    try{
        const token = req.header("accessToken");
        const student = await loginLogic.verifyToken(token);
        res.json(student);
    } catch(error) {
        res.json({ error: error.message });
    }
});

// Endpoint to register a new staff
router.post('/register_staff', async (req, res) => {
    const staffData = req.body;
    try {
        const createdStaff = await StaffRegistrationLogic.registerStaff(staffData);
        res.json(createdStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to log in a staff
router.post('/login_staff', validateToken, async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedInStaff = await AuthenticationLogic.verifyLogin(email, password);
        res.json(loggedInStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// FROM NOW
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