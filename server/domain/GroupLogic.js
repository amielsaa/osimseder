const Students = require('../models/Student');
const {Groups, Schools} = require('../models/');

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

    
}

module.exports = new GroupLogic();
