const { Sequelize } = require('sequelize');
const {Groups, Schools, Students, Areas, Cities, Staffs, Houses} = require('../models');
const userManagementLogic = require("./UserManagementLogic")
const EmailEncryptor = require('./utils/EmailEncryptor');
const { usersLogger, groupsLogger } = require('../utils/Logger');
const argumentChecker = require('./utils/ArgumentChecker');
const StaffStudentLogic = require('./StaffStudentLogic');
const String2Int = require('./utils/String2Int');

class StaffGroupLogic {

    // Create a group
    // Input: groupSize - the size of the group to create
    //        schoolId - the id of the school to create the group for
    //        userEmail - the email of the user creating the group
    // Output: the group object
    async createGroup(groupSize, schoolId, userEmail) {
        try {
            groupsLogger.info("Initiating Create Group for school ID: " + schoolId + ". of size:" + groupSize + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments([groupSize, schoolId, userEmail], ["groupSize", "schoolId", "userEmail"]);

            const school = await Schools.findOne({
                where: { id: schoolId }
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

            const schoolName = await String2Int.getSchoolNameById(schoolId)
            const responseData = {
                id: group.id,
                students: group.dataValues.students,
                memberCount: group.dataValues.students.length,
                capacity: group.capacity,
                schoolId: group.schoolId,
                schoolName: schoolName
            };
            groupsLogger.info("Successfully created group for school ID: " + schoolId + ". of size:" + groupSize + ". By email: " + userEmail);
            return responseData;

        } catch (error) {
            groupsLogger.error("Failed to create group for school ID: " + schoolId + ". of size:" + groupSize + ". By email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to create group: ' + error);
        }
    }

    // get all groups related to team owner
    // Input: teamOwnerEmailAddr - the email of the team owner
    // Output: an array of groups
    async getGroupsByTeamOwner(teamOwnerEmailAddr) {
        try {
            groupsLogger.debug("Initiating Get Groups by Team Owner for email: " + teamOwnerEmailAddr);
            argumentChecker.checkSingleArugments([teamOwnerEmailAddr], ["teamOwnerEmailAddr"]);

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

            const responseData = await Promise.all(groups.map(async group => {
                const schoolName = await String2Int.getSchoolNameById(group.schoolId);
                return {
                    id: group.id,
                    students: group.dataValues.students,
                    memberCount: group.dataValues.students.length,
                    capacity: group.capacity,
                    schoolId: group.schoolId,
                    schoolName: schoolName
                };
            }));
            // Sort responseData by id
            responseData.sort((a, b) => a.id - b.id);

            groupsLogger.debug("Successfully got groups by Team Owner for email: " + teamOwnerEmailAddr);
            return responseData;
        } catch (error) {
            groupsLogger.error("Failed to get groups by Team Owner for email: " + teamOwnerEmailAddr + ". Reason: " + error);
            throw new Error('Failed to find an area by team owner: ' + error);
        }
    }


    // get all groups related to city manager
    // Input: cityManagerEmail - the email of the city manager
    // Output: an array of groups
    async getGroupsByCityManager(cityManagerEmail) {
        try {
            groupsLogger.debug("Initiating Get Groups by City Manager for email: " + cityManagerEmail);
            argumentChecker.checkSingleArugments([cityManagerEmail], ["cityManagerEmail"]);

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
                for (let group of groupsBySchool) {
                    const students = await group.getStudents();
                    const studentNames = students.map(student => {
                        const { firstName, lastName, ...rest } = student;
                        return `${firstName} ${lastName}`;
                    });
                    group.dataValues.students = studentNames;
                    newGroups.push(group);
                }
            }

            //const responseData = newGroups.map(group => ({
            //    id: group.id,
            //    students: group.dataValues.students,
            //    memberCount: group.dataValues.students.length,
            //    capacity: group.capacity,
            //    schoolId: group.schoolId,
            //    schoolName: await String2Int.getSchoolNameById(group.schoolId)
            //}));
            const responseData = await Promise.all(newGroups.map(async group => {
                const schoolName = await String2Int.getSchoolNameById(group.schoolId);
                return {
                    id: group.id,
                    students: group.dataValues.students,
                    memberCount: group.dataValues.students.length,
                    capacity: group.capacity,
                    schoolId: group.schoolId,
                    schoolName: schoolName
                };
            }));

            // Sort responseData by id
            responseData.sort((a, b) => a.id - b.id);

            groupsLogger.debug("Successfully got groups by City Manager for email: " + cityManagerEmail);
            return responseData;

        } catch (error) {
            groupsLogger.error("Failed to get groups by City Manager for email: " + cityManagerEmail + ". Reason: " + error);
            throw new Error('Failed to find an area by city manager: ' + error);
        }
    }

    // get all groups in the requester city
    // Output: an array of groups
    async getAllGroups() {
        try {
            groupsLogger.debug("Initiating Get All Groups");

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

            const responseData = await Promise.all(groups.map(async group => {
                const schoolName = await String2Int.getSchoolNameById(group.schoolId);
                return {
                    id: group.id,
                    students: group.dataValues.students,
                    memberCount: group.dataValues.students.length,
                    capacity: group.capacity,
                    schoolId: group.schoolId,
                    schoolName: schoolName
                };
            }));

            // Sort responseData by id
            responseData.sort((a, b) => a.id - b.id);

            groupsLogger.debug("Successfully got all groups");
            return responseData;

        } catch (error) {
            groupsLogger.error("Failed to get all groups. Reason: " + error);
            throw new Error('Failed to get all groups: ' + error);
        }
    }


    // get a group by id
    // Input: groupId - the id of the group to get
    //        user - the user requesting the group
    // Output: the group object
    async getGroupById(groupId, user) {
        try {
            groupsLogger.debug("Initiating Get Group by ID for group ID: " + groupId + ". By user: " + user.email);
            argumentChecker.checkSingleArugments([groupId, user], ["groupId", "user"]);

            if (user.role == "Student") {
                const studentsGroupId = await StaffStudentLogic.getGroupIdOfStudent(user.email);

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

            const students = await group.getStudents();

            const studentNames = students.map(student => {
                const { firstName, lastName, email, ...rest } = student;
                const encryptedEmail = EmailEncryptor.encryptEmail(email);

                return { fullname: `${firstName} ${lastName}`, email: email, encryptedEmail: encryptedEmail };
            });
            group.dataValues.students = studentNames;

            const schoolName = await String2Int.getSchoolNameById(group.schoolId)
            const responseData = {
                id: group.id,
                students: group.dataValues.students,
                memberCount: group.dataValues.students.length,
                capacity: group.capacity,
                houseId: group.houseId,
                schoolId: group.schoolId,
                schoolName: schoolName
            };

            groupsLogger.debug("Successfully got group by ID for group ID: " + groupId + ". By user: " + user.email);
            return responseData;

        } catch (error) {
            groupsLogger.error("Failed to get group by ID for group ID: " + groupId + ". By user: " + user.email + ". Reason: " + error);
            throw new Error('Failed to find a group by ID ' + error);
        }
    }

    // get all groups in the city
    // Input: cityName - the name of the city to get the groups for
    // Output: an array of groups
    async getSchoolsByCity(cityName) {
        try {
            groupsLogger.debug("Initiating Get Schools by City for city: " + cityName);
            argumentChecker.checkSingleArugments([cityName], ["cityName"]);


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

            // Sort responseData by id
            responseData.sort((a, b) => a.id - b.id);

            groupsLogger.debug("Successfully got schools by City for city: " + cityName);
            return responseData;

        } catch (error) {
            groupsLogger.error("Failed to get schools by City for city: " + cityName + ". Reason: " + error);
            throw new Error('Failed to get schools by city ' + error);
        }
    }

    // get all groups without a house
    // Input: schoolId - the id of the school to get the groups for
    // Output: an array of groups
    async getAllGroupsWithoutHouse(schoolId) {
        try {
            groupsLogger.debug("Initiating Get all groups without house for school: " + schoolId);
            argumentChecker.checkSingleArugments([schoolId], ["schoolId"]);

            const groups = await Groups.findAll({
                where: { schoolId: schoolId, houseId: null }
            });
            if (!groups) {
                throw new Error('groups not found');
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

            const responseData = await Promise.all(groups.map(async group => {
                const schoolName = await String2Int.getSchoolNameById(group.schoolId);
                return {
                    id: group.id,
                    students: group.dataValues.students,
                    memberCount: group.dataValues.students.length,
                    capacity: group.capacity,
                    schoolId: group.schoolId,
                    schoolName: schoolName
                };
            }));

            // Sort responseData by id
            responseData.sort((a, b) => a.id - b.id);

            groupsLogger.debug("Successfully got all groups without house for school: " + schoolId);
            return responseData;

        } catch (error) {
            groupsLogger.error("Failed to get all groups without house for school: " + schoolId + ". Reason: " + error);
            throw new Error('Failed to get school\'s groups without a house ' + error);
        }
    }


    // delete a group by id
    // Input: id - the id of the group to delete
    //        userEmail - the email of the user deleting the group
    // Output: none
    async deleteGroup(id, userEmail) {
        try {
            groupsLogger.info("Initiating Delete Group by ID for group ID: " + id + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments([id, userEmail], ["id", "userEmail"]);

            const group = await Groups.findOne({
                where: { id: id }
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

            groupsLogger.info("Successfully deleted group by ID for group ID: " + id + ". By email: " + userEmail);
            return;

        } catch (error) {
            groupsLogger.error("Failed to delete group by ID for group ID: " + id + ". By email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to delete a group by id: ' + error);
        }
    }


    // update a group by id
    // Input: id - the id of the group to update
    //        updatedFields - the fields to update
    //        userEmail - the email of the user updating the group
    // Output: the updated group object
    async updateGroup(id, updatedFields, userEmail) {
        try {
            groupsLogger.info("Initiating Update Group by ID for group ID: " + id + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments([id, updatedFields, userEmail], ["id", "updatedFields", "userEmail"]);

            const group = await Groups.findOne({
                where: { id: id }
            });
            if (!group) {
                throw new Error('Couldn\'t find a group with that id.');
            }

            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    group[key] = updatedFields[key];
                }
            }

            await group.save();

            groupsLogger.info("Successfully updated group by ID for group ID: " + id + ". By email: " + userEmail);
            return group;

        } catch (error) {
            groupsLogger.error("Failed to update group by ID for group ID: " + id + ". By email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to update a group by id: ' + error);
        }
    }

    // get all available groups in a school
    //        schoolName - the name of the school to get the groups for
    //        requesterEmail - the email of the user deleting the group
    // Output: an array of groups
    async getAvailableGroupsBySchool(schoolName, requesterEmail) {
        try {
            groupsLogger.debug("Initiating Get available Groups by School for school name: " + schoolName + ". By user: " + requesterEmail);
            argumentChecker.checkSingleArugments([schoolName, requesterEmail], ["schoolName", "requesterEmail"]);

            const schoolId = await String2Int.getSchoolId(schoolName)
            const school = await Schools.findOne({
                where: { "cityId": schoolId }
            });
            if (!school) {
                throw new Error('Couldn\'t find school by Id:' + schoolId);
            }
            const groupsBySchool = await school.getGroups();

            const availableGroups = await Promise.all(groupsBySchool.map(async group => {
                const students = await group.getStudents();
                const memberCount = students.length;

                if (group.capacity > memberCount) {
                    // Add the memberCount to the group object
                    group.dataValues.memberCount = memberCount;
                    return group;
                } else {
                    return null;
                }
            }));

            // Filter out null values
            const filteredGroups = availableGroups.filter(group => group !== null);


            // Sort responseData by id
            filteredGroups.sort((a, b) => a.id - b.id);

            groupsLogger.debug("Successfully got available groups by School for school Id: " + schoolId + ". By user: " + requesterEmail);
            return filteredGroups;

        } catch (error) {
            groupsLogger.error("Failed to get available groups by School for school Id: " + schoolId + ". By user: " + requesterEmail + ". Reason: " + error);
            throw new Error('Failed to get available groups by school: ' + error);
        }
    }
}

module.exports = new StaffGroupLogic();

    // NOT USED - alternative implementation of joint routes - NOT USED
    // TODO IF BRING BACK - REFACTOR WITH LOGGER
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

// TODO IF BRING BACK - REFACTOR WITH LOGGER
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

                // Sort responseData by id
        responseData.sort((a, b) => a.id - b.id);
 
        return responseData;

    } catch (error) {
        throw new Error('Failed to find an area by area manager: ' + error);
    }
}
***/


        // get all groups in the requester city
// Output: an array of groups
