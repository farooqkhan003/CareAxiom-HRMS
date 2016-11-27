var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  global.db.User.addUser('abcde', 'abc@abc.com', 'mmmmm', 'ab', 'cba', 'Engineer', null, null, '10', 'PKR',
    'pending', new Date().getMonth(), new Date().getYear(), '0', '0');

  res.render('login', { message : req.flash('message') });

  global.db.Module.addModule(null, 'description').then(function (module) {
    console.log('NO ERROR');
  }).catch(function (err) {
    console.log('ERROR');
  });

});

module.exports = router;
