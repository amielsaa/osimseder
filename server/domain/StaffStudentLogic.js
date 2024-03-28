const {Students} = require('../models');
const argumentChecker = require('./utils/ArgumentChecker');
const {usersLogger} = require('../utils/logger');

class StaffStudentLogic {

// update a student
// Input: studentEmail - the email of the student
//        requesterEmail - the email of the user who is updating the student
//        updatedFields - the fields to update
// Output: the updated student object
    async updateStudent(studentEmail, requesterEmail, updatedFields) {
        try {
            usersLogger.info('Updating a student by email: ' + studentEmail + '. By email: ' + requesterEmail);
            argumentChecker.checkSingleArugments([studentEmail, requesterEmail], ['studentEmail', 'requesterEmail']);
            argumentChecker.checkByKeys(updatedFields, "updatedFields", ["email", "password", "lastName", "firstName", "phoneNumber", "gender", "parentName", "parentPhoneNumber", "city", "school"]);

            const student = await Students.findOne({
                where: {email: email}
            });
            if(!student){
                throw new Error('Couldn\'t find a student with that email.');
            }

            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    student[key] = updatedFields[key];
                }
            }

            await student.save();

            usersLogger.info('Successfully updated a student by email: ' + email);
            return student;

        } catch (error) {
            usersLogger.error('Failed to update a student by email: ' + error);
            throw new Error('Failed to update a student by email: ' + error);
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

module.exports = new StaffStudentLogic();
