const { Cities } = require('../models');
const string2Int = require('./utils/String2Int');
const argumentChecker = require('./utils/ArgumentChecker');
const { adminLogger } = require('../utils/Logger');
const { Op } = require('sequelize');


class StaffCitiesLogic {

    async createCity(cityName) {
        try {

            adminLogger.info("Initiating Create City: " + cityName);
            argumentChecker.checkSingleArugments([cityName], ["cityName"]);

            const city = await Cities.create({cityName: cityName, cityManagerEmail: "none"});
            if (!city) {
                throw new Error('Couldn\'t create a city.');
            }

            adminLogger.info("Successfully created city: " + cityName);
            return city;

        } catch (error) {
            adminLogger.error("Error creating city" + ". Reason: " + error);
            throw new Error('Failed to create city: ' + error);
        }
    }

    async fetchAllCities() {
        try {
            adminLogger.debug("Initiate get all cities.");

            const cities = await Cities.findAll();

            adminLogger.debug("Successfully got all cities.");
            return cities;

        } catch (error) {
            adminLogger.error("Failed to get all cities.");
            throw new Error('Failed to get all cities: ' + error);
        }
    }
 
    
    async deleteCity(cityId) {
        try {
            adminLogger.info("Initiate delete city: " + cityId + ".");
            argumentChecker.checkSingleArugments([cityId], ["cityId"]);


            const city = await Cities.findOne({
                where: {id: cityId}
            });
            if (!city) {
                throw new Error('Couldn\'t get city with that ID.');
            }
            await Cities.destroy({
                where: { id: cityId }
            });

            adminLogger.info("Successfully deleted city by id: " + cityId + ".");
            return { success: true, message: 'City deleted successfully' };
        
        } catch (error) {
            adminLogger.error("Failed to delete city by id: " + cityId + ". Reason: " + error);
            throw new Error('Failed to delete city: ' + error);
        }
    }


    async updateCity(cityId, updatedFields) {
        try {
            adminLogger.info("Initiate update city.");
            argumentChecker.checkSingleArugments([cityId], ["cityId"]);

            const city = await Cities.findOne({
                where: { id: cityId }
            });
            if(!city){
                throw new Error('Couldn\'t find a city with that id.');
            }
            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    city[key] = updatedFields[key];
                }
            }
            await city.save();

            adminLogger.info("Successfully updated city.");        
            return city;

        } catch (error) {
            adminLogger.error("Failed to update city. Reason: " + error);
            throw new Error('Failed to update a city: ' + error);
        }
    }
}

module.exports = new StaffCitiesLogic();