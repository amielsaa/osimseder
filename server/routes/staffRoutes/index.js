// ./routes/staffRoutes/index.js

const express = require('express');
const router = express.Router();

const groupRouter = require('./GroupRoute');
const houseRouter = require('./HouseRoute');


router.use('/groups',groupRouter);
router.use('/houses',houseRouter);


module.exports = router;