// StudentRegistrationLogic.js
const { Students } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailService = require('./services/emailService')


class StudentRegistrationLogic {
    async registerStudent(studentData) {
        try {
            await this.validateInput(studentData);

            const verificationToken = this.generateVerificationToken();
            console.log("Called Register - 2")

            const hashedPassword = await bcrypt.hash(studentData.password, 10);
            console.log("Called Register - 3")

            const createdStudent = await Students.create({
                "email": studentData.email,
                "password": hashedPassword,
                "lastName": studentData.lastName,
                "firstName": studentData.firstName,
                "phoneNumber": studentData.phoneNumber,
                "gender": studentData.gender,
                "parentName": studentData.parentName,
                "parentPhoneNumber": studentData.parentPhoneNumber,
                "parentEmail": studentData.parentEmail,
                "city": studentData.city,
                "school": studentData.school,
                "issuesChoose": studentData.issuesChoose,
                "issuesText": studentData.issuesText,
                "languages": studentData.languages,
                "isInGroup": '',
                "didParentApprove": false,
                "verificationToken": verificationToken
            });
            console.log("Called Register - 4")

            await emailService.sendVerificationEmail(studentData.email, verificationToken);

            return createdStudent;
        } catch (error) {
            throw new Error('Failed to create student: ' + error);
        }
    }

    async validateInput(studentData) {
        console.log("Called Register - 4")

        if (!this.isValidEmail(studentData.email)) {
            throw new Error('Invalid email format');
        }
        console.log("Called Register - 5")

        const student = await Students.findOne({
            where: { "email": studentData.email },
            logging: console.log // Add this line to log the generated SQL query
        });
        console.log("Called Register - 6")

        if (student) {
            throw new Error('A student with this email already exists');
        }
        console.log("Called Register - 7")

        if (!this.isValidPassword(studentData.password)) {
            throw new Error('Password must be at least 8 characters long and contain both letters and numbers');
        }
        console.log("Called Register - 8")

        if (!this.isValidPhoneNumber(studentData.phoneNumber)) {
            throw new Error('Phone number must be 10 digits starting with 05');
        }
        console.log("Called Register - 9")

        // TODO YOAV : necessary? checking if enums are valid, etc.
    }

    isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    isValidPassword(password) {
        // Password must be at least 8 characters long and contain both letters and numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);

    }

    isValidPhoneNumber(phoneNumber) {
        // Phone number must have 10 digits
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }


    generateVerificationToken() {
        return crypto.randomBytes(20).toString('hex');
    }
}

module.exports = new StudentRegistrationLogic();
