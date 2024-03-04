// ./routes/staffRoutes/index.js

const express = require('express');
const router = express.Router();

const groupRouter = require('./GroupRoute');
const houseRouter = require('./HouseRoute');
const taskRouter = require('./TaskRoute');


router.use('/groups',groupRouter);
router.use('/houses',houseRouter);
router.use('/tasks',taskRouter);


module.exports = router;