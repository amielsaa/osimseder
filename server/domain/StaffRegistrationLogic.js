// StaffRegistrationLogic.js
const Staffs = require('../models/staffModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sequelize = require('sequelize');

class StaffRegistrationLogic {
    async registerStaff(staffData) {
        try {
            sequelize.sync()
            const existingStaff = await Staffs.findOne({
                where: { Email: staffData.email }
            });

            if (existingStaff) {
                throw new Error('There is an existing account with this email');
            }

            const verificationToken = this.generateVerificationToken();

            const hashedPassword = await bcrypt.hash(staffData.password, 10);

            const createdStaff = await Staffs.create({
                email: staffData.email,
                password: hashedPassword,
                lastName: staffData.lastName,
                firstName: staffData.firstName,
                phoneNumber: staffData.phoneNumber,
                gender: staffData.gender,
                parentName: staffData.parentName,
                parentPhoneNumber: staffData.parentPhoneNumber,
                parentEmail: staffData.parentEmail,
                city: staffData.city,
                school: staffData.school,
                issuesChoose: staffData.issuesChoose,
                issuesText: staffData.issuesText,
                languages: staffData.languages,
                isInGroup: '',
                didParentApprove: false,
                verificationToken: verificationToken
            });

            await EmailLogic.sendVerificationEmail(staffData.email, verificationToken);

            return createdStaff;
        } catch (error) {
            throw new Error('Failed to create staff: ' + error);
        }
    }

    generateVerificationToken() {
        return crypto.randomBytes(20).toString('hex');
    }
}

module.exports = new StaffRegistrationLogic();
