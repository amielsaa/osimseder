// AuthenticationLogic.test.js

const AuthenticationLogic = require('../domain/LoginLogic');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const sequelize = require('./sequelize.test'); // Import the test configuration
const supertest = require('supertest');

// Mock the dependencies
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthenticationLogic', () => {
  describe('verifyLoginStudent', () => {
    it('should return a token when provided with valid email and password', async () => {
      // Mock the data and behavior of Students.findOne and bcrypt.compare
      const mockStudent = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      const givenPassword = 'password';
      const mockAccessToken = 'mockAccessToken';
      bcrypt.compare.mockResolvedValue(true);
      sign.mockReturnValue(mockAccessToken);
      const result = await AuthenticationLogic.verifyLoginStudent(mockStudent.email, givenPassword);
      
      // Assertions
      expect(bcrypt.compare).toHaveBeenCalledWith(givenPassword, mockStudent.password);
      expect(sign).toHaveBeenCalledWith({ username: mockStudent.email, id: mockStudent.id }, "importantsecret");
      expect(result).toEqual({ token: mockAccessToken, username: mockStudent.email, id: mockStudent.id });
    });

    // it('should throw an error if student is not found', async () => {
    //   // Mock the behavior of Students.findOne
    //   const givenEmail = 'nonexistent@example.com';
    //   const givenPassword = 'password';
    //   const errorMessage = 'Student not found';
    //   bcrypt.compare.mockResolvedValue(false);
    //   await expect(AuthenticationLogic.verifyLoginStudent(givenEmail, givenPassword)).rejects.toThrowError(errorMessage);
    // });

    // it('should throw an error if password is incorrect', async () => {
    //   // Mock the data and behavior of Students.findOne and bcrypt.compare
    //   const mockStudent = { email: 'test@example.com', password: 'hashedPassword' };
    //   const givenPassword = 'wrongPassword';
    //   const errorMessage = 'Wrong username and password combination';
    //   bcrypt.compare.mockResolvedValue(false);
    //   await expect(AuthenticationLogic.verifyLoginStudent(mockStudent.email, givenPassword)).rejects.toThrowError(errorMessage);
    // });
  });

  describe('verifyLoginStaff', () => {
    // Similar test cases for verifyLoginStaff method
  });
});

// loginLogic.test.js

