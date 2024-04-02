// String2Int.js
const { Students, Cities, Schools, Areas } = require('../../models');

class String2Int {
    
    async getCityId(cityName) {
        try {
            const city = await Cities.findOne({
                where: { "cityName": cityName }
            });
            if (!city) {
                throw new Error('Problem - City: "' + cityName + '" was not found in the system');
            }
            return city.id;
        } catch (error) {
            throw new Error('Error: process of finding the city: "' + cityName + '" failed. Description: ' + error);
        }
    }

    async getAreaId(areaName) {
        try {
            const area = await Areas.findOne({
                where: { "areaName": areaName }
            });
            if (!area) {
                throw new Error('Problem - Area: "' + areaName + '" was not found in the system');
            }
            return area.id;
        } catch (error) {
            throw new Error('Error: process of finding the area: "' + areaName + '" failed. Description: ' + error);
        }
    }

    async getSchoolId(schoolName) {
        try {
            const school = await Schools.findOne({
                where: { "schoolName": schoolName }
            });
            if (!school) {
                throw new Error('Problem - School: "' + schoolName + '" was not found in the system');
            }
            return school.id;
        } catch (error) {
            throw new Error('Error: process of finding the school: "' + schoolName + '" failed. Description: ' + error);
        }
    }
    
    async getCityNameById(cityId) {
        try {
            const city = await Cities.findOne({
                where: { "id": cityId }
            });
            if (!city) {
                throw new Error('Problem - City with id: "' + cityId + '" was not found in the system');
            }
            return city.cityName;
        } catch (error) {
            throw new Error('Error: process of finding the city: "' + cityName + '" failed. Description: ' + error);
        }
    }

    async getAreaNameById(areaId) {
        try {
            const area = await Areas.findOne({
                where: { "id": areaId }
            });
            if (!area) {
                throw new Error('Problem - Area with id: "' + areaName + '" was not found in the system');
            }
            return area.areaName;
        } catch (error) {
            throw new Error('Error: process of finding the area: "' + areaName + '" failed. Description: ' + error);
        }
    }

    async getSchoolNameById(schoolId) {
        try {
            const school = await Schools.findOne({
                where: { "id": schoolId }
            });
            if (!school) {
                throw new Error('Problem - School with id: "' + schoolName + '" was not found in the system');
            }
            return school.schoolName;
        } catch (error) {
            throw new Error('Error: process of finding the school: "' + schoolName + '" failed. Description: ' + error);
        }
    }
}

module.exports = new String2Int();
