const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const StaffHouseLogic = require('../../domain/StaffHouseLogic')
const {Groups, Staffs, Areas, Schools, Cities, Houses} = require('../../models/');

// Create a new house (POST)
router.post('/', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const userEmail = req.user.email;
        const address= req.body.address;
        const residentLastName = req.body.residentLastName;
        const residentFirstName = req.body.residentFirstName;
        const residentPhoneNum = req.body.residentPhoneNum;
        const languageNeeded = req.body.languageNeeded;

        const residentAlternatePhoneNum = req.body.residentAlternatePhoneNum;
        const city = req.body.city;
        const area = req.body.area;
        const gender = req.body.gender;
        const numberOfRooms = req.body.numberOfRooms;
        const membersNeeded = req.body.membersNeeded;
        const freetext = req.body.freeText;

        const newHouse = await StaffHouseLogic.createHouse(userEmail, address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded,
            city, area, gender, numberOfRooms, membersNeeded, freetext, residentAlternatePhoneNum);


        //returns like this:
        // "id": 2,
        // "address": "address1",
        // "residentLastName": "",
        // "residentFirstName": "firstnameee",
        // "residentPhoneNum": "0512345678",
        // "languageNeeded": "heb",
        // "updatedAt": "2024-02-27T13:26:23.912Z",
        // "createdAt": "2024-02-27T13:26:23.912Z",
        // "freeText": null,
        // "picBefore": null,
        // "picAfter": null,
        // "cityId": null,
        // "areaId": null

        res.json(newHouse);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get all houses (GET)
router.get('/', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const userEmail = req.user.email;
        const userRole = req.user.role;
        // team owner - only his groups
        // area and city managers - the city's houses
        let houses;
        // houses = await StaffHouseLogic.getAllHouses();

        if((accessGroup.C.includes(userRole))){ //for area and city managers
            houses = await StaffHouseLogic.getAllHousesOfCity(userEmail);
        }

        else {
            houses = await StaffHouseLogic.getAllHousesOfTeamOwner(userEmail);
        }
        
        res.json(houses); 

        //returns like this:
        // [
        //     {
        //         "id": 1,
        //         "address": "address1",
        //         "residentLastName": "lastnameeee",
        //         "residentFirstName": "firstnameee",
        //         "residentPhoneNum": "0512345678",
        //         "languageNeeded": "heb",
        //         "freeText": null,
        //         "picBefore": null,
        //         "picAfter": null,
        //         "createdAt": "2024-02-27T13:19:38.581Z",
        //         "updatedAt": "2024-02-27T13:19:38.581Z",
        //         "cityId": null,
        //         "areaId": null
        //     },
        //     {
        //         "id": 2,
        //         "address": "address1",
        //         "residentLastName": "",
        //         "residentFirstName": "firstnameee",
        //         "residentPhoneNum": "0512345678",
        //         "languageNeeded": "heb",
        //         "freeText": null,
        //         "picBefore": null,
        //         "picAfter": null,
        //         "createdAt": "2024-02-27T13:26:23.912Z",
        //         "updatedAt": "2024-02-27T13:26:23.912Z",
        //         "cityId": null,
        //         "areaId": null
        //     }
        // ]
        
        // res.json(houses);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get a single house by ID (GET)
router.get('/:id', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const houseId= req.params.id;
        const house = await StaffHouseLogic.getHouseById(houseId);

        //returns like this:
        // "id": 2,
        // "address": "address1",
        // "residentLastName": "",
        // "residentFirstName": "firstnameee",
        // "residentPhoneNum": "0512345678",
        // "languageNeeded": "heb",
        // "updatedAt": "2024-02-27T13:26:23.912Z",
        // "createdAt": "2024-02-27T13:26:23.912Z",
        // "freeText": null,
        // "picBefore": null,
        // "picAfter": null,
        // "cityId": null,
        // "areaId": null

        // needed:
        // house.city = 'BSV'
        // house.neighborhood = 'Shuna Bet'
        // house.teamOwner = amiel saad
        // house.teamOwner_2 = same
        
        res.json(house);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Update a house by ID (PUT)
router.put('/:id', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const house = await houseModel.findByPk(req.params.id);
        if (house) {
            await house.update(req.body);
            res.json(house);
        } else {
            res.status(404).json({ message: 'house not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a house by ID (DELETE)
router.delete('/:id', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const houseId= req.params.id;
        const house = await StaffHouseLogic.deleteHouse(houseId);

        //returns like this:
        // "id": 2,
        // "address": "address1",
        // "residentLastName": "",
        // "residentFirstName": "firstnameee",
        // "residentPhoneNum": "0512345678",
        // "languageNeeded": "heb",
        // "updatedAt": "2024-02-27T13:26:23.912Z",
        // "createdAt": "2024-02-27T13:26:23.912Z",
        // "freeText": null,
        // "picBefore": null,
        // "picAfter": null,
        // "cityId": null,
        // "areaId": null

        res.json(house);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Assign house to group
router.post('/:houseid/:groupid', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const groupId= req.params.groupid;
        const houseId= req.params.houseid;
        const group = await StaffHouseLogic.assignGroupToHouse(houseId, groupId);

        //returns the group assigned to the house
        res.json(group);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Assign second team owner to house
router.post('/assignsecondonwer', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const newUserEmail = req.body.newUserEmail;

        // const groupId= req.params.groupid;
        const houseId= req.body.houseId;
        const house = await StaffHouseLogic.assignSecondTeamOwner(houseId, newUserEmail);

        //returns the group assigned to the house
        res.json(house);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// get all areas grouped by city
// TODO: move this to another route, maybe city route?
router.post('/getareas', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        
        const areas = await StaffHouseLogic.getAllAreasByCity();

        res.json(areas);

        // returns like this:
        /*
        {
            "BSV": [
                {
                    "id": 1,
                    "areaName": "eastbsv",
                    "areaManagerEmail": "amieleastbsv@gmail.com",
                    "createdAt": "2024-02-28T17:26:24.446Z",
                    "updatedAt": "2024-02-28T17:26:24.446Z",
                    "cityId": 1
                }
            ],
            "JRS": [
                {
                    "id": 2,
                    "areaName": "eastjrs",
                    "areaManagerEmail": "amieleastjrs@gmail.com",
                    "createdAt": "2024-02-28T17:26:24.452Z",
                    "updatedAt": "2024-02-28T17:26:24.452Z",
                    "cityId": 2
                },
                {
                    "id": 3,
                    "areaName": "testbsv",
                    "areaManagerEmail": "amieleastjrs@gmail.com",
                    "createdAt": "2024-02-28T17:26:24.452Z",
                    "updatedAt": "2024-02-28T17:26:24.452Z",
                    "cityId": 2
                }
            ]
        }
        */
        
    } catch (err) {
        res.json({ error: err.message });
    }
});


module.exports = router;