const { Groups, Cities, Staffs, Houses, Areas } = require('../models');
const string2Int = require('./utils/String2Int');
const argumentChecker = require('./utils/ArgumentChecker');
const { housesLogger } = require('../utils/Logger');
const { Op } = require('sequelize');


class StaffHouseLogic {

// Create a new house
// Input: newFields - object with the following REQUIRED fields: address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded, city, area
//        userEmail - the email of the user creating the house
// Output: the created house object
    async createHouse(newFields, userEmail) {
        try {

            housesLogger.info("Initiating Create House By email: " + userEmail);
            argumentChecker.checkSingleArugments([userEmail], ["userEmail"]);
            argumentChecker.checkByKeys(newFields, "newFields", ["address", "residentLastName", "residentFirstName", "residentPhoneNum", "residentGender", "languageNeeded", "numberOfRooms", "city", "area"]);

            newFields["cityId"] = await string2Int.getCityId(newFields["city"]);
            newFields["areaId"] = await string2Int.getAreaId(newFields["area"]);
            newFields["teamOwnerEmail"] = userEmail;

            const house = await Houses.create(newFields);
            if (!house) {
                throw new Error('Couldn\'t create a house.');
            }

            housesLogger.info("Successfully created house for city: " + newFields["cityId"] + ". By email: " + userEmail);
            return house;

        } catch (error) {
            housesLogger.error("Error creating house By email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to create house: ' + error);
        }
    }

//TODO YOAV  - check if needed
// Get all houses in the system
// Input: userEmail - the email of the user requesting the houses
// Output: an array of all houses
    async getAllHousesOfSystem(userEmail) {
        try {
            housesLogger.debug("Initiate get all houses of system by email: " + userEmail);
            argumentChecker.checkSingleArugments([userEmail], ["userEmail"]);

            const user = await Staffs.findOne({
                where: {email: userEmail}
            });
            if(!user){
                throw new Error('Couldn\'t find a staff user.');
            }
            // console.log(user);
            const houses = await Houses.findAll();
            if(!houses){
                throw new Error('Couldn\'t find houses.');
            }

            // Sort houses by id
            houses.sort((a, b) => a.id - b.id);


            housesLogger.debug("Successfully got all houses of system by email: " + userEmail);
            return houses;

        } catch (error) {
            housesLogger.error("Failed to get all houses of system by email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to get all houses of system: ' + error);
        }
    }
    
// Get all houses in the requester's city
// Input: userEmail - the email of the user requesting the houses
// Output: an array of all houses
    async getAllHousesOfCity(userEmail) {
        try {
            housesLogger.debug("Initiate get all houses of city by email: " + userEmail);
            argumentChecker.checkSingleArugments([userEmail], ["userEmail"]);

            const user = await Staffs.findOne({
                where: {email: userEmail}
            });
            if(!user){
                throw new Error('Couldn\'t find a staff user.');
            }
            // console.log(user);
            const houses = await Houses.findAll({
                where: { cityId: user.cityId }
            });
            if(!houses){
                throw new Error('Couldn\'t find houses.');
            }

            // Sort houses by id
            houses.sort((a, b) => a.id - b.id);


            housesLogger.debug("Successfully got all houses of city by email: " + userEmail);
            return houses;

        } catch (error) {
            housesLogger.error("Failed to get all houses of city by email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to get all houses of city: ' + error);
        }
    }
    

// Get all houses in the requester's area
// Input: areaManagerEmail - the email of the user requesting the houses
// Output: an array of all houses
    async getAllHousesOfArea(areaManagerEmail) {
        try {
            housesLogger.debug("Initiate get all houses of area by email: " + areaManagerEmail);
            argumentChecker.checkSingleArugments([areaManagerEmail], ["areaManagerEmail"]);

            const user = await Staffs.findOne({
                where: { email: areaManagerEmail }
            });
            if(!user){
                throw new Error('Couldn\'t find a staff user.');
            }
            const area = await Areas.findOne({
                where: { "areaManagerEmail": areaManagerEmail }
            });

            const houses = await Houses.findAll({
                where: { areaId: area.id }
            });
            if(!houses){
                throw new Error('Couldn\'t find houses.');
            }

            // Sort houses by id
            houses.sort((a, b) => a.id - b.id);


            housesLogger.debug("Successfully got all houses of area by email: " + areaManagerEmail);
            return houses;

        } catch (error) {
            housesLogger.error("Failed to get all houses of area by email: " + areaManagerEmail + ". Reason: " + error);
            throw new Error('Failed to get all houses of area: ' + error);
        }
    }

 // Get all houses of teamOwner
 // Input: userEmail - the email of the user requesting the houses
 // Output: an array of all houses
    async getAllHousesOfTeamOwner(userEmail) {
        try {
            housesLogger.debug("Initiate get all houses of team owner by email: " + userEmail);
            argumentChecker.checkSingleArugments([userEmail], ["userEmail"]);

            const houses = await Houses.findAll({
                where: { 
                    [Op.or]:[
                        {teamOwnerEmail: userEmail },
                        {teamOwnerEmail_2: userEmail }
                    ]
                }
            });
            if(!houses){
                throw new Error('Couldn\'t find houses.');
            }

            // Sort houses by id
            houses.sort((a, b) => a.id - b.id);


            housesLogger.debug("Successfully got all houses of team owner by email: " + userEmail);
            return houses;

        } catch (error) {
            housesLogger.error("Failed to get all houses of team owner by email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to get all houses of team owner: ' + error);
        }
    }

    
// Get house by ID
// Input: houseId - the id of the house to get
// Output: the house object
    async getHouseById(houseId) {
        try {
            housesLogger.debug("Initiate get house by id: " + houseId);
            argumentChecker.checkSingleArugments([houseId], ["houseId"]);

            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if (!house) {
                throw new Error('Couldn\'t get house with that ID.');
            }
        

            const city = await house.getCity();
            if (!city) {
                throw new Error('Couldn\'t get city assigned to house.');
            }
            const area = await house.getArea();
            if (!area) {
                throw new Error('Couldn\'t get area assigned to house.');
            }

            let teamOwner1 = undefined;
            if (house.teamOwnerEmail) {
                teamOwner1 = await Staffs.findOne({
                    where: { email: house.teamOwnerEmail }
                });
                if (!teamOwner1) {
                    throw new Error('Couldn\'t get team owner 1 assigned to house.');
                }
            }

            let teamOwner2 = undefined;
            if(house.teamOwnerEmail_2){
                teamOwner2 = await Staffs.findOne({
                    where: {email: house.teamOwnerEmail_2}
                });
                if (!teamOwner2) {
                    throw new Error('Couldn\'t get team owner 2 assigned to house.');
                }
            }

            const getFormattedNames = (person) => {
                const { firstName, lastName, ...rest } = person;
                return `${firstName} ${lastName}`;
            };
                        
            let formattedTeamOwner1 = undefined;
            if (teamOwner1) {
                formattedTeamOwner1 = getFormattedNames(teamOwner1);
            }            

            let formattedTeamOwner2 = undefined;
            if (teamOwner2) {
                formattedTeamOwner2 = getFormattedNames(teamOwner2);
            }

            house.dataValues["teamOwner1"] = formattedTeamOwner1;
            house.dataValues["teamOwner2"] = formattedTeamOwner2;
            house.dataValues["cityName"] = city.cityName;
            house.dataValues["areaName"] = area.areaName;

            housesLogger.debug("Successfully got house by id: " + houseId);
            return house;

        } catch (error) {
            housesLogger.error("Failed to get house by id: " + houseId + ". Reason: " + error);
            throw new Error('Failed to get house by id: ' + error);
        }
    }

// Delete house by ID
// Input: houseId - the id of the house to delete
//        userEmail - the email of the user assigning the house
// Output: success message
    async deleteHouse(houseId, userEmail) {
        try {
            housesLogger.info("Initiate delete house by id: " + houseId + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments([houseId, userEmail], ["houseId", "userEmail"]);


            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if (!house) {
                throw new Error('Couldn\'t get house with that ID.');
            }
            await Houses.destroy({
                where: { id: houseId }
            });

            housesLogger.info("Successfully deleted house by id: " + houseId + ". By email: " + userEmail);
            return { success: true, message: 'House deleted successfully' };
        
        } catch (error) {
            housesLogger.error("Failed to delete house by id: " + houseId + ". Reason: " + error);
            throw new Error('Failed to delete house: ' + error);
        }
    }

// Assign house to group
// Input: houseId - the id of the house to assign
//        groupId - the id of the group to assign to
//        userEmail - the email of the user assigning the house
// Output: the group object
    async assignGroupToHouse(houseId, groupId, userEmail) {
        try {
            housesLogger.info("Initiate assign group to house by house id: " + houseId + " and group id: " + groupId + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments([houseId, groupId, userEmail], ["houseId", "groupId", "userEmail"]);

            const group = await Groups.findOne({
                where: {id: groupId}
            });
            if (!group) {
                throw new Error('Couldn\'t get group with that ID.');
            }
            const updatedGroup = await Groups.update(
                { houseId: houseId },
                { where: { id: groupId }}
            );

            housesLogger.info("Successfully assigned group to house by house id: " + houseId + " and group id: " + groupId + ". By email: " + userEmail);
            return group;
            
            

        } catch (error) {
            housesLogger.error("Failed to assign group to house by house id: " + houseId + " and group id: " + groupId + ". By email: " + userEmail+ ". Reason: " + error);
            throw new Error('Failed to assign house to group: ' + error);
        }
    }

// Assign second team owner to house
// Input: houseId - the id of the house to assign
//        newTeamOwner - the email of the new team owner
//        userEmail - the email of the user assigning the house
// Output: the house object
    async assignSecondTeamOwner(houseId, newTeamOwner, requesterEmail) {
        try {
            housesLogger.info("Initiate assign second team owner to house by house id: " + houseId + ". New Team Owner: " + newTeamOwner + ". By email: " + requesterEmail);
            argumentChecker.checkSingleArugments([houseId, newTeamOwner, requesterEmail], ["houseId", "newTeamOwner", "requesterEmail"]);

            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if (!house) {
                throw new Error('Couldn\'t get house with that ID.');
            }
            const updatedHouse = await Houses.update(
                { "teamOwnerEmail_2": newTeamOwner },
                { where: { id: houseId }}
            );


            housesLogger.info("Successfully assigned second team owner to house by house id: " + houseId + ". New Team Owner: " + newTeamOwner + ". By email: " + requesterEmail);
            return house;

        } catch (error) {
            housesLogger.error("Failed to assign second team owner to house by house id: " + houseId + ". By email: " + userEmail + ". Reason: " + error);
            throw new Error('Failed to assign house to group: ' + error);
        }
    }

// Get all areas grouped by city
// Output: an object with city names as keys and arrays of areas as values
    async getAllAreasByCity() {
        try {
            housesLogger.debug("Initiate get all areas by city");

            const cities = await Cities.findAll({});
            if (!cities) {
                throw new Error('Couldn\'t get cities.');
            }

            let result = {};

            for(let i=0; i<cities.length; i++){
                const areas = await cities[i].getAreas();
                result[cities[i].cityName] = areas;
            }

            housesLogger.debug("Successfully got all areas by city");
            return result;

        } catch (error) {
            housesLogger.error("Failed to get all areas by city. Reason: " + error);
            throw new Error('Failed to get areas by city: ' + error);
        }
    }

// Update house by ID
// Input: houseId - the id of the house to update
//        updatedFields - object with the fields to update
//        userEmail - the email of the user updating the house
// Output: the updated house object
    async updateHouse(houseId, updatedFields, requesterEmail) {
        try {
            housesLogger.info("Initiate update house by id: " + houseId + ". By email: " + requesterEmail);
            argumentChecker.checkSingleArugments([houseId, requesterEmail], ["houseId", "requesterEmail"]);
            //argumentChecker.checkByKeys(updatedFields, "updatedFields", ["address", "residentLastName", "residentFirstName", "residentPhoneNum", "residentGender", "languageNeeded", "numberOfRooms", "areaId"]);
            //TODO add check on the updated fields values
            const house = await Houses.findOne({
                where: { id: houseId }
            });
            if(!house){
                throw new Error('Couldn\'t find a house with that id.');
            }
            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    house[key] = updatedFields[key];
                }
            }
            await house.save();

            housesLogger.info("Successfully updated house by id: " + houseId + ". By email: " + requesterEmail);        
            return house;

        } catch (error) {
            housesLogger.error("Failed to update house by id: " + houseId + ". By email: " + requesterEmail + ". Reason: " + error);
            throw new Error('Failed to update a house by id: ' + error);
        }
    }

// Get all groups of house
// Input: houseId - the id of the house to get groups for
// Output: an array of groups
    async getHouseGroups(houseId) {
        try {
            housesLogger.debug("Initiate get house groups by house id: " + houseId);
            argumentChecker.checkSingleArugments([houseId], ["houseId"]);

            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if(!house){
                throw new Error('Couldn\'t find a house with that id.');
            }
            
            const groups = await house.getGroups();
        
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

            // Sort responseData by id
            responseData.sort((a, b) => a.id - b.id);

            housesLogger.debug("Successfully got house groups by house id: " + houseId);
            return responseData;

        } catch (error) {
            housesLogger.error("Failed to get house groups by house id: " + houseId + ". Reason: " + error);
            throw new Error('Failed to update a house by id: ' + error);
        }
    }
}

module.exports = new StaffHouseLogic();