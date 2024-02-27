const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const staffGroupLogic = require('../../domain/StaffGroupLogic')
const {Groups, Staffs, Areas, Schools, Cities} = require('../../models/');
const RegistrationLogic = require('../../domain/RegistrationLogic');
// const StaffGroupLogic = require('../../domain/StaffGroupLogic');

// TODO: remove quotes from validateToken

// Create a new group (POST)
router.post('/', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const groupSize = req.body.capacity;
        // const cityName = req.body.cityName;
        const schoolId = req.body.schoolId;
        const newGroup = await staffGroupLogic.createGroup(groupSize, schoolId);

        //no arguments needed
        //return group information (all the fields)
        res.json(newGroup);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Return all schools related to the city
router.post('/schools', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    //req.data.city = BSV/JRS
    try {
        // const groupSize = req.body.capacity;
        // const cityName = req.body.cityName;
        const cityName = req.body.city;
        // cityName = 'bsv';
        const schools = await staffGroupLogic.getSchoolsByCity(cityName);

        //no arguments needed
        //return group information (all the fields)
        res.json(schools);
        // res.json('ok')

        
    } catch (err) {
        res.json({ error: err.message });
    }
    
})

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

// Get all groups related to current staff user (GET)
router.get('/getgroups', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const userEmail = req.user.email;

        // Implementation One:
        /*
        const groups = await staffGroupLogic.getGroupsByStaffAccess(userEmail);
        */

        // Implementation Two:

        
        
        const userRole = req.user.role;
        let groups = [];

        if(accessGroup.D.includes(userRole)){
            groups = await staffGroupLogic.getGroupsByCityManager(userEmail);
        }

        else if(accessGroup.C.includes(userRole)){
            groups = await staffGroupLogic.getGroupsByAreaManager(userEmail);
        }

        else if(accessGroup.B.includes(userRole)){
            groups = await staffGroupLogic.getGroupsByTeamOwner(userEmail);
        }

        else {
            res.json({error: "You don't have the permission to perform this action!"});
        }
        
        
        res.json(groups); 
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// // Get all groups related to team owner (GET)
// router.get('/to', validateToken, validateAccess(accessGroup.B), async (req, res) => {
//     try {
//         const userEmail = req.user.email;

//         //access email by : req.user.email
//         //return all groups that related to this user email
//         const groups = await staffGroupLogic.getGroupsByTeamOwner(userEmail);
        
//         res.json(groups);
        
//         // res.json({groups: [
//         //     {ID: '1', groupName:'stupidName', 
//         //     students:['amiel@gmail.com','ari@gmail.com']},
//         // ]});
//     } catch (err) {
//         res.json({ error: err.message });
//     }
// });

// // Get all groups related to area manager (GET)
// router.get('/am', validateToken, validateAccess(accessGroup.C), async (req, res) => {
//     try {
//         const userEmail = req.user.email;

//         // returns groups by schools (for now)
//         const groups = await staffGroupLogic.getGroupsByAreaManager(userEmail);

//         res.json(groups);

//     } catch (err) {
//         res.json({ error: err.message });
//     }
// });

// // Get all groups related to city manager (GET)
// router.get('/cm', validateToken, validateAccess(accessGroup.D), async (req, res) => {
//     try {
//         const userEmail = req.user.email;

//         // const area1 = await Cities.create({
//         //     cityName: "city1",
//         //     cityManagerEmail: "test2@example.com"
//         // })

//         // returns groups by schools (for now)
//         const groups = await staffGroupLogic.getGroupsByCityManager(userEmail);

//         res.json(groups);

//     } catch (err) {
//         res.json({ error: err.message });
//     }
// });

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

// Get all groups (Admin) (GET)
router.get('/admin', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    // const userEmail = /*req.user.email"test3@example.com";
    try {
        const groups = await staffGroupLogic.getAllGroups();

        res.json(groups);
    } catch (err) {
        res.json({ error: err.message });
    }
});


// Get a single group by ID (GET)
router.get('/:id', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const groupId = req.params.id;

        const group = await staffGroupLogic.getGroupById(groupId);

        res.json(group);

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