// ./routes/staffRoutes/index.js

const express = require('express');
const router = express.Router();

const groupRouter = require('./GroupRoute');
const houseRouter = require('./HouseRoute');
const taskRouter = require('./TaskRoute');
const studentRouter = require('./StudentRoute');
const staffRouter = require('./StaffRoute');
const schoolRouter = require('./SchoolRoute');
const citiesRouter = require('./CitiesRoute');
const areasRouter = require('./AreasRoute');
const exportRouter = require('./ExportRoute');


router.use('/groups',groupRouter);
router.use('/houses',houseRouter);
router.use('/tasks',taskRouter);
router.use('/students',studentRouter);
router.use('/staff',staffRouter);
router.use('/schools',schoolRouter);
router.use('/cities',citiesRouter);
router.use('/areas',areasRouter);

router.use('/export',exportRouter);


module.exports = router;