/*
 * @author Khawaja Ahsen
 * created on 26/11/2016
 */


/*
 * @author Khawaja Ahsen
 * created on: 26/11/2016
 * last modified: 26/11/2016
 * description: add user controller
 */
exports.addNewUserQuick = function (req, res, next) {
  if(req.user.rank == 'admin') {
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
        req.flash('addUserMessage', 'User Added! :)');
        var redirectURL = '/profile/view?user=' + req.user.userName;
        return res.redirect(redirectURL);
      }).catch(function (err) {
        req.flash('addUserMessage', 'Could not add user :(');
        var redirectURL = '/profile/view?user=' + req.user.userName;
        return res.redirect(redirectURL);
      });
  }
  else {
    throw new Error('Unauthorized Access', 403);
  }
};/*  known bugs: null */