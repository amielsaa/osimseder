// const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json'); // Assuming you're using a separate configuration for testing
// const sequelizeConfig = require('../jest.config.js'); 
// const { LoginLogic, RegistrationLogic, GroupLogic } = require('../domain');
const GroupLogic = require('../domain/GroupLogic');
const RegistrationLogic = require('../domain/RegistrationLogic');
const LoginLogic = require('../domain/LoginLogic');
// const { Students, Groups, Schools } = require('../models/');
const Students = require('../models/Students');
const Schools = require('../models/Schools');
const Groups = require('../models/Groups');
const Cities = require('../models/Cities');
// const { sequelize, Cities, Areas, Schools, Houses, Staffs, Students } = require('../models/');
// const { sequelize } = require('../models/index');
const { sequelize, DataTypes } = require('../SetupTestDatabase'); // Adjust the path accordingly




process.env.NODE_ENV = 'test';
const db = require('../models');

// Import Sequelize configuration
// const sequelizeConfig = require('./config/config.json');

// Use the "test" environment configuration
const { database, username, password, host, dialect } = sequelizeConfig.test;

// Create a Sequelize instance for the "test" environment
// const sequelize = require('../SetupTestDatabase');

// Create a Sequelize instance for the "test" environment
// const sequelize = new Sequelize(database, username, password, {
//   host,
//   dialect,
//   logging: false, // Suppress Sequelize logging to keep test output clean
// });

describe('getAllGroupsBySchool', () => {
  // let sequelize;
  let student;
  let group;
  let school
  let city;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

  // afterEach(async () => {
  //     // Drop all tables
  //     await sequelize.drop(); // This drops all the tables defined through your models
  // });


  describe('getAllGroupsBySchool - good', () => {
    it('given 0 groups, return empty list', async () => {  
      const studentPassword = "password123";
      const newStudent = await RegistrationLogic.registerStudent({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        parentName: "itzik",
        parentPhoneNumber: "0529875509",
        parentEmail: "mashu@mashu.com",
        city: "JRS",
        school: "school1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })

      const createdSchool = await db.Schools.create({schoolName: "school1"});

      // // Call the function under test and await its result
      const result = await GroupLogic.getAllGroupsBySchool(createdSchool.id);
      
      // // Assertions
      expect(result).toEqual([]);
      
    }); 
    it('given 1 school and 2 groups, return 2 groups', async () => {  
      const studentPassword = "password123";
      const newStudent = await RegistrationLogic.registerStudent({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        parentName: "itzik",
        parentPhoneNumber: "0529875509",
        parentEmail: "mashu@mashu.com",
        city: "JRS",
        school: "school1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })

      const createdSchool = await db.Schools.create({schoolName: "school1"});

      const groupWithSchool1 = await db.Groups.create({
          teamOwnerEmail: "mashu@g.com",
          membersCount: 1,
          schoolId: createdSchool.id 
      });

      const groupWithSchool2 = await db.Groups.create({
          teamOwnerEmail: "mashuaher@g.com",
          membersCount: 2,
          schoolId: createdSchool.id 
      });
      
      const groupWithSchool3 = await db.Groups.create({
          teamOwnerEmail: "wrong@g.com",
          membersCount: 5
      });
      
      // // Call the function under test and await its result
      const result = await GroupLogic.getAllGroupsBySchool(createdSchool.id);
      
      // // Assertions
      expect(result[0]).toHaveProperty('membersCount', 1);
      expect(result[0]).toHaveProperty('teamOwnerEmail', 'mashu@g.com');
      expect(result[0]).toHaveProperty('schoolId', 1);
      expect(result[1]).toHaveProperty('membersCount', 2);
      expect(result[1]).toHaveProperty('teamOwnerEmail', 'mashuaher@g.com');
      expect(result[1]).toHaveProperty('schoolId', 1);
    }); 

  });

  describe('getAllGroupsBySchool - bad', () => {
    it('bad schoolId', async () => {  
      const studentPassword = "password123";
      const newStudent = await RegistrationLogic.registerStudent({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        parentName: "itzik",
        parentPhoneNumber: "0529875509",
        parentEmail: "mashu@mashu.com",
        city: "JRS",
        school: "school1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })

      const createdSchool = await db.Schools.create({schoolName: "school1"});

      const groupWithSchool1 = await db.Groups.create({
          teamOwnerEmail: "mashu@g.com",
          membersCount: 1,
          schoolId: createdSchool.id 
      });

      const groupWithSchool2 = await db.Groups.create({
          teamOwnerEmail: "mashuaher@g.com",
          membersCount: 2,
          schoolId: createdSchool.id 
      });
      
      const groupWithSchool3 = await db.Groups.create({
          teamOwnerEmail: "wrong@g.com",
          membersCount: 5
      });
      
      // // Call the function under test and await its result
      const result = await GroupLogic.getAllGroupsBySchool(5);
      
      // // Assertions
      expect(result).toEqual([]);
    });      
    
  });

});
