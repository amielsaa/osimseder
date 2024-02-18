// EmailLogic.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'udiosimseder@gmail.com',
        pass: '1qw23eR$'
    }
});

class EmailLogic {
    async verifyEmail(token) {
        // Perform verification logic here
        // For example, update the user's status in the database to indicate that their email is verified
    }

    async sendResetPasswordEmail(email) {
        const resetToken = generateResetToken(); // Generate a unique reset token
        // Send the password reset email
        const resetLink = `https://yourwebsite.com/reset-password?token=${resetToken}`;
        await transporter.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });
        return resetToken; // Return the reset token for further processing if needed
    }

    async sendVerificationEmail(email, token) {
        const verificationLink = `https://localhost:3001/verify-email?token=${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email Address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`
        });
    }

    async sendResetPasswordEmail(email, token) {
        const resetLink = `https://localhost:3001/reset-password?token=${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });
    }
}

module.exports = new EmailLogic();
