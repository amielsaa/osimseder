// Sequelize.test.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json').test; // Assuming you're using a separate configuration for testing
const studentModel = require('../models/Student'); // Import your Sequelize model for testing
const bcrypt = require('bcrypt');

describe('Sequelize', () => {
  let sequelize;
  let student;

  beforeAll(async () => {
    // Initialize Sequelize with the test configuration
    sequelize = new Sequelize(sequelizeConfig);

    // Define your Sequelize model
    student = studentModel(sequelize, DataTypes);

    // Synchronize the database schema
    await sequelize.sync({ force: true }); // This will drop and recreate tables, use with caution in production
  });

  afterAll(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });

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
    expect(retrievedStudent).toBeDefined();
    expect(retrievedStudent.firstName).toBe('firstname');
    expect(retrievedStudent.email).toBe('test@example.com');
  });

  it('should update an existing user record', async () => {
    // Find the user record to update
    const existingStudent = await student.findOne({
      where: { email: "test@example.com" },
    });

    // Update the user record
    await existingStudent.update({ email: 'updated@example.com' });

    // Retrieve the updated user from the database
    const updatedStudent = await student.findOne({
      where: { email: "updated@example.com" },
    });

    // Assert that the user record is updated correctly
    expect(updatedStudent).toBeDefined();
    expect(updatedStudent.email).toBe('updated@example.com');
  });
});
