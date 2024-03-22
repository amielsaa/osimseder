const { Sequelize } = require('sequelize');
const {Groups, Schools, Students, Areas, Cities, Staffs, Houses} = require('../models');

class StaffLogic {

    async getTeamOwnersByCityName(cityName) {
        try {
            if(cityName==null){
                throw new Error('City name is null.');
            }
            if(cityName==undefined){
                throw new Error('City name is undefined.');
            }
            const city = await Cities.findOne({
                where: {cityName: cityName}
            })
            if(!city){
                throw new Error('Couldn\'t find a city by that name.');
            }
            const teamowners = await Staffs.findAll({
                where: {cityId: city.id}
            });
            if (!teamowners) {
                throw new Error('Couldn\'t find team owners by that city.');
            }

            console.log(teamowners[0])

            const teamOwnersList = teamowners.map(owner => ({
                id: owner.dataValues.id,
                email: owner.dataValues.email,
                fullName: `${owner.dataValues.firstName} ${owner.dataValues.lastName}`
            }));
    
            return teamOwnersList;

        } catch (error) {
            throw new Error('Failed to find all team owners by city name: ' + error);
        }
    }

}

module.exports = new StaffLogic();
