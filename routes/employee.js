var express = require('express');
var router = express.Router();

var user = require('../app/controllers/user');
var leave = require('../app/controllers/leave');
var directory = require('../app/controllers/directory');

router.get('/', function(req, res, next) {
  res.render('profile');
});

router.post('/new', user.addNewUserQuick);
router.post('/applyLeave', leave.applyForLeave);
router.get('/directory', directory.viewDirectory);

router.get('/abc/:abc', function(req, res, next) {
  res.json({ abc : 'abc' });
  // req.params.abc
});

module.exports = router;
