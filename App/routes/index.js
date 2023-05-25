const express = require('express');
const router = express();
const userRoutes = require('./user.js');
const accountRoutes = require('./account.js');
const categoryRoutes = require('./category.js');
router.use('/auth', userRoutes);
router.use('/account', accountRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
