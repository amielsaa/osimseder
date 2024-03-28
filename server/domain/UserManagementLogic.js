// Student Management
const { Students, Staffs } = require('../models');
const bcrypt = require('bcrypt');
const { formatStaffValues, formatStudentValues } = require('./utils/JsonValueAdder')
const EmailService = require('./services/EmailService');
const RegistrationLogic = require('./RegistrationLogic');
const { userLogger, usersLogger } = require('../utils/logger');
const argumentChecker = require('./utils/ArgumentChecker');

class UserManagementLogic {

// get all students
// Output: a list of all students
    async getAllStudents() {
        try {
            userLogger.debug('Getting all students');
            const students = await Students.findAll();

            userLogger.debug('Successfully found all students');
            return students;
        } catch (error) {
            userLogger.error('Failed to fetch students: ' + error);
            throw new Error('Failed to fetch students');
        }
    }

// get all staffs
// Output: a list of all staffs
    async getAllStaffs() {
        try {
            userLogger.debug('Getting all staffs');
            const staffs = await Staffs.findAll();

            userLogger.debug('Successfully found all staffs');
            return staffs;
        } catch (error) {
            userLogger.error('Failed to fetch staffs: ' + error);
            throw new Error('Failed to fetch staffs');
        }
    }

// get user by email
// Input: email - the email of the user
// Output: the user object
    async getUserByEmail(email) {
        try {
            userLogger.debug('Getting user by email: ' + email);
            argumentChecker.checkSingleArugments([email], ['email']);

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
                else {
                    const staffJson = await formatStaffValues(staff);
                    return staffJson;
                }
            }
            else {
                const studentJson = await formatStudentValues(student);
                return studentJson;
            }

            userLogger.debug('Successfully found user by email: ' + email);
        } catch (error) {
            userLogger.error('Failed to fetch user: ' + error);
            throw new Error('Failed to fetch user: ' + error);
        }
    }

//delete student
// Input: studentId - the id of the student
//        requesterEmail - the email of the requester
// Output: none
    async deleteStudent(studentId, requesterEmail) {
        try {
            userLogger.info('Deleting student with id: ' + studentId + ". Requester email: " + requesterEmail);
            argumentChecker.checkSingleArugments([studentId, requesterEmail], ['studentId', 'requesterEmail']);

            const student = await Students.findByPk(studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            await student.destroy();
            userLogger.info('Successfully deleted student with id: ' + studentId + ". Requester email: " + requesterEmail);

        } catch (error) {
            userLogger.error('Failed to delete student: ' + error);
            throw new Error('Failed to delete student');
        }
    }

// update student
// Input: email - the email of the student
//        updatedData - the fields to update
// Output: the updated student object
    async updateStudent(email, updatedData) {
        try {
            usersLogger.info('Initiate student updating profile by email: ' + email);
            argumentChecker.checkSingleArugments([email], ['email']);
            argumentChecker.checkByKeys(updatedData, "updatedData", ["email", "password", "lastName", "firstName", "phoneNumber", "gender", "parentName", "parentPhoneNumber", "city", "school"]);


            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            const updatedStudent = await student.update(updatedData);

            usersLogger.debug('Successfully student updated profile by email: ' + email);
            return updatedStudent;
        } catch (error) {
            usersLogger.error('Failed to update student: ' + error);
            throw new Error('Failed to update student: ' + error);
        }
    }


// reset password
// Input: email - the email of the student
// Output: the reset token
    async resetPassword(email) {
        try {
            usersLogger.info('Initiate password reset for email: ' + email);
            argumentChecker.checkSingleArugments([email], ['email']);

            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            const resetToken = await RegistrationLogic.generateVerificationToken();
            await EmailService.sendResetPasswordEmail(email, resetToken);

            usersLogger.debug('Successfully initiated password reset for email: ' + email);
            return resetToken;
        } catch (error) {
            usersLogger.error('Failed to reset password: ' + error);
            throw new Error('Failed to reset password: ' + error);
        }
    }

// handle reset password
// Input: token - the reset token
//        newPassword - the new password
// Output: none
    async handleResetPassword(token, newPassword) {
        try {
            usersLogger.info('Handling password reset');
            argumentChecker.checkSingleArugments([token, newPassword], ['token', 'newPassword']);

            const decodedToken = await EmailService.decodeResetToken(token);
            const student = await Students.findByPk(decodedToken.studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await student.update({ password: hashedPassword });

            usersLogger.info('Successfully handled password reset');
        } catch (error) {
            usersLogger.error('Failed to handle password reset: ' + error); 
            throw new Error('Failed to handle password reset: ' + error);
        }
    }
}

module.exports = new UserManagementLogic();



/***
async admin_changeStudentPassword(email, newPassword) {
    try {
        const student = await Students.findOne({
            where: { Email: email }
        });
        if (!student) {
            throw new Error('Student not found');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await student.update({ password: hashedPassword });
    } catch (error) {
        throw new Error('Failed to change student password: ' + error);
    }
}
***/