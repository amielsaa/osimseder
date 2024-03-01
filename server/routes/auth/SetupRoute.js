const express = require('express');
const router = express.Router();

const {Schools} = require('../../models/');
const {Groups} = require('../../models/');
const {Staffs, Cities, Areas, Houses} = require('../../models/');
const registrationLogic = require('../../domain/RegistrationLogic');
router.post('/setup', async (req,res) => {
    try{
        await setupCities();
        await setupAreas();
        await setupSchools();
        await setupUsers();
        await setupGroups();
        await setupHouses();
        res.json('DONE')

    }catch(error) {
        res.json(error);
    }
})

const setupUsers = async () => {
    //students
    await registrationLogic.registerStudent({
        email: "amiel@gmail.com",
        password: "123456",
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0548552120",
        gender: "Male",
        parentName: "parent",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "BSV",
        school: "bs",
        languages: ["English"]
    })
    //team owners
    await registrationLogic.registerStaff({
        email:'amiels@gmail.com',
        password: '123456',
        lastName: 'to',
        firstName: 'amiel',
        phoneNumber: '0549552120',
        gender: 'Male',
        accesses: 'B',
        city: 'BSV',
    })

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
        teamOwnerEmail:"amiels@gmail.com",
        capacity:4,
        schoolId:1
    })
    await Groups.create({
        teamOwnerEmail:"amiels@gmail.com",
        capacity:4,
        schoolId:1
    })
}

const setupHouses = async () => {
    await Houses.create({
        teamOwnerEmail:"amiels@gmail.com",
        address:"mashu mashu 4",
        residentLastName:"kashish",
        residentFirstName:"meod",
        residentPhoneNum:"0123123123",
        residentAlternatePhoneNum:"0876876876",
        residentGender:"male"
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