const express = require('express');
const router = express();
const userRoutes = require('./user.js');
const accountRoutes = require('./account.js');
router.use('/auth', userRoutes);
router.use('/account', accountRoutes);

module.exports = router;
