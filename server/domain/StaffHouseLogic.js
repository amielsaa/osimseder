const {Groups, Schools, Students, Areas, Cities, Staffs, Houses} = require('../models');

class StaffHouseLogic {
    checkArguments(parameters, parameterNames) {
        // const parameterNames = ["address", "residentLastName", "residentFirstName", "residentPhoneNum", "languageNeeded"];
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
            this.checkArguments([address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded, teamOwnerEmail, residentAlternatePhoneNum, residentGender],
                ["address", "residentLastName", "residentFirstName", "residentPhoneNum", "languageNeeded", "teamOwnerEmail", "residentAlternatePhoneNum", "residentGender"]
                );
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
            this.checkArguments([userEmail],
                ["userEmail"]);
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
            this.checkArguments([userEmail],
                ["userEmail"]);
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
            this.checkArguments([houseId],
                ["houseId"]);
            
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
            throw new Error('Failed to get house by id: ' + error);
        }
    }

    async deleteHouse(houseId) {
        try {
            this.checkArguments([houseId],
                ["houseId"]);
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
            throw new Error('Failed to delete house: ' + error);
        }
    }

    async assignGroupToHouse(houseId, groupId) {
        try {
            this.checkArguments([houseId, groupId], ["houseId", "groupId"])
            // const house = await Houses.findOne({
            //     where: {id: houseId}
            // });
            // if (!house) {
            //     throw new Error('Couldn\'t get house with that ID.');
            // }
            const group = await Groups.findOne({
                where: {id: groupId}
            });
            if (!group) {
                throw new Error('Couldn\'t get group with that ID.');
            }
            const updatedGroup = await Groups.update(
                { houseId: houseId },
                { where: { id: groupId }}
            );
            return group;
            
            

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
            throw new Error('Failed to assign house to group: ' + error);
        }
    }

    async assignSecondTeamOwner(houseId, userEmail) {
        try {
            this.checkArguments([houseId, userEmail], ["houseId", "userEmail"])
            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if (!house) {
                throw new Error('Couldn\'t get house with that ID.');
            }
            // const group = await Groups.findOne({
            //     where: {id: groupId}
            // });
            // if (!group) {
            //     throw new Error('Couldn\'t get group with that ID.');
            // }
            const updatedHouse = await Houses.update(
                { "teamOwnerEmail_2": userEmail },
                { where: { id: houseId }}
            );
            return house;
            
            

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
            throw new Error('Failed to assign house to group: ' + error);
        }
    }

    async getAllAreasByCity() {
        try {
            const cities = await Cities.findAll({});
            if (!cities) {
                throw new Error('Couldn\'t get cities.');
            }

            let result = {};

            for(let i=0; i<cities.length; i++){
                const areas = await cities[i].getAreas();
                result[cities[i].cityName] = areas;
            }

            return result;
            
            

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
            throw new Error('Failed to get areas by city: ' + error);
        }
    }

    

}

module.exports = new StaffHouseLogic();
