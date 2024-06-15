const { Sequelize } = require('sequelize');
const {Groups, Schools, Students, Areas, Cities, Staffs, Houses, Tasks} = require('../models');
const userManagementLogic = require("./UserManagementLogic")
const EmailEncryptor = require('./utils/EmailEncryptor');
const { usersLogger, groupsLogger } = require('../utils/Logger');
const argumentChecker = require('./utils/ArgumentChecker');
const StaffStudentLogic = require('./StaffStudentLogic');
const String2Int = require('./utils/String2Int');



class ExportLogic {
    
    async exportTable(table) {
        const allTables = ["Areas", "Cities", "Groups", "Houses", "Schools", "Staffs", "Students", "Tasks"];
        try {
            groupsLogger.info("Initiating export: " + table + ".");
            if (!allTables.includes(table)) {
                throw new Error('Table not found: ' + table);
            }

            let data;
            switch (table) {
                case "Areas":
                    data = await Areas.findAll();
                    break;
                case "Cities":
                    data = await Cities.findAll();
                    break;
                case "Groups":
                    data = await Groups.findAll();
                    break;
                case "Houses":
                    data = await Houses.findAll();
                    break;
                case "Schools":
                    data = await Schools.findAll();
                    break;
                case "Staffs":
                    data = await Staffs.findAll();
                    break;
                case "Students":
                    data = await Students.findAll();
                    break;
                case "Tasks":
                    data = await Tasks.findAll();
                    break;
                default:
                    throw new Error('Unsupported table: ' + table);
            }

            return data;

        } catch (error) {
            groupsLogger.error("Failed to export. table: " + table + ", reason: "+ error);
            throw new Error('Failed to export: ' + error);
        }
    }
}

module.exports = new ExportLogic();
