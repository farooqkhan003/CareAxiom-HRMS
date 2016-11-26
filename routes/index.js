var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  global.db.User.addUser('abcde', 'abc@abc.com', 'mmmmm', 'ab', 'cd', 'Engineer', '0', null, '10');
  // global.db.User.addUserTemp('abcde', 'abc@abc.com', 'edcba').then(function (user) {
  //   console.log(user);
  // });
  res.render('login', { message : req.flash('message') });
});

module.exports = router;
