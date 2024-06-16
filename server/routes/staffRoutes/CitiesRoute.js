const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const staffCitiesLogic = require('../../domain/StaffCitiesLogic');
const { restart } = require('nodemon');
// const StaffGroupLogic = require('../../domain/StaffGroupLogic');

// Get all cities
router.get('/', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const allCities = await staffCitiesLogic.fetchAllCities();

        res.json(allCities);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Create new city
router.post('/', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const cityName = req.body.cityName;

        const newCity = await staffCitiesLogic.createCity(cityName);

        res.json(newCity);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Delete city by ID
router.delete('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const cityId = req.params.id;

        const result = await staffCitiesLogic.deleteCity(cityId);

        res.json(result);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});


router.put('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFields = req.body;
        const newCity = await staffCitiesLogic.updateCity(id, updatedFields);
        res.json(newCity);
    } catch (err) {
        res.json({ error: err.message });
    }
});



module.exports = router;