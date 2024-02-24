// const { Sequelize, DataTypes } = require('sequelize');
// const sequelizeConfig = require('../config/config.json').test; // Assuming you're using a separate configuration for testing
// const AuthenticationLogic = require('../domain/LoginLogic');
// const Students = require('../models/Students');
// const RegistrationLogic = require("../domain/RegistrationLogic")
// const Students = require('../models/Student');
// const Schools = require('../models/School');
// const Groups = require('../models/Group');
// const Cities = require('../models/City');
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

const { database, username, password, host, dialect } = sequelizeConfig.test;


describe('verifyLoginStudent', () => {
  let student;
  let group;
  let school;
  let city;

  beforeEach(async () => {
    // Initialize Sequelize with the test configuration
    // sequelize = new Sequelize(sequelizeConfig);

    // Define your Sequelize model
    student = Students(sequelize, DataTypes);
    group = Groups(sequelize, DataTypes);
    school = Schools(sequelize, DataTypes);
    city = Cities(sequelize, DataTypes);
    
    // Synchronize the database schema
    await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

  // afterEach(async () => {
  //   // Close the Sequelize connection
  //   await sequelize.close();
  // });

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
        city: "JRS",
        school: "SchoolTest1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })
      
      // Call the function under test and await its result
      const result = await LoginLogic.verifyLoginStudent(newStudent.email, studentPassword);
      
      const addedStudent = await student.findOne({
        where: { email: newStudent.email },
      });

      console.log(result);
      // Assertions
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(addedStudent).toHaveProperty('firstName', newStudent.firstName);
      expect(addedStudent).toHaveProperty('lastName', newStudent.lastName);

    }); 
  });

  describe('verifyLoginStudent - bad', () => {
    it('should throw error - Student not found', async () => {  
      await expect(LoginLogic.verifyLoginStudent("test@example.com","password123"))
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
      
      const wrongResult = LoginLogic.verifyLoginStudent(newStudent.email, "badpassword");
      
      await expect(wrongResult).rejects.toThrowError(/Wrong username and password combination/);

    }); 

     
    
  });
});
