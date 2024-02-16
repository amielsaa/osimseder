// ./routes/auth/index.js

const express = require('express');
const router = express.Router();

// Import and use individual route handlers
const staffAuthenticationRouter = require('./StaffAuthenticationRoute');
const studentAuthenticationRouter = require('./StudentAuthenticationRoute');
const emailRouter = require('./EmailRoute');

router.use(staffAuthenticationRouter);
router.use(studentAuthenticationRouter);
router.use(emailRouter);

module.exports = router;
