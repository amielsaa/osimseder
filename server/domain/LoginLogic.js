// LoginLogic.js
const {Students} = require('../models/');
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const {Staffs} = require('../models/');
const {roleGroup} = require('../utils/Accesses')
const string2Int = require('./utils/String2Int');
const Encryptor = require('./utils/Encryptor');

class LoginLogic {
    async verifyLogin(email, givenPassword ) {
        try {
            console.log("Enter login logic");
            const user = await Students.findOne({
                where: { email: email }
            });
            if(!user) {
                const staff = await Staffs.findOne({
                    where: { email: email }
                });
                return this.verifyLoginStaff(staff, email, givenPassword)
            } else {
                return this.verifyLoginStudent(user, email, givenPassword)
            }
        } catch(error) {
            throw new Error('Failed to login: ' + error);
        }
    }

    async verifyLoginStudent(student, email, givenPassword) {
        console.log("Enter verify student");
        if (!student.isVerified) {
            throw new Error("Your account hasn't been verified yet. Check your email");
        }
        const match = await bcrypt.compare(givenPassword, student.password);
        if (!match) {
            throw new Error('Wrong username and password combination');
        }
        const {password, ...studentJson} =  student;
        studentJson.dataValues.role = 'Student';
        studentJson.dataValues.cityName = await string2Int.getCityNameById(student.cityId);
        studentJson.dataValues.schoolName = await string2Int.getSchoolNameById(student.schoolId);
        studentJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(student.email);
        const accessToken = sign({ email: email,role:'Student' ,id: student.id }, "importantsecret");
        return { token: accessToken, user:studentJson, id: student.id };
    }
    async verifyLoginStaff(staff, email, givenPassword) {
        // if (!staff.isVerified) {
        //     throw new Error("Your account hasn't been verified yet. Check your email");
        // }
        if (!staff) {
            throw new Error('Error: user not found');
        }
        const match = await bcrypt.compare(givenPassword, staff.password);
        if (!match) {
            throw new Error('Wrong username and password combination');
        }
        const {password, ...staffJson} =  staff;
        staffJson.dataValues.role = roleGroup[staff.accesses];
        staffJson.dataValues.cityName = await string2Int.getCityNameById(staff.cityId);
        staffJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(staff.email);
        const accessToken = sign({ email: email, role:roleGroup[staff.accesses], id: staff.id }, "importantsecret");
        return { token: accessToken, user: staffJson, id: staff.id };
        
    }

    async verifyToken(token) {
        try {
            const user = verify(token, "importantsecret");
            if(user.role == 'Student') {
                return this.verifyTokenStudent(user, token);
            } else {
                return this.verifyTokenStaff(user, token);
            }
            
        } catch(error) {
            throw new Error('Failed to verify token: ' + error);
        }
    }

    async verifyTokenStudent(user, token) {
        const student = await Students.findOne({
            where: { email: user.email }
        });
        if (!student) {
            throw new Error('Student not found');
        }
        const { password, ...studentJson } = student;
        studentJson.dataValues.role = 'Student';
        studentJson.dataValues.cityName = await string2Int.getCityNameById(student.cityId);
        studentJson.dataValues.schoolName = await string2Int.getSchoolNameById(student.schoolId);
        studentJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(student.email);
        return { token: token, user: studentJson, id: student.id };
    }

    async verifyTokenStaff(user, token) {
        const staff = await Staffs.findOne({
            where: { email: user.email }
        })
        if (!staff) {
            throw new Error('Staff not found');
        }
        const { password, ...staffJson } = staff;
        staffJson.dataValues.role = roleGroup[staff.accesses];
        staffJson.dataValues.cityName = await string2Int.getCityNameById(staff.cityId);
        staffJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(staff.email);
        return { token: token, user: staffJson, id: staff.id };
    }

    async logout(email) {
        try {
            const user = await Students.findOne({
                where: { email: email }
            });
            if (!user) {
                const staff = await Staffs.findOne({
                    where: { email: email }
                });
                if (!staff) {
                    throw new Error("Can't find a user with this email");
                }
            }
            //TODO AMIEL SHOULD ANYTHING ELSE BE HERE?
        } catch (error) {
            throw new Error('Failed to login: ' + error);
        }
    }
}

module.exports = new LoginLogic();
