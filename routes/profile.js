var express = require('express');
var router = express.Router();

var profile = require('../app/controllers/profile/profile');

router.get('/', profile.viewProfile);
router.post('/update', profile.updateProfile);

module.exports = router;
