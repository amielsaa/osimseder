const Students = require('../models/Student');

class StudentGroupManagementLogic {
    async joinGroup(studentId, groupId) {
        try {
            const student = await Students.findByPk(studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            // Update student's group information
            await student.update({ isInGroup: groupId });
            return { message: 'Student joined group successfully' };
        } catch (error) {
            throw new Error('Failed to join group: ' + error);
        }
    }

    async leaveGroup(studentId) {
        try {
            const student = await Students.findByPk(studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            // Update student's group information
            await student.update({ isInGroup: '' });
            return { message: 'Student left group successfully' };
        } catch (error) {
            throw new Error('Failed to leave group: ' + error);
        }
    }
}

module.exports = new StudentGroupManagementLogic();
