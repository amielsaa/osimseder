// ./routes/studentRoutes/index.js

const express = require('express');
const router = express.Router();

const groupRouter = require('./GroupRoute');

router.use('/groups',groupRouter);


module.exports = router;