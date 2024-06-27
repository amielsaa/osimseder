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
        const userRole = req.user.role;
        if (!(accessGroup.E.includes(userRole))) { //for non-admins
            filterBy.cityId = req.uesr.cityId;
        }
        const students = await userManagementLogic.getAllStudents(filterBy);
        
        res.json(students);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Get all staffs by the requester's access level
router.get('/getAllStaffs', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const filterBy = req.body.filterBy;
        const userRole = req.user.role;
        const userEmail = req.user.email;
        if (!(accessGroup.E.includes(userRole))) { //for non-admins
            filterBy.cityId = req.user.cityId;
            if (accessGroup.C.includes(userRole)) { //for area managers
                filterBy.accesses = 'B'; //Team Owners Only
            }
        }
        const staffs = await userManagementLogic.getAllStaffs(userEmail, userRole, filterBy);
        res.json(staffs);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Endpoint to fetch a student by email
router.get('/getUser/:email', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    const email = req.params.email;
    try {
        const user = await userManagementLogic.getUserByEmail(email);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
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
        res.json({ error: error.message });
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
        res.json({ error: error.message });
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
        res.json({ error: error.message });
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
        res.json({ error: error.message });
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
        res.json({ error: error.message });
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
        res.json({ error: error.message });
    }
});

// Endpoint to approve a staff by manager
router.post('/approveStaff/:email', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    const staffEmail = req.params.email;
    const alternateRole = req.params.alternateRole;
    const requesterEmail = req.user.email;
    try {
        const updatedStaff = await userManagementLogic.approveStaffRole(staffEmail, alternateRole, requesterEmail);
        res.json(updatedStaff);
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;