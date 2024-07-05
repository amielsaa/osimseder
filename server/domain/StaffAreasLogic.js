const { Areas } = require('../models');
const string2Int = require('./utils/String2Int');
const argumentChecker = require('./utils/ArgumentChecker');
const { adminLogger } = require('../utils/Logger');
const { Op } = require('sequelize');


class StaffAreasLogic {

    async createArea(areaName, cityId) {
        try {

            adminLogger.info("Initiating Create Area: " + areaName);
            argumentChecker.checkSingleArugments([areaName], ["areaName"]);
            argumentChecker.checkSingleArugments([cityId], ["cityId"]);


            const area = await Areas.create({areaName: areaName,
                                             cityId: cityId,
                                             areaManagerEmail: "none"});
            if (!area) {
                throw new Error('Couldn\'t create a area.');
            }

            adminLogger.info("Successfully created area: " + areaName);
            return area;

        } catch (error) {
            adminLogger.error("Error creating area" + ". Reason: " + error);
            throw new Error('Failed to create area: ' + error);
        }
    }


    async fetchAllAreasByCity(cityId) {
        try {
            adminLogger.debug("Initiate get all area by city ID: " + cityId + ".");
            
            const area = await Areas.findAll({
                where: {cityId: cityId}
            });

            adminLogger.debug("Successfully got all area.");
            return area;

        } catch (error) {
            adminLogger.error("Failed to get all area.");
            throw new Error('Failed to get all area: ' + error);
        }
    }
 
    
    async deleteArea(areaId) {
        try {
            adminLogger.info("Initiate delete area: " + areaId + ".");
            argumentChecker.checkSingleArugments([areaId], ["areaId"]);


            const area = await Areas.findOne({
                where: {id: areaId}
            });
            if (!area) {
                throw new Error('Couldn\'t get area with that ID.');
            }
            await Areas.destroy({
                where: { id: areaId }
            });

            adminLogger.info("Successfully deleted area by id: " + areaId + ".");
            return { success: true, message: 'Area deleted successfully' };
        
        } catch (error) {
            adminLogger.error("Failed to delete area by id: " + areaId + ". Reason: " + error);
            throw new Error('Failed to delete area: ' + error);
        }
    }


    async updateArea(areaId, updatedFields) {
        try {
            adminLogger.info("Initiate update area ID: " + areaId + ".");
            argumentChecker.checkSingleArugments([areaId], ["areaId"]);

            const area = await Areas.findOne({
                where: { id: areaId }
            });
            if(!area){
                throw new Error('Couldn\'t find a area with that id.');
            }
            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    area[key] = updatedFields[key];
                }
            }
            await area.save();

            adminLogger.info("Successfully updated area.");        
            return area;

        } catch (error) {
            adminLogger.error("Failed to update area. Reason: " + error);
            throw new Error('Failed to update a area: ' + error);
        }
    }


}

module.exports = new StaffAreasLogic();