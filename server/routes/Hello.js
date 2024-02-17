const express = require("express");
const router = express.Router();
const {Example} = require('../models')

router.get("/", async (req,res) => {
    const list = await Example.findAll();
    res.json({listOfGender: list})
})

router.post("/gender/:gender_name", async (req,res) => {
    const gender_name = req.params.gender_name
    if(gender_name != "male" && gender_name != "female") {
        res.json({error:"not possible"})
    } else {
        await Example.create({gender:gender_name})
        res.json({gender:gender_name})
    }
    
})

module.exports = router;