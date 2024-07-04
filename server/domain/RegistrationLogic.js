// StudentRegistrationLogic.js
const { Students, Staffs , Languages} = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailService = require('./services/EmailService');
const string2Int = require('./utils/String2Int');
const { usersLogger } = require('../utils/Logger');
const argumentChecker = require('./utils/ArgumentChecker');
const Accesses = require('../utils/Accesses')
const { formatStaffValues, formatStudentValues } = require('./utils/JsonValueAdder')

class RegistrationLogic {

// register a student
// Input: studentData - the data of the student
// Output: the student object
    async registerStudent(studentData) {
        try {
            usersLogger.info("Initiating Register Student for email: " + studentData.email)
            argumentChecker.checkByKeys(studentData, "studentData", ["email", "password", "lastName", "firstName", "phoneNumber", "gender", "parentName", "parentPhoneNumber", "city", "school"]);


            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(studentData.password, 10);

            const cityId = await string2Int.getCityId(studentData.city);
            const schoolId = await string2Int.getSchoolId(studentData.school);
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
                "verificationToken": verificationToken,
                "cityId": cityId,
                "schoolId": schoolId,
                "isVerified": false,
                "extraLanguage": studentData.extraLanguage //TODO AMIEL notice the name of the field
            });

            await emailService.sendVerificationEmail(studentData.email, verificationToken);

            usersLogger.info("Successfully Registered Student (before validating) for email: " + studentData.email + "in city: " + studentData.city + "in school: " + studentData.school)
            return createdStudent;

        } catch (error) {
            usersLogger.error("Error registering student with email: " + studentData.email + ". Reason: " + error)
            throw new Error('Failed to create student: ' + error);
        }
    }

// register a staff
// Input: staffData - the data of the staff
// Output: the staff object
    async registerStaff(staffData) {
        try {
            usersLogger.info("Initiating Register Staff for email: " + staffData.email);
            argumentChecker.checkSingleArugments([staffData], ["staffData"]);

            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(staffData.password, 10);
            const cityId = await string2Int.getCityId(staffData.city);
            if(!staffData.accesses) {
                const roleKeys = Object.keys(Accesses.roleGroup)
                staffData.accesses = roleKeys.find(key => roleKeys[key] === staffData.role )
            }

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

            usersLogger.info("Successfully Registered Staff (before validating) for email: " + staffData.email + ". in city: " + staffData.city);
            return createdStaff;

        } catch (error) {
            usersLogger.error("Error registering staff with email: " + staffData.email + ". Reason: " + error);
            throw new Error('Failed to create staff: ' + error);
        }
    }

// initiate forgot password process
// Input: email - the email of the user
// Output: the email of the user
    async forgotPassword(email) {
        try {
            usersLogger.info("Initiating Forgot Password process for email: " + email);
            argumentChecker.checkSingleArugments([email], ["email"]);

            const verificationToken = this.generateVerificationToken();

            const isStudent = emailService.sendResetPasswordEmail(email, verificationToken);

            if (isStudent) {
                const student = await Students.findOne({
                    where: { email: email }
                });
                await student.update({
                    "verificationToken": verificationToken,
                    "isVerified": false
                })
            }
            else {
                const staff = await Staffs.findOne({
                    where: { email: email }
                });
                await staff.update({
                    "verificationToken": verificationToken
                })
            }
            usersLogger.info("Successfully initiated forgot password proccess for email: " + email);
            return email;

        } catch (error) {
            usersLogger.error("Failed to initiate forgot password process for email: " + email + ". Reason: " + error);
            throw new Error('Failed to initiate forgot password proccess: ' + error);
        }
    }

// change the password of the user
// Input: email - the email of the user
//        password - the new password
//        isStudent - if the user is a student
// Output: the email of the user
    async changePassword(email,password,newPassword,isStudent) {
        try {
            usersLogger.info("Initiating actual Change Password process for email: " + email + ". Is he student?" + isStudent);
            argumentChecker.checkSingleArugments([email, password, isStudent], ["email", "password", "isStudent"]);
            
            var user = null
            if (isStudent) {
                user = await Students.findOne({
                    where: { email: email }
                });
            }
            else {
                user = await Staffs.findOne({
                    where: { email: email }
                });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new Error("Old password is incorrect.");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({
                "verificationToken": null,
                "isVerified": true,
                "password": hashedPassword
            })
            usersLogger.info("Successfully initiated actual change password proccess for email: " + email);
            return email;

        } catch (error) {
            usersLogger.error("Failed to initiate actual change password process for email: " + email + ". Reason: " + error);
            throw new Error('Failed to initiate change password proccess: ' + error);
        }
    }
//====================================FOR TESTING ONLY====================================
    async instantVerifyTesting(email) {
        try {
            const student = await Students.findOne({
                where: { email: email }
            });
            
            await student.update({
                "verificationToken": null,
                "isVerified": true
            })
            return email;

        } catch (error) {
            
        }
    }
//====================================FOR TESTING ONLY====================================


// generate a verification token for the user
    generateVerificationToken() {
        return crypto.randomBytes(20).toString('hex');
    }

    async fetchUserByEmail(email) {
        var user = await Students.findOne({
            where: { email: email }
        });
        if(!user) {
            user = await Staffs.findOne({
                where: { email: email }
            });
        }
        if(!user) {
            throw new Error('User with that email doesnt exists.')
        }
        return user
    }

    async editPersonalDetails(email, userRole, userData, isStudent) {
        try {            
            var user = await this.fetchUserByEmail(email);
            const updatedFields = {
                "firstName": userData.firstName,
                "lastName": userData.lastName,
                "parentName": userData.parentName,
                "parentPhoneNumber": userData.parentPhoneNumber,
                "issuesText": userData.issuesText,
                "extraLanguage": userData.extraLanguage,
                "gender": userData.gender,
                "phoneNumber": userData.phoneNumber
            }
            if(!isStudent) {
                let studentPropertiesToDelete = ["issuesText", "parentPhoneNumber", "parentName"]
                studentPropertiesToDelete.forEach((property) => delete updatedFields[property])
            }
            user = await user.update(updatedFields);
            if(isStudent) {
                user = await formatStudentValues(user);
            } else {
                user = await formatStaffValues(user);
            }
            console.log(user)
            usersLogger.info("Successfully edited personal details for email: " + email);
            return user.dataValues;

        } catch (error) {
            usersLogger.error("Failed to edit personal details for email: " + email + ". Reason: " + error);
            throw new Error('Failed to edit personal details: ' + error);
        }
    }

}

module.exports = new RegistrationLogic();
