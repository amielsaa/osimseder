// LoginLogic.js
const {Students} = require('../models/');
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const {Staffs} = require('../models/');
const { roleGroup } = require('../utils/Accesses')
const { formatStaffValues,  formatStudentValues} = require('./utils/JsonValueAdder')
const { usersLogger } = require('../utils/Logger');
const argumentChecker = require('./utils/ArgumentChecker');


class LoginLogic {

// Verify the login of a user
// Input: email - the email of the user
//        givenPassword - the password of the user
// Output: the user object
    async verifyLogin(email, givenPassword) {
        try {
            usersLogger.info("Initiating Login for email: " + email);
            argumentChecker.checkSingleArugments([email, givenPassword], ["email", "givenPassword"]);

            const user = await Students.findOne({
                where: { email: email }
            });
            if(!user) {
                const staff = await Staffs.findOne({
                    where: { email: email }
                });
                if (!staff) {
                    usersLogger.error("User does not exist. Email: " + email);
                    throw new Error("Username or password aren't correct");
                }
                return this.verifyLoginStaff(staff, email, givenPassword)
            } else {
                return this.verifyLoginStudent(user, email, givenPassword)
            }

        } catch (error) {
            usersLogger.error("Failed to login for email: "+ email+ ". Reason: " + error);
            throw new Error("Failed to Login: Username or password aren't correct");
        }
    }

// Verify the login of a student
// Input: student - the student object
//        email - the email of the student
//        givenPassword - the password of the student
// Output: the student object
    async verifyLoginStudent(student, email, givenPassword) {
        if (!student.isVerified) {
            usersLogger.error("Failed to login for student email: " + email + ". Reason: Student isn't verified");
            throw new Error("Your account hasn't been verified yet. Check your email");
        }
        const match = await bcrypt.compare(givenPassword, student.password);
        if (!match) {
            usersLogger.error("Failed to login for student email: " + email + ". Reason: password isn't correct");
            throw new Error("Username or password aren't correct");
        }
        const studentJson = await formatStudentValues(student);
        const accessToken = sign({ email: email, role: 'Student', id: student.id }, "importantsecret");
        usersLogger.info("Successfully logged in student for email: " + email);
        return { token: accessToken, user:studentJson, id: student.id };
    }

// Verify the login of a staff
// Input: staff - the staff object
//        email - the email of the staff
//        givenPassword - the password of the staff
// Output: the staff object
    async verifyLoginStaff(staff, email, givenPassword) {
        if (staff.verificationToken !== null) {
            usersLogger.error("Failed to login for staff email: " + email + ". Reason: Staff isn't verified");
            throw new Error("Your account hasn't been verified yet. Check your email");
        }
        if (!staff.isVerified) {
            usersLogger.error("Failed to login for staff email: " + email + ". Reason: Access isn't granted yet.");
            throw new Error("Your account access hasn't been verified yet.");
        }
        const match = await bcrypt.compare(givenPassword, staff.password);
        if (!match) {
            usersLogger.error("Failed to login for staff email: " + email + ". Reason: password isn't correct");
            throw new Error("Username or password aren't correct");
        }
        const staffJson = await formatStaffValues(staff);
        const accessToken = sign({ email: email, role: roleGroup[staff.accesses], id: staff.id }, "importantsecret");
        usersLogger.info("Successfully logged in staff for email: " + email);
        return { token: accessToken, user: staffJson, id: staff.id };
        
    }

// Verify the token of a user
// Input: token - the token of the user
// Output: the user object
    async verifyToken(token) {
        try {
            usersLogger.debug("Initiating Token Verification")
            argumentChecker.checkSingleArugments([token], ["token"]);

            const user = verify(token, "importantsecret");
            if(user.role == 'Student') {
                return this.verifyTokenStudent(user, token);
            } else {
                return this.verifyTokenStaff(user, token);
            }

        } catch (error) {
            usersLogger.debug("Failed to verify token: " + error);
            throw new Error('Failed to verify token: ' + error);
        }
    }

// Verify the token of a student
// Input: user - the user object
//        token - the token of the user
// Output: the student object
    async verifyTokenStudent(user, token) {
        const student = await Students.findOne({
            where: { email: user.email }
        });
        if (!student) {
            throw new Error('Student not found');
        }
        const studentJson = await formatStudentValues(student);
        return { token: token, user: studentJson, id: student.id };
    }

// Verify the token of a staff
// Input: user - the user object
//        token - the token of the user
// Output: the staff object
    async verifyTokenStaff(user, token) {
        const staff = await Staffs.findOne({
            where: { email: user.email }
        })
        if (!staff) {
            throw new Error('Staff not found');
        }
        const staffJson = await formatStaffValues(staff);
        return { token: token, user: staffJson, id: staff.id };
    }

// Logout a user
// Input: email - the email of the user
// Output: none
    async logout(email) {
        try {
            usersLogger.info("Initiating Logout for email: " + email);
            argumentChecker.checkSingleArugments([email], ["email"]);

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

        } catch (error) {
            usersLogger.error("Failed to logout for email: " + email, ". Reason: " + error);
            throw new Error('Failed to login: ' + error);
        }
    }
}

module.exports = new LoginLogic();
