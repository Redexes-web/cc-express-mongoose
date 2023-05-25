const express = require('express');
const router = express();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/account.js');

router.post('/', auth, userCtrl.create);
router.get('/:id', auth,userCtrl.get);
router.put('/:id', auth, userCtrl.update);
router.delete('/:id', auth, userCtrl.delete);

module.exports = router;
