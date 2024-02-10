// services/studentService.js
const Students = require('./studentModel');

class StudentService {
  async createStudent(studentData) {
    try {
      const student = await Students.create(studentData);
      return student;
    } catch (error) {
      throw new Error('Failed to create student');
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

  async getStudentById(studentId) {
    try {
      const student = await Students.findByPk(studentId);
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

module.exports = new StudentService();


// studentService.js
