const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateToken, validateToken } = require("../../utils/JsonWebToken");
const {UsersToDelete} = require('../../models')
const {sign} = require('jsonwebtoken');

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const user = await UsersToDelete.findOne({where: {username: username}});

    if(!user) res.json({error:"User doesn't exists"});
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if(!match) res.json({error: "Wrong username and password combination"});
            else {
                const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
                res.json({token:accessToken, username: username, id: user.id});
            }
        })
    }
})

router.post('/',async (req,res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        UsersToDelete.create({
            username: username,
            password: hash
        })
        res.json("SUCCESS")
    });

})


module.exports = router;