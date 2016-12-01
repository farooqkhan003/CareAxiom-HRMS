/*
 * @author Khawaja Ahsen
 * created on: 24/11/2016
 * last modified: 28/11/2016
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  if(req.isAuthenticated()) {
    var redirectURL = '/profile/view?user=' + req.user.userName;
    return res.redirect(redirectURL);
  }
  else {
    global.db.User.addUserComplete('abcde', 'abc@abc.com', 'mmmmm', 'admin', 'ab', 'cba', 'Software Developer',
      null, null, '10', 'PKR', '0', '0');
    global.db.User.addUserComplete('Farooq', 'khan@gmail.com', 'farooq123', 'engineer', 'Farooq', 'Khan',
      'Software Developer', '03364858129', 'Lahore', '500', 'USD', '0', '10');
    global.db.Module.addModule('moduleName', 'moduleDescription');

    res.render('login', { message : req.flash('message') });
  }
});

module.exports = router;
