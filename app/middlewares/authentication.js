// req.user.id -> ID of the person logged in
// req.params.user_id -> ID of person in url

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

