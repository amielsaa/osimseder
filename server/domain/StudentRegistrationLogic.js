// StudentRegistrationLogic.js
const Students = require('../models/studentModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class StudentRegistrationLogic {
    async registerStudent(studentData) {
        try {
            const existingStudent = await Students.findOne({
                where: { Email: studentData.email }
            });

            if (existingStudent) {
                throw new Error('There is an existing account with this email');
            }

            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(studentData.password, 10);

            const createdStudent = await Students.create({
                email: studentData.email,
                password: hashedPassword,
                lastName: studentData.lastName,
                firstName: studentData.firstName,
                phoneNumber: studentData.phoneNumber,
                gender: studentData.gender,
                parentName: studentData.parentName,
                parentPhoneNumber: studentData.parentPhoneNumber,
                parentEmail: studentData.parentEmail,
                city: studentData.city,
                school: studentData.school,
                issuesChoose: studentData.issuesChoose,
                issuesText: studentData.issuesText,
                languages: studentData.languages,
                isInGroup: '',
                didParentApprove: false,
                verificationToken: verificationToken
            });

            await EmailLogic.sendVerificationEmail(studentData.email, verificationToken);

            return createdStudent;
        } catch (error) {
            throw new Error('Failed to create student: ' + error);
        }
    }

    generateVerificationToken() {
        return crypto.randomBytes(20).toString('hex');
    }
}

module.exports = new StudentRegistrationLogic();
