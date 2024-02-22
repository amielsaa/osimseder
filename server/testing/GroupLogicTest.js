const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json').test; // Assuming you're using a separate configuration for testing
// const { LoginLogic, RegistrationLogic, GroupLogic } = require('../domain');
const GroupLogic = require('../domain/GroupLogic');
const RegistrationLogic = require('../domain/RegistrationLogic');
const LoginLogic = require('../domain/LoginLogic');
// const { Students, Groups, Schools } = require('../models/');
const Students = require('../models/Student');
const Schools = require('../models/School');
const Groups = require('../models/Group');
const Cities = require('../models/City');

describe('verifyLoginStudent', () => {
  let sequelize;
  let student;
  let group;
  let school;
  let city;

  beforeEach(async () => {
    // Initialize Sequelize with the test configuration
    sequelize = new Sequelize(sequelizeConfig);

    // Define your Sequelize model
    
    student = Students(sequelize, DataTypes);
    group = Groups(sequelize, DataTypes);
    school = Schools(sequelize, DataTypes);
    city = Cities(sequelize, DataTypes);
    

    // Synchronize the database schema
    await sequelize.sync({ force: true }); // This will drop and recreate tables, use with caution in production
  });

  afterEach(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });

  describe('getAllGroupsBySchool - good', () => {
    it('given 1 school and 2 groups, return 2 groups', async () => {  
      const newSchool = await school.create({
        schoolName: "school1"
      });      

      const newGroup1 = await group.create({
        groupName: "group1",
        teamOwnerId: "1"
      });

      const newGroup2 = await group.create({
        groupName: "group2",
        teamOwnerId: "1"
      });

      const newCity = await city.create({
        areaName: "area1"
      });

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
        school: "SchoolTest1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })
      
      // // Call the function under test and await its result
      const result = await GroupLogic.getAllGroupsBySchool(newSchool.ID);
      
      // // Assertions
      // expect(result).toHaveProperty('token');
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
