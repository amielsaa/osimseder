const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const staffSchoolLogic = require('../../domain/StaffSchoolLogic')

// Get all schools by city
router.get('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const cityId = req.params.id;

        const allSchools = await staffSchoolLogic.fetchAllSchoolsByCity(cityId);

        res.json(allSchools);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});


//Create new school
router.post('/', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const schoolName = req.body.schoolName;
        const cityId = req.body.cityId;

        const newSchool = await staffSchoolLogic.createSchool(schoolName, cityId);

        res.json(newSchool);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Delete school by ID
router.delete('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const schoolId = req.params.id;

        const result = await staffSchoolLogic.deleteSchool(schoolId);

        res.json(result);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Edit school
router.put('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFields = req.body;
        const newSchool = await staffSchoolLogic.updateSchool(id, updatedFields);
        res.json(newSchool);
    } catch (err) {
        res.json({ error: err.message });
    }
});



module.exports = router;