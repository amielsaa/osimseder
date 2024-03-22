// ./routes/staffRoutes/index.js

const express = require('express');
const router = express.Router();

const groupRouter = require('./GroupRoute');
const houseRouter = require('./HouseRoute');
const taskRouter = require('./TaskRoute');
const studentRouter = require('./StudentRoute');
const staffRouter = require('./StaffRoute');


router.use('/groups',groupRouter);
router.use('/houses',houseRouter);
router.use('/tasks',taskRouter);
router.use('/students',studentRouter);
router.use('/staff',staffRouter);


module.exports = router;