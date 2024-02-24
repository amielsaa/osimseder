const express = require('express');
const router = express.Router();

const {Schools} = require('../../models/');
const {Groups} = require('../../models/');
const {Staffs, Cities, Areas} = require('../../models/');
const registrationLogic = require('../../domain/RegistrationLogic');
router.post('/setup', async (req,res) => {
    try{
        console.log('hi');
        await setupCities();
        await setupAreas();
        await setupUsers();
        await setupSchools();
        await setupGroups();
        res.json('DONE')

    }catch(error) {
        res.json(error);
    }
})

const setupUsers = async () => {
    
    //area managers
    await registrationLogic.registerStaff({
        email:'amieleastbsv@gmail.com',
        password: '123456',
        lastName: 'eastbsv',
        firstName: 'amiel',
        phoneNumber: '0549552120',
        gender: 'Male',
        accesses: 'C',
        city: 'BSV',
    })
    await registrationLogic.registerStaff({
        email:'amieleastjrs@gmail.com',
        password: '123456',
        lastName: 'eastjrs',
        firstName: 'amiel',
        phoneNumber: '0549552120',
        gender: 'Male',
        accesses: 'C',
        city: 'JRS',
    })

    //city managers
    await registrationLogic.registerStaff({
        email:'amieljrs@gmail.com',
        password: '123456',
        lastName: 'jrs',
        firstName: 'amiel',
        phoneNumber: '0549552120',
        gender: 'Male',
        accesses: 'D',
        city: 'JRS',
    })

    await registrationLogic.registerStaff({
        email:'amielbsv@gmail.com',
        password: '123456',
        lastName: 'bsv',
        firstName: 'amiel',
        phoneNumber: '0549552120',
        gender: 'Male',
        accesses: 'D',
        city: 'BSV',
    })
}

const setupSchools = async () => {
    await Schools.create({
        schoolName:"bs",
        schoolId: "1",
        cityId: "1"
    })
}

const setupGroups = async () => {
    await Groups.create({
        teamOwnerEmail:"wtf@gmail.com",
        capacity:4,
        schoolId:1
    })
    await Groups.create({
        teamOwnerEmail:"wtf@gmail.com",
        capacity:4,
        schoolId:1
    })
}

const setupCities = async () => {
    await Cities.create({
        cityName: 'BSV',
        cityManagerEmail: 'amielbsv@gmail.com'
    })
    await Cities.create({
        cityName: 'JRS',
        cityManagerEmail: 'amieljrs@gmail.com'
    })
}

const setupAreas = async () => {
    await Areas.create({
        areaName:'eastbsv',
        areaManagerEmail: 'amieleastbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'eastjrs',
        areaManagerEmail: 'amieleastjrs@gmail.com',
        cityId: '2'
    })
    
}

module.exports = router