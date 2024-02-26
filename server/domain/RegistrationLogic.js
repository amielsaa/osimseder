// StudentRegistrationLogic.js
const { Students, Staffs , Languages} = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailService = require('./services/EmailService');
const string2Int = require('./utils/String2Int');


class RegistrationLogic {
    async registerStudent(studentData) {
        try {
            //await this.validateInput(studentData);

            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(studentData.password, 10);

            const cityId = await string2Int.getCityId(studentData.city);
            const schoolId = await string2Int.getSchoolId(studentData.school);
            console.log(cityId)
            console.log(schoolId)

            const createdStudent = await Students.create({
                "email": studentData.email,
                "password": hashedPassword,
                "lastName": studentData.lastName,
                "firstName": studentData.firstName,
                "phoneNumber": studentData.phoneNumber,
                "gender": studentData.gender,
                "parentName": studentData.parentName,
                "parentPhoneNumber": studentData.parentPhoneNumber,
                "issuesText": studentData.issuesText,
                "didParentApprove": false,
                "verificationToken": verificationToken,
                "isVerified": false,
                "cityId": cityId,
                "schoolId": schoolId,
                isVerified: false
            });
            // console.log('here'+studentData.languages)
            // for (language of studentData.languages) {
            //     console.log(language)
            //     await Languages.create({
            //         "studentId": studentData.email,
            //         "language": language
            //     });
            // }
            console.log('here');
            await emailService.sendVerificationEmail(studentData.email, verificationToken);
            console.log("SABABA");
            return createdStudent;
        } catch (error) {
            throw new Error('Failed to create student: ' + error);
        }
    }

    async registerStaff(staffData) {
        try {
            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(staffData.password, 10);
            const cityId = await string2Int.getCityId(staffData.city);

            const createdStaff = await Staffs.create({
                "email": staffData.email,
                "password": hashedPassword,
                "lastName": staffData.lastName,
                "firstName": staffData.firstName,
                "phoneNumber": staffData.phoneNumber,
                "gender": staffData.gender,
                "verificationToken": verificationToken,
                "isVerified": false,
                "accesses": staffData.accesses,
                "cityId": cityId
            });

            await emailService.sendVerificationEmail(staffData.email, verificationToken);
            console.log("SABABA");
            return createdStaff;
        } catch (error) {
            throw new Error('Failed to create staff: ' + error);
        }
    }

    async forgotPassword(email) {
        try {
            const verificationToken = this.generateVerificationToken();

            const isStundet = emailService.sendVerificationEmail(staffData.email, verificationToken);

            if (isStudent) {
                await Students.update({
                    "verificationToken": verificationToken,
                    "isVerified": false
                })
            }
            else {
                await Staffs.update({
                    "verificationToken": verificationToken,
                    "isVerified": false
                })
            }
            return email;
        } catch (error) {
            throw new Error('Failed to initiate forgot password proccess: ' + error);
        }
    }

    generateVerificationToken() {
        return crypto.randomBytes(20).toString('hex');
    }
}

module.exports = new RegistrationLogic();
