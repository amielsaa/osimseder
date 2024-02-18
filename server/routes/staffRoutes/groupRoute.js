const express = require('express');
const router = express.Router();
const {validateToken} = require('../../utils/JsonWebToken')
const {validateAccess, accessGroup} = require('../../utils/Accesses')

// Create a new group (POST)
router.post('/', validateToken, async (req, res) => {
    try {
        res.json(group);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Get all groups (GET)
router.get('/', validateToken, async (req, res) => {
    try {
        const groups = await GroupModel.findAll();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single group by ID (GET)
router.get('/groups/:id', validateToken, async (req, res) => {
    try {
        const group = await GroupModel.findByPk(req.params.id);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ message: 'group not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Update a group by ID (PUT)
router.put('/:id', validateToken, async (req, res) => {
    try {
        const group = await GroupModel.findByPk(req.params.id);
        if (group) {
            await group.update(req.body);
            res.json(group);
        } else {
            res.status(404).json({ message: 'group not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a group by ID (DELETE)
router.delete('/:id', validateToken, async (req, res) => {
    try {
        const group = await GroupModel.findByPk(req.params.id);
        if (group) {
            await group.destroy();
            res.json({ message: 'group deleted' });
        } else {
            res.status(404).json({ message: 'group not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;