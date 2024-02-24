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
        const groupSize = req.body.groupSize;

        const newGroup = await staffGroupLogic.createGroup(groupSize);

        //no arguments needed
        //return group information (all the fields)
        res.json(newGroup);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups related to team owner (GET)
router.get('/to', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const userEmail = req.user.email;

        //access email by : req.user.email
        //return all groups that related to this user email
        const groups = await staffGroupLogic.getGroupsByTeamOwner(userEmail);
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
    
            const students = await group.getStudents();
    
            const studentNames = students.map(student => {
                const { firstName, lastName, ...rest } = student;
                return `${firstName} ${lastName}`;
            });
    
            group.dataValues.students = studentNames;            
        }

        const responseData = groups.map(group => ({
            id: group.id,
            students: group.dataValues.students,
        }));
    
        res.json({
            groups: responseData,
        });
        
        // res.json({groups: [
        //     {ID: '1', groupName:'stupidName', 
        //     students:['amiel@gmail.com','ari@gmail.com']},
        // ]});
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups related to area manager (GET)
router.get('/am', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const userEmail = req.user.email;

        // const newStaff1 = await Staffs.create({
        //     email: "test@example.com",
        //     password: "password123",      
        //     lastName: "lastname",
        //     firstName: "firstname",
        //     phoneNumber: "0524587746",
        //     gender: "Male",
        //     city: "JRS",
        //     accesses: "C"
            
        //   });
        // const area1 = await Areas.create({
        //     areaName: "area1",
        //     areaManagerEmail: "test@example.com"
        // })
        // const school1 = await Schools.create({
        //     schoolName: "school2",
        //     areaId: 1
        // });
        // const school2 = await Schools.create({
        //     schoolName: "school1"
        // })

        
        //access email by : req.user.email
        // area (mail==mail), school (areaId = id), get all groups (schoolId = id)

        //pull staff user by email and check its area name, pull all groups by the area name
        //return all groups that related to this user email

        // returns groups by schools (for now)
        const groups = await staffGroupLogic.getGroupsByAreaManager(userEmail);

        
        /*
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
    
            const students = await group.getStudents();
    
            const studentNames = students.map(student => {
                const { firstName, lastName, ...rest } = student;
                return `${firstName} ${lastName}`;
            });
    
            group.dataValues.students = studentNames;            
        }

        const responseData = groups.map(group => ({
            id: group.id,
            students: group.dataValues.students,
        }));
    
        res.json({
            groups: responseData,
        });
        */
        
        res.json(groups);

    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups related to city manager (GET)
router.get('/cm', validateToken, validateAccess(accessGroup.D), async (req, res) => {
    try {
        const userEmail = req.user.email;

        // const newStaff1 = await Staffs.create({
        //     email: "test2@example.com",
        //     password: "password123",      
        //     lastName: "lastname",
        //     firstName: "firstname",
        //     phoneNumber: "0524587746",
        //     gender: "Male",
        //     city: "JRS",
        //     accesses: "D"
            
        // });
        const area1 = await Cities.create({
            cityName: "city1",
            cityManagerEmail: "test2@example.com"
        })
        //access email by : req.user.email
        //same as area manager just for cities
        //return all groups that related to this user email

        // returns groups by schools (for now)
        const groups = await staffGroupLogic.getGroupsByCityManager(userEmail);

        res.json(groups);

    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all groups (Admin) (GET)
router.get('/admin', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    // const userEmail = /*req.user.email"test3@example.com";
    try {
        // const newStaff1 = await Staffs.create({
        //     email: "test3@example.com",
        //     password: "password123",      
        //     lastName: "lastname",
        //     firstName: "firstname",
        //     phoneNumber: "0524587746",
        //     gender: "Male",
        //     city: "JRS",
        //     accesses: "E"
            
        // });
        
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
        //req.params.id = groupId
        //return all information regarding that group


        const group = await staffGroupLogic.getGroupById(groupId);


        // const schools = await group.getSchools();
        
        // const studentNames = students.map(student => {
        //     const { firstName, lastName, ...rest } = student;
        //     return `${firstName} ${lastName}`;
        // });

        // group.dataValues.students = studentNames;            
        // group.dataValues.schools = schools;            
        

        // const responseData = groups.map(group => ({
        //     id: group.id,
        //     students: group.dataValues.students,
        // }));
    
        // res.json({
        //     groups: responseData,
        // });

        res.json(group);

        // res.json({group: {
        //     ID: '1',
        //     groupName: 'stupidName',
        //     teamOwner: 'firstName lastName',
        //     school: 'schoolName',
        // }})
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