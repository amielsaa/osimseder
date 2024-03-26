const express = require('express');
const router = express.Router();
const { validateToken } = require('../../utils/JsonWebToken')
const { validateAccess, accessGroup } = require('../../utils/Accesses')
const LocationLogic = require('../../domain/LocationLogic')
const { Groups, Staffs, Areas, Schools, Cities, Houses } = require('../../models/');

// get all cities
router.post('/getAllCities', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const areas = await LocationLogic.getAllCities();
        res.json(areas);

    } catch (err) {
        res.json({ error: err.message });
    }
});
// get all areas grouped by city
router.post('/getAreasByCityId', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const areas = await LocationLogic.getAreasByCityId();
        res.json(areas);

    } catch (err) {
        res.json({ error: err.message });
    }
});

// get all areas grouped by city
router.post('/getAllAreasByCity', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const areas = await LocationLogic.getAllAreasByCity();
        res.json(areas);
    } catch (err) {
        res.json({ error: err.message });
    }
});


// Return all schools related to the city
router.post('/getSchoolsByCityId', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const cityId = req.body.cityId; //TODO ARI AMIEL YOAV I CHANGED HERE TO CITYID IM NOT SURE IF ITS LEGAL
        const schools = await LocationLogic.getSchoolsByCityId(cityId);
        res.json(schools);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Return all schools grouped by the city
router.post('/getAllSchoolsByCity', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const schools = await LocationLogic.getAllSchoolsByCity(cityId);
        res.json(schools);
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;