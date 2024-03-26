const { Groups, Schools, Students, Areas, Cities, Staffs, Houses } = require('../models');
const string2Int = require('./utils/String2Int');

class LocationLogic {
    async getAllCities() {
        try {
            const cities = await Cities.findAll({});
            return cities;

        } catch (error) {
            throw new Error('Failed to get areas by city: ' + error);
        }
    }
    
    async getAllAreasByCity() {
        try {
            const cities = await Cities.findAll({});
            if (!cities) {
                throw new Error('Couldn\'t get cities.');
            }

            let result = {};

            for (let i = 0; i < cities.length; i++) {
                const areas = await cities[i].getAreas();
                result[cities[i].cityName] = areas;
            }
            return result;

        } catch (error) {
            throw new Error('Failed to get areas by city: ' + error);
        }
    }

    async getAreasByCityId(cityId) {
        try {
            const city = await Cities.findByPk(cityId);
            if (!city) {
                throw new Error('City not found');
            }
            const areas = await city.getAreas();
            return areas;

        } catch (error) {
            throw new Error('Failed to get areas by city: ' + error);
        }
    }


    async getSchoolsByCityId(cityId) {
        try {
            if (cityName === undefined) {
                throw new Error('cityname is undefined');
            }
            if (cityName === null) {
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
    

    async getAllSchoolsByCity() {
        try {
            if (cityName === undefined) {
                throw new Error('cityname is undefined');
            }
            if (cityName === null) {
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

}

module.exports = new LocationLogic();
