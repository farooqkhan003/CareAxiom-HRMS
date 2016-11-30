var express = require('express');
var router = express.Router();

var modules = require('../app/controllers/modules');

router.post('/modules/new', modules.addModule);
router.get('/modules/view', modules.viewModules);
router.post('/modules/update', modules.updateModule);

module.exports = router;
