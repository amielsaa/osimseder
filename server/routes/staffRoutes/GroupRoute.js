const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')

// Create a new group (POST)
router.post('/', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        //no arguments needed
        //return group information (all the fields)
        res.json(group);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups related to team owner (GET)
router.get('/to', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        //access email by : req.user.email
        //return all groups that related to this user email
        res.json({groups: [
            {ID: '1', groupName:'stupidName', 
            students:['amiel@gmail.com','ari@gmail.com']},
        ]});
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups related to area manager (GET)
router.get('/am', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        //access email by : req.user.email
        //pull staff user by email and check its area name, pull all groups by the area name
        //return all groups that related to this user email
        res.json(groups);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups related to city manager (GET)
router.get('/cm', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    try {
        //access email by : req.user.email
        //same as area manager just for cities
        //return all groups that related to this user email
        res.json(groups);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups (Admin) (GET)
router.get('/admin', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        //access email by : req.user.email
        //return all groups that related to this user email
        res.json(groups);
    } catch (err) {
        res.json({ error: err.message });
    }
});


// Get a single group by ID (GET)
router.get('/:id', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        //req.params.id = groupId
        //return all information regarding that group
        res.json({group: {
            ID: '1',
            groupName: 'stupidName',
            teamOwner: 'firstName lastName',
            school: 'schoolName',
        }})
    } catch (err) {
        res.json({ error: err.message });
    }
});



// Update a group by ID (PUT)
// router.put('/:id', validateToken, async (req, res) => {
//     try {
//         const group = await GroupModel.findByPk(req.params.id);
//         if (group) {
//             await group.update(req.body);
//             res.json(group);
//         } else {
//             res.status(404).json({ message: 'group not found' });
//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Delete a group by ID (DELETE)
// router.delete('/:id', validateToken, async (req, res) => {
//     try {
//         const group = await GroupModel.findByPk(req.params.id);
//         if (group) {
//             await group.destroy();
//             res.json({ message: 'group deleted' });
//         } else {
//             res.status(404).json({ message: 'group not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;