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

    
}

module.exports = new GroupLogic();
