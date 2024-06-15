const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const StaffTaskLogic = require('../../domain/StaffTaskLogic')
const {Groups, Staffs, Areas, Schools, Cities, Houses, Tasks} = require('../../models');
const ExportLogic = require('../../domain/ExportLogic');

// Create a new task (POST)
router.post('/', validateToken, validateAccess(accessGroup.E), async (req, res) => {
    try {
        const table = req.body.table;

        const tableRes = await ExportLogic.exportTable(table);
        res.json(tableRes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;