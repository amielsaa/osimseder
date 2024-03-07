const {Groups, Schools, Students, Areas, Cities, Staffs, Houses, Tasks} = require('../models');

class StaffTaskLogic {
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

    async createTask(type, room, freeText, status, houseId) {
        try {
            this.checkArguments([type, room, freeText, status, houseId],
                ["type", "room", "freeText", "status", "houseId"]
                );

            // const cityId = await Cities.findOne({
            //     where: {cityName: city}
            // });
            // if(!cityId){
            //     throw new Error('Cant get a city by that name');
            // }
            // const areaId = await Areas.findOne({
            //     where: {areaName: area}
            // });
            // if(!areaId){
            //     throw new Error('Cant get a area by that name');
            // }
            

            const task = await Tasks.create({
                type: type,
                room: room,
                freeText: freeText,
                status: status,
                houseId: houseId
            });
            if (!task) {
                throw new Error('Couldn\'t create a task (tasks.create).');
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
        
            return task;

        } catch (error) {
            throw new Error('Failed to create task: ' + error);
        }
    }

    
    async getAllTasksByHouse(houseId) {
        try {
            this.checkArguments([houseId],
                ["houseId"]);
            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if(!house){
                throw new Error('Couldn\'t find a house with that id.');
            }
            const tasks = await house.getTasks();

            const tasksByRoom = tasks.reduce((result, task) => {
                const { id, room, status, freeText } = task;
                const existingRoom = result.find(r => r.room === room);
    
                if (existingRoom) {
                    existingRoom.tasks.push({ taskId: id, status: status, description: freeText });
                } else {
                    result.push({
                        room: room,
                        tasks: [{ taskId: id, status: status, description: freeText }]
                    });
                }
    
                return result;
            }, []);
    
            return tasksByRoom;
        
            // return tasks;

        } catch (error) {
            throw new Error('Failed to get all tasks by houseId: ' + error);
        }
    }

    // backup
    // async getAllTasksByHouse(houseId) {
    //     try {
    //         this.checkArguments([houseId],
    //             ["houseId"]);
    //         const house = await Houses.findOne({
    //             where: {id: houseId}
    //         });
    //         if(!house){
    //             throw new Error('Couldn\'t find a house with that id.');
    //         }
    //         const tasks = await house.getTasks();
        
    //         return tasks;

    //     } catch (error) {
    //         throw new Error('Failed to get all tasks by houseId: ' + error);
    //     }
    // }

    async getTaskById(id) {
        try {
            this.checkArguments([id],
                ["id"]);
            const task = await Tasks.findOne({
                where: {id: id}
            });
            if(!task){
                throw new Error('Couldn\'t find a task with that id.');
            }
        
            return task;

        } catch (error) {
            throw new Error('Failed to get a task by id: ' + error);
        }
    }

    async updateTask(id, updatedFields) {
        try {
            this.checkArguments([id],
                ["id"]);
            const task = await Tasks.findOne({
                where: {id: id}
            });
            if(!task){
                throw new Error('Couldn\'t find a task with that id.');
            }

            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    task[key] = updatedFields[key];
                }
            }

            await task.save();
        
            return task;

        } catch (error) {
            throw new Error('Failed to update a task by id: ' + error);
        }
    }

    

    async deleteTask(id) {
        try {
            this.checkArguments([id],
                ["id"]);
            const task = await Tasks.findOne({
                where: {id: id}
            });
            if(!task){
                throw new Error('Couldn\'t find a task with that id.');
            }
            await Tasks.destroy({
                where: { id: task.id }
            });

            return { success: true, message: 'Task deleted successfully' };

        } catch (error) {
            throw new Error('Failed to delete task: ' + error);
        }
    }

}

module.exports = new StaffTaskLogic();
