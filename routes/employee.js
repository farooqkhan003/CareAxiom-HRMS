var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('profile');
});

router.get('/abc/:abc', function(req, res, next) {

  res.json({ abc : 'abc' });
  // req.user.id -> ID of the person logged in
  // req.params.user_id -> ID of person in url
  // console.log(req.app.locals.rootDirectory);
});

module.exports = router;
