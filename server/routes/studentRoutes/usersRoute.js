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
    try{
        const user = StudentLogic.registerStudent(studentData);
        res.json(user)
    }catch(error){
        res.json({error: error});
        }
    })

module.exports = router;