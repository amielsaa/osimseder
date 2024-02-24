// EmailLogic.js
const nodemailer = require('nodemailer');
const { Students, Staffs } = require('../../models');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'udiosimseder@gmail.com',
        pass: 'svcbwsgdppqnyazf'
    },
    tls: {
        rejectUnauthorized: false
    }
});

class EmailLogic {

    async sendVerificationEmail(email, token) {
        const verificationLink = `https://localhost:3001/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
        console.log(verificationLink);
        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email Address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`
        });
    }

    async verifyEmailAndToken(email, token) {
        try {
            // Decrypt the email here
            const decoded_email = decodeURIComponent(email);
            const student = await Students.findOne({
                where: { email: decoded_email }
            });
            if (!student) {
                const staff = await Staffs.findOne({
                    where: { email: decoded_email }
                });
                if (!staff) {
                    throw new Error('No user with this email');
                }
                const isStudent = false;
                const staffToken = staff.verificationToken;
                console.log(token)
                console.log(staffToken)
                if (studentToken == null) {
                    throw new Error("Error: staff with mail: " + decoded_email + " has no token, meaning there's not any process that needs verification ")
                }
                if (staffToken == token) {
                    await staff.update({ isVerified: true, verificationToken: null });
                    return isStudent;
                } else {
                    throw new Error('Error: Token saved for user is different from the one given here.');
                }
            }
            else {
                const isStudent = true;
                const studentToken = student.verificationToken;
                console.log(token)
                console.log(studentToken)
                if (studentToken == null) {
                    throw new Error("Error: student in mail: " + decoded_email + " has no token, meaning there's not any process that needs verification ")
                }
                if (studentToken == token) {
                    await student.update({ isVerified: true, verificationToken: null });
                    return isStudent;
                } else {
                    throw new Error('Error: Token saved for user is different from the one given here.');
                }
            }

        } catch (error) {
            console.error('Error verifying email and token:', error);
            throw new Error('Error verifying email and token.');
        }
    }


    async sendResetPasswordEmail(email, token) {
        const resetLink = `https://localhost:3001/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

        await transporter.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });
    }
}

module.exports = new EmailLogic();
