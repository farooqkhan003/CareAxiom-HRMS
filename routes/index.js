var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  global.db.User.addUserComplete('abcde', 'abc@abc.com', 'mmmmm', 'Admin', 'ab', 'cba', 'Engineer', null, null,
    '10', 'PKR', 'pending', new Date().getMonth(), new Date().getYear(), '0', '0');
  global.db.User.addUserComplete('abcdef', 'ab@abc.com', 'mmmmm', 'Engineer', 'ab', 'cba', 'Engineer', null, null,
    '10', 'PKR', 'pending', new Date().getMonth(), new Date().getYear(), '0', '0');

  res.render('login', { message : req.flash('message') });

});

module.exports = router;
