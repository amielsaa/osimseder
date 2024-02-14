// StudentRegistrationLogic.js
const { Students } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


class StudentRegistrationLogic {
    async registerStudent(studentData) {
        try {
            this.validateInput(studentData);

            const verificationToken = this.generateVerificationToken();
            console.log("Called Register - 2")

            const hashedPassword = await bcrypt.hash(studentData.password, 10);
            console.log("Called Register - 3")

            const createdStudent = await Students.create({
                "Email": studentData.email,
                "Password": hashedPassword,
                "LastName": studentData.lastName,
                "FirstName": studentData.firstName,
                "PhoneNumber": studentData.phoneNumber,
                "Gender": studentData.gender,
                "ParentName": studentData.parentName,
                "ParentPhoneNumber": studentData.parentPhoneNumber,
                "ParentEmail": studentData.parentEmail,
                "City": studentData.city,
                "School": studentData.school,
                "IssuesChoose": studentData.issuesChoose,
                "IssuesText": studentData.issuesText,
                "Languages": studentData.languages,
                "IsInGroup": '',
                "DidParentApprove": false,
                "VerificationToken": verificationToken
            });
            console.log("Called Register - 4")

            await EmailLogic.sendVerificationEmail(studentData.email, verificationToken);

            return createdStudent;
        } catch (error) {
            throw new Error('Failed to create student: ' + error);
        }
    }

    validateInput(studentData) {
        if (!this.isValidEmail(studentData.email)) {
            throw new Error('Invalid email format');
        }

        const student = Students.findOne({
            where: { "Email": studentData.email }
        });
        if (!student) {
            throw new Error('A student with this email already exists');
        }

        if (!this.isValidPassword(studentData.password)) {
            throw new Error('Password must be at least 8 characters long and contain both letters and numbers');
        }

        if (!this.isValidPhoneNumber(studentData.phoneNumber)) {
            throw new Error('Phone number must be 10 digits starting with 05');
        }
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
