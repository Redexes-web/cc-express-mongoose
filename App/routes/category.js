const express = require('express');
const router = express();
const auth = require('../middleware/auth');

const categoryCtrl = require('../controllers/category.js');

router.post('/', auth, categoryCtrl.create);
router.get('/:id', auth,categoryCtrl.get);
router.put('/:id', auth, categoryCtrl.update);
router.delete('/:id', auth, categoryCtrl.delete);

module.exports = router;
