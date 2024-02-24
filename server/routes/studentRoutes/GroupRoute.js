const express = require('express');
const router = express.Router();
const {validateToken, verifyToken} = require('../../utils/JsonWebToken');
const {validateAccess, accessGroup} = require('../../utils/Accesses');
const groupLogic = require('../../domain/GroupLogic')
const {Groups} = require('../../models/')
const {Schools} = require('../../models/')
const RegistrationLogic = require("../../domain/RegistrationLogic")
const {verify} = require('jsonwebtoken')





// data provided by the request:
// json with all the studentModel properties except for 'password'
// req.body = {email:'', firstName:'', ...}

// Get all groups by school name (GET)
router.post('/', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    const { schoolId } = req.body;
    try {

        const groups = await groupLogic.getAllGroupsBySchool(schoolId);
        return groups;

    } catch (err) {
        res.json({ error: err.message });
    }
});


router.post('/init_test', async (req, res) => {
    await Groups.create({groupName:'bb',teamOwnerId:'fe', schoolId:'1'})
    //await Schools.create({schoolName:'oo'})
})

// Get a single group by ID (GET)
router.get('/:id', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await groupLogic.getAllGroupById(groupId);
        
        return group;

    } catch (err) {
        res.json({ error: err.message });
    }
});

//Join Group by groupId
router.post('/join/:id', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    const groupId = req.params.id;
    const verifiedUser = verifyToken(req.header("accessToken"));
    const userEmail = verifiedUser['email'];
    // userEmail = ""
    try {
        // const group = {};
        const group = await groupLogic.joinGroup(groupId, userEmail);
        // implement to add a student to an existing group
        //should return the group he just joined
        res.json(group)
    } catch (err) {
        res.json({ error: err.message });
    }
});



module.exports = router;