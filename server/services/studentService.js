// services/studentService.js
const { Student } = require('../models');

class StudentService {
  async createStudent(studentData) {
    try {
      const student = await Student.create(studentData);
      return student;
    } catch (error) {
      throw new Error('Failed to create student');
    }
  }

  async getStudents() {
    try {
      const students = await Student.findAll();
      return students;
    } catch (error) {
      throw new Error('Failed to fetch students');
    }
  }

  async getStudentById(studentId) {
    try {
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw new Error('Failed to fetch student');
    }
  }

  async updateStudent(studentId, studentData) {
    try {
      const student = await Student.findByPk(studentId);
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
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.destroy();
    } catch (error) {
      throw new Error('Failed to delete student');
    }
  }
}

module.exports = new StudentService();


// studentService.js

const Student = require('./studentModel');

async function getStudent(studentId) {
    try {
        // Find the student record by ID
        const student = await Student.findByPk(studentId);

        if (!student) {
            throw new Error('Student not found');
        }

        return student;
    } catch (error) {
        throw new Error('Error fetching student:', error);
    }
}

module.exports = { getStudent };
