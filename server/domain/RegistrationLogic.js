// StudentRegistrationLogic.js
const { Students } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailService = require('./services/EmailService')


class RegistrationLogic {
    async registerStudent(studentData) {
        try {
            //await this.validateInput(studentData);

            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(studentData.password, 10);
            
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
                "schoolId": studentData.school,
                "issuesChoose": studentData.issuesChoose,
                "issuesText": studentData.issuesText,
                "languages": studentData.languages,
                "didParentApprove": false,
                "verificationToken": verificationToken
            });

            //await emailService.sendVerificationEmail(studentData.email, verificationToken);

            return createdStudent;
        } catch (error) {
            throw new Error('Failed to create student: ' + error);
        }
    }

    async registerStaff(staffData) {
        try {
            //await this.validateInput(studentData);

            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(staffData.password, 10);

            const createdStudent = await Students.create({
                "email": staffData.email,
                "password": hashedPassword,
                "lastName": staffData.lastName,
                "firstName": staffData.firstName,
                "phoneNumber": staffData.phoneNumber,
                "gender": staffData.gender,
                "city": staffData.city,
                "access": staffData.access,
                "isInGroup": '',
                "verificationToken": verificationToken
            });

            //await emailService.sendVerificationEmail(staffData.email, verificationToken);

            return createdStudent;
        } catch (error) {
            throw new Error('Failed to create student: ' + error);
        }
    }

//    async validateInput(studentData) {
//        
//        const student = await Students.findOne({
//            where: { "email": studentData.email },
//            logging: console.log // Add this line to log the generated SQL query
//        });
//        console.log("Called Register - 6")
//
//        if (student) {
//            throw new Error('A student with this email already exists');
//        }
//        console.log("Called Register - 7")
//
//        // TODO YOAV : necessary? checking if enums are valid, etc.
//    }


    generateVerificationToken() {
        return crypto.randomBytes(20).toString('hex');
    }
}

module.exports = new RegistrationLogic();
