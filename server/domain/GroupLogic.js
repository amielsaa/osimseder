const {Groups, Students} = require('../models/');

class GroupLogic {
    async getAllGroupsBySchool(schoolId) {
        try {
            
            const groups = await Groups.findAll({
                where: { "schoolId": schoolId }
            });
            
            if (!groups) {
                throw new Error('Groups not found');
            }
            return groups;
        } catch (error) {
            throw new Error('Failed to find groups from school ' +schoolId + ": " + error);
        }
    }

    async getAllGroupById(groupId) {
        try {
            const group = await Groups.findOne({
                where: { "ID": groupId }
            });
            if (!group) {
                throw new Error('Group not found');
            }
            return group;
        } catch (error) {
            throw new Error('Failed to find groups by ID ' + error);
        }
    }
    async joinGroup(groupId, userEmail) {
        try {
            const group = await Groups.findOne({
                where: { "ID": groupId }
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
            const updatedGroup = await Students.update(
                { "groupId": groupId },
                { where: { "email": userEmail }}
            );
            return group;

        } catch (error) {
            throw new Error('Failed to join group ' + error);
        }
    }

    
}

module.exports = new GroupLogic();
