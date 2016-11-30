var express = require('express');
var router = express.Router();

var user = require('../app/controllers/user');
var leave = require('../app/controllers/leave');

router.get('/', function(req, res, next) {
  res.render('profile');
});

router.post('/new', user.addNewUserQuick);

router.get('/abc/:abc', function(req, res, next) {
  res.json({ abc : 'abc' });
  // req.params.abc
});

module.exports = router;
