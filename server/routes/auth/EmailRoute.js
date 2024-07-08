const express = require("express");
const router = express.Router();
const emailService = require('../../domain/services/EmailService');
const RegistrationLogic = require("../../domain/RegistrationLogic");

// Endpoint to handle email verification
router.post('/verify-email/:token/:encryptedEmail', async (req, res) => {
    try {
        const token = req.params.token;
        const encryptedEmail = req.params.encryptedEmail;

        // Call the logic method to verify the email and token
        const decryptedEmail = await emailService.verifyEmailAndToken(encryptedEmail, token);

        res.send(true);
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send('Internal server error.');
    }
});

// Endpoint to handle password reset
router.post('/verify_reset_password/:token/:encryptedEmail', async (req, res) => {
    try {
        const token = req.params.token;
        const encryptedEmail = req.params.encryptedEmail;

        // Call the logic method to verify the email and token
        const isStudent = await emailService.verifyEmailAndTokenForPassword(encryptedEmail, token);

        res.send(isStudent);
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send('Internal server error.');
    }
});

module.exports = router;