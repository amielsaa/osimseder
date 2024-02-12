const Students = require('../../models/studentModel');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateToken, validateToken } = require("../../utils/JsonWebToken");
const {UsersToDelete} = require('../../models')
const {sign} = require('jsonwebtoken');


class StudentLogic {

  async registerStudent(studentData) {
    try {
        bcrypt.hash(studentData.password, 10).then((hash) => {
        Students.create({
            "Email": studentData.email,
            "Password": hash,
            "LastName": studentData.LastName,
            "FirstName": studentData.FirstName,
            "PhoneNumber": studentData.PhoneNumber,
            "Gender": studentData.Gender,
            "ParentName": studentData.ParentName,
            "ParentPhoneNumber": studentData.ParentPhoneNumber,
            "ParentEmail": studentData.ParentEmail,
            "City": studentData.City,
            "School": studentData.School,
            "IssuesChoose": studentData.IssuesChoose,
            "IssuesText": studentData.IssuesText,
            "Languages": studentData.Languages,
            "IsInGroup": '',
            "DidParentApprove": false
        });
         return true;
        });
    } catch (error) {
      throw new Error('Failed to create student: ' + error);
    }
  }
  
  async verifyLogin(email, givenPassword) {
    try {
        const student = await Students.findOne({
            where: { Email: email }});
        if (!student) {
            throw new Error('Student not found');}
        bcrypt.compare(givenPassword, student.password).then((match) => {
            if(!match) 
                throw new Error('Wrong username and password combination');
            else {
                const accessToken = sign({username: email, id: student.id}, "importantsecret");
                return {token:accessToken, username: email, id: student.id};
            }
        })
    } catch (error) {
        throw new Error('Failed to login: ' + error);
    }
  }

  async getStudents() {
    try {
      const students = await Students.findAll();
      return students;
    } catch (error) {
      throw new Error('Failed to fetch students');
    }
  }

  async getStudentById(email) {
    try {
      const student = await Students.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw new Error('Failed to fetch student:' + error);
    }
  }

  async updateStudent(studentId, studentData) {
    try {
      const student = await Students.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.update(studentData);
      return student;
    } catch (error) {
      throw new Error('Failed to update student');
    }
  }

  async deleteStudent(studentId) {
    try {
      const student = await Students.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.destroy();
    } catch (error) {
      throw new Error('Failed to delete student');
    }
  }
}

module.exports = new StudentLogic();

