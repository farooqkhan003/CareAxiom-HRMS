var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('profile');
});

router.get('/abc/:abc', function(req, res, next) {
  res.json({ abc : 'abc' });
  // req.params.abc
});

module.exports = router;
