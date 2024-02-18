const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken');
const {validateAccess, accessGroup} = require('../../utils/Accesses');


// data provided by the request:
// json with all the studentModel properties except for 'password'
// req.body = {email:'', firstName:'', ...}

// Get all groups by school name (GET)
router.get('/', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    try {
        // implement to return all the groups that related to the school specified
        //dummy json, replace it when you finish implementing
        res.json({groups:[{
            groupId:'1',
            groupMembersIds:['amiel@gmail.com','ari@gmail.com'], // emails or ids?
            houseId: '1',
        }, {
            groupId:'2',
            groupMembersIds:['feliks@gmail.com','yoav@gmail.com'], // emails or ids?
            houseId: '2',
        }
    ]});
    } catch (err) {
        res.json({ error: err.message });
    }
});


// Get a single group by ID (GET)
router.get('/:id', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    try {
        // implement to return the correct group by groupid
        // access the :id argument by: req.params.id

        //dummy json
        res.json({group: {
            groupId:'1',
            groupMembersIds:['amiel@gmail.com','ari@gmail.com'], //maybe emails?
            houseId: '1',
        }})
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