const express = require('express');
const router = express();
const userRoutes = require('./user.js');
const accountRoutes = require('./account.js');
const categoryRoutes = require('./category.js');
const transactionRoutes = require('./transaction.js');
router.use('/auth', userRoutes);
router.use('/account', accountRoutes);
router.use('/category', categoryRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
