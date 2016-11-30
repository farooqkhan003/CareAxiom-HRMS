var express = require('express');
var router = express.Router();

var modules = require('../app/controllers/modules');

router.post('/modules', modules.addModule);

router.get('/modules/view', modules.viewModules);

router.post('/', modules.updateModule);

module.exports = router;
