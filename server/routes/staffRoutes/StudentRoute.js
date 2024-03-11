const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const StaffStudentLogic = require('../../domain/StaffStudentLogic')
const {Groups, Staffs, Areas, Schools, Cities, Houses} = require('../../models/');



// Update a student by ID (PUT)
router.put('/:email', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const email = req.params.email;
        const updatedFields = req.body;

        const newStudent = await StaffStudentLogic.updateStudent(email, updatedFields);
        res.json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;