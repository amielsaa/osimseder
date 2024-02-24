// String2Int.js
const { Students, Cities, Schools } = require('../../models');

class String2Int {
    
    async getCityId(cityName) {
        try {
            const city = await Cities.findOne({
                where: { "cityName": cityName }
            });
            if (!city) {
                throw new Error('Problem - City: "' + cityName + '" was not found in the system');
            }
            console.log(city)
            console.log(city.id)
            return city.id;
        } catch (error) {
            throw new Error('Error: process of finding the city: "' + cityName + '" failed. Description: ' + error);
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
            console.log(school)
            console.log(school.id)
            return school.id;
        } catch (error) {
            throw new Error('Error: process of finding the school: "' + schoolName + '" failed. Description: ' + error);
        }
    }
}

module.exports = new String2Int();
