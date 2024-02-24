const {Groups, Schools, Students, Areas, Cities, Staffs} = require('../models');

class GroupLogic {
    async createGroup(groupSize, schoolId) {
        try {
            if(groupSize==null || schoolId==null){
                throw new Error('Group size and school ID can\'t be null');
            }
            if(groupSize<=0){
                throw new Error('Group size can\'t be negative or 0.');
            }

            const school = await Schools.findOne({
                where: {id: schoolId}
            });
            if (!school) {
                throw new Error('School doesn\'t exist.');
            }

            const group = await Groups.create({
                membersCount: groupSize,
                schoolId: schoolId
            });
            if (!group) {
                throw new Error('Couldn\'t create a group.');
            }

            return group;
        } catch (error) {
            throw new Error('Failed to create group: ' + error);
        }
    }

    async getGroupsByTeamOwner(teamOwnerEmailAddr) {
        try {
            if(teamOwnerEmailAddr==null){
                throw new Error('Team owner email is null.');
            }
            if(teamOwnerEmailAddr==undefined){
                throw new Error('Team owner email is undefined.');
            }
            const groups = await Groups.findAll({
                where: { "teamOwnerEmail": teamOwnerEmailAddr }
            });
            if (!groups) {
                throw new Error('Couldn\'t find groups by team owner.');
            }
            return groups;
        } catch (error) {
            throw new Error('Failed to find an area by team owner: ' + error);
        }
    }

    async getGroupsByAreaManager(areaManagerEmail) {
        try {
            const area = await Areas.findOne({
                where: { "areaManagerEmail": areaManagerEmail }
            });
            if (!area) {
                throw new Error('Couldn\'t find an area by area manager.');
            }
            const schools = await Schools.findAll({
                where: { "areaId": area.id }
            });
            if (!schools) {
                throw new Error('Couldn\'t find a schools by area.');
            }
            const newGroups = {};
            for (let i = 0; i < schools.length; i++) {
                const school = schools[i];
                const groupsBySchool = await school.getGroups();                
                newGroups[school.id] = groupsBySchool;
            }


            return newGroups;

        } catch (error) {
            throw new Error('Failed to find an area by area manager: ' + error);
        }
    }
    //Get all groups related to area manager

    async getGroupsByCityManager(cityManagerEmail) {
        try {
            const city = await Cities.findOne({
                where: { "cityManagerEmail": cityManagerEmail }
            });
            if (!city) {
                throw new Error('Couldn\'t find an area by city manager.');
            }
            const schools = await Schools.findAll({
                where: { "cityId": city.id }
            });
            if (!schools) {
                throw new Error('Couldn\'t find a schools by area.');
            }
            const newGroups = {};
            for (let i = 0; i < schools.length; i++) {
                const school = schools[i];
                const groupsBySchool = await school.getGroups();                
                newGroups[school.id] = groupsBySchool;
            }


            return newGroups;

        } catch (error) {
            throw new Error('Failed to find an area by city manager: ' + error);
        }
    }

    async getAllGroups() {
        try {
            const groups = await Groups.findAll();
            if (!groups) {
                throw new Error('Couldn\'t get all schools (admin).');
            }
            
            return newGroups;

        } catch (error) {
            throw new Error('Failed to get all groups: ' + error);
        }
    }
    

    async getGroupById(groupId) {
        try {
            const group = await Groups.findOne({
                where: { id: groupId }
            });
            if (!group) {
                throw new Error('Group not found');
            }

            const teamManager = await Staffs.findOne({
                where: {email: group.teamOwnerEmail}
            });
            if(teamManager){
                const { firstName, lastName, ...rest } = teamManager;
                group.dataValues.teamManager = `${firstName} ${lastName}`;
            }

            return group;
        } catch (error) {
            throw new Error('Failed to find a ´group by ID ' + error);
        }
    }

    // async joinGroup(groupId, userEmail) {
    //     try {
    //         const group = await Groups.findOne({
    //             where: { "id": groupId }
    //         });
    //         if (!group) {
    //             throw new Error('Group not found');
    //         }
    //         const user = await Students.findOne({
    //             where: { "email": userEmail }
    //         });
    //         if (!user) {
    //             throw new Error('User not found');
    //         }
    //         if (user.groupId == groupId) {
    //             throw new Error('User already in a group');
    //         }

    //         const updatedGroup = await Students.update(
    //             { "groupId": groupId },
    //             { where: { "email": userEmail }}
    //         );
    //         return group;

    //     } catch (error) {
    //         throw new Error('Failed to join group ' + error);
    //     }
    // }

    
}

module.exports = new GroupLogic();
