const express = require('express');
const router = express();
const auth = require('../middleware/auth');

const transactionCtrl = require('../controllers/transaction.js');

router.post('/', auth, transactionCtrl.create);
router.put('/:id', auth, transactionCtrl.update);
router.delete('/:id', auth, transactionCtrl.delete);

module.exports = router;
