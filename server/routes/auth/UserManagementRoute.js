const express = require("express");
const router = express.Router();
const userManagementLogic = require('../../domain/UserManagementLogic')
const registrationLogic = require('../../domain/RegistrationLogic')
const { generateToken, validateToken } = require("../../utils/JsonWebToken");
const { accessGroup, validateAccess } = require('../../utils/Accesses');

// Endpoint to fetch all students
router.get('/getAllStudents', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const students = await userManagementLogic.getAllStudents();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getAllStaffs', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    try {
        const students = await userManagementLogic.getAllStaffs();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Endpoint to fetch a student by email
router.get('/getUser/:email', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    const email = req.params.email;
    try {
        const user = await userManagementLogic.getUserByEmail(email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// for now seems we dont need
//router.get('/getStudent/:email', validateToken, validateAccess(accessGroup.B), async (req, res) => {
//    const email = req.params.email;
//    try {
//        const student = await userManagementLogic.getStudentByEmail(email);
//        res.json(student);
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
//});
//
//router.get('/getStaff/:email', validateToken, validateAccess(accessGroup.C), async (req, res) => {
//    const email = req.params.email;
//    try {
//        const student = await userManagementLogic.getStudentByEmail(email);
//        res.json(student);
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
//});

// Endpoint to delete a student by id
router.delete('/deleteStudent/:studentId', validateToken, async (req, res) => {
    const studentId = req.params.studentId;
    try {
        await userManagementLogic.deleteStudent(studentId);
        res.json({ message: 'Student deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update a student by email
// by staff
router.put('/updateStudent/:email', validateToken, async (req, res) => {
    const studentEmail = req.params.email;
    const updatedData = req.body;
    try {
        const updatedStudent = await userManagementLogic.updateStudent(studentEmail, updatedData);
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;