// const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json'); // Assuming you're using a separate configuration for testing
// const sequelizeConfig = require('../jest.config.js'); 
// const { LoginLogic, RegistrationLogic, GroupLogic } = require('../domain');
const GroupLogic = require('../domain/GroupLogic');
const RegistrationLogic = require('../domain/RegistrationLogic');
const LoginLogic = require('../domain/LoginLogic');
// const { Students, Groups, Schools } = require('../models/');
const Students = require('../models/Student');
const Schools = require('../models/School');
const Groups = require('../models/Group');
const Cities = require('../models/City');
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

describe('verifyLoginStudent', () => {
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

      const newSchool = await school.create({
        schoolName: "school1",
      });      

      const newGroup1 = await group.create({
        groupName: "group1",
        teamOwnerId: "1",
        schoolId: 1
      });

      // await newGroup1.setSchool(newSchool);


      const newGroup2 = await group.create({
        groupName: "group2",
        teamOwnerId: "1"
      });

      const newCity = await city.create({
        areaName: "area1"
      });

      
      
      // // Call the function under test and await its result
      const result = await GroupLogic.getAllGroupsBySchool(newSchool.ID);
      
      // // Assertions
      expect(result).toHaveProperty('groupName');
      // expect(result).toHaveProperty('username', newStudent.email);
      // expect(result).toHaveProperty('id', newStudent.id);
    }); 

  });

  // describe('getAllGroupsBySchool - bad', () => {
  //   it('bad schoolId', async () => {  
  //     // await expect(AuthenticationLogic.verifyLoginStudent("test@example.com","password123"))
  //     //   .rejects.toThrowError(/Student not found/);
  //   }); 

  //   it('add title', async () => {  
  //     // const studentEmail = "password123";
  //     // const newStudent = await RegistrationLogic.registerStudent({
  //     //   email: "test@example.com",
  //     //   password: "password123",      
  //     //   lastName: "lastname",
  //     //   firstName: "firstname",
  //     //   phoneNumber: "0524587746",
  //     //   gender: "Male",
  //     //   parentName: "itzik",
  //     //   parentPhoneNumber: "0529875509",
  //     //   parentEmail: "mashu@mashu.com",
  //     //   city: "JRS",
  //     //   school: "SchoolTest1",
  //     //   issuesChoose: "Accessability",
  //     //   issuesText: "idk1",
  //     //   languages: "English",
  //     //   isInGroup: '',
  //     //   didParentApprove: false
  //     // });
      
  //     // const wrongResult = AuthenticationLogic.verifyLoginStudent(newStudent.email, "badpassword");
      
  //     // await expect(wrongResult).rejects.toThrowError(/Wrong username and password combination/);

  //   }); 

     
    
  // });

  // describe('verifyLoginStudent - bad', () => {
  //   it('add title', async () => {  
  //     // await expect(AuthenticationLogic.verifyLoginStudent("test@example.com","password123"))
  //     //   .rejects.toThrowError(/Student not found/);
  //   }); 

  //   it('add title', async () => {  
  //     // const studentEmail = "password123";
  //     // const newStudent = await RegistrationLogic.registerStudent({
  //     //   email: "test@example.com",
  //     //   password: "password123",      
  //     //   lastName: "lastname",
  //     //   firstName: "firstname",
  //     //   phoneNumber: "0524587746",
  //     //   gender: "Male",
  //     //   parentName: "itzik",
  //     //   parentPhoneNumber: "0529875509",
  //     //   parentEmail: "mashu@mashu.com",
  //     //   city: "JRS",
  //     //   school: "SchoolTest1",
  //     //   issuesChoose: "Accessability",
  //     //   issuesText: "idk1",
  //     //   languages: "English",
  //     //   isInGroup: '',
  //     //   didParentApprove: false
  //     // });
      
  //     // const wrongResult = AuthenticationLogic.verifyLoginStudent(newStudent.email, "badpassword");
      
  //     // await expect(wrongResult).rejects.toThrowError(/Wrong username and password combination/);

  //   }); 

     
    
  // });
});
