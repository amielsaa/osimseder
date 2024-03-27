const { Sequelize } = require('sequelize');
const {Groups, Schools, Students, Areas, Cities, Staffs, Houses} = require('../models');
const userManagementLogic = require("./UserManagementLogic")

class StaffGroupLogic {
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
                capacity: groupSize,
                schoolId: schoolId
            });
            if (!group) {
                throw new Error('Couldn\'t create a group.');
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
        
            return responseData;

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
            const houses = await Houses.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { "teamOwnerEmail": teamOwnerEmailAddr },
                        { "teamOwnerEmail_2": teamOwnerEmailAddr }
                    ]
                }
            });
            if (!houses || houses.length === 0) {
                throw new Error('Couldn\'t find houses by team owner.');
            }

            // console.log(houses)

            let groups = [];
            for (let i = 0; i < houses.length; i++) {
                const house = houses[i];
                const houseGroups = await house.getGroups();

                if (houseGroups && houseGroups.length > 0) {
                    groups.push(...houseGroups);
                }
            }
            if (!groups || groups.length === 0) {
                // throw new Error('Couldn\'t find groups by the houses.');
                return {};
            }
            // console.log(groups)

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

            return responseData;
        } catch (error) {
            throw new Error('Failed to find an area by team owner: ' + error);
        }
    }

    //Get all groups related to area manager

    async getGroupsByCityManager(cityManagerEmail) {
        try {
            const staff = await Staffs.findOne({
                where: { "email": cityManagerEmail }
            });
            if (!staff) {
                throw new Error('Couldn\'t find an staff member.');
            }
            const schools = await Schools.findAll({
                where: { "cityId": staff.cityId }
            });
            if (!schools) {
                throw new Error('Couldn\'t find schools by area.');
            }
            const newGroups = [];

            for (let i = 0; i < schools.length; i++) {
                const school = schools[i];
                const groupsBySchool = await school.getGroups();
                for (const group of groupsBySchool) {
                    const students = await group.getStudents();
                    const studentNames = students.map(student => {
                        const { firstName, lastName, ...rest } = student;
                        return `${firstName} ${lastName}`;
                    });
                    group.dataValues.students = studentNames;            
                    newGroups.push(group);
                }
            }

            const responseData = newGroups.map(group => ({
                id: group.id,
                students: group.dataValues.students,
                memberCount: group.dataValues.students.length,
                capacity: group.capacity
            }));

            return responseData;

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

            return responseData;

        } catch (error) {
            throw new Error('Failed to get all groups: ' + error);
        }
    }
    

    async getGroupById(groupId, user) {
        try {
            if(groupId === undefined){
                throw new Error('groupId is undefined');
            }
            if(groupId === null){
                throw new Error('groupId is null');
            }
            if (user.role == "Student") {
                const studentsGroupId = await userManagementLogic.getGroupIdOfStudent(user.email);
                console.log("groupIDofStudent")
                console.log(studentsGroupId)
                console.log("groupID")
                console.log(groupId)

                if (groupId != studentsGroupId) {
                    throw new Error("You can't enter a group you are not a part of");
                }
            }
            const group = await Groups.findOne({
                where: { id: groupId }
            });
            if (!group) {
                throw new Error('Group not found');
            }

            // const teamManager = await Staffs.findOne({
            //     where: {email: group.teamOwnerEmail}
            // });
            // if(teamManager){
            //     const { firstName, lastName, ...rest } = teamManager;
            //     group.dataValues.teamManager = `${firstName} ${lastName}`;
            // }
            
            const students = await group.getStudents();
        
            const studentNames = students.map(student => {
                const { firstName, lastName, email,...rest } = student;
                return {fullname:`${firstName} ${lastName}`, email:email};
            });
            group.dataValues.students = studentNames;            
            

            const responseData = {
                id: group.id,
                students: group.dataValues.students,
                memberCount: group.dataValues.students.length,
                capacity: group.capacity,
                houseId: group.houseId
            };

            return responseData;

        } catch (error) {
            throw new Error('Failed to find a group by ID ' + error);
        }
    }

    async getSchoolsByCity(cityName) {
        try {
            if(cityName === undefined){
                throw new Error('cityname is undefined');
            }
            if(cityName === null){
                throw new Error('cityname is null');
            }
            const city = await Cities.findOne({
                where: { cityName: cityName },
            });
            if (!city) {
                throw new Error('City not found');
            }

            const schools = await Schools.findAll({
                where: { "cityId": city.id }
            });
            if (!schools) {
                throw new Error('Schools not found');
            }
            const responseData = schools.map(school => ({
                id: school.id,
                schoolName: school.schoolName
            }));
            return responseData;

        } catch (error) {
            throw new Error('Failed to get schools by city ' + error);
        }
    }

    async getAllGroupsWithoutHouse(schoolId) {
        try {
            if(schoolId === undefined){
                throw new Error('schoolId is undefined');
            }
            if(schoolId === null){
                throw new Error('schoolId is null');
            }

            const groups = await Groups.findAll({
                where: { schoolId: schoolId, houseId: null }
            });
            if (!groups) {
                throw new Error('groups not found');
            }

            // const schools = await Schools.findAll({
            //     where: { "cityId": city.id }
            // });
            // if (!schools) {
            //     throw new Error('Schools not found');
            // }
            // const responseData = schools.map(school => ({
            //     id: school.id,
            //     schoolName: school.schoolName
            // }));
            // return groups;

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

            return responseData;

        } catch (error) {
            throw new Error('Failed to get school\'s groups without a house ' + error);
        }
    }
    
    
    async deleteGroup(id) {
        try {
            const group = await Groups.findOne({
                where: {id: id}
            });
            if (!group) {
                throw new Error('Couldn\'t find a group with that id.');
            }
            const students = await group.getStudents();

            for (let i = 0; i < students.length; i++) {
                const student = students[i];
                await student.update({
                    "groupId": null
                })
            }
            await group.destroy();
        
            return;

        } catch (error) {
            throw new Error('Failed to delete a group by id: ' + error);
        }
    }

    
    async updateGroup(id, updatedFields) {
        try {
            const group = await Groups.findOne({
                where: {id: id}
            });
            if(!group){
                throw new Error('Couldn\'t find a group with that id.');
            }

            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    group[key] = updatedFields[key];
                }
            }

            await group.save();
        
            return group;

        } catch (error) {
            throw new Error('Failed to update a group by id: ' + error);
        }
    }
}

