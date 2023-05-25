const express = require('express');
const router = express();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/account.js');

router.post('/new', auth, userCtrl.create);
router.get('/:id', auth,userCtrl.get);

module.exports = router;
