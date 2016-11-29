
exports.viewProfile = function (req, res, next) {
  var _user;
  return global.db.User.getUserByUserName(req.query.user)
    .then(function (user) {
      _user = user;
      if(req.user.rank == 'Admin' || req.user.id == user.get('id')) {
        return global.db.UserInfo.getUserInfoByUserId(user.get('id'));
      }
      else {
        throw new Error('Unauthorized Access', 403);
      }
    }).then(function (userInfo) {
      return res.render('profile', {
        firstName: userInfo.get('first_name'),
        lastName: userInfo.get('last_name'),
        email: _user.get('email'),
        joinDate: userInfo.get('join_date'),
        rank: _user.get('rank'),
        designation: userInfo.get('designation'),
        phone: userInfo.get('contact_no'),
        address: userInfo.get('address'),
        salary: userInfo.get('salary_amount'),
        bump: userInfo.get('salary_bump'),
        bonus: userInfo.get('bonus'),
        availableLeaves: userInfo.get('available_leaves')
      });
    }).catch(function (err) {
      console.log("Error", err);
    });
};

exports.updateProfile = function (req, res, next) {
  var _user;
  console.log(req.body);
  return global.db.User.getUserByUserName(req.query.user)
    .then(function (user) {
      _user = user;
      var firstName, lastName, designation, phone, address, salary, currency, salaryBump, bonus,
        yearlyIncrement, availableLeaves;
      if(req.user.rank == 'Admin') {
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        phone = req.body.phone;
        address = req.body.address;

        return global.db.UserInfo.updateUserInfoByUserId(user.get('id'), firstName, lastName, phone, address);
      }
      else if(req.user.id == user.get('id')) {
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        designation = req.body.designation;
        phone = req.body.phone;
        address = req.body.address;
        salary = req.body.salary;
        currency = req.body.currency;
        salaryBump = req.body.salaryBump;
        bonus = req.body.bonus;
        yearlyIncrement = req.body.yearlyIncrement;
        availableLeaves = req.body.availableLeaves;

        // userId, firstName, lastName, designation, phone, address, salary,
        //   currency, salaryBump, bonus, yearlyIncrement, availableLeaves;
        return global.db.UserInfo.updateUserInfoByAdmin(user.get('id'), firstName, lastName, designation, phone,
          address, salary, currency, salaryBump, bonus, yearlyIncrement, availableLeaves);
      }
      else {
        throw new Error('Unauthorized Access', 403);
      }
    }).then(function (affectedCount, updatedUserInfo) {
      // var userInfo = Sequelize.Utils._.first(updatedUserInfo);
      var redirectURL = '/profile?user=' + _user.get('username');
      return res.redirect(redirectURL);
    }).catch(function (err) {
      console.log("Error", err);
    });
};
