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

    async createHouse(address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded, teamOwnerEmail, residentAlternatePhoneNum, residentGender) {
        try {
            this.checkArguments([address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded, teamOwnerEmail, residentAlternatePhoneNum, residentGender]);
            const house = await Houses.create({
                address: address,
                residentLastName: residentLastName,
                residentFirstName: residentFirstName, 
                residentPhoneNum: residentPhoneNum, 
                languageNeeded: languageNeeded,
                teamOwnerEmail: teamOwnerEmail,
                residentAlternatePhoneNum: residentAlternatePhoneNum,
                residentGender: residentGender
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

    
    async getAllHousesOfCity(userEmail) {
        try {
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
            throw new Error('Failed to get all houses of city: ' + error);
        }
    }

    async getAllHousesOfTeamOwner(userEmail) {
        try {
            // console.log(user);
            const houses = await Houses.findAll({
                where: { teamOwnerEmail: userEmail }
            });
            if(!houses){
                throw new Error('Couldn\'t find houses.');
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
            throw new Error('Failed to get all houses of team owner: ' + error);
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
