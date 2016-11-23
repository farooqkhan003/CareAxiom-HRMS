
// req.user.id -> ID of the person logged in
// req.params.user_id -> ID of person in url

function authenticateUser(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

module.exports = authenticateUser;
