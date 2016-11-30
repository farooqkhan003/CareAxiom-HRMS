var express = require('express');
var router = express.Router();

var user = require('../app/controllers/user');
var leave = require('../app/controllers/leave');
var directory = require('../app/controllers/directory');


router.post('/new', user.addNewUserQuick);
router.post('/leave/apply', leave.applyForLeave);
router.get('/directory/view', directory.viewDirectory);

module.exports = router;
