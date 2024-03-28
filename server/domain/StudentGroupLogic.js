const { Groups, Students } = require('../models/');
const { groupsLogger } = require('../utils/logger');
const argumentChecker = require('./utils/ArgumentChecker');

class StudentGroupLogic {

// get all groups by school
// Input: schoolId - the id of the school
// Output: a list of groups in the school
    async getAllGroupsBySchool(schoolId) {
        try {
            groupsLogger.debug('Getting all groups by schoolId: ' + schoolId);
            argumentChecker.checkSingleArugments([schoolId], ['schoolId']);

            const groups = await Groups.findAll({
                where: { "schoolId": schoolId }
            });
            
            if (!groups) {
                throw new Error('Groups not found');
            }

            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
        
                const students = await group.getStudents();
        
                const studentNames = students.map(student => {
                    const { firstName, lastName, ...rest } = student;
                    return `${firstName} ${lastName}`;
                });
        
                group.dataValues.students = studentNames;            
            }
    
            const responseData = groups.map(group => ({
                id: group.id,
                students: group.dataValues.students,
                memberCount: group.dataValues.students.length,
                capacity: group.capacity
            }));

            groupsLogger.debug('Successfully found all groups by schoolId: ' + schoolId);
            return responseData;
            
        } catch (error) {
            groupsLogger.error('Failed to find groups from school ' + schoolId + ": " + error);
            throw new Error('Failed to find groups from school ' + schoolId + ": " + error);
        }
    }

//TODO CHANGE NAME
// get group by id
// Input: groupId - the id of the group
// Output: the group object
    async getAllGroupById(groupId) {
        try {
            groupsLogger.debug('Getting all groups by groupId: ' + groupId);
            argumentChecker.checkSingleArugments([groupId], ['groupId']);

            const group = await Groups.findOne({
                where: { "id": groupId }
            });
            if (!group) {
                throw new Error('Group not found');
            }

            const students = await group.getStudents();
    
            const studentNames = students.map(student => {
                const { firstName, lastName, ...rest } = student;
                return `${firstName} ${lastName}`;
            });
        
            group.dataValues.students = studentNames;            
            

            const responseData = {
                id: group.id,
                students: group.dataValues.students,
                memberCount: group.dataValues.students.length,
                capacity: group.capacity
            };

            groupsLogger.debug('Successfully found all groups by groupId: ' + groupId);
            return responseData;
        } catch (error) {
            groupsLogger.error('Failed to find groups by id ' + error);
            throw new Error('Failed to find groups by id ' + error);
        }
    }

// join a group
// Input: groupId - the id of the group
//        userEmail - the email of the user
// Output: the group object
    async joinGroup(groupId, userEmail) {
        try {
            groupsLogger.info('Joining group by groupId: ' + groupId + ' and userEmail: ' + userEmail);
            argumentChecker.checkSingleArugments([groupId, userEmail], ['groupId', 'userEmail']);

            const group = await Groups.findOne({
                where: { "id": groupId }
            });
            if (!group) {
                throw new Error('Group not found');
            }
            const user = await Students.findOne({
                where: { "email": userEmail }
            });
            if (!user) {
                throw new Error('User not found');
            }
            const currentSize = await group.getStudents();
            if(currentSize !== undefined) {
                const hasRoom = group.capacity - currentSize.length;
                if (!hasRoom) {
                    throw new Error('Group is full');
                }
            }

            const groupUpdate = await Students.update(
                { "groupId": groupId },
                { where: { "email": userEmail }}
            );

            const updatedGroup = await Groups.findOne({
                where: { "id": groupId }
            });

            const students = await updatedGroup.getStudents();
    
            const studentNames = students.map(student => {
                const { firstName, lastName, ...rest } = student;
                return `${firstName} ${lastName}`;
            });
        
            updatedGroup.dataValues.students = studentNames;            
            

            const responseData = {
                id: updatedGroup.id,
                students: updatedGroup.dataValues.students,
                memberCount: updatedGroup.dataValues.students.length
            };

            groupsLogger.info('Successfully joined group by groupId: ' + groupId + ' and userEmail: ' + userEmail);
            return responseData;

        } catch (error) {
            groupsLogger.error('Failed to join group ' + error);
            throw new Error('Failed to join group ' + error);
        }
    }

    
}

module.exports = new StudentGroupLogic();
