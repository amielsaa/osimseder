// ./routes/auth/index.js

const express = require('express');
const router = express.Router();

// Import and use individual route handlers
const authenticationRouter = require('./AuthenticationRoute');
const emailRouter = require('./EmailRoute');
const setupRouter = require('./SetupRoute');
const userManagementRouter = require('./UserManagementRoute');

router.use(authenticationRouter);
router.use(emailRouter);
router.use(setupRouter);
router.use(userManagementRouter);

module.exports = router;
