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


module.exports = router;