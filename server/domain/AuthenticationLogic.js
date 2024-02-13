// AuthenticationLogic.js
const Students = require('../models/studentModel');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

class AuthenticationLogic {
    async verifyLogin(email, givenPassword) {
        try {
            const student = await Students.findOne({
                where: { Email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            const match = await bcrypt.compare(givenPassword, student.password);
            if (!match) {
                throw new Error('Wrong username and password combination');
            }
            const accessToken = sign({ username: email, id: student.id }, "importantsecret");
            return { token: accessToken, username: email, id: student.id };
        } catch (error) {
            throw new Error('Failed to login: ' + error);
        }
    }
}

module.exports = new AuthenticationLogic();
