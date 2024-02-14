const express = require("express");
const router = express.Router();
const StaffRegistrationLogic = require('../../domain/StaffRegistrationLogic')
const { generateToken, validateToken } = require("../../utils/JsonWebToken");

// Endpoint to register a new staff
router.post('/v0/register_staff', async (req, res) => {
    const staffData = req.body;
    try {
        const createdStaff = await StaffRegistrationLogic.registerStaff(staffData);
        res.json(createdStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to log in a staff
router.post('/v0/login_staff', validateToken, async (req, res) => {
    const { email, password } = req.body;
    try {
        const loggedInStaff = await AuthenticationLogic.verifyLogin(email, password);
        res.json(loggedInStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Endpoint to initiate password reset
router.post('/v0/password/reset', async (req, res) => {
    const { email } = req.body;
    try {
        const resetToken = await StaffLogic.resetPassword(email);
        res.json({ message: 'Password reset email sent successfully.', resetToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to handle password reset
router.post('/v0/password/reset/confirm', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await StaffLogic.handleResetPassword(token, newPassword);
        res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;