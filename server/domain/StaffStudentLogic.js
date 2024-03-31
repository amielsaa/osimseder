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
            //TODO add check on the updated fields values
            const student = await Students.findOne({
                where: { email: studentEmail }
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

            usersLogger.info('Successfully updated a student by email: ' + studentEmail + '. Performed by email: ' + requesterEmail);
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

// Get all students from school without a group
// Input: schoolId - the id of the school to draw the studetnts from
// Output: array of students
    async getStudentsWithoutGroup(schoolId) {
        try {
            usersLogger.debug('Getting all students from school without a group. School id: ' + schoolId);
            argumentChecker.checkSingleArugments([schoolId], ['schoolId']);

            const students = await Students.findAll({
                where: {schoolId: schoolId, groupId: null}
            });

            usersLogger.info('Successfully found all students from school without a group. School id: ' + schoolId);
            return students;

        } catch (error) {
            usersLogger.error('Failed to find all students from school without a group: ' + error);
            throw new Error('Failed to find all students from school without a group: ' + error);
        }
    }

}

module.exports = new StaffStudentLogic();
