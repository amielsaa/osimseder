// Student Management
const { Students, Staffs } = require('../models');
const bcrypt = require('bcrypt');
const { formatStaffValues, formatStudentValues } = require('./utils/JsonValueAdder')
const EmailService = require('./services/EmailService');
const RegistrationLogic = require('./RegistrationLogic');

class UserManagementLogic {
    async getAllStudents() {
        try {
            const students = await Students.findAll();
            return students;
        } catch (error) {
            throw new Error('Failed to fetch students');
        }
    }

    async getAllStaffs() {
        try {
            const staffs = await Staffs.findAll();
            return staffs;
        } catch (error) {
            throw new Error('Failed to fetch staffs');
        }
    }

    async getUserByEmail(email) {
        try {
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
        } catch (error) {
            throw new Error('Failed to fetch user: ' + error);
        }
    }

    async deleteStudent(studentId) {
        try {
            const student = await Students.findByPk(studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            await student.destroy();
        } catch (error) {
            throw new Error('Failed to delete student');
        }
    }

    async updateStudent(email, updatedData) {
        try {
            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            const updatedStudent = await student.update(updatedData);
            return updatedStudent;
        } catch (error) {
            throw new Error('Failed to update student: ' + error);
        }
    }

    async resetPassword(email) {
        try {
            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            const resetToken = await RegistrationLogic.generateVerificationToken();
            await EmailService.sendResetPasswordEmail(email, resetToken);
            return resetToken;
        } catch (error) {
            throw new Error('Failed to reset password: ' + error);
        }
    }

    async handleResetPassword(token, newPassword) {
        try {
            const decodedToken = await EmailService.decodeResetToken(token);
            const student = await Students.findByPk(decodedToken.studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await student.update({ password: hashedPassword });
        } catch (error) {
            throw new Error('Failed to handle password reset: ' + error);
        }
    }
    //Needed - Get the Student's groupId
    async getGroupIdOfStudent(email) {
        try {
            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            return student.groupId;
        } catch (error) {
            throw new Error('Failed to get the students group: ' + error);
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