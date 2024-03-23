const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')
const StaffTaskLogic = require('../../domain/StaffTaskLogic')
const {Groups, Staffs, Areas, Schools, Cities, Houses, Tasks} = require('../../models/');

// Create a new task (POST)
router.post('/', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        
        const houseId = req.body.houseId;
        const type= req.body.type;
        const room = req.body.room;
        const freeText = req.body.freeText;
        const status = req.body.status;

        const newTask = await StaffTaskLogic.createTask(type, room, freeText, status, houseId);

        res.json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all tasks by house (GET)
router.get('/:houseId', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const houseId = req.params.houseId;

        const newTask = await StaffTaskLogic.getAllTasksByHouse(houseId);
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single task by ID (GET)
router.post('/:id', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const id = req.params.id;

        const newTask = await StaffTaskLogic.getTaskById(id);
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a task by ID (PUT)
router.put('/:id', validateToken, validateAccess(accessGroup.B), async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFields = req.body;

        const newTask = await StaffTaskLogic.updateTask(id, updatedFields);
        res.json(newTask);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task by ID (DELETE)
router.delete('/:id', validateToken, validateAccess(accessGroup.C), async (req, res) => {
    try {
        const id = req.params.id;
        const newTask = await StaffTaskLogic.deleteTask(id);
        res.json(newTask);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;