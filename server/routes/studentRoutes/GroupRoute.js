const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken');
const {validateAccess, accessGroup} = require('../../utils/Accesses');
const groupLogic = require('../../domain/GroupLogic')
const groups = require('../../models/Group')
const RegistrationLogic = require("../../domain/RegistrationLogic")



// data provided by the request:
// json with all the studentModel properties except for 'password'
// req.body = {email:'', firstName:'', ...}

// Get all groups by school name (GET)
router.get('/', /*validateToken, validateAccess(accessGroup.A),*/ async (req, res) => {
    const { schoolId } = req.body;
    try {
        const groups = await groupLogic.getAllGroupsBySchool(schoolId);
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
            ID: group.ID,
            groupName: group.groupName,
            students: group.dataValues.students,
        }));
    
        res.json({
            groups: responseData,
        });

    } catch (err) {
        res.json({ error: err.message });
    }
});


// Get a single group by ID (GET)
router.get('/:id', /*validateToken, validateAccess(accessGroup.A),*/ async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await groupLogic.getAllGroupById(groupId);
        
        const students = await group.getStudents();
    
        const studentNames = students.map(student => {
            const { firstName, lastName, ...rest } = student;
            return `${firstName} ${lastName}`;
        });
    
        group.dataValues.students = studentNames;            
        

        const responseData = {
            ID: group.ID,
            groupName: group.groupName,
            students: group.dataValues.students,
        };
    
        res.json({
            group: responseData,
        });

    } catch (err) {
        res.json({ error: err.message });
    }
});

//Join Group by groupId
router.post('/join/:id', /*validateToken, validateAccess(accessGroup.A),*/ async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await groupLogic.getAllGroupById(groupId);
        
        const students = await group.getStudents();
    
        const studentNames = students.map(student => {
            const { firstName, lastName, ...rest } = student;
            return `${firstName} ${lastName}`;
        });
    
        group.dataValues.students = studentNames;            
        

        const responseData = {
            ID: group.ID,
            groupName: group.groupName,
            students: group.dataValues.students,
        };
    
        res.json({
            group: responseData,
        });
        // implement to add a student to an existing group
        // const group = {};
        //should return the group he just joined
        // res.json(group)
    } catch (err) {
        res.json({ error: err.message });
    }
});



module.exports = router;