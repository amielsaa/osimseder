const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const StaffHouseLogic = require('../../domain/StaffHouseLogic')
const {Groups, Staffs, Areas, Schools, Cities, Houses} = require('../../models/');

// Create a new house (POST)
router.post('/', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const address= req.body.address;
        const residentLastName = req.body.residentLastName;
        const residentFirstName = req.body.residentFirstName;
        const residentPhoneNum = req.body.residentPhoneNum;
        const languageNeeded = req.body.languageNeeded;

        const newHouse = await StaffHouseLogic.createHouse(address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded);

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
router.get('/', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const houses = await StaffHouseLogic.getAllHouses();

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
        
        res.json(houses);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Get a single house by ID (GET)
router.get('/:id', validateToken, validateAccess(accessGroup.C), async (req, res) => {
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

module.exports = router;