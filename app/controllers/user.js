
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
        var redirectURL = '/profile?user=' + user.get('username');
        return res.redirect(redirectURL);
      }).catch(function (err) {
        
      });
  }
  else {
    throw new Error('Unauthorized Access', 403);
  }
};