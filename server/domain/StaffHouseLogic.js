const {Groups, Schools, Students, Areas, Cities, Staffs, Houses} = require('../models');

class StaffHouseLogic {
    checkArguments(parameters) {
        const parameterNames = ["address", "residentLastName", "residentFirstName", "residentPhoneNum", "languageNeeded"];
        for (let i = 0; i < parameters.length; i++) {
            const param = parameters[i];
            if (param === undefined || param === null) {
                throw new Error(`Parameter ${parameterNames[i]} is undefined`);
            }
            if (param === null) {
                throw new Error(`Parameter ${parameterNames[i]} is null`);
            }
        }
        return true;
    }

    async createHouse(address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded) {
        try {
            this.checkArguments([address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded]);
            const house = await Houses.create({
                address: address,
                residentLastName: residentLastName,
                residentFirstName: residentFirstName, 
                residentPhoneNum: residentPhoneNum, 
                languageNeeded: languageNeeded 
            });
            if (!house) {
                throw new Error('Couldn\'t create a house.');
            }
        
            // const students = await group.getStudents();
    
            // const studentNames = students.map(student => {
            //     const { firstName, lastName, ...rest } = student;
            //     return `${firstName} ${lastName}`;
            // });
    
            // group.dataValues.students = studentNames;            
            
            // const responseData = {
            //     id: group.id,
            //     students: group.dataValues.students,
            //     memberCount: group.dataValues.students.length,
            //     capacity: group.capacity
            // };
        
            return house;

        } catch (error) {
            throw new Error('Failed to create house: ' + error);
        }
    }

    async getAllHouses() {
        try {
            const houses = await Houses.findAll();
            if (!houses) {
                throw new Error('Couldn\'t get houses.');
            }
        
            // const students = await group.getStudents();
    
            // const studentNames = students.map(student => {
            //     const { firstName, lastName, ...rest } = student;
            //     return `${firstName} ${lastName}`;
            // });
    
            // group.dataValues.students = studentNames;            
            
            // const responseData = {
            //     id: group.id,
            //     students: group.dataValues.students,
            //     memberCount: group.dataValues.students.length,
            //     capacity: group.capacity
            // };
        
            return houses;

        } catch (error) {
            throw new Error('Failed to create house: ' + error);
        }
    }
    
    async getHouseById(houseId) {
        try {
            this.checkArguments([houseId])
            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if (!house) {
                throw new Error('Couldn\'t get house with that ID.');
            }
        
            // const students = await group.getStudents();
    
            // const studentNames = students.map(student => {
            //     const { firstName, lastName, ...rest } = student;
            //     return `${firstName} ${lastName}`;
            // });
    
            // group.dataValues.students = studentNames;            
            
            // const responseData = {
            //     id: group.id,
            //     students: group.dataValues.students,
            //     memberCount: group.dataValues.students.length,
            //     capacity: group.capacity
            // };
        
            return house;

        } catch (error) {
            throw new Error('Failed to create house: ' + error);
        }
    }

    async deleteHouse(houseId) {
        try {
            this.checkArguments([houseId])
            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if (!house) {
                throw new Error('Couldn\'t get house with that ID.');
            }
            await Houses.destroy({
                where: { id: houseId }
            });

            return { success: true, message: 'House deleted successfully' };
        
            // const students = await group.getStudents();
    
            // const studentNames = students.map(student => {
            //     const { firstName, lastName, ...rest } = student;
            //     return `${firstName} ${lastName}`;
            // });
    
            // group.dataValues.students = studentNames;            
            
            // const responseData = {
            //     id: group.id,
            //     students: group.dataValues.students,
            //     memberCount: group.dataValues.students.length,
            //     capacity: group.capacity
            // };
        
            // return house;

        } catch (error) {
            throw new Error('Failed to create house: ' + error);
        }
    }

}

module.exports = new StaffHouseLogic();
