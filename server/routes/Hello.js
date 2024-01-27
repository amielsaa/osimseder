const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.send(res.json([{yomama:"is a hoe"}]))
})

module.exports = router