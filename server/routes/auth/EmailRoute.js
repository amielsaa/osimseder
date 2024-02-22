const express = require("express");
const router = express.Router();
const emailService = require('../../domain/services/EmailService');

// Endpoint to handle email verification
router.get('/verify-email', async (req, res) => {
    const token = req.query.token;
    try {
        // Call a function from emailService to handle email verification
        await emailService.verifyEmail(token);
        res.send('Email verified successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to handle password reset
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        // Call a function from emailService to handle password reset
        const resetToken = await emailService.sendResetPasswordEmail(email);
        res.json({ message: 'Password reset email sent successfully.', resetToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;