const express = require("express");
const router = express.Router();
const userManagementLogic = require('../../domain/UserManagementLogic')
const registrationLogic = require('../../domain/RegistrationLogic')
const { generateToken, validateToken } = require("../../utils/JsonWebToken");
const { accessGroup, validateAccess } = require('../../utils/Accesses');

// Endpoint to fetch all students
router.get('/getAllStudents', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const filterBy = req.body.filterBy;
        var students;
        if ((accessGroup.D.includes(userRole))) { //for city managers and admins
            students = await userManagementLogic.getAllStudents(filterBy);
        }
        else { //for area managers
            filterBy.cityId = req.user.cityId; //gets only the students in the city of the area manager
            students = await userManagementLogic.getAllStudents(filterBy);
        }
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getAllStaffs', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const filterBy = req.body.filterBy;
        var staffs;
        if ((accessGroup.D.includes(userRole))) { //for city managers and admins
            staffs = await userManagementLogic.getAllStaffs(filterBy);
        }
        else { //for area managers
            filterBy.cityId = req.user.cityId; //gets only the staffs in the city of the area manager
            staffs = await userManagementLogic.getAllStaffs(filterBy);
        }

        const students = await userManagementLogic.getAllStaffs(filterBy);
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

// Endpoint to delete a student by email
router.delete('/deleteStudent/:studentEmail', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    const studentEmail = req.params.studentEmail;
    const requesterEmail = req.user.email;
    try {
        await userManagementLogic.deleteStudent(studentEmail, requesterEmail);
        res.json({ message: 'Student deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Endpoint to delete a staff by email
router.delete('/deleteStaff/:staffEmail', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    const staffEmail = req.params.staffEmail;
    const requesterEmail = req.user.email;
    try {
        await userManagementLogic.deleteStaff(staffEmail, requesterEmail);
        res.json({ message: 'Student deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Endpoint to add a volunteer by admin
router.put('/addVolunteer', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    const newVolunteerData = req.body.newVolunteerData;
    const requesterEmail = req.user.email;
    try {
        const user = await userManagementLogic.addVolunteer(newVolunteerData, requesterEmail);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch a student by email
router.put('/addStaff', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    const newStaffData = req.body.newStaffData;
    const requesterEmail = req.user.email;
    try {
        const user = await userManagementLogic.addVolunteer(newStaffData, requesterEmail);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update a volunteer by manager
router.put('/updateStudent/:email', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    const volunteerEmail = req.params.email;
    const updatedData = req.body.newVolunteerData;
    const requesterEmail = req.user.email;
    try {
        const updatedStudent = await userManagementLogic.updateVolunteerByManager(volunteerEmail, updatedData, requesterEmail);
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update a staff by manager
router.put('/updateStaff/:email', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    const staffEmail = req.params.email;
    const updatedData = req.body.newStaffData;
    const requesterEmail = req.user.email;
    try {
        const updatedStaff = await userManagementLogic.updateStaffByManager(staffEmail, updatedData, requesterEmail);
        res.json(updatedStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to approve a staff by manager
router.put('/approveStaff/:email', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    const staffEmail = req.params.email;
    const alternateRole = req.params.alternateRole;
    const requesterEmail = req.user.email;
    try {
        const updatedStaff = await userManagementLogic.approveStaffRole(staffEmail, alternateRole, requesterEmail);
        res.json(updatedStaff);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;