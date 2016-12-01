/*
 * @author Khawaja Ahsen
 * created on 26/11/2016
 */

/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 26/11/2016
 */
exports.isAuthenticated = function (req, res, next) {
  if(req.isAuthenticated()) {
    next();
  }
  else {
    next(new Error(401));
  }
}; /*  known bugs: null */

/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 26/11/2016
 */
exports.destroySession = function (req, res, next) {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
};/*  known bugs: null */

