// ./routes/staffRoutes/index.js

const express = require('express');
const router = express.Router();

const groupRouter = require('./GroupRoute');
const houseRouter = require('./HouseRoute');
const taskRouter = require('./TaskRoute');
const studentRouter = require('./StudentRoute');


router.use('/groups',groupRouter);
router.use('/houses',houseRouter);
router.use('/tasks',taskRouter);
router.use('/students',studentRouter);


module.exports = router;