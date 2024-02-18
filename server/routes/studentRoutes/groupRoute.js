const express = require('express');
const router = express.Router();
const { groupModel } = require('../models/groupModel'); // Import group model
const {validateToken} = require('../../utils/JsonWebToken');
const {validateAccess, accessGroup} = require('../../utils/Accesses');


// data provided by the request:
// json with all the studentModel properties except for 'password'
// req.body = {email:'', firstName:'', ...}

// Get all groups by school name (GET)
router.get('/', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    try {
        // implement to return all the groups that related to the school specified
        const groups = {};
        res.json(groups);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get a single group by ID (GET)
router.get('/:id', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    try {
        // implement to return the correct group by groupid
        // access the :id argument by: req.params.id
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Join Group by groupId
router.post('/join/:id', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    try {
        // implement to add a student to an existing group
        const group = {};
        //should return the group he just joined
        res.json(group)
    } catch (err) {
        res.json({ error: err.message });
    }
});



module.exports = router;