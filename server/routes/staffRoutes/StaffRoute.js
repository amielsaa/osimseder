const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const StaffLogic = require('../../domain/StaffLogic')
const {Groups, Staffs, Areas, Schools, Cities, Houses} = require('../../models/');


// Get all team owners by city name (GET)
router.get('/teamowners', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        // const userEmail = req.user.email;
        const cityName = req.body.cityName;

        const teamowners = await StaffLogic.getTeamOwnersByCityName(cityName);
        
        res.json(teamowners); 

        // res.json(houses);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get staff email and name by email (GET)
router.get('/staffinfo', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        // const userEmail = req.user.email;
        const staffEmail = req.body.staffEmail;

        const staffMember = await StaffLogic.getStaffName(staffEmail);
        
        res.json(staffMember); 
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;