module.exports = new StaffGroupLogic();



    // NOT USED - alternative implementation of joint routes - NOT USED
    // async getGroupsByStaffAccess(userEmail) {
    //     try {
    //         if(userEmail === undefined){
    //             throw new Error('User email is undefined.');
    //         }
    //         if(userEmail === null){
    //             throw new Error('User email is null.');
    //         }
    //         const staffUser = await Staffs.findOne({
    //             where: {email: userEmail}
    //         });
    //         if(!staffUser){
    //             throw new Error('Can\'t find staff member with that email.');
    //         }

    //         const userRole = staffUser.accesses;
    //         if(userRole == 'D'){
    //             const groups = await getGroupsByCityManager(userEmail);
    //         }

    //         else if(userRole == 'C'){
    //             const groups = await getGroupsByAreaManager(userEmail);
    //         }

    //         else if (userRole == 'B'){
    //             const groups = await getGroupsByTeamOwner(userEmail);
    //         }

    //         else throw new Error('Shouldn\'t get here.');

    //         return groups;
    //     } catch (error) {
    //         throw new Error('Failed to get all groups by access ' + error);
    //     }
    // }


/***async getGroupsByAreaManager(areaManagerEmail) {
    try {
        const area = await Areas.findOne({
            where: { "areaManagerEmail": areaManagerEmail }
        });
        if (!area) {
            throw new Error('Couldn\'t find an area by area manager. email: ' + areaManagerEmail);
        }
        const schools = await Schools.findAll({
            where: { "areaId": area.id }
        });
        if (!schools) {
            throw new Error('Couldn\'t find a schools by area.');
        }
        const newGroups = [];
        for (let i = 0; i < schools.length; i++) {
            const school = schools[i];
            const groupsBySchool = await school.getGroups();
            for (const group of groupsBySchool) {
                const students = await group.getStudents();
                const studentNames = students.map(student => {
                    const { firstName, lastName, ...rest } = student;
                    return `${firstName} ${lastName}`;
                });
                group.dataValues.students = studentNames;            
                newGroups.push(group);
            }
        }

        const responseData = newGroups.map(group => ({
            id: group.id,
            students: group.dataValues.students,
            memberCount: group.dataValues.students.length,
            capacity: group.capacity
        }));
 
        return responseData;

    } catch (error) {
        throw new Error('Failed to find an area by area manager: ' + error);
    }
}
***/

