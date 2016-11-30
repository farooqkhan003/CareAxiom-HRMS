var express = require('express');
var router = express.Router();

var profile = require('../app/controllers/profile');

router.get('/view', profile.viewProfile);
router.post('/update', profile.updateProfile);

module.exports = router;
