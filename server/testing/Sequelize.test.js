// Sequelize.test.js
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelizeConfig = require('../config/config.json').test; // Assuming you're using a separate configuration for testing
// const studentModel = require('../models/Students'); // Import your Sequelize model for testing
const bcrypt = require('bcrypt');
// const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json'); // Assuming you're using a separate configuration for testing
// const sequelizeConfig = require('../jest.config.js'); 
// const { LoginLogic, RegistrationLogic, GroupLogic } = require('../domain');
const GroupLogic = require('../domain/StudentGroupLogic');
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


describe('Sequelize', () => {
  let student;
  let group;
  let school
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

  // afterAll(async () => {
  //   // Close the Sequelize connection
  //   await sequelize.close();
  // });

  it('should create a new user record', async () => {
    // Create a new user record
    const newStudent = await student.create({
      email: 'test@example.com',
      password: await bcrypt.hash("password123", 10),      
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
      didParentApprove: false,
    });

    // Retrieve the user from the database
    const retrievedStudent = await student.findOne({
      where: { email: newStudent.email },
    });

    // Assert that the user record is retrieved correctly
    expect(retrievedStudent).toHaveProperty('email', newStudent.email);
    expect(retrievedStudent).toHaveProperty('firstName', newStudent.firstName);
    // expect(retrievedStudent.firstName).toBe('firstname');
    // expect(retrievedStudent.email).toBe('test@example.com');
  });

  it('should update an existing user record', async () => {
    // Find the user record to update
    const existingStudent = await student.create({
      email: 'test@example.com',
      password: await bcrypt.hash("password123", 10),      
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
      didParentApprove: false,
    });

    
    // Update the user record
    await existingStudent.update({ firstName: 'anotherName' });

    // Retrieve the updated user from the database
    const updatedStudent = await student.findOne({
      where: { firstName: 'anotherName' },
    });

    // console.log(updatedStudent);

    // Assert that the user record is updated correctly
    expect(updatedStudent).toHaveProperty('firstName', 'anotherName');
    expect(updatedStudent).toHaveProperty('email', 'test@example.com');
  });
});
