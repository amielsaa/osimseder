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
        const userEmail = req.user.email;
        const newGroup = await staffGroupLogic.createGroup(groupSize, schoolId, userEmail);

        //no arguments needed
        //return group information (all the fields)
        res.json(newGroup);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Return all schools related to the city
router.post('/schools', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    try {
        // const groupSize = req.body.capacity;
        // const cityName = req.body.cityName;
        const cityName = req.body.city;
        const schools = await staffGroupLogic.getSchoolsByCity(cityName);

        //no arguments needed
        //return group information (all the fields)
        res.json(schools);
        // res.json('ok')


    } catch (err) {
        res.json({ error: err.message });
    }

});

// need to move to other route someday
// Return all schools related to the city
router.post('/schools_for_register', async (req, res) => {
    try {
        // const groupSize = req.body.capacity;
        // const cityName = req.body.cityName;
        const cityName = req.body.city;
        const schools = await staffGroupLogic.getSchoolsByCity(cityName);

        //no arguments needed
        //return group information (all the fields)
        res.json(schools);
        // res.json('ok')


    } catch (err) {
        res.json({ error: err.message });
    }
})
    
// get all groups with available space by school
router.get('/schools_for_register', async (req, res) => {
    try {
        // const groupSize = req.body.capacity;
        // const cityName = req.body.cityName;
        const cityName = req.body.city;
        const schools = await staffGroupLogic.getSchoolsByCity(cityName);

        //no arguments needed
        //return group information (all the fields)
        res.json(schools);
        // res.json('ok')

        
    } catch (err) {
        res.json({ error: err.message });
    }


    
})


// Return all groups in a school without a house
router.post('/emptygroups', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        // const groupSize = req.body.capacity;
        // const cityName = req.body.cityName;
        const schoolId = req.body.schoolId;
        const groups = await staffGroupLogic.getAllGroupsWithoutHouse(schoolId);

        //no arguments needed
        //return group information (all the fields)
        res.json(groups);
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
        console.log(req.user);
        const userEmail = req.user.email;

        // Implementation One:
        /*
        const groups = await staffGroupLogic.getGroupsByStaffAccess(userEmail);
        */

        // Implementation Two:

        
        
        const userRole = req.user.role;
        let groups = [];

        if ((accessGroup.E.includes(userRole))) { //for admin
            groups = await staffGroupLogic.getAllGroupsAdmin(userEmail);
        }

        else if(accessGroup.D.includes(userRole) || (accessGroup.C.includes(userRole))){
            groups = await staffGroupLogic.getGroupsByCityManager(userEmail);
        }

        // else if(accessGroup.C.includes(userRole)){
        //     groups = await staffGroupLogic.getGroupsByAreaManager(userEmail);
        // }

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
router.get('/:id', validateToken, async (req, res) => {
    try {
        const groupId = req.params.id;
        const user = req.user;

        const group = await staffGroupLogic.getGroupById(groupId, user);

        res.json(group);

    } catch (err) {
        res.json({ error: err.message });
    }
});



// Update a group by ID (PUT)
router.put('/:id', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFields = req.body;
        const userEmail = req.user.email;

        const newGroup = await staffGroupLogic.updateGroup(id, updatedFields, userEmail);
        res.json(newGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a group by ID (DELETE)
router.delete('/deleteGroup/:id', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const id = req.params.id;
        const userEmail = req.user.email;

        const deletedGroup = await staffGroupLogic.deleteGroup(id, userEmail);
        res.json(deletedGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get all available groups in school (GET)
router.post('/availableGroupsBySchool/', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const schoolName = req.body.schoolName;
        const requesterEmaail = req.user.email;

        const availableGroups = await staffGroupLogic.getAvailableGroupsBySchool(schoolName, requesterEmaail);

        res.json(availableGroups);
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;