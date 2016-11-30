var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  if(req.isAuthenticated()) {
    var redirectURL = '/profile?user=' + req.user.userName;
    return res.redirect(redirectURL);
  }
  else {
    global.db.User.addUserComplete('abcde', 'abc@abc.com', 'mmmmm', 'admin', 'ab', 'cba', 'Software Developer',
      null, null, '10', 'PKR', 'pending', new Date().getMonth(), new Date().getYear(), '0', '0');
    global.db.User.addUserComplete('abcdef', 'ab@abc.com', 'mmmmm', 'engineer', 'ab', 'cba', 'Software Developer',
      null, null, '10', 'PKR', 'pending', new Date().getMonth(), new Date().getYear(), '0', '0');

    res.render('login', { message : req.flash('message') });
  }
});

module.exports = router;
