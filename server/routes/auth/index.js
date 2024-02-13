// ./routes/auth/index.js

const express = require('express');
const router = express.Router();

// Import and use individual route handlers
const staffAuthenticationRouter = require('./StaffAuthenticationRoute');
const studentAuthenticationRouter = require('./StudentAuthenticationRoute');
const emailRouter = require('./EmailRoute');

router.use("/staffauth", staffAuthenticationRouter);
router.use("/staffauth2", studentAuthenticationRouter);
router.use("/staffauth3", emailRouter);

module.exports = router;
