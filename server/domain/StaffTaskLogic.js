const {Houses, Tasks} = require('../models');
const { housesLogger } = require('../utils/Logger');
const argumentChecker = require('./utils/ArgumentChecker');

class StaffTaskLogic {

// create a task
// Input: type - the type of the task
//        room - the room of the task
//        freeText - the description of the task
//        status - the status of the task
//        houseId - the id of the house
//        userEmail - the email of the user
// Output: the task object
    async createTask(type, room, freeText, status, houseId, userEmail) {
        try {
            housesLogger.info("Initiate create task for houseId: " + houseId + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments(
                [type, room, freeText, status, houseId],
                ["type", "room", "freeText", "status", "houseId"] );


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

            housesLogger.info("Successfully created task for houseId: " + houseId + ". In room: " + room + ". Of type: " + type+ ". By email: " + userEmail);
            return task;

        } catch (error) {
            housesLogger.error("Failed to create task for houseId: " + houseId + ". By email: " + userEmail);
            throw new Error('Failed to create task: ' + error);
        }
    }


// get all tasks by house
// Input: houseId - the id of the house
// Output: a list of tasks in the house
    async getAllTasksByHouse(houseId) {
        try {
            argumentChecker.checkByKeys([houseId], ["houseId"]);
            housesLogger.debug('Getting all tasks by houseId: ' + houseId);

            const house = await Houses.findOne({
                where: {id: houseId}
            });
            if(!house){
                throw new Error('Couldn\'t find a house with that id.');
            }
            const tasks = await house.getTasks();

            const tasksByRoom = tasks.reduce((result, task) => {
                const { id, room, status, freeText, type } = task;
                const existingRoom = result.find(r => r.room === room);
    
                if (existingRoom) {
                    existingRoom.tasks.push({ taskId: id, status: status, description: freeText , type: type});
                } else {
                    result.push({
                        room: room,
                        tasks: [{ taskId: id, status: status, description: freeText, type: type}]
                    });
                }
    
                return result;
            }, []);

            housesLogger.debug('Successfully found all tasks by houseId: ' + houseId);
            return tasksByRoom;

        } catch (error) {
            housesLogger.error('Failed to get all tasks by houseId: ' + error);
            throw new Error('Failed to get all tasks by houseId: ' + error);
        }
    }

// get task by id
// Input: id - the id of the task
// Output: the task object
    async getTaskById(id) {
        try {
            housesLogger.debug(" Getting a task by id: " + id);
            argumentChecker.checkSingleArugments([id], ["id"]);

            const task = await Tasks.findOne({
                where: {id: id}
            });
            if(!task){
                throw new Error('Couldn\'t find a task with that id.');
            }

            housesLogger.debug("Successfully found a task by id: " + id);
            return task;

        } catch (error) {
            housesLogger.error("Failed to get a task by id: " + error);
            throw new Error('Failed to get a task by id: ' + error);
        }
    }

// update a task by id
// Input: id - the id of the task
//        updatedFields - the fields to update
//        userEmail - the email of the user
// Output: the updated task object
    async updateTask(id, updatedFields, userEmail) {
        try {
            housesLogger.info("Updating a task by id: " + id + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments([id, userEmail], ["id", "userEmail"]);
            //argumentChecker.checkByKeys(updatedFields, "updatedFields", ["type", "room", "status"]);
            // TODO add check on the updated fields values

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

            housesLogger.info("Successfully updated a task by id: " + id + ". By email: " + userEmail);
            return task;

        } catch (error) {
            housesLogger.error("Failed to update a task by id: " + error);
            throw new Error('Failed to update a task by id: ' + error);
        }
    }

    
// delete a task by id
// Input: id - the id of the task
//        userEmail - the email of the user
// Output: a message of success
    async deleteTask(id, userEmail) {
        try {
            housesLogger.info("Deleting a task by id: " + id + ". By email: " + userEmail);
            argumentChecker.checkSingleArugments([id, userEmail], ["id", "userEmail"]);

            const task = await Tasks.findOne({
                where: {id: id}
            });
            if(!task){
                throw new Error('Couldn\'t find a task with that id.');
            }
            await Tasks.destroy({
                where: { id: task.id }
            });

            housesLogger.info("Successfully deleted a task by id: " + id + ". By email: " + userEmail);
            return { success: true, message: 'Task deleted successfully' };

        } catch (error) {
            housesLogger.error("Failed to delete a task by id: " + error);
            throw new Error('Failed to delete task: ' + error);
        }
    }

}

module.exports = new StaffTaskLogic();



    // backup
    // TODO IF RETURNING ADD LOGGER AND checkByKeys
    // async getAllTasksByHouse(houseId) {
    //     try {
    //         this.checkSingleArugments([houseId],
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