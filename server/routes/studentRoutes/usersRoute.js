const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateToken, validateToken } = require("../../utils/JsonWebToken");
const {UsersToDelete} = require('../../models')
const {sign} = require('jsonwebtoken');
const StudentLogic = require('../../domain/studentDomain/StudentLogic')

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    try{
        const user = StudentLogic.verifyLogin(username, password);
        res.json(user)
    }catch(error){
        res.json({error: error});
        }
})

router.post('/register', async (req,res) => {
    const studentData = req.body;
    const user = await StudentLogic.registerStudent(studentData);

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


module.exports = router;