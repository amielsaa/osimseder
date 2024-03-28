// ./routes/auth/index.js

const express = require('express');
const router = express.Router();

// Import and use individual route handlers
const locationManagementRoute = require('./LocationManagementRoute');

router.use(locationManagementRoute);

module.exports = router;
