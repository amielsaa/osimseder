// EmailLogic.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // Configuration for your email service provider (e.g., SMTP settings)
});

class EmailLogic {
    async sendVerificationEmail(email, token) {
        const verificationLink = `https://example.com/verify-email?token=${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email Address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`
        });
    }

    async sendResetPasswordEmail(email, token) {
        const resetLink = `https://example.com/reset-password?token=${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });
    }
}

module.exports = new EmailLogic();
