// Student Management
const { Students, Staffs } = require('../models');
const bcrypt = require('bcrypt');
const { roleGroup } = require('../utils/Accesses')
const Encryptor = require('./utils/Encryptor');
const string2Int = require('./utils/String2Int');

class UserManagementLogic {
    async getStudents() {
        try {
            const students = await Students.findAll();
            return students;
        } catch (error) {
            throw new Error('Failed to fetch students');
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
                    const { password, ...staffJson } = staff;
                    staffJson.dataValues.role = roleGroup[staff.accesses];
                    staffJson.dataValues.cityName = await string2Int.getCityNameById(staff.cityId);
                    staffJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(staff.email);
                    return staffJson;
                }
            }
            else {
                const { password, ...studentJson } = student;
                studentJson.dataValues.role = 'Student';
                studentJson.dataValues.cityName = await string2Int.getCityNameById(student.cityId);
                studentJson.dataValues.schoolName = await string2Int.getSchoolNameById(student.schoolId);
                studentJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(student.email);
                return studentJson;
            }
        } catch (error) {
            throw new Error('Failed to fetch user: ' + error);
        }
    }
    
    async getStudentByEmail(email) {
        try {
            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            return student;
        } catch (error) {
            throw new Error('Failed to fetch student: ' + error);
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
            const resetToken = await EmailLogic.generateResetToken();
            await EmailLogic.sendResetPasswordEmail(email, resetToken);
            return resetToken;
        } catch (error) {
            throw new Error('Failed to reset password: ' + error);
        }
    }

    async handleResetPassword(token, newPassword) {
        try {
            const decodedToken = await EmailLogic.decodeResetToken(token);
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

}

module.exports = new UserManagementLogic();
