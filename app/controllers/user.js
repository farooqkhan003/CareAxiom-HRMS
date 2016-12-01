var _ = require('underscore');

/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 26/11/2016
 */
exports.addNewUserQuick = function (req, res, next) {
  if (req.user.rank == 'admin') {
    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;
    var rank = req.body.rank;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var designation = req.body.designation;
    var phone = req.body.phone;
    var salary = req.body.salary;

    return global.db.User.addUserQuick(userName, email, password, rank, firstName, lastName,
      designation, phone, salary)
      .then(function (userInfo) {
        return global.db.User.getUserById(userInfo.get('id'));
      }).then(function (user) {
        res.send('1');
        //var redirectURL = '/profile/view?user=' + req.user.userName;
        //return res.redirect(redirectURL);
      }).catch(function (err) {
        res.send(err.message);
        // var redirectURL = '/profile/view?user=' + req.user.userName;
        // return res.redirect(redirectURL);
      });
  }
  else {
    throw new Error('Unauthorized Access', 403);
  }
};
/*  known bugs: null */

/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 26/11/2016
 * description: add user controller
 */
exports.deleteUser = function (req, res, next) {
  if (req.user.rank == 'admin') {
    var userName = req.body.userName;

    return global.db.User.deleteUserByUserName(userName)
      .then(function (affectedCount, deletedUser) {

        if(_.first(affectedCount) == 1)
          req.flash('deletedUserMessage', 'User Deleted');
        else
          req.flash('deletedUserMessage', 'Unable to delete user');

        var redirectURL = '/profile/view?user=' + req.user.userName;
        return res.redirect(redirectURL);
      }).catch(function (err) {

        req.flash('deletedUserMessage', 'Unable to delete user');
        var redirectURL = '/profile/view?user=' + req.user.userName;
        return res.redirect(redirectURL);
      });
  }
  else {
    throw new Error('Unauthorized Access', 403);
  }
};