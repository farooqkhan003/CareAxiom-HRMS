var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/abc/:abc', function(req, res, next) {
  // req.params.abc

  // models.User.findAll({
  //   include: [ models.Task ]
  // }).then(function(users) {
  //   res.render('index', {
  //     title: 'Sequelize: Express Example',
  //     users: users
  //   });
  // });
  //

  // res.json(abc);

  // console.log(req.app.locals.rootDirectory);
  // res.send(req.cookies);
  res.send(req.session);
  // res.send(req.signedCookies);
});

module.exports = router;