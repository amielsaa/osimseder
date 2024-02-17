// AuthenticationLogic.js
const {Students} = require('../models/');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

class AuthenticationLogic {
    async verifyLoginStudent(email, givenPassword) {
        try {
            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            const match = await bcrypt.compare(givenPassword, student.password);
            if (!match) {
                throw new Error('Wrong username and password combination');
            }
            const accessToken = sign({ username: email,role:'Student' ,id: student.id }, "importantsecret");
            return { token: accessToken,role:'Student', username: email, id: student.id };
        } catch (error) {
            throw new Error('Failed to login: ' + error);
        }
    }
    async verifyLoginStaff(email, givenPassword) {
        try {
            const staff = await Staffs.findOne({
                where: { Email: email }
            });
            if (!staff) {
                throw new Error('Error: staff user not found');
            }
            const match = await bcrypt.compare(givenPassword, staff.password);
            if (!match) {
                throw new Error('Wrong username and password combination');
            }
            const accessToken = sign({ username: email, id: staff.id }, "importantsecret");
            return { token: accessToken, username: email, id: staff.id };
        } catch (error) {
            throw new Error('Failed to login: ' + error);
        }
    }
}

module.exports = new AuthenticationLogic();
