const { Schools } = require('../models');
const string2Int = require('./utils/String2Int');
const argumentChecker = require('./utils/ArgumentChecker');
const { adminLogger } = require('../utils/Logger');
const { Op } = require('sequelize');


class StaffSchoolLogic {

    async createSchool(schoolName, cityId) {
        try {

            adminLogger.info("Initiating Create School: " + schoolName);
            argumentChecker.checkSingleArugments([schoolName], ["schoolName"]);
            argumentChecker.checkSingleArugments([cityId], ["cityId"]);


            const school = await Schools.create({schoolName: schoolName, cityId: cityId});
            if (!school) {
                throw new Error('Couldn\'t create a school.');
            }

            adminLogger.info("Successfully created school: " + schoolName);
            return school;

        } catch (error) {
            adminLogger.error("Error creating school" + ". Reason: " + error);
            throw new Error('Failed to create school: ' + error);
        }
    }


    async fetchAllSchoolsByCity(cityId) {
        try {
            adminLogger.debug("Initiate get all schools by city ID: " + cityId + ".");
            
            const schools = await Schools.findAll({
                where: {cityId: cityId}
            });

            adminLogger.debug("Successfully got all schools.");
            return schools;

        } catch (error) {
            adminLogger.error("Failed to get all schools.");
            throw new Error('Failed to get all schools: ' + error);
        }
    }
 
    
    async deleteSchool(schoolId) {
        try {
            adminLogger.info("Initiate delete school: " + schoolId + ".");
            argumentChecker.checkSingleArugments([schoolId], ["schoolId"]);


            const school = await Schools.findOne({
                where: {id: schoolId}
            });
            if (!school) {
                throw new Error('Couldn\'t get school with that ID.');
            }
            await Schools.destroy({
                where: { id: schoolId }
            });

            adminLogger.info("Successfully deleted school by id: " + schoolId + ".");
            return { success: true, message: 'School deleted successfully' };
        
        } catch (error) {
            adminLogger.error("Failed to delete school by id: " + schoolId + ". Reason: " + error);
            throw new Error('Failed to delete school: ' + error);
        }
    }


    async updateSchool(schoolId, updatedFields) {
        try {
            adminLogger.info("Initiate update school ID: " + schoolId + ".");
            argumentChecker.checkSingleArugments([schoolId], ["schoolId"]);

            const school = await Schools.findOne({
                where: { id: schoolId }
            });
            if(!school){
                throw new Error('Couldn\'t find a school with that id.');
            }
            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    school[key] = updatedFields[key];
                }
            }
            await school.save();

            adminLogger.info("Successfully updated school.");        
            return school;

        } catch (error) {
            adminLogger.error("Failed to update school. Reason: " + error);
            throw new Error('Failed to update a school: ' + error);
        }
    }


}

module.exports = new StaffSchoolLogic();