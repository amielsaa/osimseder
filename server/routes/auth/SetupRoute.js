const express = require('express');
const router = express.Router();

const {Schools} = require('../../models/');
const {Groups} = require('../../models/');
const {Staffs} = require('../../models/');

router.post('/setup', async (req,res) => {
    try{
        
        await setupUsers();
        await setupSchools();
        await setupGroups();
        res.json('DONE')

    }catch(error) {
        res.json(error);
    }
})

const setupUsers = async () => {
    
}

const setupSchools = async () => {
    await Schools.create({
        schoolName:"bs"
    })
}

const setupGroups = async () => {
    await Groups.create({
        teamOwnerEmail:"wtf@gmail.com",
        membersCount:4,
        schoolId:1
    })
    await Groups.create({
        teamOwnerEmail:"wtf@gmail.com",
        membersCount:4,
        schoolId:1
    })
}

module.exports = router