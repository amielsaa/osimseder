const {Cities, Staffs} = require('../models');
const argumentChecker = require('./utils/ArgumentChecker');
const { housesLogger } = require('../utils/logger');

class StaffLogic {

// Get all team owners by city name
// Input: the name of the city
// Output: a list of team owners in that city
    async getTeamOwnersByCityName(cityName) {
        try {
            housesLogger.debug('Getting all team owners by city name: ' + cityName);
            argumentChecker([cityName], ['cityName']);

            const city = await Cities.findOne({
                where: {cityName: cityName}
            })
            if(!city){
                throw new Error('Couldn\'t find a city by that name.');
            }
            const teamowners = await Staffs.findAll({
                where: {cityId: city.id, accesses:'B'}
            });
            if (!teamowners) {
                throw new Error('Couldn\'t find team owners by that city.');
            }
            const teamOwnersList = teamowners.map(owner => ({
                id: owner.dataValues.id,
                email: owner.dataValues.email,
                fullName: `${owner.dataValues.firstName} ${owner.dataValues.lastName}`
            }));

            housesLogger.debug('Successfully found team owners by city name: ' + cityName);
            return teamOwnersList;

        } catch (error) {
            housesLogger.error('Failed to find all team owners by city name: ' + error);
            throw new Error('Failed to find all team owners by city name: ' + error);
        }
    }

    async getStaffName(staffEmail) {
        try {
            if(staffEmail==null){
                throw new Error('Staff name is null.');
            }
            if(staffEmail==undefined){
                throw new Error('Staff name is undefined.');
            }
            const staffMember = await Staffs.findOne({
                where: {email: staffEmail}
            });
            if (!staffMember) {
                throw new Error('Couldn\'t find staff member by that email.');
            }

            const responseData = {
                email: staffMember.dataValues.email,
                fullName: `${staffMember.dataValues.firstName} ${staffMember.dataValues.lastName}`
            };

            // const responseData = {
            //     id: group.id,
            //     students: group.dataValues.students,
            //     memberCount: group.dataValues.students.length,
            //     capacity: group.capacity
            // };
    
            return responseData;

        } catch (error) {
            throw new Error('Failed to find staff member by email: ' + error);
        }
    }

}

module.exports = new StaffLogic();
