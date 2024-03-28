// EmailService.js
const nodemailer = require('nodemailer');
const { Students, Staffs } = require('../../models');
const argumentChecker = require('../utils/ArgumentChecker');
const { usersLogger } = require('../../utils/logger');

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

class EmailService {

    async sendVerificationEmail(email, token) {
        usersLogger.info("Intiating sending verification email to: " + email);
        argumentChecker.checkArguments([email, token], ["email", "token"]);

        const verificationLink = `https://localhost:3001/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
        console.log(verificationLink);
        await transporter.sendMail({
            to: email,
            subject: 'Verify Your Email Address',
            html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`
        });

        usersLogger.info("Successfully sent email to: " + email);
    }

    async verifyEmailAndToken(email, token) {
        try {
            usersLogger.info("Initiating verification of email (for verify register) and token for email: " + email);
            argumentChecker.checkArguments([email, token], ["email", "token"]);

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

            usersLogger.info("Successfully verified email and token for email: " + email);

        } catch (error) {
            console.error('Error verifying email and token:', error);
            throw new Error('Error verifying email and token.');
        }
    }


    async sendResetPasswordEmail(email, token) {
        usersLogger.info("Initiating sending reset password email to: " + email);
        argumentChecker.checkArguments([email, token], ["email", "token"]);

        const resetLink = `https://localhost:3001/verify-reset-password?token=${token}&email=${encodeURIComponent(email)}`;
        let isStudent = false;
        const student = await Students.findOne({
            where: { email: email }
        });
        if (!student) {
            const staff = await Staffs.findOne({
                where: { email: email }
            });
            if (!staff) {
                throw new Error('No user with this email');
            }
        } else {
            isStudent = true;
        }
        await transporter.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });

        usersLogger.info("Successfully sent email to: " + email);
        return isStudent;

    }
    async verifyEmailForPassword(email, token) {
        try {
            usersLogger.info("Initiating verification of email (to change password) and token for email: " + email);
            argumentChecker.checkArguments([email, token], ["email", "token"]);

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
                if (studentToken == null) {
                    throw new Error("Error: staff with mail: " + decoded_email + " has no token, meaning there's not any process that needs verification ")
                }
                if (staffToken == token) {
                    return isStudent;
                } else {
                    throw new Error('Error: Token saved for user is different from the one given here.');
                }
            }
            else {
                const isStudent = true;
                const studentToken = student.verificationToken;
                if (studentToken == null) {
                    throw new Error("Error: student in mail: " + decoded_email + " has no token, meaning there's not any process that needs verification ")
                }
                console.log("Entered Check");
                if (studentToken == token) {
                    return isStudent;
                } else {
                    throw new Error('Error: Token saved for user is different from the one given here.');
                }
            }
            usersLogger.info("Successfully verified email and token for email: " + email);

        } catch (error) {
            console.error('Error verifying email and token:', error);
            throw new Error('Error verifying email and token.');
        }
    }


}

module.exports = new EmailService();
