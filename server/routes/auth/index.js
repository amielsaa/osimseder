// ./routes/auth/index.js

const express = require('express');
const router = express.Router();

// Import and use individual route handlers
const authenticationRouter = require('./AuthenticationRoute');
const emailRouter = require('./EmailRoute');

router.use(authenticationRouter);
router.use(emailRouter);

module.exports = router;
