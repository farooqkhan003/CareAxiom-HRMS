// req.user.id -> ID of the person logged in
// req.params.user_id -> ID of person in url

function authenticateUser(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

exports.isAuthenticated = function (req, res, next) {
  if(req.isAuthenticated()) {
    next();
  }
  else {
    next(new Error(401));
  }
};

exports.destroySession = function (req, res, next) {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
};

/*
 app.get('/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
 if (err) { return next(err); }
 if (!user) { return res.redirect('/login'); }
 req.logIn(user, function(err) {
 if (err) { return next(err); }
 return res.redirect('/users/' + user.username);
 });
 })(req, res, next);
 });
 */
module.exports = authenticateUser;
