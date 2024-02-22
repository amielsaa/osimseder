const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json').test; // Assuming you're using a separate configuration for testing
const AuthenticationLogic = require('../domain/LoginLogic');
const Students = require('../models/Student');
const RegistrationLogic = require("../domain/RegistrationLogic")

describe('verifyLoginStudent', () => {
  let sequelize;
  let student;

  beforeEach(async () => {
    // Initialize Sequelize with the test configuration
    sequelize = new Sequelize(sequelizeConfig);

    // Define your Sequelize model
    student = Students(sequelize, DataTypes);

    // Synchronize the database schema
    await sequelize.sync({ force: true }); // This will drop and recreate tables, use with caution in production
  });

  afterEach(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });

  describe('verifyLoginStudent - good', () => {
    it('should return a token when provided with valid email and password', async () => {  
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
      
      // Call the function under test and await its result
      const result = await AuthenticationLogic.verifyLoginStudent(newStudent.email, studentPassword);
      
      // Assertions
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('username', newStudent.email);
      expect(result).toHaveProperty('id', newStudent.id);
    }); 
  });

  describe('verifyLoginStudent - bad', () => {
    it('should throw error - Student not found', async () => {  
      await expect(AuthenticationLogic.verifyLoginStudent("test@example.com","password123"))
        .rejects.toThrowError(/Student not found/);
    }); 

    it('should throw error - Wrong username and password combination - wrong password', async () => {  
      const studentEmail = "password123";
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
      });
      
      const wrongResult = AuthenticationLogic.verifyLoginStudent(newStudent.email, "badpassword");
      
      await expect(wrongResult).rejects.toThrowError(/Wrong username and password combination/);

    }); 

     
    
  });
});
