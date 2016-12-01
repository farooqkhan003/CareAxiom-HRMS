/*
 * @author Khawaja Ahsen
 * created on: 24/11/2016
 * known bugs: null
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
    global.db.User.addUserComplete('AliAhmed', 'ali@gmail.com', '12345', 'engineer', 'Ali', 'Ahmed', 'Software Developer',
      '090078601', 'Lahore', '10000', 'PKR', '0', '0');
    global.db.Module.addModule('moduleName', 'moduleDescription');

    res.render('login', { message : req.flash('message') });
  }
});

module.exports = router;
