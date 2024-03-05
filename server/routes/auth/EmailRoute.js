const express = require("express");
const router = express.Router();
const emailService = require('../../domain/services/EmailService');
const RegistrationLogic = require("../../domain/RegistrationLogic");

// Endpoint to handle email verification
router.post('/verify-email', async (req, res) => {
    try {
        const token = req.query.token;
        const email = req.query.email;

        // Call the logic method to verify the email and token
        await emailService.verifyEmailAndToken(email, token);

        console.log('Email verified successfully!, student: ' + email + " can now login")
        res.send(true);
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send('Internal server error.');
    }
});

// Endpoint to handle password reset
router.post('/verify-reset-password', async (req, res) => {
    try {
        console.log("Entered link");
        const token = req.query.token;
        const email = req.query.email;

        // Call the logic method to verify the email and token
        const isStudent = await emailService.verifyEmailForPassword(email, token);

        console.log('Email verified successfully!, user: ' + email + " can now change password")
        res.send(isStudent);
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send('Internal server error.');
    }
});

module.exports = router;