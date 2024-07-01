const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const StaffStudentLogic = require('../../domain/StaffStudentLogic')
const {Groups, Staffs, Areas, Schools, Cities, Houses} = require('../../models/');



// Update a student by ID (PUT)
// The student is changed by the staff
router.put('/:email', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const studentEmail = req.params.email;
        const requesterEmail = req.user.email;
        const updatedFields = req.body;

        const newStudent = await StaffStudentLogic.updateStudent(studentEmail, requesterEmail, updatedFields);
        res.json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// add a student to a group by email and group id
router.put('/addGroupMember/:email', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const studentEmail = req.params.email;
        const groupId = req.body.groupId;

        const newStudent = await StaffStudentLogic.addStudentToGroup(studentEmail, groupId);
        res.json(newStudent);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// get students from a school without a group
router.get('/getStudentsWithoutGroupBySchool/:schoolId', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const schoolId = req.params.schoolId;
        const students = await StaffStudentLogic.getStudentsWithoutGroup(schoolId);
        res.json(students);
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;