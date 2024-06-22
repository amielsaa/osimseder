const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const staffAreasLogic = require('../../domain/StaffAreasLogic')

// Get all areas by city
router.get('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const cityId = req.params.id;

        const allAreas = await staffAreasLogic.fetchAllAreasByCity(cityId);

        res.json(allAreas);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});


//Create new area
router.post('/', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const areaName = req.body.areaName;
        const cityId = req.body.cityId;

        const newArea = await staffAreasLogic.createArea(areaName, cityId);

        res.json(newArea);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Delete area by ID
router.delete('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const areaId = req.params.id;

        const result = await staffAreasLogic.deleteArea(areaId);

        res.json(result);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

//Edit area
router.put('/:id', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFields = req.body;
        const newArea = await staffAreasLogic.updateArea(id, updatedFields);
        res.json(newArea);
    } catch (err) {
        res.json({ error: err.message });
    }
});



module.exports = router;